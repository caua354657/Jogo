const Config = {
    GAME_NAME: 'NEXUS CORE',
    VERSION: '1.0.0',
    SAVE_KEY: 'nexuscore_save',
    AUTOSAVE_INTERVAL: 30000,
    TICK_RATE: 20,

    CLICK_COOLDOWN_MIN: 1000 / 30,
    CRITICAL_CHANCE: 0.05,
    CRITICAL_MULT: 5,
    COMBO_TIMEOUT: 2000,
    COMBO_LEVELS: [1, 2, 3, 5, 10],
    COMBO_THRESHOLDS: [0, 10, 25, 50, 100],

    OFFLINE_MAX_HOURS: 4,
    PRESTIGE_BASE: 1e6,
    PRESTIGE_SCALE: 5,

    COST_SCALE: 1.15,

    PARTICLE_MAX: 150,
    NOTIFICATION_MAX: 5,
    NOTIFICATION_DURATION: 4000,

    NEURAL_NODES: 60,
    NEURAL_CONNECTIONS: 80,

    COLORS: {
        bg: '#050510',
        cyan: '#00f5ff',
        purple: '#7b2fff',
        pink: '#ff0080',
        green: '#00ff88',
        orange: '#ff8800',
        gold: '#ffd700',
        panel: 'rgba(10,10,30,0.85)',
        border: 'rgba(0,245,255,0.2)',
    }
};
