const RANDOM_EVENTS = [
    {
        id: 'neural_surge',
        name: 'Surto Neural!',
        icon: '⚡',
        desc: 'Um surto repentino de energia neural! Toda produção ×3 por 30 segundos.',
        duration: 30000,
        effect: { type: 'global_mult', value: 3 },
        weight: 30,
        color: '#00f5ff'
    },
    {
        id: 'click_frenzy',
        name: 'Frenesi de Cliques!',
        icon: '🖱️',
        desc: 'Cada clique vale 777× por 13 segundos — clique como louco!',
        duration: 13000,
        effect: { type: 'click_mult', value: 777 },
        weight: 10,
        color: '#ffd700'
    },
    {
        id: 'quantum_flux',
        name: 'Fluxo Quântico',
        icon: '🌀',
        desc: 'Efeitos quânticos multiplicam a produção por 7× por 20 segundos.',
        duration: 20000,
        effect: { type: 'global_mult', value: 7 },
        weight: 15,
        color: '#7b2fff'
    },
    {
        id: 'data_storm',
        name: 'Tempestade de Dados',
        icon: '🌩',
        desc: 'Uma tempestade de dados te concede neurônios equivalentes a 10 minutos de produção!',
        duration: 0,
        effect: { type: 'instant_neurons', value: 600 },
        weight: 20,
        color: '#ff8800'
    },
    {
        id: 'synaptic_echo',
        name: 'Eco Sináptico',
        icon: '🔁',
        desc: 'Cada clique é duplicado por 15 segundos.',
        duration: 15000,
        effect: { type: 'click_duplicate', value: 2 },
        weight: 25,
        color: '#ff0080'
    },
    {
        id: 'neural_token_drop',
        name: 'Token Caindo!',
        icon: '💎',
        desc: 'Um token neural apareceu! Colete-o rápido!',
        duration: 10000,
        effect: { type: 'free_token', value: 1 },
        weight: 5,
        color: '#ffd700',
        clickable: true
    },
];

const EVENT_MIN_INTERVAL = 180000;
const EVENT_MAX_INTERVAL = 600000;
