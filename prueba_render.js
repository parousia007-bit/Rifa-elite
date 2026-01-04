import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const Ticket = mongoose.model('Ticket', new mongoose.Schema({}, { strict: false }));
async function prueba() {
    await mongoose.connect(process.env.MONGO_URI);
    // Vamos a marcar el boleto S79 (el último) con un nombre de prueba
    await Ticket.updateOne(
        { serie: 'S', numero: 79 }, 
        { $set: { estado: 'vendido', comprador: 'PRUEBA CONEXION TERMINAL', nombre_completo: 'PRUEBA CONEXION TERMINAL' } }
    );
    console.log("📡 Boleto S79 actualizado. Ve a revisarlo a la web.");
    process.exit();
}
prueba();
