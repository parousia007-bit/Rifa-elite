import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const boletosAVerificar = [
  {s:'K', n:74}, {s:'K', n:76}, {s:'K', n:79}, {s:'L', n:2}, {s:'L', n:4}, // Sandy y Ronay
  {s:'K', n:37}, {s:'K', n:42}, {s:'K', n:48}, // Margarita y Claudia
  {s:'F', n:36}, {s:'F', n:53}, {s:'F', n:55}, {s:'F', n:56}, {s:'F', n:62}, 
  {s:'F', n:67}, {s:'F', n:69}, {s:'F', n:70}, {s:'F', n:75}, {s:'F', n:76},
  {s:'G', n:1}, {s:'G', n:4}, {s:'G', n:5}, {s:'E', n:42}
];

async function cotejar() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const db = mongoose.connection.db.collection('tickets');
    console.log("🔍 Cotejando con la base de datos...\n");
    
    let faltantes = 0;
    for (let b of boletosAVerificar) {
      const doc = await db.findOne({ serie: b.s, numero: b.n });
      if (doc && doc.estado === 'vendido') {
        console.log(`✅ ${b.s}-${b.n}: YA REGISTRADO (Comprador: ${doc.nombre_completo})`);
      } else {
        console.log(`❌ ${b.s}-${b.n}: DISCREPANCIA (Está libre en DB, pero aparece en fotos)`);
        faltantes++;
      }
    }
    
    console.log(`\n📊 Resultado: Se encontraron ${faltantes} boletos que faltan por subir.`);
    process.exit();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
cotejar();
