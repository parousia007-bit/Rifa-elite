import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const data = [
  // Lista Adalina Silvestre (Serie P)
  {s:'P', n:3, nom:'Dra Denia Juárez Arroyo'}, {s:'P', n:5, nom:'Dra Denia Juárez Arroyo'},
  {s:'P', n:7, nom:'Dra Denia Juárez Arroyo'}, {s:'P', n:8, nom:'Dra Denia Juárez Arroyo'},
  {s:'P', n:10, nom:'Dra Denia Juárez Arroyo'}, {s:'P', n:11, nom:'Sonia Gonzalez Molina'},
  {s:'P', n:1, nom:'Betzaida marroquín cabrera'}, {s:'P', n:2, nom:'Betzaida marroquín cabrera'},
  {s:'P', n:4, nom:'Betzaida marroquín cabrera'}, {s:'P', n:6, nom:'Betzaida marroquín cabrera'},
  {s:'P', n:9, nom:'Betzaida marroquín cabrera'}, {s:'P', n:12, nom:'Betzaida marroquín cabrera'},

  // Familia Flores Vazquez (Serie I)
  ...Array.from({length: 12}, (_, i) => ({s:'I', n: 52 + i, nom:'familia flores Vazquez'})),

  // Serie E (Extracción de imágenes)
  {s:'E', n:35, nom:'Arminda Gómez Velazquez'}, {s:'E', n:36, nom:'Eliud Moises Morales Vazquez', t:'7137540862'},
  {s:'E', n:37, nom:'Sara G. Díaz Vazquez', t:'9616068024'}, {s:'E', n:38, nom:'Allisson Roblero Zunún'},
  {s:'E', n:39, nom:'Sara G. Díaz Vazquez', t:'9616068024'}, {s:'E', n:40, nom:'Allisson Roblero Zunún'},
  {s:'E', n:41, nom:'Kevin Moises Morales Lugo'}, {s:'E', n:43, nom:'Allisson Roblero Zunún', t:'5027358586'},
  {s:'E', n:44, nom:'Maria de Jesus Cruz Rizo'}, {s:'E', n:45, nom:'Allisson Roblero Zunún', t:'5027358586'},
  {s:'E', n:46, nom:'Martha E. Villanueva Dominguez', t:'9611191311'}, {s:'E', n:48, nom:'Gelmi Maria May Mex', t:'9994092714'},
  {s:'E', n:50, nom:'Allisson Roblero Zunún', t:'5027358586'}, {s:'E', n:53, nom:'Eliud Moises Morales Vazquez', t:'7137540862'},
  {s:'E', n:54, nom:'Julián Coutiño Mijangos', t:'4618845308'}, {s:'E', n:55, nom:'Allisson Roblero Zunún', t:'5027358586'},
  {s:'E', n:56, nom:'Caleb Morales Zunún', t:'9612202296'}, {s:'E', n:57, nom:'Allisson Roblero Zunún', t:'5027358586'},
  {s:'E', n:58, nom:'Victor Zunún Roblero', t:'9612460985'}, {s:'E', n:59, nom:'Adriana Santiz Lopez', t:'9612748632'},
  {s:'E', n:62, nom:'Celiflor Zunún Morales', t:'9612202296'}, {s:'E', n:63, nom:'Yolanda Velazquez Jacob', t:'9621357912'},
  {s:'E', n:64, nom:'Yolanda Velazquez Jacob', t:'9621357912'}, {s:'E', n:69, nom:'Allisson Roblero Zunún', t:'5027358586'},
  {s:'E', n:70, nom:'Judith Zunún Morales', t:'9181073698'}, {s:'E', n:71, nom:'Sara G. Díaz Vazquez', t:'9616068024'},
  {s:'E', n:73, nom:'Yolanda Velazquez Jacob', t:'9621357912'}, {s:'E', n:77, nom:'Norma P. Santiz Gomez', t:'9611005999'},
  {s:'E', n:78, nom:'Sara G. Díaz Vazquez', t:'9616068024'}, {s:'E', n:79, nom:'Juan E. Ávila Sanchez', t:'9612892069'},

  // Serie F (Extracción de imágenes)
  {s:'F', n:51, nom:'Kevin Alvarez Hernandez', t:'9611788527'}, {s:'F', n:54, nom:'Ing. Victor Hechegaray', t:'5525765065'},
  {s:'F', n:60, nom:'Ing. Victor Hechegaray', t:'5525165065'}, {s:'F', n:71, nom:'Kevin Alvarez Hernandez', t:'9611788527'},
  {s:'F', n:72, nom:'Sandra Karina Hernandez', t:'9611788527'}, {s:'F', n:73, nom:'Osiel Alvarez Villarreal', t:'9381811074'},
  {s:'F', n:74, nom:'Teresa Alvarez Villarreal', t:'9934056583'}, {s:'F', n:77, nom:'Alexis Morales', t:'9613221223'},
  {s:'F', n:78, nom:'Jesus Emmanuel Alvarez Villarreal', t:'5951148185'}, {s:'F', n:79, nom:'Osiel Alvarez Villarreal', t:'9381811074'},

  // Serie G y K
  {s:'G', n:2, nom:'Maria Eneyda Alvarez V', t:'9931113485'}, {s:'G', n:3, nom:'Maria Eneyda Alvarez Villarreal', t:'9931113485'},
  {s:'K', n:40, nom:'dra laura castañon arroyo'}, {s:'K', n:41, nom:'dra laura v castañon arroyo'},
  {s:'K', n:44, nom:'jesus de los santos'}, {s:'K', n:46, nom:'jesus de los santos'}
];

async function update() {
  await mongoose.connect(process.env.MONGO_URI);
  const db = mongoose.connection.db.collection('tickets');
  for (let item of data) {
    await db.updateOne(
      { serie: item.s, numero: item.n },
      { $set: { estado: 'vendido', nombre_completo: item.nom, comprador: item.nom, telefono: item.t || '' } }
    );
    console.log(`✅ Actualizado ${item.s}-${item.n}`);
  }
  console.log("\n🚀 ¡Actualización masiva completada con éxito!");
  process.exit();
}
update();
