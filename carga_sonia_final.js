import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const boletosSonia = [
  {s:'K', n:73, nom:'Sonia Velazquez', t:'9612341212'},
  {s:'K', n:75, nom:'Sonia Velazquez', t:'9612341212'},
  {s:'K', n:77, nom:'Sonia Velazquez', t:'9612341212'}
];

async function cargar() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const db = mongoose.connection.db.collection('tickets');
    console.log("🚀 Registrando boletos faltantes de Sonia Velazquez...");
    
    for (let b of boletosSonia) {
      await db.updateOne(
        { serie: b.s, numero: b.n },
        { $set: { estado: 'vendido', nombre_completo: b.nom, comprador: b.nom, telefono: b.t } }
      );
    }
    
    console.log("✅ ¡Sonia Velazquez agregada! Ahora la lista está completa.");
    process.exit();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
cargar();
