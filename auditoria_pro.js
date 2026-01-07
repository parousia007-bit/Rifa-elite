import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const listaManual = [
  // Serie A
  { raw: 'a002', nombre: 'Yuri alvarez' }, { raw: 'a03', nombre: 'Maricarmen tello' },
  { raw: 'a04', nombre: 'David trujillo' }, { raw: '016', nombre: 'Alejadro tello' },
  { raw: '27', nombre: 'Alisson roblero zunun' },
  // Serie B
  { raw: 'B01', nombre: 'Kevin moises morales' }, { raw: 'B06', nombre: 'sebastian martinez' },
  // Serie K
  { raw: 'K49', nombre: 'Maestra Nelly' }, { raw: 'K050', nombre: 'MTRA Alondra' }
];

const procesarEntrada = (raw) => {
  const match = raw.toUpperCase().match(/([A-S])?(\d+)/);
  if (!match) return null;
  return {
    serie: match[1] || 'A', // Si no hay letra, por defecto es A
    numero: parseInt(match[2], 10) // Convierte "002" en 2
  };
};

async function auditoria() {
  await mongoose.connect(process.env.MONGO_URI);
  const db = mongoose.connection.db.collection('tickets');
  
  console.log("\n--- AUDITORÍA DE PRUEBA CRUZADA ---");
  for (let item of listaManual) {
    const info = procesarEntrada(item.raw);
    if (!info) continue;

    const encontrado = await db.findOne({ serie: info.serie, numero: info.numero });

    if (encontrado && encontrado.estado === 'vendido') {
      console.log(`✅ COINCIDE: ${info.serie}${info.numero} ya es de "${encontrado.nombre_completo}"`);
    } else {
      console.log(`⚠️ FALTANTE: ${info.serie}${info.numero} (${item.nombre}) NO está en la nube.`);
    }
  }
  process.exit();
}
auditoria();
