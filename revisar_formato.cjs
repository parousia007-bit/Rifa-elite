const mongoose = require('mongoose');
require('dotenv').config();
async function revisar() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const db = mongoose.connection.db.collection('tickets');
        const ejemplo = await db.findOne({ serie: { $regex: /O/i } });
        console.log('\n====================================');
        console.log('🔍 FORMATO ENCONTRADO EN ATLAS:');
        console.log(ejemplo);
        console.log('====================================\n');
        process.exit(0);
    } catch (e) { console.error(e); process.exit(1); }
}
revisar();
