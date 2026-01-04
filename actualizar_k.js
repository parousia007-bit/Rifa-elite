import fs from 'fs-extra';

async function actualizar() {
    try {
        const path = './data/tickets.json';
        const data = await fs.readJson(path);
        
        const ventasK = {
            49: "Maestra Nelly", 50: "MTRA Alondra", 51: "Maestra Nelly",
            52: "Mtra Nelly", 53: "Mtro Brayan", 54: "MTRA Nelly",
            55: "Mtra Lupita", 56: "Psico. Alfonso", 57: "MTRA Deysi",
            58: "Mtra Karla", 59: "MTRA Azucena", 60: "Mtra Lupita"
        };

        Object.keys(ventasK).forEach(num => {
            const index = data.K.findIndex(b => b.numero == num);
            if (index !== -1) {
                data.K[index].estado = "vendido";
                data.K[index].nombre_completo = ventasK[num];
            }
        });

        await fs.writeJson(path, data, { spaces: 2 });
        console.log("✅ DATOS DE SERIE K ACTUALIZADOS");
    } catch (err) {
        console.error("❌ Error:", err);
    }
}
actualizar();
