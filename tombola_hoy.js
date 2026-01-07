import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ajusta esto si quieres guardar el archivo en otro lado
const RUTA_SALIDA = path.join(__dirname, 'boletos_para_tombola.html');

const ticketSchema = new mongoose.Schema({
    serie: String,
    numero: Number,
    estado: String,
    nombre_completo: String,
    telefono: String,
    fecha_compra: { type: Date, default: Date.now }
});
// Usamos la colección correcta
const Ticket = mongoose.model('Ticket', ticketSchema, 'tickets');

async function generarTombola() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("🔌 Conectado. Buscando boletos agregados HOY (6 de Enero)...");

        // 1. Definir el rango de tiempo: Desde las 00:00 de hoy hasta ahora
        const inicioDia = new Date();
        inicioDia.setHours(0, 0, 0, 0);

        // 2. Buscar en Mongo
        const boletosHoy = await Ticket.find({
            estado: 'vendido',
            fecha_compra: { $gte: inicioDia }
        }).sort({ serie: 1, numero: 1 }); // Ordenados por Serie y Número

        if (boletosHoy.length === 0) {
            console.log("⚠️ No se encontraron boletos con fecha de HOY. ¿Quizás se subieron con fecha anterior?");
            // Si sale 0, podrías quitar el filtro de fecha para imprimir TODOS si lo necesitas.
            process.exit();
        }

        console.log(`✅ Se encontraron ${boletosHoy.length} boletos nuevos hoy.`);

        // 3. Generar HTML para imprimir (Tiritas de 5cm x 1.5cm)
        let htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 20px;
                    display: flex;
                    flex-wrap: wrap;
                    gap: 5px; /* Espacio de corte */
                }
                .ticket-strip {
                    width: 5cm;      /* Largo */
                    height: 1.5cm;   /* Ancho (aprox 1.5cm para que se lea) */
                    border: 1px dashed #000;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    padding: 2px;
                    box-sizing: border-box;
                    font-size: 10px;
                    page-break-inside: avoid;
                }
                .serie-num {
                    font-weight: bold;
                    font-size: 14px;
                    width: 30%;
                    text-align: center;
                    border-right: 1px solid #ccc;
                    margin-right: 5px;
                }
                .info {
                    width: 70%;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
                .nombre { font-weight: bold; }
                .tel { font-size: 9px; color: #555; }
                
                @media print {
                    @page { margin: 1cm; }
                    body { -webkit-print-color-adjust: exact; }
                }
            </style>
        </head>
        <body>
        `;

        // Agregar cada boleto al HTML
        boletosHoy.forEach(b => {
            const serieNum = `${b.serie}-${b.numero.toString().padStart(3, '0')}`;
            const nombre = b.nombre_completo || "Sin Nombre";
            const tel = b.telefono || "";

            // Imprimimos en consola también para que los veas rápido
            console.log(`🎟️ ${serieNum}: ${nombre}`);

            htmlContent += `
            <div class="ticket-strip">
                <div class="serie-num">${b.serie}-${b.numero}</div>
                <div class="info">
                    <div class="nombre">${nombre.substring(0, 25)}</div>
                    <div class="tel">${tel}</div>
                </div>
            </div>`;
        });

        htmlContent += `</body></html>`;

        fs.writeFileSync(RUTA_SALIDA, htmlContent);
        console.log(`\n🎉 ¡Listo! Archivo generado en: ${RUTA_SALIDA}`);
        console.log("👉 Abre ese archivo, imprímelo, recorta las tiras y ¡a la tómbola!");

    } catch (error) {
        console.error("❌ Error:", error);
    } finally {
        await mongoose.disconnect();
    }
}

generarTombola();
