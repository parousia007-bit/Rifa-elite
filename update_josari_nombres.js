import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const updates = [
  {n:45, nom:'Hugo Villatoro'}, {n:46, nom:'Ivan'}, {n:47, nom:'Josari'},
  {n:48, nom:'Magdiel'}, {n:49, nom:'José Alberto'}, {n:50, nom:'Adrián Tabasco'},
  {n:51, nom:'Edwin Stany'}, {n:52, nom:'José Alberto'}, {n:53, nom:'Josari'},
  {n:54, nom:'Edwin stany'}, {n:55, nom:'Daniel'}, {n:56, nom:'Daniel'}
];

async function update() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const db = mongoose.connection.db.collection('tickets');
    console.log("⏳ Actualizando nombres específicos para la Serie J...");
    for (let item of updates) {
      await db.updateOne(
        { serie: 'J', numero: item.n },
        { $set: { nombre_completo: item.nom, comprador: item.nom } }
      );
    }
    console.log("✅ ¡Nombres de la lista de Josari actualizados correctamente!");
    process.exit();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
update();
