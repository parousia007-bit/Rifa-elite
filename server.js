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

// Función para obtener y agrupar boletos
const getBoletosAgrupados = async () => {
  const tickets = await mongoose.connection.db.collection('tickets').find({}).toArray();
  return tickets.reduce((acc, t) => {
    if (!acc[t.serie]) acc[t.serie] = [];
    acc[t.serie].push(t);
    return acc;
  }, {});
};

app.get('/api/tickets', async (req, res) => {
  try {
    const agrupados = await getBoletosAgrupados();
    res.json(agrupados);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Duplicamos la ruta para que el frontend no falle si busca 'boletos'
app.get('/api/boletos', async (req, res) => {
  try {
    const agrupados = await getBoletosAgrupados();
    res.json(agrupados);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor Rifa Lael en puerto ${PORT}`));
