import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

async function extraer() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const db = mongoose.connection.db.collection('tickets');
    
    // 1. Traer TODOS los vendidos (los casi 500)
    const boletos = await db.find({ estado: 'vendido' }).toArray();
    
    // 2. Extraer solo los nombres
    const todosLosNombres = boletos.map(b => b.nombre_completo || b.comprador);
    
    // 3. Filtrar repetidos usando un Set (Magia pura)
    const nombresUnicos = [...new Set(todosLosNombres)];
    
    // 4. Limpiar nombres vacíos o nulos por si acaso
    const listaFinal = nombresUnicos.filter(n => n && n.trim().length > 0);

    console.log("----- COPIA DESDE EL CORCHETE -----");
    console.log(JSON.stringify(listaFinal));
    console.log("----- HASTA EL CORCHETE -----");
    console.log(`\n✅ Se encontraron ${boletos.length} boletos vendidos.`);
    console.log(`✨ Se extrajeron ${listaFinal.length} Héroes únicos.`);
    
    process.exit();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
extraer();
