import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

async function ver() {
  await mongoose.connect(process.env.MONGO_URI);
  const doc = await mongoose.connection.db.collection('tickets').findOne({estado:'vendido'});
  console.log("--- EJEMPLO DE BOLETO EN BASE DE DATOS ---");
  console.log(doc);
  process.exit();
}
ver();
