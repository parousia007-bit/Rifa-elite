import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const boletosE = [
  {n:2, nom:'José TKD'}, {n:3, nom:'Alexa'}, {n:5, nom:'Angeles Monte'},
  {n:6, nom:'Liliana TKD'}, {n:8, nom:'Adriana Gómez'}, {n:9, nom:'Ismael Rodríguez'},
  {n:11, nom:'Josué David Jacob'}, {n:14, nom:'Angeles Monte'}, {n:15, nom:'Fredy Mayorga'},
  {n:18, nom:'Carolina Cáceres'}, {n:19, nom:'Andrea Jacob'}, {n:20, nom:'Ismael Rodríguez'},
  {n:21, nom:'Sarai Ojeda'}, {n:22, nom:'Angeles Monte'}, {n:23, nom:'Doris (esposo Galán)'},
  {n:25, nom:'Marcela Getsemani'}, {n:26, nom:'Doris (esposo Galán)'}, {n:27, nom:'Ismael Rodríguez'},
  {n:28, nom:'Jacobo Getsemani'}, {n:29, nom:'Fredy Mayorga'}, {n:30, nom:'Doris (esposo Galán)'},
  {n:31, nom:'Ismael Rodríguez'}, {n:32, nom:'Angeles Montes'}, {n:33, nom:'Alex Jacob'},
  {n:34, nom:'Doris (esposo Galán)'}
];

async function cargar() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const db = mongoose.connection.db.collection('tickets');
    console.log("⏳ Actualizando boletos Serie E...");
    for (let b of boletosE) {
      await db.updateOne(
        { serie: 'E', numero: b.n },
        { $set: { estado: 'vendido', nombre_completo: b.nom, comprador: b.nom, telefono: '' } }
      );
    }
    console.log("✅ ¡Serie E actualizada! 25 boletos añadidos.");
    process.exit();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
cargar();
