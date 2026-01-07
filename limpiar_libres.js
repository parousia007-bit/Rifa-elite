import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

async function limpiar() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const db = mongoose.connection.db.collection('tickets');
        
        console.log("🧹 Limpiando base de datos...");

        // Ponemos como 'libre' todo lo que NO esté marcado como 'vendido'
        const res = await db.updateMany(
            { estado: { $ne: 'vendido' } }, 
            { $set: { estado: 'libre' } }
        );

        console.log(`✅ ¡Proceso completado!`);
        console.log(`✨ Se actualizaron ${res.modifiedCount} boletos a estado 'libre'.`);
        
        process.exit();
    } catch (e) {
        console.error("❌ Error:", e);
        process.exit(1);
    }
}
limpiar();
