import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const RUTA_SALIDA = path.join(__dirname, 'BOLETOS_LIBRES.html');

const ticketSchema = new mongoose.Schema({
    serie: String,
    numero: Number,
    estado: String
});
const Ticket = mongoose.model('Ticket', ticketSchema, 'tickets');

async function generarLibres() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("🔌 Conectando para buscar boletos disponibles...");

        // Buscamos los que NO están vendidos
        const libres = await Ticket.find({ estado: 'libre' })
            .sort({ serie: 1, numero: 1 });

        console.log("\n------------------------------------------------");
        console.log(`🎫 BOLETOS DISPONIBLES: ${libres.length}`);
        console.log("------------------------------------------------");

        let html = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>BOLETOS LIBRES</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; text-align: center; }
                .contenedor { display: flex; flex-wrap: wrap; gap: 3px; justify-content: center; }
                .ticket-libre {
                    width: 2.5cm; /* Más cortitas porque no llevan nombre */
                    height: 1cm;
                    border: 1px solid #28a745; /* Verde para identificar libre */
                    color: #155724;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                    font-size: 14px;
                    page-break-inside: avoid;
                }
                @media print { @page { margin: 0.5cm; } }
            </style>
        </head>
        <body>
            <h1>🎟️ BOLETOS POR VENDER (${libres.length})</h1>
            <div class="contenedor">
        `;

        libres.forEach(b => {
            html += `<div class="ticket-libre">${b.serie}-${b.numero}</div>`;
        });

        html += `</div></body></html>`;
        
        fs.writeFileSync(RUTA_SALIDA, html);
        console.log(`\n✅ Lista de libres generada: ${RUTA_SALIDA}`);

    } catch (e) {
        console.error("❌ Error:", e);
    } finally {
        await mongoose.disconnect();
    }
}
generarLibres();
