import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const listaAExamen = [
  {s:'K', n:73, nom:'Sonia Velazquez'}, {s:'K', n:74, nom:'Sandy Alexia'},
  {s:'K', n:75, nom:'Sonia Velazquez'}, {s:'K', n:76, nom:'Ronay Ithiel'},
  {s:'K', n:77, nom:'Sonia Velazquez'}, {s:'K', n:79, nom:'Sandy Alexia'},
  {s:'L', n:2, nom:'Sandy Alexia'}, {s:'L', n:4, nom:'Sandy Alexia'}
];

async function revisar() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const db = mongoose.connection.db.collection('tickets');
    console.log("🕵️ Analizando estado de Sonia y Alexia en la DB...\n");

    for (let b of listaAExamen) {
      const doc = await db.findOne({ serie: b.s, numero: b.n });
      if (doc && doc.estado === 'vendido') {
        console.log(`✅ ${b.s}-${b.n}: REGISTRADO a nombre de: ${doc.nombre_completo}`);
      } else {
        console.log(`❌ ${b.s}-${b.n}: NO ENCONTRADO (Debería ser: ${b.nom})`);
      }
    }
    process.exit();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
revisar();
