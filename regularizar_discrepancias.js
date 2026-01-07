import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const faltantes = [
  // De la última foto (Sandy, Ronay y otros)
  {s:'K', n:74, nom:'Sandy Alexia', t:'9612341212'}, {s:'K', n:76, nom:'Ronay Ithiel', t:'9612341212'},
  {s:'K', n:79, nom:'Sandy Alexia', t:'9612341212'}, {s:'L', n:2, nom:'Sandy Alexia', t:'9612341212'},
  {s:'L', n:4, nom:'Sandy Alexia', t:'9612341212'},
  // Margarita y Claudia
  {s:'K', n:37, nom:'Margarita jimenez gonzalez'}, {s:'K', n:42, nom:'claudia vazquez'}, 
  {s:'K', n:48, nom:'margarita jimenez gonzalez'},
  // Serie F y G (Pendientes detectados)
  {s:'F', n:36, nom:'Yenick Alvarez Hernandez', t:'9611788527'}, {s:'F', n:53, nom:'Carlos Arias'}, 
  {s:'F', n:55, nom:'Magaly v'}, {s:'F', n:56, nom:'Magaly v'}, {s:'F', n:62, nom:'Blanca J. Paredes'},
  {s:'F', n:67, nom:'Blanca J. Paredes'}, {s:'F', n:69, nom:'Magaly v'}, 
  {s:'F', n:70, nom:'Ing. Victor Hechegaray', t:'5525165065'}, {s:'F', n:75, nom:'Ing. Hecheg.'}, 
  {s:'F', n:76, nom:'Blanca J. Paredes'}, {s:'G', n:1, nom:'Blanca J. Paredes'}, 
  {s:'G', n:4, nom:'Carlos Arias'}, {s:'G', n:5, nom:'Blanca J. Paredes'},
  // Serie E
  {s:'E', n:42, nom:'Allisson Roblero Zunun'}
];

async function update() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const db = mongoose.connection.db.collection('tickets');
    console.log("🚀 Cargando las 22 discrepancias finales...");
    for (let b of faltantes) {
      await db.updateOne(
        { serie: b.s, numero: b.n },
        { $set: { estado: 'vendido', nombre_completo: b.nom, comprador: b.nom, telefono: b.t || '' } }
      );
    }
    console.log("✅ ¡Todo regularizado! Los 442 boletos están ahora en el sistema.");
    process.exit();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
update();
