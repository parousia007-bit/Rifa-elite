import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const boletos = [
  {n:4, nom:'Cindy Perez Chang', t:'9991378108'}, 
  {n:5, nom:'Wilberth Otoniel Dzul Naal', t:'9811073065'},
  {n:6, nom:'Alvaro Escamilla', t:'9811105437'}, 
  {n:7, nom:'Ramón Espejo Reyes', t:'9811290712'},
  {n:8, nom:'Gabriel Pech E.', t:'9811077611'}, 
  {n:9, nom:'Veronica Elizabeth Chi Rosado', t:'9811124013'},
  {n:10, nom:'Guillermo Matos E.', t:'9811476209'}, 
  {n:11, nom:'Martin Guerrero Castañeda', t:'9811008801'},
  {n:12, nom:'Guillermo Urbina', t:'9811297283'}, 
  {n:13, nom:'Veronica Elizabeth Chi Rosado', t:'9811124013'},
  {n:14, nom:'Rodrigo Garcia T.', t:'9811042399'}, 
  {n:15, nom:'Diana Chan Aguilar', t:'9811127991'}
];

async function cargar() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const db = mongoose.connection.db.collection('tickets');
    
    console.log("⏳ Cargando boletos de la Serie I...");
    
    for (let b of boletos) {
      await db.updateOne(
        { serie: 'I', numero: b.n },
        { 
          $set: { 
            estado: 'vendido', 
            nombre_completo: b.nom, 
            comprador: b.nom, 
            telefono: b.t 
          } 
        }
      );
    }
    
    console.log("✅ ¡Lista de la Serie I cargada y en línea!");
    process.exit();
  } catch (e) {
    console.error("❌ Error:", e);
    process.exit(1);
  }
}
cargar();
