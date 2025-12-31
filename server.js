import express from 'express';
import fs from 'fs-extra';
import path from 'path';
const app = express();
app.use(express.json());
app.use(express.static('public'));

const DATA_PATH = './data/boletos.json';

// Obtener todos los boletos
app.get('/api/boletos', async (req, res) => {
    const data = await fs.readJson(DATA_PATH);
    res.json(data);
});

// Comprar/Apartar boleto
app.post('/api/comprar', async (req, res) => {
    const { serie, numero, nombre, telefono } = req.body;
    const data = await fs.readJson(DATA_PATH);
    const idx = data[serie].findIndex(b => b.numero == numero);
    if (data[serie][idx].estado === 'disponible') {
        data[serie][idx] = { ...data[serie][idx], estado: 'vendido', nombre_completo: nombre, telefono: telefono };
        await fs.writeJson(DATA_PATH, data, { spaces: 2 });
        res.json({ success: true });
    } else {
        res.status(400).send("Ya ocupado");
    }
});

// ACTUALIZAR BOLETO DESDE ADMIN (Corregir o Liberar)
app.post('/api/admin/update', async (req, res) => {
    const { password, serie, numero, nuevoNombre, nuevoEstado } = req.body;
    if (password !== "Lael2025") return res.status(401).send("No autorizado");
    
    const data = await fs.readJson(DATA_PATH);
    const idx = data[serie].findIndex(b => b.numero == numero);
    
    data[serie][idx].nombre_completo = nuevoNombre;
    data[serie][idx].estado = nuevoEstado; // 'vendido' o 'disponible'
    
    await fs.writeJson(DATA_PATH, data, { spaces: 2 });
    res.json({ success: true });
});

app.listen(3000, () => console.log("🚀 Servidor Rifa Lael Encendido"));
