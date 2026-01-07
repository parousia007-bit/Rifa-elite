import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const boletosJ = [
  // Nely: J57 al J68 (12 boletos)
  {n:57, nom:'Nely'}, {n:58, nom:'Nely'}, {n:59, nom:'Nely'}, {n:60, nom:'Nely'},
  {n:61, nom:'Nely'}, {n:62, nom:'Nely'}, {n:63, nom:'Nely'}, {n:64, nom:'Nely'},
  {n:65, nom:'Nely'}, {n:66, nom:'Nely'}, {n:67, nom:'Nely'}, {n:68, nom:'Nely'},

  // Josari López Pérez: J45 al J56 (12 boletos)
  {n:45, nom:'Josari López Pérez'}, {n:46, nom:'Josari López Pérez'}, {n:47, nom:'Josari López Pérez'},
  {n:48, nom:'Josari López Pérez'}, {n:49, nom:'Josari López Pérez'}, {n:50, nom:'Josari López Pérez'},
  {n:51, nom:'Josari López Pérez'}, {n:52, nom:'Josari López Pérez'}, {n:53, nom:'Josari López Pérez'},
  {n:54, nom:'Josari López Pérez'}, {n:55, nom:'Josari López Pérez'}, {n:56, nom:'Josari López Pérez'}
];

async function cargar() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const db = mongoose.connection.db.collection('tickets');
    console.log("⏳ Actualizando boletos Serie J...");
    for (let b of boletosJ) {
      await db.updateOne(
        { serie: 'J', numero: b.n },
        { $set: { estado: 'vendido', nombre_completo: b.nom, comprador: b.nom, telefono: '' } }
      );
    }
    console.log("✅ ¡Serie J actualizada! 24 boletos añadidos.");
    process.exit();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
cargar();
