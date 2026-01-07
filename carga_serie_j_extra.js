import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const boletosJExtra = [
  {n:21, nom:'Joel Soriano Arévalo'},
  {n:26, nom:'Cristopher Soriano Arévalo'},
  {n:32, nom:'Yeri de Jesús Soriano Arévalo'},
  {n:27, nom:'Sonia Edith Arévalo Flores'}
];

async function cargar() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const db = mongoose.connection.db.collection('tickets');
    console.log("⏳ Agregando boletos de la familia Soriano Arévalo...");
    for (let b of boletosJExtra) {
      await db.updateOne(
        { serie: 'J', numero: b.n },
        { $set: { estado: 'vendido', nombre_completo: b.nom, comprador: b.nom, telefono: '' } }
      );
    }
    console.log("✅ ¡Familia Soriano Arévalo agregada correctamente!");
    process.exit();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
cargar();
