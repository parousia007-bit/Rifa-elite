import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Boleto from './src/models/Boleto.js';
import Venta from './src/models/Venta.js';

dotenv.config();
const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(express.static('public'));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Conectado a MongoDB Atlas'))
  .catch(err => console.error('❌ Error de conexión:', err));

const getBoletosAgrupados = async () => {
  const tickets = await Boleto.find({}).lean();
  return tickets.reduce((acc, t) => {
    if (!acc[t.serie]) acc[t.serie] = [];
    acc[t.serie].push(t);
    return acc;
  }, {});
};

// SOPORTE PARA AMBAS RUTAS (Evita errores visuales)
app.get('/api/tickets', async (req, res) => {
  try {
    const agrupados = await getBoletosAgrupados();
    res.json(agrupados);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/boletos', async (req, res) => {
  try {
    const agrupados = await getBoletosAgrupados();
    res.json(agrupados);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// RUTA PARA PROCESAR LA COMPRA
app.post('/api/comprar', async (req, res) => {
  try {
    const { serie, numero, nombre, telefono } = req.body;

    const boleto = await Boleto.findOneAndUpdate(
      { serie: serie, numero: parseInt(numero) },
      { 
        $set: { 
          estado: 'vendido', 
          nombre_completo: nombre, 
          comprador: nombre,
          telefono: telefono,
          fecha_compra: new Date()
        } 
      },
      { new: true }
    );

    if (boleto) {
      // Registrar Venta
      await Venta.create({
        boleto_id: boleto._id,
        serie: boleto.serie,
        numero: boleto.numero,
        comprador_nombre: nombre,
        comprador_telefono: telefono
      });

      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Boleto no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`🚀 Servidor Rifa Lael listo en puerto ${PORT}`));
