import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const nuevosBoletos = [
  // Serie H
  {s:'H', n:28, nom:'Juana santos'}, {s:'H', n:11, nom:'Alejandra Patricia castellanos'},
  {s:'H', n:18, nom:'patricia Gonzales'}, {s:'H', n:12, nom:'Angel Anabell Méndez'},
  {s:'H', n:16, nom:'Yoana Lopez'}, {s:'H', n:65, nom:'Maria Isabel Santos'},
  {s:'H', n:33, nom:'Marco Antonio Santos'}, {s:'H', n:4, nom:'Estrella de los angeles'},
  {s:'H', n:69, nom:'Estrella de los angeles'}, {s:'H', n:27, nom:'jose de jesús'},
  {s:'H', n:39, nom:'Estrella de los angeles'}, {s:'H', n:45, nom:'Juana Lopez Hernández'},
  
  // Serie G
  {s:'G', n:7, nom:'Laura alegría'}, {s:'G', n:18, nom:'patricia alegría'},
  {s:'G', n:26, nom:'Ana ley'}
];

async function cargar() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const db = mongoose.connection.db.collection('tickets');
    console.log("⏳ Cargando boletos Series H y G...");
    
    for (let b of nuevosBoletos) {
      await db.updateOne(
        { serie: b.s, numero: b.n },
        { $set: { estado: 'vendido', nombre_completo: b.nom, comprador: b.nom, telefono: '' } }
      );
    }
    
    console.log("✅ ¡Actualización completada! 15 boletos nuevos en línea.");
    process.exit();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
cargar();
