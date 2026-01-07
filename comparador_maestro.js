import fs from 'fs';

// Cargamos la DB que acabas de extraer
const dbActual = JSON.parse(fs.readFileSync('./db_actual.json', 'utf8'));

// Tu lista manual (107+ registros) normalizada para comparar
const listaManual = [
    {s:'A', n:2, nom:'Yuri alvarez'}, {s:'A', n:3, nom:'Maricarmen tello'},
    {s:'A', n:4, nom:'David trujillo'}, {s:'A', n:5, nom:'Maybeth martinez'},
    {s:'A', n:6, nom:'Michelle guillen molina'}, {s:'A', n:8, nom:'Maybeth martinez'},
    {s:'A', n:9, nom:'Marta cristel mora gonzales'}, {s:'A', n:10, nom:'Arik guillen molina'},
    {s:'A', n:11, nom:'Luis arturo'}, {s:'A', n:12, nom:'Dalia molina perez'},
    {s:'A', n:14, nom:'Fany lopez pacheco'}, {s:'A', n:15, nom:'Maria saira sanchez santiago'},
    {s:'A', n:16, nom:'Alejadro tello'}, {s:'A', n:17, nom:'Anabey guillen pacheco'},
    {s:'A', n:18, nom:'Abraham eduardo goez espinoza'}, {s:'A', n:19, nom:'Gael rodriguez samayoa'},
    {s:'A', n:21, nom:'Gabriel mazariegos'}, {s:'A', n:22, nom:'Elena vazquez'},
    {s:'A', n:23, nom:'Leticia villanueva'}, {s:'A', n:24, nom:'Eliut moises morales'},
    {s:'A', n:25, nom:'Kevin moises montes lugo'}, {s:'A', n:27, nom:'Alisson roblero zunun'},
    {s:'A', n:29, nom:'Maybeth martinez'}, {s:'A', n:31, nom:'Maybeth martinez'},
    {s:'A', n:33, nom:'Lisbeth molina solis'}, {s:'A', n:35, nom:'Arminda'},
    {s:'A', n:37, nom:'Yuli mandujano'}, {s:'A', n:38, nom:'antonio martinez'},
    {s:'A', n:40, nom:'Elena vazquez'}, {s:'A', n:44, nom:'Alisson roblero zunun'},
    {s:'A', n:46, nom:'Alexander samayoa salas'}, {s:'A', n:47, nom:'Yuli mandujano'},
    {s:'A', n:49, nom:'Alisson roblero zunun'}, {s:'A', n:53, nom:'Lizveth molina solis'},
    {s:'A', n:57, nom:'Yuli mandujano'}, {s:'A', n:66, nom:'Gloria mejia hernandez'},
    {s:'A', n:67, nom:'Yuli mandujano'}, {s:'A', n:76, nom:'Hector perez nango'},
    {s:'A', n:77, nom:'Kevin M. montes lugo'},
    // Serie B
    {s:'B', n:1, nom:'Kevin moises morales luego'}, {s:'B', n:2, nom:'Alicia sanchez matias'},
    {s:'B', n:3, nom:'Isabel villatoro'}, {s:'B', n:5, nom:'Alisson roblero zunun'},
    {s:'B', n:33, nom:'sara villatoro'}, {s:'B', n:35, nom:'alisson roblero zunun'},
    {s:'B', n:37, nom:'Hector perez nango'}, {s:'B', n:50, nom:'Alisson roblero zunun'},
    {s:'B', n:58, nom:'Alisson roblero zunun'}, {s:'B', n:62, nom:'yuli mandujano'},
    {s:'B', n:67, nom:'aylen guadalupe espinoza chanon'}, {s:'B', n:70, nom:'alisson roblero'},
    {s:'B', n:71, nom:'eliut moises morales vazquez'}, {s:'B', n:77, nom:'sara villatoro'},
    // Serie C, G, H, I, K
    {s:'C', n:3, nom:'Alisson roblero zunun'}, {s:'C', n:16, nom:'mitzi de la cruz pineda'},
    {s:'K', n:49, nom:'Maestra Nelly'}, {s:'K', n:50, nom:'MTRA Alondra'}
];

// Agregar rango Sebastian B06-B29
for(let i=6; i<=29; i++) listaManual.push({s:'B', n:i, nom:'sebastian martinez'});

console.log("\n--- REPORTE DE AUDITORÍA (LISTA VS MONGODB) ---");

let discrepancias = 0;
let faltantes = 0;

listaManual.forEach(m => {
    const enDB = dbActual.find(db => db.serie === m.s && db.numero === m.n);
    if (enDB) {
        if (enDB.nombre_completo.toLowerCase() !== m.nom.toLowerCase()) {
            console.log(`❌ DISCREPANCIA EN ${m.s}${m.n}:`);
            console.log(`   Manual: "${m.nom}" | DB: "${enDB.nombre_completo}"`);
            discrepancias++;
        }
    } else {
        console.log(`➕ FALTANTE EN DB: ${m.s}${m.n} (${m.nom})`);
        faltantes++;
    }
});

console.log(`\n📊 Resumen: ${discrepancias} Discrepancias | ${faltantes} Faltantes.`);
process.exit();
