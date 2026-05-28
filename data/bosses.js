const BOSS_TYPES = {
    cyber_boss: {
        name:    'Cyber Boss',
        icon:    '🤖',
        color:   '#ff0080',
        color2:  '#00f5ff',
        rarity:  'rare',
        desc:    'Uma IA renegada que ameaça corromper o núcleo neural.',
        deathMsg:'A IA foi desligada!',
        glowColor: 'rgba(255,0,128,0.45)',
    },
    glitch_entity: {
        name:    'Glitch Entity',
        icon:    '👾',
        color:   '#00ff88',
        color2:  '#ffff00',
        rarity:  'rare',
        desc:    'Uma entidade corrompida surgiu de um erro crítico do sistema.',
        deathMsg:'Glitch eliminado!',
        glowColor: 'rgba(0,255,136,0.45)',
    },
    neural_titan: {
        name:    'Neural Titan',
        icon:    '🧠',
        color:   '#9b30ff',
        color2:  '#ff66ff',
        rarity:  'epic',
        desc:    'Um titã de neurônios corrompidos emerge das profundezas da rede.',
        deathMsg:'O Titã foi fragmentado!',
        glowColor: 'rgba(155,48,255,0.5)',
    },
    circuit_phantom: {
        name:    'Circuit Phantom',
        icon:    '💀',
        color:   '#ff6400',
        color2:  '#ff0000',
        rarity:  'epic',
        desc:    'Um fantasma digital que corrói os circuitos do núcleo.',
        deathMsg:'O Fantasma foi exorcizado!',
        glowColor: 'rgba(255,100,0,0.5)',
    },
    data_colossus: {
        name:    'Data Colossus',
        icon:    '🌐',
        color:   '#ffd700',
        color2:  '#ff8c00',
        rarity:  'legendary',
        desc:    'Um colosso lendário de dados que ameaça consumir toda a rede neural.',
        deathMsg:'O Colosso foi derrubado!',
        glowColor: 'rgba(255,215,0,0.55)',
    },
};

const BOSS_RARITY_COLORS = {
    rare:      '#00f5ff',
    epic:      '#9b30ff',
    legendary: '#ffd700',
};

const BOSS_RARITY_LABELS = {
    rare:      'RARO',
    epic:      'ÉPICO',
    legendary: 'LENDÁRIO',
};
