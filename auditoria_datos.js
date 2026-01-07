import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

// Tu lista manual normalizada
const listaManual = [
  { id: 'A02', nombre: 'Yuri alvarez' }, { id: 'A03', nombre: 'Maricarmen tello' },
  { id: 'A04', nombre: 'David trujillo' }, { id: 'A05', nombre: 'Maybeth martinez' },
  { id: 'A06', nombre: 'Michelle guillen molina' }, { id: 'A08', nombre: 'Maybeth martinez' },
  { id: 'A09', nombre: 'Marta cristel mora gonzales' }, { id: 'A10', nombre: 'Arik guillen molina' },
  { id: 'A11', nombre: 'Luis arturo' }, { id: 'A12', nombre: 'Dalia molina perez' },
  { id: 'A14', nombre: 'Fany lopez pacheco' }, { id: 'A15', nombre: 'Maria saira sanchez santiago' },
  { id: 'A16', nombre: 'Alejadro tello' }, { id: 'A17', nombre: 'Anabey guillen pacheco' },
  { id: 'A18', nombre: 'Abraham eduardo goez espinoza' }, { id: 'A19', nombre: 'Gael rodriguez samayoa' },
  { id: 'A21', nombre: 'Gabriel mazariegos' }, { id: 'A22', nombre: 'Elena vazquez' },
  { id: 'A23', nombre: 'Leticia villanueva' }, { id: 'A24', nombre: 'Eliut moises morales' },
  { id: 'A25', nombre: 'Kevin moises montes lugo' }, { id: 'A27', nombre: 'Alisson roblero zunun' },
  { id: 'A29', nombre: 'Maybeth martinez' }, { id: 'A31', nombre: 'Maybeth martinez' },
  { id: 'A33', nombre: 'Lisbeth molina solis' }, { id: 'A35', nombre: 'Arminda' },
  { id: 'A37', nombre: 'Yuli mandujano' }, { id: 'A38', nombre: 'antonio martinez' },
  { id: 'A40', nombre: 'Elena vazquez' }, { id: 'A44', nombre: 'Alisson roblero zunun' },
  { id: 'A46', nombre: 'Alexander samayoa salas' }, { id: 'A47', nombre: 'Yuli mandujano' },
  { id: 'A49', nombre: 'Alisson roblero zunun' }, { id: 'A53', nombre: 'Lizveth molina solis' },
  { id: 'A57', nombre: 'Yuli mandujano' }, { id: 'A66', nombre: 'Gloria mejia hernandez' },
  { id: 'A67', nombre: 'Yuli mandujano' }, { id: 'A76', nombre: 'Hector perez nango' },
  { id: 'A77', nombre: 'Kevin M. montes lugo' },
  // Serie B
  { id: 'B01', nombre: 'Kevin moises morales luego' }, { id: 'B02', nombre: 'Alicia sanchez matias' },
  { id: 'B03', nombre: 'Isabel villatoro' }, { id: 'B05', nombre: 'Alisson roblero zunun' },
  { id: 'B33', nombre: 'sara villatoro' }, { id: 'B35', nombre: 'alisson roblero zunun' },
  { id: 'B37', nombre: 'Hector perez nango' }, { id: 'B50', nombre: 'Alisson roblero zunun' },
  { id: 'B58', nombre: 'Alisson roblero zunun' }, { id: 'B62', nombre: 'yuli mandujano' },
  { id: 'B67', nombre: 'aylen guadalupe espinoza chanon' }, { id: 'B70', nombre: 'alisson roblero' },
  { id: 'B71', nombre: 'eliut moises morales vazquez' }, { id: 'B77', nombre: 'sara villatoro' },
  // Serie C
  { id: 'C03', nombre: 'Alisson roblero zunun' }, { id: 'C06', nombre: 'Ceci garcia' },
  { id: 'C07', nombre: 'eliut moises morales vazquez' }, { id: 'C08', nombre: 'sofia gualupe espinoza' },
  { id: 'C11', nombre: 'alisson roblero zunun' }, { id: 'C13', nombre: 'jaris gomez cruz' },
  { id: 'C14', nombre: 'eliut moises morales' }, { id: 'C15', nombre: 'ceci garcia' },
  { id: 'C16', nombre: 'mitzi de la cruz pineda' }, { id: 'C17', nombre: 'alisson roblero' },
  { id: 'C22', nombre: 'sofia elizabeth flores' }, { id: 'C23', nombre: 'alissia sanchez matias' },
  { id: 'C28', nombre: 'alisson roblero zunun' }, { id: 'C29', nombre: 'hector perez nango' },
  { id: 'C30', nombre: 'eliut morales vazquez' }, { id: 'C39', nombre: 'alisson roblero perez' },
  { id: 'C45', nombre: 'mariana leon' }, { id: 'C50', nombre: 'eliut morales vazquez' },
  { id: 'C59', nombre: 'sandra luz roblero' }, { id: 'C62', nombre: 'alisson roblero zunun' },
  { id: 'C64', nombre: 'diana valeria reyes santiz' }, { id: 'C77', nombre: 'mitzi de la cruz' },
  { id: 'C78', nombre: 'alisson roblero zunun' },
  // Series G, H, I, K
  { id: 'G19', nombre: 'veronica jazmin cruz' }, { id: 'G63', nombre: 'martha jazmin jandete' },
  { id: 'H05', nombre: 'Melani carolina montero' }, { id: 'H08', nombre: 'Martha jazmin jandete' },
  { id: 'H07', nombre: 'karla nicole montero' }, { id: 'H09', nombre: 'dulce sofia lopez' },
  { id: 'G23', nombre: 'jose daniel perez borrallas' }, { id: 'G35', nombre: 'jose daniel perez borrallas' },
  { id: 'G36', nombre: 'jesus vazquez de paz' }, { id: 'G37', nombre: 'jesus vazquez de paz' },
  { id: 'G38', nombre: 'jesus vazquez de paz' }, { id: 'G39', nombre: 'jesus vazquez de paz' },
  { id: 'H71', nombre: 'cesar alfonzo jimez' }, { id: 'H23', nombre: 'karla nallely aguilar' },
  { id: 'H79', nombre: 'alejandro roblero' }, { id: 'H69', nombre: 'isabel ramirez' },
  { id: 'H76', nombre: 'isabel ramirez' }, { id: 'H15', nombre: 'joaquina moralez' },
  { id: 'H59', nombre: 'zaya roblero' }, { id: 'I03', nombre: 'valeria josabet gallegos' },
  { id: 'I07', nombre: 'eduardo benjamin' },
  { id: 'K49', nombre: 'Maestra Nelly' }, { id: 'K50', nombre: 'MTRA Alondra' },
  { id: 'K51', nombre: 'Maestra Nelly' }, { id: 'K52', nombre: 'Mtra Nelly' },
  { id: 'K53', nombre: 'Mtro Brayan' }, { id: 'K54', nombre: 'MTRA Nelly' },
  { id: 'K55', nombre: 'Mtra Lupita' }, { id: 'K56', nombre: 'Psico. Alfonso' },
  { id: 'K57', nombre: 'MTRA Deysi' }, { id: 'K58', nombre: 'Mtra Karla' },
  { id: 'K59', nombre: 'MTRA Azucena' }, { id: 'K60', nombre: 'Mtra Lupita' }
];

// Añadir rango Sebastián Martínez B06-B29
for(let i=6; i<=29; i++) {
  listaManual.push({ id: `B${String(i).padStart(2, '0')}`, nombre: 'sebastian martinez' });
}

async function auditoria() {
  await mongoose.connect(process.env.MONGO_URI);
  const ticketsDB = await mongoose.connection.db.collection('tickets').find({ estado: 'vendido' }).toArray();
  
  const dbMap = new Map(ticketsDB.map(t => [t.id, t.nombre]));
  const listaMap = new Map(listaManual.map(l => [l.id, l.nombre]));

  console.log("\n--- RESULTADOS DE LA AUDITORÍA ---");
  
  let discrepancias = [];
  let faltantesEnDB = [];

  listaManual.forEach(item => {
    if (!dbMap.has(item.id)) {
      faltantesEnDB.push(item);
    } else if (dbMap.get(item.id).toLowerCase() !== item.nombre.toLowerCase()) {
      discrepancias.push({ id: item.id, db: dbMap.get(item.id), manual: item.nombre });
    }
  });

  console.log(`\n❌ DISCREPANCIAS (Mismo número, diferente nombre): ${discrepancias.length}`);
  discrepancias.forEach(d => console.log(`   ${d.id}: En DB está como "${d.db}" pero en tu lista es "${d.manual}"`));

  console.log(`\n➕ FALTANTES EN DB (Están en tu lista pero no en MongoDB): ${faltantesEnDB.length}`);
  faltantesEnDB.forEach(f => console.log(`   ${f.id}: ${f.nombre}`));

  console.log(`\n✅ COINCIDENCIAS: ${listaManual.length - discrepancias.length - faltantesEnDB.length}`);
  
  const soloEnDB = ticketsDB.filter(t => !listaMap.has(t.id));
  console.log(`\n🤖 SOLO EN MONGODB (Vienen de Rifa Bot o JSON antiguo): ${soloEnDB.length}`);
  soloEnDB.slice(0, 5).forEach(s => console.log(`   ${s.id}: ${s.nombre}`));
  if(soloEnDB.length > 5) console.log("   ...");

  process.exit();
}
auditoria();
