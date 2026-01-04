import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const uriBase = process.env.MONGO_URI.split('?')[0].split('.net/')[0] + '.net/';
const opciones = "?retryWrites=true&w=majority&appName=Cluster0";

async function probar(dbName) {
    const uri = `${uriBase}${dbName}${opciones}`;
    try {
        const conn = await mongoose.createConnection(uri).asPromise();
        const Ticket = conn.model('Ticket', new mongoose.Schema({}, { strict: false }));
        
        // Intentamos marcar el B6 en esta base de datos específica
        const res = await Ticket.updateOne(
            { serie: 'B', numero: 6 },
            { $set: { estado: 'vendido', comprador: 'SEBASTIAN_MARTINEZ_TEST', nombre_completo: 'Sebastian Martinez' } }
        );
        
        if (res.modifiedCount > 0) {
            console.log(`🎯 ¡ÉXITO! El cambio se hizo en la base de datos: "${dbName}"`);
            return true;
        }
        await conn.close();
    } catch (e) { return false; }
    return false;
}

async function iniciar() {
    console.log("🔍 Buscando la carpeta correcta en MongoDB...");
    // Probamos las 3 carpetas más comunes que pudo crear tu script
    if (await probar('test')) console.log("Refresca el Admin y busca el B6.");
    else if (await probar('rifa')) console.log("Refresca el Admin y busca el B6.");
    else if (await probar('RifaLael')) console.log("Refresca el Admin y busca el B6.");
    else console.log("❌ No se encontró la carpeta activa. Verifica la URI en Render.");
    process.exit();
}
iniciar();
