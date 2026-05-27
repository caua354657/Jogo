class BoostManager {
    constructor(economy, events) {
        this._economy = economy;
        this._events = events;
        this._boosts = [];
    }

    addBoost(boost) {
        if (boost.duration <= 0) return;
        boost.expiresAt = Date.now() + boost.duration;
        boost.id = boost.id || ('boost_' + Date.now());
        this._boosts.push(boost);
        this._recompute();
        this._events.emit('boostAdded', boost);
    }

    update() {
        const now = Date.now();
        const before = this._boosts.length;
        this._boosts = this._boosts.filter(b => b.expiresAt > now);
        if (this._boosts.length !== before) this._recompute();
    }

    _recompute() {
        let clickMult = 1, globalMult = 1;
        this._boosts.forEach(b => {
            if (b.effect.type === 'click_mult') clickMult *= b.effect.value;
            else if (b.effect.type === 'global_mult') globalMult *= b.effect.value;
            else if (b.effect.type === 'click_duplicate') clickMult *= b.effect.value;
        });
        this._economy.setTempClickMult(clickMult);
        this._economy.setTempGlobalMult(globalMult);
    }

    getActiveBoosts() { return this._boosts.map(b => ({ ...b, remaining: Math.max(0, b.expiresAt - Date.now()) })); }

    getState() { return { boosts: this._boosts.map(b => ({ ...b })) }; }

    loadState(s) {
        if (!s?.boosts) return;
        this._boosts = s.boosts.filter(b => b.expiresAt > Date.now());
        this._recompute();
    }
}
