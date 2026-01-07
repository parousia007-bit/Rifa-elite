import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

async function liberar() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const db = mongoose.connection.db.collection('tickets');

    const boletosPrueba = [
      { s: 'A', n: 79 },
      { s: 'S', n: 79 }
    ];

    for (let b of boletosPrueba) {
      const res = await db.updateOne(
        { serie: b.s, numero: b.n },
        { 
          $set: { 
            estado: 'disponible', 
            nombre_completo: null, 
            comprador: null, 
            telefono: null 
          } 
        }
      );
      if (res.matchedCount > 0) {
        console.log(`✅ Boleto ${b.s}${b.n} liberado correctamente.`);
      }
    }

    console.log("\n✨ Base de datos limpia y lista.");
    process.exit();
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}
liberar();
