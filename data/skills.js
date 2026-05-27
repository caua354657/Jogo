const SKILLS = [
    // ── Categoria: Cliques ─────────────────────────────────────────────────────
    {
        id: 'click_power',
        name: 'Potência de Clique', icon: '👆',
        category: 'click', categoryName: 'Cliques',
        desc: '+25% poder de clique por nível.',
        maxLevel: 5,
        costs: [1, 2, 3, 5, 8],
        effectPerLevel: 0.25,
        effectType: 'click_mult',
    },
    {
        id: 'crit_mastery',
        name: 'Precisão Crítica', icon: '🎯',
        category: 'click', categoryName: 'Cliques',
        desc: '+2% de chance de clique crítico por nível.',
        maxLevel: 5,
        costs: [2, 3, 5, 7, 10],
        effectPerLevel: 0.02,
        effectType: 'crit_chance',
    },

    // ── Categoria: Geradores ───────────────────────────────────────────────────
    {
        id: 'gen_efficiency',
        name: 'Eficiência dos Geradores', icon: '⚙️',
        category: 'generator', categoryName: 'Geradores',
        desc: '+15% produção de todos os geradores por nível.',
        maxLevel: 5,
        costs: [1, 2, 4, 6, 9],
        effectPerLevel: 0.15,
        effectType: 'global_mult',
    },
    {
        id: 'gen_discount',
        name: 'Gestão Eficiente', icon: '💰',
        category: 'generator', categoryName: 'Geradores',
        desc: '-10% custo de geradores por nível (máx. 40%).',
        maxLevel: 5,
        costs: [3, 5, 8, 12, 15],
        effectPerLevel: 0.10,
        effectType: 'gen_cost_discount',
    },

    // ── Categoria: Progressão ──────────────────────────────────────────────────
    {
        id: 'xp_gain',
        name: 'Aprendizado Acelerado', icon: '📚',
        category: 'progression', categoryName: 'Progressão',
        desc: '+20% ganho de XP por nível.',
        maxLevel: 5,
        costs: [1, 2, 3, 5, 7],
        effectPerLevel: 0.20,
        effectType: 'xp_mult',
    },
    {
        id: 'offline_prod',
        name: 'Processamento Offline', icon: '💤',
        category: 'progression', categoryName: 'Progressão',
        desc: '+20% ganhos offline por nível.',
        maxLevel: 5,
        costs: [2, 4, 6, 8, 10],
        effectPerLevel: 0.20,
        effectType: 'offline_mult',
    },
];
