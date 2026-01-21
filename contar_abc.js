import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const ticketSchema = new mongoose.Schema({
    serie: String,
    numero: Number,
    estado: String
});
// Reutilizamos el modelo existente o lo definimos si no existe
const Ticket = mongoose.models.Ticket || mongoose.model('Ticket', ticketSchema);

async function contarVentas() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("\n📊 REPORTE DE VENTAS (SERIES A, B, C)");
        console.log("=====================================");

        const seriesInteres = ['A', 'B', 'C'];
        let totalABC = 0;

        for (const letra of seriesInteres) {
            // Buscamos coincidencia exacta de serie y estado 'vendido'
            const cuenta = await Ticket.countDocuments({ 
                serie: letra, 
                estado: 'vendido' 
            });
            console.log(`🔹 Serie ${letra}: ${cuenta} vendidos`);
            totalABC += cuenta;
        }

        console.log("-------------------------------------");
        console.log(`🏆 GRAN TOTAL (A + B + C): ${totalABC}`);
        console.log("=====================================\n");
        
        process.exit();
    } catch (error) {
        console.error("❌ Error al contar:", error);
        process.exit(1);
    }
}
contarVentas();
