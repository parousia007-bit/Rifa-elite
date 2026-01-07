import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const nuevosBoletos = [
  // --- Lista de Yadira Vázquez (Serie I) ---
  {s:'I', n:23, nom:'Mamá de Ángela'},
  {s:'I', n:28, nom:'Josh'}, {s:'I', n:29, nom:'Nathan'}, {s:'I', n:30, nom:'Carmelita'},
  {s:'I', n:31, nom:'Alya Ramírez'}, {s:'I', n:32, nom:'Irma'}, {s:'I', n:33, nom:'Dulce'},
  {s:'I', n:34, nom:'Héctor Molina'}, {s:'I', n:35, nom:'Héctor Molina'},
  {s:'I', n:36, nom:'Josh'}, {s:'I', n:37, nom:'Bryssa'}, {s:'I', n:38, nom:'Angel'},
  {s:'I', n:39, nom:'Yesi'},

  // --- Lista de Estefany (Serie K) ---
  {s:'K', n:13, nom:'Pablo Vázquez'},
  {s:'K', n:15, nom:'David Vázquez'},
  {s:'K', n:19, nom:'Jesús Ángel Montiel'},
  {s:'K', n:27, nom:'Vianey Castillo Vázquez'},
  {s:'K', n:29, nom:'Marco Antonio Vázquez'}
];

async function cargar() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const db = mongoose.connection.db.collection('tickets');
    console.log("🚀 Cargando 18 boletos de Yadira y Estefany...");
    
    for (let b of nuevosBoletos) {
      await db.updateOne(
        { serie: b.s, numero: b.n },
        { $set: { estado: 'vendido', nombre_completo: b.nom, comprador: b.nom, telefono: '' } }
      );
    }
    
    console.log("✅ ¡Listas agregadas! Tu nuevo total es de 478 boletos.");
    process.exit();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
cargar();
