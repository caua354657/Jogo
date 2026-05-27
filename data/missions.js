const MISSIONS = [];

function addMission(m) {
    MISSIONS.push(m);
}

// 1. Story (10)
const storyDefs = [
    { name: 'Desperte o Núcleo', desc: 'Clique no Núcleo 10 vezes.', val: 10, type: 'clicks' },
    { name: 'Primeiro Gerador', desc: 'Compre seu primeiro Nano Robô.', val: 1, type: 'gen', gen: 'nano_bot' },
    { name: 'Evolua-se!', desc: 'Compre sua primeira melhoria.', val: 1, type: 'upgrades' },
    { name: 'Acumule!', desc: 'Acumule 1.000 neurônios.', val: 1000, type: 'current' },
    { name: 'Automatize!', desc: 'Alcance 10 neurônios/seg.', val: 10, type: 'nps' },
    { name: 'Expansão', desc: 'Compre sua primeira Sinapse.', val: 1, type: 'gen', gen: 'synapse' },
    { name: 'Potencial', desc: 'Acumule 10.000 neurônios.', val: 10000, type: 'current' },
    { name: 'Velocidade', desc: 'Alcance 100 neurônios/seg.', val: 100, type: 'nps' },
    { name: 'Sinergia', desc: 'Compre 10 melhorias.', val: 10, type: 'upgrades' },
    { name: 'O Próximo Passo', desc: 'Faça seu primeiro prestígio.', val: 1, type: 'prestige' }
];
storyDefs.forEach((d, i) => addMission({
    id: `story_${i+1}`, name: d.name, icon: '📖', desc: d.desc,
    category: 'Story', difficulty: 1, type: d.type, value: d.val, gen: d.gen,
    reward: { neurons: 100 * Math.pow(2, i), xp: 50 * (i+1) },
    rarity: 'common', chain: 'story', order: i+1
}));

// 2. Milestones (15)
const milVals = [1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13, 1e14, 1e15, 1e16, 1e18];
milVals.forEach((val, i) => addMission({
    id: `mil_${i+1}`, name: `Marco ${i+1}`, icon: '🏆', desc: `Ganhe um total de ${val.toExponential(0)} neurônios.`,
    category: 'Milestones', difficulty: Math.ceil((i+1)/3), type: 'allTime', value: val,
    reward: { xp: 100 * (i+1), neurons_pct: 0.05, tokens: i >= 10 ? 1 : 0 },
    rarity: i >= 12 ? 'legendary' : (i >= 8 ? 'epic' : (i >= 4 ? 'rare' : 'uncommon'))
}));

// 3. Speed (8)
const speedVals = [1e2, 1e3, 1e4, 1e5, 1e6, 1e9, 1e12, 1e15];
speedVals.forEach((val, i) => addMission({
    id: `spd_${i+1}`, name: `Velocidade ${i+1}`, icon: '💨', desc: `Alcance ${val.toExponential(0)} NPS.`,
    category: 'Speed', difficulty: Math.ceil((i+1)/2), type: 'nps', value: val,
    reward: { xp: 200 * (i+1), tokens: i >= 5 ? 1 : 0 },
    rarity: i >= 6 ? 'legendary' : (i >= 4 ? 'epic' : 'rare')
}));

// 4. Click Mastery (10)
const clickVals = [100, 500, 1000, 5000, 10000, 50000, 100000, 500000, 1000000, 10000000];
clickVals.forEach((val, i) => addMission({
    id: `clk_${i+1}`, name: `Cliques ${i+1}`, icon: '👆', desc: `Clique ${val} vezes no total.`,
    category: 'Click Mastery', difficulty: Math.ceil((i+1)/2), type: 'clicks', value: val,
    reward: { xp: 150 * (i+1), tokens: i >= 7 ? 2 : 0 },
    rarity: i >= 8 ? 'legendary' : (i >= 5 ? 'epic' : 'uncommon')
}));

// 5. Generator (12)
const genMissionDefs = [
    { id: 'nano_bot',      name: 'Nano Robô',      icon: '🤖' },
    { id: 'synapse',       name: 'Sinapse',         icon: '⚡' },
    { id: 'quantum_mind',  name: 'Mente Quântica',  icon: '🌀' },
    { id: 'holo_matrix',   name: 'Holo Matriz',     icon: '🔮' },
    { id: 'neural_forge',  name: 'Forja Neural',    icon: '🔥' },
    { id: 'singularity',   name: 'Singularidade',   icon: '✨' },
];
genMissionDefs.forEach((gd, i) => {
    [10, 50].forEach((qty) => {
        addMission({
            id: `gen_${gd.id}_${qty}`, name: `${qty} ${gd.name}`, icon: gd.icon,
            desc: `Possua ${qty} ${gd.name}s ao mesmo tempo.`,
            category: 'Generator', difficulty: i+1, type: 'gen', gen: gd.id, value: qty,
            reward: { xp: 300 * (i+1), neurons_pct: 0.1 },
            rarity: i >= 4 ? 'epic' : 'uncommon'
        });
    });
});

// 6. Upgrade (8)
const upgVals = [5, 10, 20, 30, 40, 50, 60, 75];
upgVals.forEach((val, i) => addMission({
    id: `upg_${i+1}`, name: `Melhorias ${val}`, icon: '🔧', desc: `Compre ${val} melhorias no total.`,
    category: 'Upgrade', difficulty: Math.ceil((i+1)/2), type: 'upgrades', value: val,
    reward: { xp: 250 * (i+1), tokens: i >= 6 ? 1 : 0 },
    rarity: i >= 6 ? 'epic' : 'rare'
}));

// 7. Combo (6) — tracks max consecutive clicks in a single combo chain
const comboVals = [10, 25, 50, 100, 200, 500];
comboVals.forEach((val, i) => addMission({
    id: `cmb_${i+1}`, name: `Combo ${val}`, icon: '🔥', desc: `Alcance ${val} cliques consecutivos em um único combo.`,
    category: 'Combo', difficulty: i+1, type: 'comboClicks', value: val,
    reward: { xp: 500 * (i+1), tokens: i >= 4 ? 1 : 0 },
    rarity: i >= 4 ? 'epic' : 'rare'
}));

// 8. Prestige/Rebirth (8)
const presVals = [1, 2, 5, 10, 20, 50, 100, 500];
presVals.forEach((val, i) => addMission({
    id: `pres_${i+1}`, name: `Renascimento ${val}`, icon: '♻️', desc: `Faça prestígio ${val} vezes.`,
    category: 'Prestige/Rebirth', difficulty: i > 4 ? 5 : i+1, type: 'prestige', value: val,
    reward: { xp: 1000 * (i+1), tokens: val },
    rarity: 'legendary'
}));

// 9. Daily (8 real missions)
const dailyDefs = [
    { id: 'daily_1', name: 'Clicador do Dia',    icon: '👆', desc: 'Faça 200 cliques hoje.',                    type: 'daily_clicks',   val: 200,  reward: { xp: 300,  neurons: 5000 },         diff: 1 },
    { id: 'daily_2', name: 'Frenesi Diário',      icon: '🔥', desc: 'Faça 1.000 cliques hoje.',                 type: 'daily_clicks',   val: 1000, reward: { xp: 800,  neurons_pct: 0.05 },     diff: 3 },
    { id: 'daily_3', name: 'Tiro Certeiro',       icon: '🎯', desc: 'Obtenha 10 cliques críticos hoje.',        type: 'daily_crits',    val: 10,   reward: { xp: 400,  neurons: 10000 },        diff: 2 },
    { id: 'daily_4', name: 'Sniper Neural',       icon: '💥', desc: 'Obtenha 50 cliques críticos hoje.',        type: 'daily_crits',    val: 50,   reward: { xp: 1000, neurons_pct: 0.1 },      diff: 4 },
    { id: 'daily_5', name: 'Expansão Diária',     icon: '⚙️', desc: 'Compre 3 geradores hoje.',                type: 'daily_gen_buy',  val: 3,    reward: { xp: 500,  neurons: 20000 },        diff: 2 },
    { id: 'daily_6', name: 'Melhorias Diárias',   icon: '🔧', desc: 'Compre 2 melhorias hoje.',                 type: 'daily_upgrades', val: 2,    reward: { xp: 600,  neurons: 30000 },        diff: 2 },
    { id: 'daily_7', name: 'Colheita Neural',     icon: '⚡', desc: 'Ganhe 1 milhão de neurônios hoje.',        type: 'daily_earn',     val: 1e6,  reward: { xp: 700,  neurons_pct: 0.08 },     diff: 3 },
    { id: 'daily_8', name: 'Gerador em Série',    icon: '🤖', desc: 'Compre 8 geradores hoje.',                 type: 'daily_gen_buy',  val: 8,    reward: { xp: 1200, neurons_pct: 0.15 },     diff: 4 },
];
dailyDefs.forEach(d => addMission({
    id: d.id, name: d.name, icon: d.icon, desc: d.desc,
    category: 'Daily', difficulty: d.diff, type: d.type, value: d.val,
    reward: d.reward, rarity: d.diff >= 4 ? 'epic' : 'uncommon',
    repeatable: true, cooldown: 'daily'
}));

// 10. Weekly (6 real missions)
const weeklyDefs = [
    { id: 'weekly_1', name: 'Maratonista',      icon: '👆', desc: 'Faça 10.000 cliques esta semana.',              type: 'weekly_clicks',   val: 10000, reward: { xp: 3000, neurons_pct: 0.1 },  diff: 2 },
    { id: 'weekly_2', name: 'Industrialista',   icon: '⚙️', desc: 'Compre 20 geradores esta semana.',              type: 'weekly_gen_buy',  val: 20,    reward: { xp: 4000, neurons_pct: 0.15 }, diff: 3 },
    { id: 'weekly_3', name: 'Pesquisador',       icon: '🔧', desc: 'Compre 15 melhorias esta semana.',              type: 'weekly_upgrades', val: 15,    reward: { xp: 5000, tokens: 1 },         diff: 3 },
    { id: 'weekly_4', name: 'Franco-Atirador',   icon: '🎯', desc: 'Obtenha 200 cliques críticos esta semana.',    type: 'weekly_crits',    val: 200,   reward: { xp: 4000, tokens: 1 },         diff: 4 },
    { id: 'weekly_5', name: 'Mega Colheita',     icon: '⚡', desc: 'Ganhe 100 bilhões de neurônios esta semana.',  type: 'weekly_earn',     val: 1e11,  reward: { xp: 6000, tokens: 1 },         diff: 4 },
    { id: 'weekly_6', name: 'Ultra Produção',    icon: '🌌', desc: 'Ganhe 1 trilhão de neurônios esta semana.',    type: 'weekly_earn',     val: 1e12,  reward: { xp: 10000, tokens: 2 },        diff: 5 },
];
weeklyDefs.forEach(d => addMission({
    id: d.id, name: d.name, icon: d.icon, desc: d.desc,
    category: 'Weekly', difficulty: d.diff, type: d.type, value: d.val,
    reward: d.reward, rarity: d.diff >= 5 ? 'legendary' : 'epic',
    repeatable: true, cooldown: 'weekly'
}));

// 11. Hardcore (6)
const hcVals = [1e6, 1e9, 1e12, 1e15, 1e18, 1e21];
hcVals.forEach((val, i) => addMission({
    id: `hc_${i+1}`, name: `Puro Sangue ${i+1}`, icon: '💀', desc: `Alcance ${val.toExponential(0)} neurônios sem fazer prestígio.`,
    category: 'Hardcore', difficulty: 5, type: 'current_no_prestige', value: val,
    reward: { xp: 5000 * (i+1), tokens: (i+1)*2 }, rarity: 'legendary'
}));

// 12. Timed (6)
const timedVals = [1000, 5000, 10000, 50000, 100000, 1000000]; // clicks in 5 mins
timedVals.forEach((val, i) => addMission({
    id: `timed_${i+1}`, name: `Sprint ${i+1}`, icon: '⏱️', desc: `Faça ${val} cliques em 5 minutos.`,
    category: 'Timed', difficulty: i+1, type: 'timed_clicks', value: val, timeLimit: 300,
    reward: { xp: 1000 * (i+1), tokens: i >= 3 ? 1 : 0 }, rarity: 'epic'
}));

// 13. Collection (8)
const collVals = [10, 50, 100, 200, 300, 400, 500, 1000];
collVals.forEach((val, i) => addMission({
    id: `coll_${i+1}`, name: `Colecionador ${i+1}`, icon: '📦', desc: `Tenha um total de ${val} geradores de qualquer tipo.`,
    category: 'Collection', difficulty: Math.ceil((i+1)/2), type: 'total_gens', value: val,
    reward: { xp: 500 * (i+1) }, rarity: 'rare'
}));

// 14. Repeatable (6)
for(let i=1; i<=6; i++) {
    addMission({
        id: `rep_${i}`, name: `Moedor ${i}`, icon: '🔄', desc: `Gere ${1e6 * Math.pow(10, i)} neurônios.`,
        category: 'Repeatable', difficulty: 3, type: 'earn_session', value: 1e6 * Math.pow(10, i),
        reward: { xp: 200 * i }, rarity: 'common', repeatable: true, cooldown: 'custom', cooldownTime: 3600
    });
}

// 15. Special Event (5)
for(let i=1; i<=5; i++) {
    addMission({
        id: `evt_${i}`, name: `Caçador de Eventos ${i}`, icon: '✨', desc: `Colete ${i*5} eventos aleatórios.`,
        category: 'Special Event', difficulty: i, type: 'events_collected', value: i*5,
        reward: { xp: 1000 * i, tokens: i >= 3 ? 1 : 0 }, rarity: 'epic'
    });
}

// Total: 10+15+8+10+12+8+6+8+8+6+6+6+8+6+5 = 122 missions
