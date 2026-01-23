import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// Forzamos la ruta del archivo .env para que no marque "undefined"
dotenv.config(); // Intento estándar
if (!process.env.MONGO_URI) {
    dotenv.config({ path: '/data/data/com.termux/files/home/RifaElite/.env' }); // Fallback Termux
}

const ticketSchema = new mongoose.Schema({
    serie: String, 
    numero: Number, 
    estado: String, 
    nombre_completo: String, 
    comprador: String
}, { strict: false });

const Ticket = mongoose.model('Ticket', ticketSchema);

async function auditar() {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("No se encontró MONGO_URI en el archivo .env");
        }
        
        await mongoose.connect(process.env.MONGO_URI);
        console.log("🔍 Conectado exitosamente a MongoDB Atlas...");

        const vendidos = await Ticket.find({ estado: { $ne: 'disponible' } }).sort({ serie: 1, numero: 1 });

        console.log(`\n📊 TOTAL DE BOLETOS EN LA NUBE: ${vendidos.length}`);
        console.log("--------------------------------------------------");

        vendidos.forEach(t => {
            const nombre = t.nombre_completo || t.comprador || "SIN NOMBRE";
            console.log(`[${t.serie}${t.numero}] - ${t.estado} - ${nombre}`);
        });

        process.exit();
    } catch (err) {
        console.error("❌ Error de conexión:", err.message);
        process.exit(1);
    }
}
auditar();
