import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const boletosNuevos = [
  // Serie F
  {s:'F', n:37, nom:'Albita Jacob Hernández'}, {s:'F', n:38, nom:'Albita Jacob Hernández'},
  {s:'F', n:39, nom:'Albita Jacob Hernández'}, {s:'F', n:40, nom:'Albita Jacob Hernández'},
  {s:'F', n:41, nom:'Albita Jacob Hernández'},
  {s:'F', n:42, nom:'Esmirna Serrano Jacob'}, {s:'F', n:50, nom:'Esmirna Serrano Jacob'},
  {s:'F', n:59, nom:'Esmirna Serrano Jacob'},
  {s:'F', n:49, nom:'Jorge Luis Vázquez González'}, {s:'F', n:58, nom:'Jorge Luis Vázquez González'},
  
  // Serie I (Discrepancias Orquídea)
  {s:'I', n:65, nom:'Carolina Chanona Vázquez'},
  {s:'I', n:67, nom:'Dalia Grajales'},
  {s:'I', n:68, nom:'Violeta Vázquez'},
  {s:'I', n:71, nom:'Dulce Belén Chanona'},
  {s:'I', n:73, nom:'Rebeca Lazos'}
];

async function cargar() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const db = mongoose.connection.db.collection('tickets');
    console.log("🚀 Cargando 15 boletos (10 de Serie F + 5 de Serie I)...");
    
    for (let b of boletosNuevos) {
      await db.updateOne(
        { serie: b.s, numero: b.n },
        { $set: { estado: 'vendido', nombre_completo: b.nom, comprador: b.nom, telefono: '' } }
      );
    }
    
    console.log("✅ ¡Todo cargado! Tu sistema está ahora en 460 boletos.");
    process.exit();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
cargar();
