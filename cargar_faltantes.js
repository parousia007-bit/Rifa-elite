import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const faltantes = [
    {s:'G', n:23, nom:'jose daniel perez borrallas'}, {s:'G', n:35, nom:'jose daniel perez borrallas'},
    {s:'G', n:36, nom:'jesus vazquez de paz'}, {s:'G', n:37, nom:'jesus vazquez de paz'},
    {s:'G', n:38, nom:'jesus vazquez de paz'}, {s:'G', n:39, nom:'jesus vazquez de paz'},
    {s:'H', n:71, nom:'cesar alfonzo jimez'}, {s:'H', n:23, nom:'karla nallely aguilar'},
    {s:'H', n:79, nom:'alejandro roblero'}, {s:'H', n:69, nom:'isabel ramirez'},
    {s:'H', n:76, nom:'isabel ramirez'}, {s:'H', n:15, nom:'joaquina moralez'},
    {s:'H', n:59, nom:'zaya roblero'}, {s:'I', n:3, nom:'valeria josabet gallegos'},
    {s:'I', n:7, nom:'eduardo benjamin'}
];

async function cargar() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const db = mongoose.connection.db.collection('tickets');

    console.log("🚀 Iniciando carga de 15 boletos faltantes...");
    
    for (let item of faltantes) {
      const result = await db.updateOne(
        { serie: item.s, numero: item.n },
        { 
          $set: { 
            estado: 'vendido', 
            nombre_completo: item.nom, 
            comprador: item.nom 
          } 
        }
      );
      if(result.matchedCount > 0) {
        console.log(`✅ Actualizado: ${item.s}${item.n} -> ${item.nom}`);
      } else {
        console.log(`⚠️ No encontrado en DB: ${item.s}${item.n}`);
      }
    }
    
    console.log("\n✨ ¡Proceso terminado! Todos los boletos deberían ser visibles ahora.");
    process.exit();
  } catch (error) {
    console.error("❌ Error de conexión:", error);
    process.exit(1);
  }
}
cargar();
