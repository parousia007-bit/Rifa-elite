const mongoose = require('mongoose');
const fs = require('fs');
require('dotenv').config();

async function generarMuro() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const db = mongoose.connection.db.collection('tickets');

        // Buscamos solo los vendidos que tengan un nombre real
        const tickets = await db.find({ estado: 'vendido' }).toArray();
        
        const heroesMap = {};

        tickets.forEach(t => {
            // USAMOS nombre_completo que es el campo real en Atlas
            const nombre = t.nombre_completo || t.nombre || "Héroe Anónimo";
            if (!heroesMap[nombre]) {
                heroesMap[nombre] = { nombre: nombre, boletos: 0 };
            }
            heroesMap[nombre].boletos++;
        });

        const listaHeroes = Object.values(heroesMap).sort((a, b) => b.boletos - a.boletos);

        // Guardamos el JSON donde Temporada de Cerezas lo pueda ver
        // Ajusta la ruta si es necesario, pero usualmente es en public
        fs.writeFileSync('./public/heroes.json', JSON.stringify(listaHeroes, null, 2));
        
        console.log(`✅ Muro actualizado: ${listaHeroes.length} héroes procesados.`);
        process.exit(0);
    } catch (e) {
        console.error("❌ Error al exportar:", e);
        process.exit(1);
    }
}
generarMuro();
