import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(express.static('public'));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Conectado a MongoDB Atlas'))
  .catch(err => console.error('❌ Error de conexión:', err));

const getBoletosAgrupados = async () => {
  const tickets = await mongoose.connection.db.collection('tickets').find({}).toArray();
  return tickets.reduce((acc, t) => {
    if (!acc[t.serie]) acc[t.serie] = [];
    acc[t.serie].push(t);
    return acc;
  }, {});
};

// RUTA PARA VER BOLETOS
app.get('/api/tickets', async (req, res) => {
  try {
    const agrupados = await getBoletosAgrupados();
    res.json(agrupados);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// RUTA PARA PROCESAR LA COMPRA (¡La que faltaba!)
app.post('/api/comprar', async (req, res) => {
  try {
    const { serie, numero, nombre, telefono } = req.body;
    
    const result = await mongoose.connection.db.collection('tickets').updateOne(
      { serie: serie, numero: parseInt(numero) },
      { 
        $set: { 
          estado: 'vendido', 
          nombre_completo: nombre, 
          comprador: nombre,
          telefono: telefono 
        } 
      }
    );

    if (result.matchedCount > 0) {
      res.json({ success: true, message: '¡Boleto apartado con éxito!' });
    } else {
      res.status(404).json({ error: 'Boleto no encontrado.' });
    }
  } catch (error) {
    console.error('Error en compra:', error);
    res.status(500).json({ error: 'Error interno al procesar la compra.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor Rifa Lael en puerto ${PORT}`));
