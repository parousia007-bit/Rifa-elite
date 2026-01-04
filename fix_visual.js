import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const Ticket = mongoose.model('Ticket', new mongoose.Schema({}, { strict: false }));

async function corregir() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("⏳ Corrigiendo visualización en la web...");

        // Buscamos todos los tickets vendidos
        const tickets = await Ticket.find({ estado: 'vendido' });
        
        for (let t of tickets) {
            // Si tiene nombre_completo, lo movemos a comprador para que la web lo vea
            if (t.nombre_completo) {
                await Ticket.updateOne(
                    { _id: t._id }, 
                    { $set: { comprador: t.nombre_completo } }
                );
            }
        }

        console.log("✅ ¡LISTO! Ahora todos los nombres deben aparecer en la web.");
        process.exit();
    } catch (err) { console.error(err); process.exit(1); }
}
corregir();
