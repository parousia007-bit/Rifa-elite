import mongoose from 'mongoose';
import fs from 'fs-extra';
import dotenv from 'dotenv';
dotenv.config();

const ticketSchema = new mongoose.Schema({
    serie: String,
    numero: Number,
    estado: String,
    nombre_completo: String,
    telefono: String
});
const Ticket = mongoose.model('Ticket', ticketSchema);

async function migrar() {
    try {
        console.log("⏳ Conectando a MongoDB para migrar datos...");
        await mongoose.connect(process.env.MONGO_URI);
        const localData = await fs.readJson('./data/boletos.json');
        let totalDocs = [];

        Object.keys(localData).forEach(serie => {
            localData[serie].forEach(b => {
                totalDocs.push({ ...b, serie });
            });
        });

        await Ticket.deleteMany({}); 
        await Ticket.insertMany(totalDocs);
        console.log("✅ ¡DATOS MIGRADOS A MONGODB CON ÉXITO!");
        process.exit();
    } catch (err) { 
        console.error("❌ Error durante la migración:", err); 
        process.exit(1);
    }
}
migrar();
