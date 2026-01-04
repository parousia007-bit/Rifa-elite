import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const Ticket = mongoose.model('Ticket', new mongoose.Schema({}, { strict: false }));

async function sincronizar() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("🚀 Conexión exitosa. Sincronizando datos...");

        // 1. Rango Sebastian Martinez (B6 al B29)
        await Ticket.updateMany(
            { serie: 'B', numero: { $gte: 6, $lte: 29 } },
            { $set: { estado: 'vendido', comprador: 'Sebastian Martinez', nombre_completo: 'Sebastian Martinez' } }
        );

        // 2. Registros Individuales
        const nuevos = [
            { s: 'A', n: 1, c: 'Alisson roblero zunun' }, { s: 'A', n: 2, c: 'Yuri alvarez' },
            { s: 'A', n: 3, c: 'Maricarmen tello' }, { s: 'A', n: 4, c: 'David trujillo' },
            { s: 'A', n: 5, c: 'Maybeth martinez' }, { s: 'A', n: 6, c: 'Michelle guillen molina' },
            { s: 'A', n: 8, c: 'Marta cristel mora gonzales' }, { s: 'A', n: 9, c: 'Maybeth martinez' },
            { s: 'A', n: 10, c: 'Arik guillen molina' }, { s: 'A', n: 11, c: 'Luis arturo' },
            { s: 'A', n: 12, c: 'Dalia molina perez' }, { s: 'A', n: 14, c: 'Fany lopez pacheco' }
        ];

        for (let r of nuevos) {
            await Ticket.updateOne(
                { serie: r.s, numero: r.n },
                { $set: { estado: 'vendido', comprador: r.c, nombre_completo: r.c } }
            );
        }

        // 3. Unificar nombres de forma segura
        const vendidos = await Ticket.find({ estado: 'vendido' });
        for (let t of vendidos) {
            if (!t.comprador && t.nombre_completo) {
                await Ticket.updateOne({ _id: t._id }, { $set: { comprador: t.nombre_completo } });
            }
        }

        const total = await Ticket.countDocuments({ estado: 'vendido' });
        console.log(`\n✅ PROCESO COMPLETADO EXITOSAMENTE`);
        console.log(`📈 Boletos vendidos en total: ${total}`);
        process.exit();
    } catch (err) { console.error("❌ Error:", err.message); process.exit(1); }
}
sincronizar();
