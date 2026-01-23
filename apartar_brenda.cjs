const mongoose = require('mongoose');
require('dotenv').config();

async function apartar() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const db = mongoose.connection.db.collection('tickets');

        console.log('🔄 Conectado. Procesando apartados para Brenda en Serie O...');

        // Rango del 33 al 56 (24 boletos en total)
        const rangoBrenda = Array.from({length: 24}, (_, i) => i + 33);

        const resultado = await db.updateMany(
            { serie: 'O', numero: { $in: rangoBrenda } },
            { $set: { nombre_completo: 'Brenda Vazquez Grajales', estado: 'vendido' } }
        );

        console.log('\n====================================');
        console.log(`✅ Brenda Vazquez Grajales: ${resultado.modifiedCount} boletos actualizados.`);
        console.log('====================================');
        console.log('✨ Registro completado en Atlas.');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}
apartar();
