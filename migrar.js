const fs = require('fs-extra');

const oldPath = '../restaurado/RifaBot/data/boletos.json';
const newPath = './data/boletos.json';

async function migrar() {
    const oldData = await fs.readJson(oldPath);
    const newData = {};
    const series = "ABCDEFGHIJKLMNOPQRS".split(""); // 19 Series

    series.forEach(letra => {
        let fuente = letra === 'A' ? (oldData.A2 || oldData.A) : oldData[letra];
        
        // Creamos la serie limpia de 79 boletos
        newData[letra] = Array.from({ length: 79 }, (_, i) => {
            const num = i + 1;
            const boletoExistente = fuente ? fuente.find(b => b.numero === num) : null;

            return {
                numero: num,
                estado: boletoExistente ? boletoExistente.estado : "disponible",
                comprador: boletoExistente ? boletoExistente.comprador : null,
                nombre_completo: boletoExistente ? boletoExistente.nombre_completo : null,
                telefono: boletoExistente ? boletoExistente.telefono : null
            };
        });
    });

    await fs.outputJson(newPath, newData, { spaces: 2 });
    console.log("✅ Migración completa: 1501 boletos organizados (A-S)");
}

migrar();
