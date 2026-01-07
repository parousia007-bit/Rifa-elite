import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();

async function extraer() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const docs = await mongoose.connection.db.collection('tickets').find({estado:'vendido'}).toArray();
    fs.writeFileSync('./db_actual.json', JSON.stringify(docs, null, 2));
    console.log(`✅ Se extrajeron ${docs.length} boletos vendidos a db_actual.json`);
    process.exit();
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}
extraer();
