import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const Ticket = mongoose.model('Ticket', new mongoose.Schema({
    serie: String, numero: Number, estado: String, nombre_completo: String, telefono: String
}));

async function cargarDatos() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("⏳ Conectado a MongoDB Atlas...");

        const ventas = [
            // SERIE A
            { s: 'A', n: 1, name: 'Alisson roblero zunun' }, { s: 'A', n: 2, name: 'Yuri alvarez' },
            { s: 'A', n: 3, name: 'Maricarmen tello' }, { s: 'A', n: 4, name: 'David trujillo' },
            { s: 'A', n: 5, name: 'Maybeth martinez' }, { s: 'A', n: 6, name: 'Michelle guillen molina' },
            { s: 'A', n: 8, name: 'Maybeth martinez' }, { s: 'A', n: 9, name: 'Marta cristel mora gonzales' },
            { s: 'A', n: 10, name: 'Arik guillen molina' }, { s: 'A', n: 11, name: 'Luis arturo' },
            { s: 'A', n: 12, name: 'Dalia molina perez' }, { s: 'A', n: 14, name: 'Fany lopez pacheco' },
            { s: 'A', n: 15, name: 'Maria saira sanchez santiago' }, { s: 'A', n: 16, name: 'Alejandro tello' },
            { s: 'A', n: 17, name: 'Anabey guillen pacheco' }, { s: 'A', n: 18, name: 'Abraham eduardo goez espinoza' },
            { s: 'A', n: 19, name: 'Gael rodriguez samayoa' }, { s: 'A', n: 21, name: 'Gabriel mazariegos' },
            { s: 'A', n: 22, name: 'Elena vazquez' }, { s: 'A', n: 23, name: 'Leticia villanueva' },
            { s: 'A', n: 24, name: 'Eliut moises morales' }, { s: 'A', n: 25, name: 'Kevin moises montes lugo' },
            { s: 'A', n: 27, name: 'Alisson roblero zunun' }, { s: 'A', n: 29, name: 'Maybeth martinez' },
            { s: 'A', n: 31, name: 'Maybeth martinez' }, { s: 'A', n: 33, name: 'Lisbeth molina solis' },
            { s: 'A', n: 35, name: 'Arminda' }, { s: 'A', n: 37, name: 'Yuli mandujano' },
            { s: 'A', n: 38, name: 'Antonio martinez' }, { s: 'A', n: 40, name: 'Elena vazquez' },
            { s: 'A', n: 44, name: 'Alisson roblero zunun' }, { s: 'A', n: 46, name: 'Alexander samayoa salas' },
            { s: 'A', n: 47, name: 'Yuli mandujano' }, { s: 'A', n: 49, name: 'Alisson roblero zunun' },
            { s: 'A', n: 53, name: 'Lizveth molina solis' }, { s: 'A', n: 57, name: 'Yuli mandujano' },
            { s: 'A', n: 66, name: 'Gloria mejia hernandez' }, { s: 'A', n: 67, name: 'Yuli mandujano' },
            { s: 'A', n: 76, name: 'Hector perez nango' }, { s: 'A', n: 77, name: 'Kevin M. montes lugo' },

            // SERIE B (Individuales)
            { s: 'B', n: 1, name: 'Kevin moises morales luego' }, { s: 'B', n: 2, name: 'Alicia sanchez matias' },
            { s: 'B', n: 3, name: 'Isabel villatoro' }, { s: 'B', n: 5, name: 'Alisson roblero zunun' },
            { s: 'B', n: 33, name: 'Sara villatoro' }, { s: 'B', n: 35, name: 'Alisson roblero zunun' },
            { s: 'B', n: 37, name: 'Hector perez nango' }, { s: 'B', n: 50, name: 'Alisson roblero zunun' },
            { s: 'B', n: 58, name: 'Alisson roblero zunun' }, { s: 'B', n: 62, name: 'Yuli mandujano' },
            { s: 'B', n: 67, name: 'Aylen guadalupe espinoza chanon' }, { s: 'B', n: 70, name: 'Alisson roblero' },
            { s: 'B', n: 71, name: 'Eliut moises morales vazquez' }, { s: 'B', n: 77, name: 'Sara villatoro' },

            // SERIE C
            { s: 'C', n: 3, name: 'Alisson roblero zunun' }, { s: 'C', n: 6, name: 'Ceci garcia' },
            { s: 'C', n: 7, name: 'Eliut moises morales vazquez' }, { s: 'C', n: 8, name: 'Sofia gualupe espinoza' },
            { s: 'C', n: 11, name: 'Alisson roblero zunun' }, { s: 'C', n: 13, name: 'jaris gomez cruz' },
            { s: 'C', n: 14, name: 'Eliut moises morales' }, { s: 'C', n: 15, name: 'ceci garcia' },
            { s: 'C', n: 16, name: 'mitzi de la cruz pineda' }, { s: 'C', n: 17, name: 'alisson roblero' },
            { s: 'C', n: 22, name: 'sofia elizabeth flores' }, { s: 'C', n: 23, name: 'alissia sanchez matias' },
            { s: 'C', n: 28, name: 'alisson roblero zunun' }, { s: 'C', n: 29, name: 'hector perez nango' },
            { s: 'C', n: 30, name: 'eliut morales vazquez' }, { s: 'C', n: 39, name: 'alisson roblero perez' },
            { s: 'C', n: 45, name: 'mariana leon' }, { s: 'C', n: 50, name: 'eliut morales vazquez' },
            { s: 'C', n: 59, name: 'sandra luz roblero' }, { s: 'C', n: 62, name: 'alisson roblero zunun' },
            { s: 'C', n: 64, name: 'diana valeria reyes santiz' }, { s: 'C', n: 77, name: 'mitzi de la cruz' },
            { s: 'C', n: 78, name: 'alisson roblero zunun' },

            // SERIES G y H
            { s: 'G', n: 19, name: 'veronica jazmin cruz' }, { s: 'G', n: 63, name: 'martha jazmin jandete' },
            { s: 'H', n: 5, name: 'Melani carolina montero' }, { s: 'H', n: 8, name: 'Martha jazmin jandete' },
            { s: 'H', n: 7, name: 'karla nicole montero' }, { s: 'H', n: 9, name: 'dulce' }
        ];

        console.log("🔄 Procesando registros individuales...");
        for (const v of ventas) {
            await Ticket.updateOne(
                { serie: v.s, numero: v.n },
                { estado: 'vendido', nombre_completo: v.name }
            );
        }

        console.log("🚙 Registrando tickets de Sebastian Martinez (Chevy)...");
        const resChevy = await Ticket.updateMany(
            { serie: 'B', numero: { $gte: 6, $lte: 29 } },
            { estado: 'vendido', nombre_completo: 'Sebastian Martinez' }
        );

        console.log(`✅ ¡ÉXITO! Se actualizaron ${ventas.length + resChevy.modifiedCount} tickets.`);
        process.exit();
    } catch (err) { console.error("❌ Error:", err); process.exit(1); }
}
cargarDatos();
