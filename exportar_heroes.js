import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const MONGO_URI = process.env.MONGO_URI;

// RUTA DESTINO (Ajustada a tu carpeta del proyecto React)
const DIR_DESTINO = path.join(__dirname, '../temporada_cerezas/invitaciones/flayer_lael');
const OUTPUT_PATH = path.join(DIR_DESTINO, 'heroes.json');

const ticketSchema = new mongoose.Schema({
    estado: String,
    nombre_completo: String,
    comprador: String,
    fecha_compra: { type: Date, default: Date.now },
    tickets: Array,
    ganador: { type: Boolean, default: false }, // Campo nuevo
    serie: String,
    numero: Number
});
const Ticket = mongoose.model('Ticket', ticketSchema, 'tickets');

async function exportarHeroes() {
    try {
        if (!MONGO_URI) throw new Error("❌ Sin MONGO_URI");
        await mongoose.connect(MONGO_URI);
        console.log('🔌 Buscando a la Ganadora y generando lista...');

        // 1. Obtener todos los vendidos
        const ventas = await Ticket.find({ estado: 'vendido' }).sort({ fecha_compra: -1 });
        const heroesMap = new Map();

        for (const venta of ventas) {
            // Normalizar nombre
            const nombreRaw = venta.nombre_completo || venta.comprador || "Anónimo";
            let nombreClean = nombreRaw.trim();
            
            // Capitalizar bonito
            nombreClean = nombreClean.toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());

            const esGanador = venta.ganador === true; // ¿Es este el ticket premiado?

            if (heroesMap.has(nombreClean)) {
                const existing = heroesMap.get(nombreClean);
                existing.boletos += 1;
                existing.tickets.push(venta._id);
                if (esGanador) existing.esGanador = true; // Marcamos al usuario como ganador
            } else {
                heroesMap.set(nombreClean, {
                    nombre: nombreClean,
                    boletos: 1,
                    tickets: [venta._id],
                    esGanador: esGanador,
                    clase: esGanador ? 'winner-card' : 'normal-card' // Clase para CSS
                });
            }
        }

        // Convertir a lista y procesar ganadores visualmente
        let heroesData = Array.from(heroesMap.values());
        
        // Poner a los ganadores AL PRINCIPIO de la lista
        heroesData.sort((a, b) => (b.esGanador === true) - (a.esGanador === true));

        // Decorar nombre del ganador
        heroesData = heroesData.map(h => {
            if (h.esGanador) {
                h.nombre = `🏆 ${h.nombre.toUpperCase()} 🏆`;
                h.mensaje = "¡GANADORA 1er SORTEO!";
            }
            return h;
        });

        // 4. Guardar JSON
        // Aseguramos que el directorio exista
        if (!fs.existsSync(DIR_DESTINO)){
            fs.mkdirSync(DIR_DESTINO, { recursive: true });
        }
        
        fs.writeFileSync(OUTPUT_PATH, JSON.stringify(heroesData, null, 2));
        console.log(`🎉 ¡LISTO! Dalia Ramírez ahora aparece como GANADORA al inicio de la lista.`);
        console.log(`📂 Archivo actualizado: ${OUTPUT_PATH}`);

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await mongoose.disconnect();
    }
}

exportarHeroes();
