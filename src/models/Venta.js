import mongoose from 'mongoose';

const ventaSchema = new mongoose.Schema({
  boleto_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Boleto' },
  serie: String,
  numero: Number,
  comprador_nombre: String,
  comprador_telefono: String,
  fecha: { type: Date, default: Date.now },
  monto: Number
}, { collection: 'ventas' }); // Force collection name to 'ventas' in 'test' db

export default mongoose.model('Venta', ventaSchema);
