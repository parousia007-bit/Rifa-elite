import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const Ticket = mongoose.model('Ticket', new mongoose.Schema({}, { strict: false }));

async function arreglarTodo() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("🚀 Conectado a la base de datos del Admin...");

        // 1. Liberar el S79
        await Ticket.updateOne({ serie: 'S', numero: 79 }, { $set: { estado: 'disponible', comprador: '', nombre_completo: '' } });
        console.log("✅ S79 Liberado.");

        // 2. Registrar a Sebastian Martinez (B6 al B29)
        // Usamos 'comprador' porque es lo que tu Panel de Admin muestra
        await Ticket.updateMany(
            { serie: 'B', numero: { $gte: 6, $lte: 29 } },
            { $set: { estado: 'vendido', comprador: 'Sebastian Martinez', nombre_completo: 'Sebastian Martinez' } }
        );
        console.log("✅ Rango B6-B29 actualizado para Sebastian Martinez.");

        console.log("👉 REFREZCA EL PANEL DE ADMIN AHORA.");
        process.exit();
    } catch (err) { console.error(err); process.exit(1); }
}
arreglarTodo();
