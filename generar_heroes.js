const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// --- CONFIGURACIÓN ---
// Ajusta esto si tu conexión es distinta en server.js
const MONGO_URI = 'mongodb+srv://admin:admin123@cluster0.mongodb.net/rifa_db'; 
// RUTA DESTINO: Donde vive la invitación de Lael
const OUTPUT_PATH = path.join(__dirname, '../temporada_cerezas/invitaciones/flayer_lael/heroes.json');

// --- MODELO (Simplificado para lectura) ---
const ticketSchema = new mongoose.Schema({
    estado: String,
    nombre_completo: String,
    fecha_compra: { type: Date, default: Date.now }
});
const Ticket = mongoose.model('Ticket', ticketSchema);

async function exportarHeroes() {
    try {
        console.log('🔌 Conectando a MongoDB...');
        await mongoose.connect(MONGO_URI);

        console.log('🔍 Buscando héroes...');
        const tickets = await Ticket.find({ estado: 'vendido' }).sort({ fecha_compra: -1 });

        console.log(`✅ Encontrados ${tickets.length} tickets vendidos.`);

        const heroes = tickets.map(t => {
            // Lógica de privacidad (Nombre + Inicial apellido)
            const nombreOriginal = t.nombre_completo || "Anónimo";
            const partes = nombreOriginal.trim().split(' ');
            let nombreClean = partes[0];
            if (partes.length > 1) nombreClean += ` ${partes[1].charAt(0)}.`;
            
            return {
                nombre: nombreClean,
                nivel: "standard", // Podrías agregar lógica para 'gold' aquí
                fecha: t.fecha_compra
            };
        });

        // Escribir el archivo en la carpeta del Frontend
        fs.writeFileSync(OUTPUT_PATH, JSON.stringify(heroes, null, 2));
        console.log(`🎉 Archivo generado exitosamente en: ${OUTPUT_PATH}`);

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await mongoose.disconnect();
    }
}

exportarHeroes();
