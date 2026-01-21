import mongoose from 'mongoose';

const boletoSchema = new mongoose.Schema({
  serie: { type: String, required: true },
  numero: { type: Number, required: true },
  estado: { type: String, default: 'libre' }, // libre, apartado, vendido
  nombre_completo: String,
  comprador: String,
  telefono: String,
  fecha_compra: Date
}, { collection: 'tickets' }); // Force collection name to 'tickets' in 'test' db (db defined in connection)

export default mongoose.model('Boleto', boletoSchema);
