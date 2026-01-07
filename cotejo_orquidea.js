import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const boletosOrquidea = [
  {s:'I', n:65, nom:'Carolina Chanona Vázquez'},
  {s:'I', n:67, nom:'Dalia Grajales'},
  {s:'I', n:68, nom:'Violeta Vázquez'},
  {s:'I', n:71, nom:'Dulce Belén Chanona'},
  {s:'I', n:73, nom:'Rebeca Lazos'}
];

async function revisar() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const db = mongoose.connection.db.collection('tickets');
    console.log("🕵️ Verificando boletos de Orquídea Vázquez Grajales...\n");

    for (let b of boletosOrquidea) {
      const doc = await db.findOne({ serie: b.s, numero: b.n });
      if (doc && doc.estado === 'vendido') {
        console.log(`✅ ${b.s}-${b.n}: YA ESTÁ REGISTRADO a nombre de: ${doc.nombre_completo}`);
      } else {
        console.log(`❌ ${b.s}-${b.n}: NO ENCONTRADO (Debería ser para: ${b.nom})`);
      }
    }
    process.exit();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
revisar();
