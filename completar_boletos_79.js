import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const ticketSchema = new mongoose.Schema({
    serie: String,
    numero: Number,
    estado: { type: String, default: 'libre' },
    nombre_completo: { type: String, default: '' }
});
const Ticket = mongoose.model('Ticket', ticketSchema, 'tickets');

async function completar() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("🔌 Conectado. Poblando series de la A a la S (79 boletos c/u)...");

        // Definimos las 19 series exactas: A hasta la S
        const series = "ABCDEFGHIJKLMNOPQRS".split(""); 
        let creados = 0;
        let yaExistian = 0;

        for (let s of series) {
            for (let n = 1; n <= 79; n++) {
                // Buscamos si el boleto ya existe
                const existe = await Ticket.findOne({ serie: s, numero: n });

                if (!existe) {
                    await Ticket.create({
                        serie: s,
                        numero: n,
                        estado: 'libre',
                        nombre_completo: ''
                    });
                    creados++;
                } else {
                    yaExistian++;
                }
            }
        }

        console.log("\n------------------------------------------------");
        console.log(`✅ ¡Inventario Estructurado!`);
        console.log(`📦 Boletos que ya estaban (vendidos/otros): ${yaExistian}`);
        console.log(`🆕 Boletos nuevos creados como LIBRES: ${creados}`);
        console.log(`🏆 TOTAL EN BASE DE DATOS: ${yaExistian + creados} (de 1,501)`);
        console.log("------------------------------------------------");
        
        process.exit();
    } catch (e) {
        console.error("❌ Error:", e);
        process.exit(1);
    }
}
completar();
