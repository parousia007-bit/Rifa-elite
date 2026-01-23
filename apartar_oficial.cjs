const mongoose = require('mongoose');
require('dotenv').config();

async function apartar() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const db = mongoose.connection.db.collection('tickets');

        console.log('🔄 Conectado. Procesando apartados en Serie O...');

        // Generamos los rangos como números reales (integers)
        const rangoMiriam = Array.from({length: 12}, (_, i) => i + 33); // 33 al 44
        const rangoMaty = Array.from({length: 12}, (_, i) => i + 21);   // 21 al 32

        // Actualización Miriam
        const resMiriam = await db.updateMany(
            { serie: 'O', numero: { $in: rangoMiriam } },
            { $set: { nombre_completo: 'Miriam', estado: 'vendido' } }
        );

        // Actualización Maty
        const resMaty = await db.updateMany(
            { serie: 'O', numero: { $in: rangoMaty } },
            { $set: { nombre_completo: 'Maty', estado: 'vendido' } }
        );

        console.log('\n====================================');
        console.log(`✅ Miriam: ${resMiriam.modifiedCount} boletos actualizados.`);
        console.log(`✅ Maty: ${resMaty.modifiedCount} boletos actualizados.`);
        console.log('====================================');
        console.log('✨ Atlas actualizado correctamente.');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}
apartar();
