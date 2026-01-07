import fs from 'fs';

const db = JSON.parse(fs.readFileSync('./db_actual.json', 'utf8'));

// Lista completa basada en tus mensajes anteriores
const listaAValidar = [
    // Serie A
    {s:'A', n:2, nom:'Yuri alvarez'}, {s:'A', n:3, nom:'Maricarmen tello'}, {s:'A', n:4, nom:'David trujillo'},
    {s:'A', n:5, nom:'Maybeth martinez'}, {s:'A', n:6, nom:'Michelle guillen molina'}, {s:'A', n:8, nom:'Maybeth martinez'},
    {s:'A', n:9, nom:'Marta cristel mora gonzales'}, {s:'A', n:10, nom:'Arik guillen molina'}, {s:'A', n:11, nom:'Luis arturo'},
    {s:'A', n:12, nom:'Dalia molina perez'}, {s:'A', n:14, nom:'Fany lopez pacheco'}, {s:'A', n:15, nom:'Maria saira sanchez santiago'},
    {s:'A', n:16, nom:'Alejandro tello'}, {s:'A', n:17, nom:'Anabey guillen pacheco'}, {s:'A', n:18, nom:'Abraham eduardo goez espinoza'},
    {s:'A', n:19, nom:'Gael rodriguez samayoa'}, {s:'A', n:21, nom:'Gabriel mazariegos'}, {s:'A', n:22, nom:'Elena vazquez'},
    {s:'A', n:23, nom:'Leticia villanueva'}, {s:'A', n:24, nom:'Eliut moises morales'}, {s:'A', n:25, nom:'Kevin moises montes lugo'},
    {s:'A', n:27, nom:'Alisson roblero zunun'}, {s:'A', n:29, nom:'Maybeth martinez'}, {s:'A', n:31, nom:'Maybeth martinez'},
    {s:'A', n:33, nom:'Lisbeth molina solis'}, {s:'A', n:35, nom:'Arminda'}, {s:'A', n:37, nom:'Yuli mandujano'},
    {s:'A', n:38, nom:'antonio martinez'}, {s:'A', n:40, nom:'Elena vazquez'}, {s:'A', n:44, nom:'Alisson roblero zunun'},
    {s:'A', n:46, nom:'Alexander samayoa salas'}, {s:'A', n:47, nom:'Yuli mandujano'}, {s:'A', n:49, nom:'Alisson roblero zunun'},
    {s:'A', n:53, nom:'Lizveth molina solis'}, {s:'A', n:57, nom:'Yuli mandujano'}, {s:'A', n:66, nom:'Gloria mejia hernandez'},
    {s:'A', n:67, nom:'Yuli mandujano'}, {s:'A', n:76, nom:'Hector perez nango'}, {s:'A', n:77, nom:'Kevin M. montes lugo'},
    // Serie B
    {s:'B', n:1, nom:'Kevin moises morales luego'}, {s:'B', n:2, nom:'Alicia sanchez matias'}, {s:'B', n:3, nom:'Isabel villatoro'},
    {s:'B', n:5, nom:'Alisson roblero zunun'}, {s:'B', n:33, nom:'sara villatoro'}, {s:'B', n:35, nom:'alisson roblero zunun'},
    {s:'B', n:37, nom:'Hector perez nango'}, {s:'B', n:50, nom:'Alisson roblero zunun'}, {s:'B', n:58, nom:'Alisson roblero zunun'},
    {s:'B', n:62, nom:'yuli mandujano'}, {s:'B', n:67, nom:'aylen guadalupe espinoza chanon'}, {s:'B', n:70, nom:'alisson roblero'},
    {s:'B', n:71, nom:'eliut moises morales vazquez'}, {s:'B', n:77, nom:'sara villatoro'},
    // Serie C
    {s:'C', n:3, nom:'Alisson roblero zunun'}, {s:'C', n:6, nom:'Ceci garcia'}, {s:'C', n:7, nom:'eliut moises morales vazquez'},
    {s:'C', n:8, nom:'sofia gualupe espinoza'}, {s:'C', n:11, nom:'alisson roblero zunun'}, {s:'C', n:13, nom:'jaris gomez cruz'},
    {s:'C', n:14, nom:'eliut moises morales'}, {s:'C', n:15, nom:'ceci garcia'}, {s:'C', n:16, nom:'mitzi de la cruz pineda'},
    {s:'C', n:17, nom:'alisson roblero'}, {s:'C', n:22, nom:'sofia elizabeth flores'}, {s:'C', n:23, nom:'alissia sanchez matias'},
    {s:'C', n:28, nom:'alisson roblero zunun'}, {s:'C', n:29, nom:'hector perez nango'}, {s:'C', n:30, nom:'eliut morales vazquez'},
    {s:'C', n:39, nom:'alisson roblero perez'}, {s:'C', n:45, nom:'mariana leon'}, {s:'C', n:50, nom:'eliut morales vazquez'},
    {s:'C', n:59, nom:'sandra luz roblero'}, {s:'C', n:62, nom:'alisson roblero zunun'}, {s:'C', n:64, nom:'diana valeria reyes santiz'},
    {s:'C', n:77, nom:'mitzi de la cruz'}, {s:'C', n:78, nom:'alisson roblero zunun'},
    // Series G, H, I
    {s:'G', n:19, nom:'veronica jazmin cruz'}, {s:'G', n:63, nom:'martha jazmin jandete'}, {s:'G', n:23, nom:'jose daniel perez borrallas'},
    {s:'G', n:35, nom:'jose daniel perez borrallas'}, {s:'G', n:36, nom:'jesus vazquez de paz'}, {s:'G', n:37, nom:'jesus vazquez de paz'},
    {s:'G', n:38, nom:'jesus vazquez de paz'}, {s:'G', n:39, nom:'jesus vazquez de paz'},
    {s:'H', n:5, nom:'Melani carolina montero'}, {s:'H', n:8, nom:'Martha jazmin jandete'}, {s:'H', n:7, nom:'karla nicole montero'},
    {s:'H', n:9, nom:'dulce sofia lopez'}, {s:'H', n:71, nom:'cesar alfonzo jimez'}, {s:'H', n:23, nom:'karla nallely aguilar'},
    {s:'H', n:79, nom:'alejandro roblero'}, {s:'H', n:69, nom:'isabel ramirez'}, {s:'H', n:76, nom:'isabel ramirez'},
    {s:'H', n:15, nom:'joaquina moralez'}, {s:'H', n:59, nom:'zaya roblero'},
    {s:'I', n:3, nom:'valeria josabet gallegos'}, {s:'I', n:7, nom:'eduardo benjamin'},
    // Serie K (Maestras)
    {s:'K', n:49, nom:'Maestra Nelly'}, {s:'K', n:50, nom:'MTRA Alondra'}, {s:'K', n:51, nom:'Maestra Nelly'},
    {s:'K', n:52, nom:'Mtra Nelly'}, {s:'K', n:53, nom:'Mtro Brayan'}, {s:'K', n:54, nom:'MTRA Nelly'},
    {s:'K', n:55, nom:'Mtra Lupita'}, {s:'K', n:56, nom:'Psico. Alfonso'}, {s:'K', n:57, nom:'MTRA Deysi'},
    {s:'K', n:58, nom:'Mtra Karla'}, {s:'K', n:59, nom:'MTRA Azucena'}, {s:'K', n:60, nom:'Mtra Lupita'}
];

// Añadir rango Sebastian B06-B29
for(let i=6; i<=29; i++) listaAValidar.push({s:'B', n:i, nom:'sebastian martinez'});

console.log("\n--- VERIFICACIÓN FINAL DE VISIBILIDAD EN LA WEB ---");
let totalCorrectos = 0;
let totalFaltantes = 0;

listaAValidar.forEach(item => {
    const enDB = db.find(d => d.serie === item.s && d.numero === item.n && d.estado === 'vendido');
    if (enDB) {
        totalCorrectos++;
    } else {
        console.log(`❌ NO VISIBLE: ${item.s}${item.n} (${item.nom})`);
        totalFaltantes++;
    }
});

console.log(`\n📊 RESULTADO FINAL:`);
console.log(`✅ VISIBLES: ${totalCorrectos}`);
console.log(`⚠️ FALTANTES: ${totalFaltantes}`);
if(totalFaltantes === 0) console.log("\n¡Felicidades! Todos tus boletos ya están en la nube y listos para el sorteo.");
process.exit();
