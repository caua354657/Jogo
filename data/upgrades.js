const GENERATORS = [
    // id, name, icon, desc — baseCost & baseRate tuned for slower mid/late progression
    { id: 'nano_bot',      name: 'Nano Robô',         icon: '🤖', desc: 'Robozinhos coletando neurônios perdidos.',         baseCost: 15,        baseRate: 0.1,    unlockAt: 0 },
    { id: 'synapse',       name: 'Sinapse',            icon: '⚡', desc: 'Sinapses neurais disparando em loops.',           baseCost: 120,       baseRate: 0.4,    unlockAt: 1 },
    { id: 'dendrite',      name: 'Dendrito',           icon: '🌿', desc: 'Dendritos ramificados amplificam sinais.',        baseCost: 700,       baseRate: 1.8,    unlockAt: 10 },
    { id: 'neuron_cluster',name: 'Cluster Neural',     icon: '🧠', desc: 'Grupos de neurônios pensam em paralelo.',         baseCost: 5000,      baseRate: 9,      unlockAt: 50 },
    { id: 'cortex_node',   name: 'Nó do Córtex',       icon: '💠', desc: 'O córtex avançado processa pensamentos.',         baseCost: 28000,     baseRate: 44,     unlockAt: 200 },
    { id: 'quantum_mind',  name: 'Mente Quântica',     icon: '🌀', desc: 'Superposição quântica multiplica o output.',      baseCost: 180000,    baseRate: 220,    unlockAt: 500 },
    { id: 'holo_matrix',   name: 'Holo Matriz',        icon: '🔮', desc: 'Matrizes holográficas guardam vastas memórias.',  baseCost: 1.4e6,     baseRate: 1100,   unlockAt: 2000 },
    { id: 'neural_forge',  name: 'Forja Neural',       icon: '🔥', desc: 'Forja novos caminhos neurais constantemente.',    baseCost: 11e6,      baseRate: 5500,   unlockAt: 10000 },
    { id: 'singularity',   name: 'Singularidade',      icon: '✨', desc: 'Aproxima-se da singularidade tecnológica.',       baseCost: 120e6,     baseRate: 28000,  unlockAt: 50000 },
    { id: 'omni_core',     name: 'Núcleo Ômega',       icon: '🌌', desc: 'O núcleo de processamento neural definitivo.',    baseCost: 150e9,     baseRate: 380000, unlockAt: 200000 },
];

const UPGRADES = [
    // ── Melhorias de Clique ──────────────────────────────────────────────────
    { id: 'cu1',  name: 'Pulso Focado',        icon: '👆', desc: 'Cliques produzem 2× neurônios.',  cost: 200,      type: 'click',  mult: 2,  requires: null },
    { id: 'cu2',  name: 'Pico Neural',         icon: '⚡', desc: 'Cliques produzem 2× neurônios.',  cost: 2500,     type: 'click',  mult: 2,  requires: { clicks: 100 } },
    { id: 'cu3',  name: 'Explosão Sináptica',  icon: '💥', desc: 'Cliques produzem 2× neurônios.',  cost: 18000,    type: 'click',  mult: 2,  requires: { clicks: 500 } },
    { id: 'cu4',  name: 'Tempestade de Íons',  icon: '🌩', desc: 'Cliques produzem 2× neurônios.',  cost: 150000,   type: 'click',  mult: 2,  requires: { clicks: 3000 } },
    { id: 'cu5',  name: 'Sobrecarga Axônica',  icon: '🔋', desc: 'Cliques produzem 3× neurônios.',  cost: 2e6,      type: 'click',  mult: 3,  requires: { clicks: 20000 } },
    { id: 'cu6',  name: 'Clique Quântico',     icon: '🌀', desc: 'Cliques produzem 5× neurônios.',  cost: 60e6,     type: 'click',  mult: 5,  requires: { clicks: 75000 } },
    { id: 'cu7',  name: 'Impacto Cósmico',     icon: '🌌', desc: 'Cliques produzem 10× neurônios.', cost: 2e9,      type: 'click',  mult: 10, requires: { clicks: 250000 } },
    { id: 'cu8',  name: 'O Dedo Divino',       icon: '✨', desc: 'Cliques produzem 25× neurônios.', cost: 400e9,    type: 'click',  mult: 25, requires: { clicks: 1000000 } },

    // ── Nano Robô ────────────────────────────────────────────────────────────
    { id: 'nb1',  name: 'Otimização Nano',     icon: '🤖', desc: 'Nano Robôs produzem 2× mais.',    cost: 350,      type: 'gen', genId: 'nano_bot',       mult: 2, requires: { gen: { id: 'nano_bot', count: 1  } } },
    { id: 'nb2',  name: 'Enxame Nano',         icon: '🤖', desc: 'Nano Robôs produzem 2× mais.',    cost: 7000,     type: 'gen', genId: 'nano_bot',       mult: 2, requires: { gen: { id: 'nano_bot', count: 10 } } },
    { id: 'nb3',  name: 'Colmeia Nano',        icon: '🤖', desc: 'Nano Robôs produzem 2× mais.',    cost: 80000,    type: 'gen', genId: 'nano_bot',       mult: 2, requires: { gen: { id: 'nano_bot', count: 25 } } },
    { id: 'nb4',  name: 'Link Quântico Nano',  icon: '🤖', desc: 'Nano Robôs produzem 3× mais.',    cost: 1e6,      type: 'gen', genId: 'nano_bot',       mult: 3, requires: { gen: { id: 'nano_bot', count: 50 } } },

    // ── Sinapse ──────────────────────────────────────────────────────────────
    { id: 'sy1',  name: 'Mielinização',        icon: '⚡', desc: 'Sinapses produzem 2× mais.',       cost: 3000,     type: 'gen', genId: 'synapse',        mult: 2, requires: { gen: { id: 'synapse', count: 1  } } },
    { id: 'sy2',  name: 'Potenciação Longa',   icon: '⚡', desc: 'Sinapses produzem 2× mais.',       cost: 30000,    type: 'gen', genId: 'synapse',        mult: 2, requires: { gen: { id: 'synapse', count: 10 } } },
    { id: 'sy3',  name: 'Rede Sináptica',      icon: '⚡', desc: 'Sinapses produzem 2× mais.',       cost: 350000,   type: 'gen', genId: 'synapse',        mult: 2, requires: { gen: { id: 'synapse', count: 25 } } },
    { id: 'sy4',  name: 'Canal Iônico+',       icon: '⚡', desc: 'Sinapses produzem 3× mais.',       cost: 4e6,      type: 'gen', genId: 'synapse',        mult: 3, requires: { gen: { id: 'synapse', count: 50 } } },

    // ── Dendrito ─────────────────────────────────────────────────────────────
    { id: 'de1',  name: 'Arborização',         icon: '🌿', desc: 'Dendritos produzem 2× mais.',      cost: 18000,    type: 'gen', genId: 'dendrite',       mult: 2, requires: { gen: { id: 'dendrite', count: 1  } } },
    { id: 'de2',  name: 'Densidade de Espinho',icon: '🌿', desc: 'Dendritos produzem 2× mais.',      cost: 200000,   type: 'gen', genId: 'dendrite',       mult: 2, requires: { gen: { id: 'dendrite', count: 10 } } },
    { id: 'de3',  name: 'Campo Dendrítico',    icon: '🌿', desc: 'Dendritos produzem 3× mais.',      cost: 2e6,      type: 'gen', genId: 'dendrite',       mult: 3, requires: { gen: { id: 'dendrite', count: 25 } } },
    { id: 'de4',  name: 'Super Espinhos',      icon: '🌿', desc: 'Dendritos produzem 3× mais.',      cost: 22e6,     type: 'gen', genId: 'dendrite',       mult: 3, requires: { gen: { id: 'dendrite', count: 50 } } },

    // ── Cluster Neural ───────────────────────────────────────────────────────
    { id: 'nc1',  name: 'Sincronização',       icon: '🧠', desc: 'Clusters Neurais produzem 2× mais.',cost: 130000,  type: 'gen', genId: 'neuron_cluster', mult: 2, requires: { gen: { id: 'neuron_cluster', count: 1  } } },
    { id: 'nc2',  name: 'Conexão em Massa',    icon: '🧠', desc: 'Clusters Neurais produzem 2× mais.',cost: 1.5e6,   type: 'gen', genId: 'neuron_cluster', mult: 2, requires: { gen: { id: 'neuron_cluster', count: 10 } } },
    { id: 'nc3',  name: 'Orquestra Neural',    icon: '🧠', desc: 'Clusters Neurais produzem 3× mais.',cost: 18e6,    type: 'gen', genId: 'neuron_cluster', mult: 3, requires: { gen: { id: 'neuron_cluster', count: 25 } } },
    { id: 'nc4',  name: 'Mente Colmeia',       icon: '🧠', desc: 'Clusters Neurais produzem 4× mais.',cost: 200e6,   type: 'gen', genId: 'neuron_cluster', mult: 4, requires: { gen: { id: 'neuron_cluster', count: 50 } } },

    // ── Nó do Córtex ─────────────────────────────────────────────────────────
    { id: 'cx1',  name: 'Mapeamento Cortical', icon: '💠', desc: 'Nós do Córtex produzem 2× mais.',  cost: 700000,   type: 'gen', genId: 'cortex_node',    mult: 2, requires: { gen: { id: 'cortex_node', count: 1  } } },
    { id: 'cx2',  name: 'Boost Pré-Frontal',   icon: '💠', desc: 'Nós do Córtex produzem 2× mais.',  cost: 8e6,      type: 'gen', genId: 'cortex_node',    mult: 2, requires: { gen: { id: 'cortex_node', count: 10 } } },
    { id: 'cx3',  name: 'Ressonância Cortical',icon: '💠', desc: 'Nós do Córtex produzem 3× mais.',  cost: 80e6,     type: 'gen', genId: 'cortex_node',    mult: 3, requires: { gen: { id: 'cortex_node', count: 25 } } },
    { id: 'cx4',  name: 'Hiper-Córtex',        icon: '💠', desc: 'Nós do Córtex produzem 4× mais.',  cost: 700e6,    type: 'gen', genId: 'cortex_node',    mult: 4, requires: { gen: { id: 'cortex_node', count: 50 } } },

    // ── Mente Quântica ───────────────────────────────────────────────────────
    { id: 'qm1',  name: 'Emaranhamento',       icon: '🌀', desc: 'Mentes Quânticas produzem 2× mais.',cost: 5e6,     type: 'gen', genId: 'quantum_mind',   mult: 2, requires: { gen: { id: 'quantum_mind', count: 1  } } },
    { id: 'qm2',  name: 'Superposição',        icon: '🌀', desc: 'Mentes Quânticas produzem 3× mais.',cost: 60e6,    type: 'gen', genId: 'quantum_mind',   mult: 3, requires: { gen: { id: 'quantum_mind', count: 10 } } },
    { id: 'qm3',  name: 'Colapso de Onda',     icon: '🌀', desc: 'Mentes Quânticas produzem 4× mais.',cost: 600e6,   type: 'gen', genId: 'quantum_mind',   mult: 4, requires: { gen: { id: 'quantum_mind', count: 25 } } },

    // ── Holo Matriz ──────────────────────────────────────────────────────────
    { id: 'hm1',  name: 'Luz Coerente',        icon: '🔮', desc: 'Holo Matrizes produzem 2× mais.',  cost: 30e6,     type: 'gen', genId: 'holo_matrix',    mult: 2, requires: { gen: { id: 'holo_matrix', count: 1  } } },
    { id: 'hm2',  name: 'Matriz Ativa',        icon: '🔮', desc: 'Holo Matrizes produzem 3× mais.',  cost: 300e6,    type: 'gen', genId: 'holo_matrix',    mult: 3, requires: { gen: { id: 'holo_matrix', count: 10 } } },
    { id: 'hm3',  name: 'Realidade Virtual',   icon: '🔮', desc: 'Holo Matrizes produzem 4× mais.',  cost: 4e9,      type: 'gen', genId: 'holo_matrix',    mult: 4, requires: { gen: { id: 'holo_matrix', count: 25 } } },

    // ── Forja Neural ─────────────────────────────────────────────────────────
    { id: 'nf1',  name: 'Balanço Térmico',     icon: '🔥', desc: 'Forjas Neurais produzem 2× mais.',  cost: 200e6,   type: 'gen', genId: 'neural_forge',   mult: 2, requires: { gen: { id: 'neural_forge', count: 1  } } },
    { id: 'nf2',  name: 'Fogo Primordial',     icon: '🔥', desc: 'Forjas Neurais produzem 3× mais.',  cost: 2e9,     type: 'gen', genId: 'neural_forge',   mult: 3, requires: { gen: { id: 'neural_forge', count: 10 } } },
    { id: 'nf3',  name: 'Forja Estelar',       icon: '🔥', desc: 'Forjas Neurais produzem 5× mais.',  cost: 25e9,    type: 'gen', genId: 'neural_forge',   mult: 5, requires: { gen: { id: 'neural_forge', count: 25 } } },

    // ── Singularidade ────────────────────────────────────────────────────────
    { id: 'sg1',  name: 'Horizonte de Eventos',icon: '✨', desc: 'Singularidades produzem 2× mais.',  cost: 2.5e9,   type: 'gen', genId: 'singularity',    mult: 2, requires: { gen: { id: 'singularity', count: 1  } } },
    { id: 'sg2',  name: 'Buraco Branco',       icon: '✨', desc: 'Singularidades produzem 3× mais.',  cost: 30e9,    type: 'gen', genId: 'singularity',    mult: 3, requires: { gen: { id: 'singularity', count: 10 } } },

    // ── Núcleo Ômega ─────────────────────────────────────────────────────────
    { id: 'om1',  name: 'Onipresença',         icon: '🌌', desc: 'Núcleos Ômega produzem 2× mais.',   cost: 5e12,    type: 'gen', genId: 'omni_core',      mult: 2, requires: { gen: { id: 'omni_core', count: 1 } } },

    // ── Multiplicadores Globais ──────────────────────────────────────────────
    // Costs raised substantially — these unlock in mid/late game, not early
    { id: 'gm1',  name: 'Harmonia Neural',           icon: '🌐', desc: 'Toda produção +10%.',           cost: 2e6,      type: 'global', mult: 1.1,  requires: null },
    { id: 'gm2',  name: 'Sincronização Sináptica',   icon: '🌐', desc: 'Toda produção +25%.',           cost: 20e6,     type: 'global', mult: 1.25, requires: null },
    { id: 'gm3',  name: 'Coerência Quântica',        icon: '🌐', desc: 'Toda produção +50%.',           cost: 200e6,    type: 'global', mult: 1.5,  requires: null },
    { id: 'gm4',  name: 'Despertar do Nexus',        icon: '🌐', desc: 'Toda a produção duplica.',      cost: 4e9,      type: 'global', mult: 2,    requires: null },
    { id: 'gm5',  name: 'Expansão do Universo',      icon: '🌐', desc: 'Toda a produção triplica.',     cost: 200e9,    type: 'global', mult: 3,    requires: null },
    { id: 'gm6',  name: 'Onisciência',               icon: '🌐', desc: 'Toda a produção aumenta 5×.',  cost: 5e12,     type: 'global', mult: 5,    requires: null },
    { id: 'gm7',  name: 'A Mente de Deus',           icon: '🌐', desc: 'Toda a produção aumenta 10×.', cost: 500e12,   type: 'global', mult: 10,   requires: null },

    // ── Prestígio (compradas com Diamantes 💎) ────────────────────────────────
    { id: 'pt1',  name: 'Amplificador de Token',  icon: '💎', desc: 'Bônus de prestígio ×1,5.',                    cost: 1,   type: 'prestige',       mult: 1.5, requires: null, currency: 'tokens' },
    { id: 'pt2',  name: 'Memória Profunda',       icon: '💎', desc: 'Começa com 10 Nano Robôs após o prestígio.',  cost: 3,   type: 'prestige_start', value: { gen: 'nano_bot', count: 10 }, requires: null, currency: 'tokens' },
    { id: 'pt3',  name: 'Legado Neural',          icon: '💎', desc: 'Bônus de prestígio ×2.',                      cost: 12,  type: 'prestige',       mult: 2,   requires: null, currency: 'tokens' },
    { id: 'pt4',  name: 'Otimização Divina',      icon: '💎', desc: 'Bônus de prestígio ×3.',                      cost: 30,  type: 'prestige',       mult: 3,   requires: null, currency: 'tokens' },
    { id: 'pt5',  name: 'Aceleração do Tempo',    icon: '💎', desc: 'Ganho passivo offline aumentado em 50%.',     cost: 60,  type: 'offline_mult',   mult: 1.5, requires: null, currency: 'tokens' },
    { id: 'pt6',  name: 'Caminho Iluminado',      icon: '💎', desc: 'Começa com 1 Nó do Córtex após prestígio.',   cost: 120, type: 'prestige_start', value: { gen: 'cortex_node', count: 1 }, requires: null, currency: 'tokens' },
];
