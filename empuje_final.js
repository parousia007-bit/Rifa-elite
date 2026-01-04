import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

const Ticket = mongoose.model('Ticket', new mongoose.Schema({
    serie: String, numero: Number, estado: String, comprador: String, nombre_completo: String
}, { strict: false }));

async function empujar() {
    try {
        console.log("🔗 Intentando conectar con URI:", process.env.MONGO_URI ? "Detectada ✅" : "No detectada ❌");
        await mongoose.connect(process.env.MONGO_URI);
        
        console.log("🚀 Sincronizando a Sebastian Martinez (B6-B29)...");
        await Ticket.updateMany(
            { serie: 'B', numero: { $gte: 6, $lte: 29 } },
            { $set: { estado: 'vendido', comprador: 'Sebastian Martinez', nombre_completo: 'Sebastian Martinez' } }
        );

        console.log("✅ Proceso terminado.");
        process.exit();
    } catch (err) { console.error("❌ Error crítico:", err.message); process.exit(1); }
}
empujar();
