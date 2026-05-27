const ACHIEVEMENTS = [
    // Marcos de cliques
    { id: 'ach_c1',   name: 'Primeira Faísca',    icon: '⚡', desc: 'Clique pela primeira vez.',                  type: 'clicks',   value: 1,        reward: 'bonus_click', rewardVal: 1.01 },
    { id: 'ach_c2',   name: 'Começando!',          icon: '⚡', desc: 'Alcance 100 cliques no total.',             type: 'clicks',   value: 100,      reward: 'bonus_click', rewardVal: 1.02 },
    { id: 'ach_c3',   name: 'Clicador',            icon: '⚡', desc: 'Alcance 1.000 cliques no total.',           type: 'clicks',   value: 1000,     reward: 'bonus_click', rewardVal: 1.03 },
    { id: 'ach_c4',   name: 'Hiperclicador',       icon: '🖱️', desc: 'Alcance 10.000 cliques no total.',          type: 'clicks',   value: 10000,    reward: 'bonus_click', rewardVal: 1.05 },
    { id: 'ach_c5',   name: 'Dedo de Deus',        icon: '☁️', desc: 'Alcance 100.000 cliques no total.',         type: 'clicks',   value: 100000,   reward: 'bonus_click', rewardVal: 1.1 },
    { id: 'ach_c6',   name: 'Tirano Neural',       icon: '💪', desc: 'Alcance 1.000.000 cliques no total.',       type: 'clicks',   value: 1000000,  reward: 'bonus_click', rewardVal: 1.2 },
    { id: 'ach_c7',   name: 'Fúria dos Dedos',     icon: '👆', desc: 'Alcance 10.000.000 cliques no total.',      type: 'clicks',   value: 10000000, reward: 'bonus_click', rewardVal: 1.5 },

    // Marcos de neurônios (todos os tempos)
    { id: 'ach_n1',   name: 'Embrionário',         icon: '🌱', desc: 'Produza 100 neurônios no total.',           type: 'allTime',  value: 100,      reward: null },
    { id: 'ach_n2',   name: 'Intelecto Nascente',  icon: '🧪', desc: 'Produza 10.000 neurônios no total.',        type: 'allTime',  value: 1e4,      reward: null },
    { id: 'ach_n3',   name: 'Surto Cognitivo',     icon: '🧠', desc: 'Produza 1.000.000 neurônios no total.',     type: 'allTime',  value: 1e6,      reward: null },
    { id: 'ach_n4',   name: 'Tempestade Sináptica',icon: '🌩', desc: 'Produza 1 bilhão de neurônios no total.',   type: 'allTime',  value: 1e9,      reward: null },
    { id: 'ach_n5',   name: 'Titã Neural',         icon: '🌌', desc: 'Produza 1 trilhão de neurônios no total.',  type: 'allTime',  value: 1e12,     reward: 'bonus_global', rewardVal: 1.1 },
    { id: 'ach_n6',   name: 'Singularidade',       icon: '✨', desc: 'Produza 1 quadrilhão de neurônios.',        type: 'allTime',  value: 1e15,     reward: 'bonus_global', rewardVal: 1.2 },
    { id: 'ach_n7',   name: 'Mente do Universo',   icon: '🌐', desc: 'Produza 1 quintilhão de neurônios.',        type: 'allTime',  value: 1e18,     reward: 'bonus_global', rewardVal: 1.5 },

    // Marcos de geradores
    { id: 'ach_g1',   name: 'Primeiro Robô Online',icon: '🤖', desc: 'Compre seu primeiro Nano Robô.',            type: 'gen',      gen: 'nano_bot',       value: 1,  reward: null },
    { id: 'ach_g2',   name: 'Exército de Robôs',   icon: '🤖', desc: 'Possua 50 Nano Robôs.',                     type: 'gen',      gen: 'nano_bot',       value: 50, reward: 'bonus_gen', rewardGen: 'nano_bot', rewardVal: 2 },
    { id: 'ach_g3',   name: 'Rede Sináptica',      icon: '⚡', desc: 'Possua 25 Sinapses.',                        type: 'gen',      gen: 'synapse',        value: 25, reward: 'bonus_gen', rewardGen: 'synapse', rewardVal: 2 },
    { id: 'ach_g4',   name: 'Floresta de Dendritos',icon: '🌿',desc: 'Possua 25 Dendritos.',                       type: 'gen',      gen: 'dendrite',       value: 25, reward: 'bonus_gen', rewardGen: 'dendrite', rewardVal: 2 },
    { id: 'ach_g5',   name: 'Comandante de Cluster',icon: '🧠',desc: 'Possua 25 Clusters Neurais.',                type: 'gen',      gen: 'neuron_cluster', value: 25, reward: null },
    { id: 'ach_g6',   name: 'Rei do Córtex',       icon: '💠', desc: 'Possua 25 Nós do Córtex.',                  type: 'gen',      gen: 'cortex_node',    value: 25, reward: null },
    { id: 'ach_g7',   name: 'Matriz Ativada',      icon: '🔮', desc: 'Possua 25 Holo Matrizes.',                  type: 'gen',      gen: 'holo_matrix',    value: 25, reward: null },
    { id: 'ach_g8',   name: 'Senhor da Singularidade',icon:'✨', desc: 'Possua 25 Singularidades.',               type: 'gen',      gen: 'singularity',    value: 25, reward: null },
    
    { id: 'ach_allg1',name: 'Todos os Sistemas!',  icon: '🚀', desc: 'Possua pelo menos 1 de cada gerador básico.',type: 'allGens', value: 1,  reward: 'bonus_global', rewardVal: 1.05 },
    { id: 'ach_allg2',name: 'Espectro Completo',   icon: '🌈', desc: 'Possua pelo menos 10 de cada gerador.',      type: 'allGens',  value: 10, reward: 'bonus_global', rewardVal: 1.1 },
    { id: 'ach_allg3',name: 'Coleção Mestra',      icon: '📚', desc: 'Possua pelo menos 50 de cada gerador.',      type: 'allGens',  value: 50, reward: 'bonus_global', rewardVal: 1.5 },

    // Conquistas de velocidade
    { id: 'ach_s1',   name: 'Pensador Rápido',     icon: '💨', desc: 'Alcance 100 neurônios/seg.',                type: 'nps',      value: 100,      reward: null },
    { id: 'ach_s2',   name: 'Torrente Neural',     icon: '🌊', desc: 'Alcance 10.000 neurônios/seg.',             type: 'nps',      value: 1e4,      reward: null },
    { id: 'ach_s3',   name: 'Tufão de Pensamentos',icon: '🌪️', desc: 'Alcance 1.000.000 neurônios/seg.',          type: 'nps',      value: 1e6,      reward: 'bonus_global', rewardVal: 1.05 },
    { id: 'ach_s4',   name: 'Motor da Singularidade',icon:'♾️', desc: 'Alcance 1 bilhão de neurônios/seg.',       type: 'nps',      value: 1e9,      reward: 'bonus_global', rewardVal: 1.1 },
    { id: 'ach_s5',   name: 'Velocidade da Luz',   icon: '🚀', desc: 'Alcance 1 trilhão de neurônios/seg.',       type: 'nps',      value: 1e12,     reward: 'bonus_global', rewardVal: 1.25 },
    { id: 'ach_s6',   name: 'Deus da Velocidade',  icon: '⚡', desc: 'Alcance 1 quadrilhão de neurônios/seg.',    type: 'nps',      value: 1e15,     reward: 'bonus_global', rewardVal: 1.5 },

    // Conquistas de nível
    { id: 'ach_l1',   name: 'Subiu de Nível!',     icon: '⬆️', desc: 'Alcance o nível 5.',                        type: 'level',    value: 5,        reward: null },
    { id: 'ach_l2',   name: 'Ascendente',           icon: '🔝', desc: 'Alcance o nível 20.',                       type: 'level',    value: 20,       reward: 'bonus_click', rewardVal: 1.1 },
    { id: 'ach_l3',   name: 'Mente Mestra',         icon: '🏆', desc: 'Alcance o nível 50.',                       type: 'level',    value: 50,       reward: 'bonus_global', rewardVal: 1.15 },
    { id: 'ach_l4',   name: 'Ser Supremo',          icon: '👑', desc: 'Alcance o nível 100.',                      type: 'level',    value: 100,      reward: 'bonus_global', rewardVal: 1.5 },

    // Conquistas de melhoria
    { id: 'ach_u1',   name: 'Melhorado!',           icon: '🔧', desc: 'Compre sua primeira melhoria.',             type: 'upgrades', value: 1,        reward: null },
    { id: 'ach_u2',   name: 'Entusiasta de Tech',   icon: '🔬', desc: 'Compre 10 melhorias.',                      type: 'upgrades', value: 10,       reward: null },
    { id: 'ach_u3',   name: 'Totalmente Aprimorado',icon: '💯', desc: 'Compre 25 melhorias.',                      type: 'upgrades', value: 25,       reward: 'bonus_global', rewardVal: 1.1 },
    { id: 'ach_u4',   name: 'Cyberneticamente Elevado',icon:'🦾', desc: 'Compre 50 melhorias.',                    type: 'upgrades', value: 50,       reward: 'bonus_global', rewardVal: 1.25 },

    // Conquistas de prestígio
    { id: 'ach_p1',   name: 'Renascido',            icon: '🔄', desc: 'Use o prestígio pela primeira vez.',        type: 'prestiges', value: 1,       reward: null },
    { id: 'ach_p2',   name: 'Ciclo Eterno',         icon: '♾️', desc: 'Use o prestígio 5 vezes.',                 type: 'prestiges', value: 5,       reward: 'bonus_prestige', rewardVal: 1.1 },
    { id: 'ach_p3',   name: 'Transcendente',        icon: '🌟', desc: 'Use o prestígio 10 vezes.',                type: 'prestiges', value: 10,      reward: 'bonus_prestige', rewardVal: 1.25 },
    { id: 'ach_p4',   name: 'Imortal',              icon: '🧬', desc: 'Use o prestígio 50 vezes.',                type: 'prestiges', value: 50,      reward: 'bonus_prestige', rewardVal: 2 },

    // Conquistas de combo
    { id: 'ach_cb1',  name: 'Combo!',               icon: '🔥', desc: 'Alcance um combo de 3×.',                  type: 'combo',    value: 3,        reward: null },
    { id: 'ach_cb2',  name: 'Em Chamas!',            icon: '🔥', desc: 'Alcance o combo máximo de 10×.',           type: 'combo',    value: 10,       reward: null },
    
    // Conquistas de missões (NEW)
    // The type `missions` is not currently in AchievementManager, we will just use `secret: true` style if it's not supported,
    // or add `missions_claimed` to the AchievementManager if possible. But for data completeness:
    { id: 'ach_m1',   name: 'Caçador de Missões',   icon: '📋', desc: 'Resgate 5 missões.',                       type: 'missions', value: 5,        reward: null },
    { id: 'ach_m2',   name: 'Mercenário Neural',    icon: '⚔️', desc: 'Resgate 25 missões.',                      type: 'missions', value: 25,       reward: 'bonus_click', rewardVal: 1.2 },
    { id: 'ach_m3',   name: 'Lenda das Missões',    icon: '🏆', desc: 'Resgate 100 missões.',                     type: 'missions', value: 100,      reward: 'bonus_global', rewardVal: 1.25 },

    // Conquistas de tempo de jogo
    { id: 'ach_t1',   name: 'Iniciante',             icon: '⏱️', desc: 'Jogue por 10 minutos.',                    type: 'playtime', value: 600,      reward: null },
    { id: 'ach_t2',   name: 'Dedicado',              icon: '⏰', desc: 'Jogue por 1 hora.',                         type: 'playtime', value: 3600,     reward: 'bonus_click', rewardVal: 1.05 },
    { id: 'ach_t3',   name: 'Viciado',               icon: '🕐', desc: 'Jogue por 24 horas no total.',              type: 'playtime', value: 86400,    reward: 'bonus_global', rewardVal: 1.1 },

    // Conquistas secretas
    { id: 'ach_sec1', name: '???',                   icon: '❓', desc: 'Algo milagroso aconteceu.',                 type: 'secret',   value: 'crit100', reward: null, secret: true },
];
