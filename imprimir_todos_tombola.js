import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const RUTA_SALIDA = path.join(__dirname, 'TODOS_LOS_BOLETOS.html');

// Usamos el esquema completo para asegurar que leemos todo
const ticketSchema = new mongoose.Schema({
    serie: String,
    numero: Number,
    estado: String,
    nombre_completo: String,
    telefono: String
});
// Forzamos la colección 'tickets'
const Ticket = mongoose.model('Ticket', ticketSchema, 'tickets');

async function generarReporteTotal() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("🔌 Conectando a la Base de Datos Maestra...");

        // 1. Buscar TODOS los vendidos
        // Ordenamos por Serie (A, B, C...) y luego por Número (1, 2, 3...)
        const todos = await Ticket.find({ estado: 'vendido' })
            .sort({ serie: 1, numero: 1 });

        console.log("\n------------------------------------------------");
        console.log(`📊 RECUENTO TOTAL MONGO: ${todos.length} boletos vendidos.`);
        console.log("------------------------------------------------");

        if (todos.length < 512) {
            console.log(`⚠️ OJO: Tienes ${512 - todos.length} boletos menos que tu cuenta manual (512).`);
            console.log("Revisa si falta subir alguna lista reciente.");
        } else if (todos.length > 512) {
            console.log(`⚠️ OJO: Tienes ${todos.length - 512} boletos MÁS que tu cuenta manual.`);
        } else {
            console.log("✅ ¡EXACTO! Coinciden los 512 boletos.");
        }

        // 2. Generar HTML para imprimir (Formato Tira de Tómbola)
        let html = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>BOLETOS TÓMBOLA COMPLETA</title>
            <style>
                body { 
                    font-family: Arial, sans-serif; 
                    margin: 0; 
                    padding: 20px; 
                }
                h1 { text-align: center; font-size: 18px; margin-bottom: 10px; }
                .resumen { text-align: center; margin-bottom: 20px; font-size: 14px; }
                
                /* Contenedor flexible para aprovechar la hoja */
                .contenedor { 
                    display: flex; 
                    flex-wrap: wrap; 
                    gap: 4px; 
                    justify-content: center;
                }

                /* Diseño de la Tira (5cm x 1.5cm aprox) */
                .ticket {
                    width: 4.8cm;
                    height: 1.4cm; /* Compacto para que quepan muchos */
                    border: 1px dashed #333;
                    display: flex;
                    align-items: center;
                    padding: 2px;
                    box-sizing: border-box;
                    font-size: 10px;
                    page-break-inside: avoid; /* Evita que se corten a mitad de hoja */
                }

                .serie { 
                    width: 35%; 
                    font-weight: bold; 
                    font-size: 15px; 
                    text-align: center; 
                    border-right: 1px solid #ccc;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 100%;
                }

                .datos { 
                    width: 65%; 
                    padding-left: 5px; 
                    overflow: hidden; 
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }

                .nom { 
                    font-weight: bold; 
                    white-space: nowrap; 
                    text-overflow: ellipsis;
                    overflow: hidden;
                    font-size: 9px;
                }
                .tel { font-size: 8px; color: #555; margin-top: 1px;}

                @media print { 
                    @page { margin: 0.5cm; }
                    body { -webkit-print-color-adjust: exact; }
                }
            </style>
        </head>
        <body>
            <h1>GRAN RIFA - TÓMBOLA COMPLETA</h1>
            <div class="resumen">Total de Boletos: ${todos.length}</div>
            <div class="contenedor">
        `;

        todos.forEach(b => {
            const nombreDisplay = (b.nombre_completo || "Sin Nombre").toUpperCase();
            html += `
            <div class="ticket">
                <div class="serie">${b.serie}-${b.numero}</div>
                <div class="datos">
                    <div class="nom">${nombreDisplay.substring(0, 22)}</div>
                    <div class="tel">${b.telefono || ""}</div>
                </div>
            </div>`;
        });

        html += `</div></body></html>`;
        
        fs.writeFileSync(RUTA_SALIDA, html);
        console.log(`\n🎉 Archivo generado: ${RUTA_SALIDA}`);
        console.log("👉 Mándalo a imprimir, recorta las tiras y ¡suerte a todos!");

    } catch (e) {
        console.error("❌ Error:", e);
    } finally {
        await mongoose.disconnect();
    }
}

generarReporteTotal();
