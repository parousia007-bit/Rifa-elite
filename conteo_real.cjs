const mongoose = require('mongoose');
require('dotenv').config();

// Usamos el nombre exacto que encontramos en tus archivos: MONGO_URI
const uri = process.env.MONGO_URI;

if (!uri) {
    console.log("❌ Error: No se encontró MONGO_URI en el archivo .env");
    process.exit(1);
}

async function contarBoletos() {
    try {
        await mongoose.connect(uri);
        
        // Acceso directo a la colección 'tickets' como lo hacen tus otros scripts
        const db = mongoose.connection.db.collection('tickets');

        // Contamos los que tienen un nombre asignado y el estado es 'vendido'
        const vendidos = await db.countDocuments({ 
            estado: 'vendido'
        });

        console.log('\n====================================');
        console.log('🚀 REPORTE DE VENTAS - RIFA LAEL');
        console.log('====================================');
        console.log(`✅ Boletos vendidos (reales): ${vendidos}`);
        console.log(`💰 Recaudado aprox: $${vendidos * 100}`);
        console.log('====================================\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error de conexión:', error.message);
        process.exit(1);
    }
}
contarBoletos();
