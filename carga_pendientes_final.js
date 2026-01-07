import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const pendientes = [
  // Lo que faltó de la Serie E (2 al 34)
  {s:'E', n:2, nom:'José TKD'}, {s:'E', n:3, nom:'Alexa'}, {s:'E', n:5, nom:'Angeles Monte'},
  {s:'E', n:6, nom:'Liliana TKD'}, {s:'E', n:8, nom:'Adriana Gómez'}, {s:'E', n:9, nom:'Ismael Rodríguez'},
  {s:'E', n:11, nom:'Josué David Jacob'}, {s:'E', n:14, nom:'Angeles Monte'}, {s:'E', n:15, nom:'Fredy Mayorga'},
  {s:'E', n:18, nom:'Carolina Cáceres'}, {s:'E', n:19, nom:'Andrea Jacob'}, {s:'E', n:20, nom:'Ismael Rodríguez'},
  {s:'E', n:21, nom:'Sarai Ojeda'}, {s:'E', n:22, nom:'Angeles Monte'}, {s:'E', n:23, nom:'Doris (esposo Galán)'},
  {s:'E', n:25, nom:'Marcela Getsemani'}, {s:'E', n:26, nom:'Doris (esposo Galán)'}, {s:'E', n:27, nom:'Ismael Rodríguez'},
  {s:'E', n:28, nom:'Jacobo Getsemani'}, {s:'E', n:29, nom:'Fredy Mayorga'}, {s:'E', n:30, nom:'Doris (esposo Galán)'},
  {s:'E', n:31, nom:'Ismael Rodríguez'}, {s:'E', n:32, nom:'Angeles Montes'}, {s:'E', n:33, nom:'Alex Jacob'},
  {s:'E', n:34, nom:'Doris (esposo Galán)'},

  // Lo que se cortó del script anterior (E-62 al K-46)
  {s:'E', n:62, nom:'Celiflor Zunún Morales'}, {s:'E', n:63, nom:'Yolanda Velazquez Jacob'},
  {s:'E', n:64, nom:'Yolanda Velazquez Jacob'}, {s:'E', n:69, nom:'Allisson Roblero Zunún'},
  {s:'E', n:70, nom:'Judith Zunún Morales'}, {s:'E', n:71, nom:'Sara G. Díaz Vazquez'},
  {s:'E', n:73, nom:'Yolanda Velazquez Jacob'}, {s:'E', n:77, nom:'Norma P. Santiz Gomez'},
  {s:'E', n:78, nom:'Sara G. Díaz Vazquez'}, {s:'E', n:79, nom:'Juan E. Ávila Sanchez'},
  {s:'F', n:51, nom:'Kevin Alvarez Hernandez'}, {s:'F', n:54, nom:'Ing. Victor Hechegaray'},
  {s:'F', n:60, nom:'Ing. Victor Hechegaray'}, {s:'F', n:71, nom:'Kevin Alvarez Hernandez'},
  {s:'F', n:72, nom:'Sandra Karina Hernandez'}, {s:'F', n:73, nom:'Osiel Alvarez Villarreal'},
  {s:'F', n:74, nom:'Teresa Alvarez Villarreal'}, {s:'F', n:77, nom:'Alexis Morales'},
  {s:'F', n:78, nom:'Jesus Emmanuel Alvarez Villarreal'}, {s:'F', n:79, nom:'Osiel Alvarez Villarreal'},
  {s:'G', n:2, nom:'Maria Eneyda Alvarez V'}, {s:'G', n:3, nom:'Maria Eneyda Alvarez Villarreal'},
  {s:'K', n:40, nom:'dra laura castañon arroyo'}, {s:'K', n:41, nom:'dra laura v castañon arroyo'},
  {s:'K', n:44, nom:'jesus de los santos'}, {s:'K', n:46, nom:'jesus de los santos'}
];

async function update() {
  await mongoose.connect(process.env.MONGO_URI);
  const db = mongoose.connection.db.collection('tickets');
  console.log("🚀 Cargando boletos pendientes...");
  for (let item of pendientes) {
    await db.updateOne(
      { serie: item.s, numero: item.n },
      { $set: { estado: 'vendido', nombre_completo: item.nom, comprador: item.nom, telefono: '' } }
    );
  }
  console.log("✅ ¡Todo regularizado! Revisa tu panel ahora.");
  process.exit();
}
update();
