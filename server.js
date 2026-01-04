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
  .then(() => console.log('✅ Conectado a MongoDB Atlas (Base de datos: test)'))
  .catch(err => console.error('❌ Error de conexión:', err));

app.get('/api/tickets', async (req, res) => {
  try {
    const tickets = await mongoose.connection.db.collection('tickets').find({}).toArray();
    // Transformamos la lista plana de 1501 tickets al formato por series
    const agrupados = tickets.reduce((acc, t) => {
      if (!acc[t.serie]) acc[t.serie] = [];
      acc[t.serie].push(t);
      return acc;
    }, {});
    res.json(agrupados);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/tickets', (req, res) => {
  res.redirect('/api/tickets');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor Rifa Lael en puerto ${PORT}`));
