import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const boletosL = [
  {n:6, nom:'Mario J. Roblero Bravo', t:'9621679984'}, {n:7, nom:'Alma Yadira Gonzalez Mateo', t:'9631881476'},
  {n:8, nom:'Ernesto Ortiz Rivas', t:'9621152875'}, {n:9, nom:'Flavia Rivas Reynoso', t:'9621152875'},
  {n:10, nom:'Nehemias Malia Pérez', t:'9621333967'}, {n:11, nom:'Ethel J. Roblero Mateo', t:'9621679984'},
  {n:12, nom:'Luisa Nayeli Ortiz Espi', t:'9621903695'}, {n:13, nom:'José Manuel Arellano R.', t:'9622511376'},
  {n:14, nom:'Laura Y. Mateo Velazquez', t:'9621679984'}, {n:15, nom:'Vilza Perez Roblero', t:'9676963187'},
  {n:16, nom:'Oliver Escobar Hernandez', t:'9632517371'}, {n:17, nom:'Claudia Pilar Lopez Pizabal', t:'9621903695'},
  ...Array.from({length:6}, (_,i)=>({n:18+i, nom:'Meyli S. Mateo Velazquez', t:'9621357912'})),
  ...Array.from({length:6}, (_,i)=>({n:24+i, nom:'Maryoli X. Mateo Velazquez', t:'9621357912'})),
  {n:30, nom:'Meyli Saylin Mateo Velazquez', t:'9624211915'}, {n:31, nom:'Thiago R. Mateo Silva', t:'9624211915'},
  {n:32, nom:'Maryoli X. Mateo Velazquez', t:'9624211915'}, {n:33, nom:'Harvey E. Mateo Velazquez', t:'9985605921'},
  {n:34, nom:'Asher G. Mateo Velazquez', t:'9624211915'}, {n:35, nom:'Rafael R. Mateo Velazquez', t:'4752870667'},
  {n:36, nom:'Ithan G. Roblero Mateo', t:'9624211915'}, {n:37, nom:'Reyli Diaz Pérez', t:'9626963181'},
  {n:38, nom:'Rodrigo Ramos Mateo', t:'9624211915'}, {n:39, nom:'Nahum J. Mateo Velazquez', t:'9622141529'},
  {n:40, nom:'Isaac Hernandez Mateo', t:'9624211915'}, {n:41, nom:'Yuni N. Mateo Velazquez', t:'6644154541'}
];

async function cargar() {
  await mongoose.connect(process.env.MONGO_URI);
  const db = mongoose.connection.db.collection('tickets');
  console.log("⏳ Cargando 36 boletos de la Serie L...");
  for (let b of boletosL) {
    await db.updateOne(
      { serie: 'L', numero: b.n },
      { $set: { estado: 'vendido', nombre_completo: b.nom, comprador: b.nom, telefono: b.t } }
    );
  }
  console.log("✅ Serie L actualizada con éxito.");
  process.exit();
}
cargar();
