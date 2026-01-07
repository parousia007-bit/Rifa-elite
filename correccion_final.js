import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

async function corregir() {
  await mongoose.connect(process.env.MONGO_URI);
  const db = mongoose.connection.db.collection('tickets');

  // Corregir intercambio A8 y A9
  await db.updateOne({ serie: 'A', numero: 8 }, { $set: { nombre_completo: 'Maybeth martinez', comprador: 'Maybeth martinez' } });
  await db.updateOne({ serie: 'A', numero: 9 }, { $set: { nombre_completo: 'Marta cristel mora gonzales', comprador: 'Marta cristel mora gonzales' } });
  
  // Corregir nombre Alejandro A16
  await db.updateOne({ serie: 'A', numero: 16 }, { $set: { nombre_completo: 'Alejandro tello', comprador: 'Alejandro tello' } });

  console.log("✅ Corrección de A8, A9 y A16 completada.");
  process.exit();
}
corregir();
