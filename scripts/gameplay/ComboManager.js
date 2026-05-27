class ComboManager {
    constructor(economy, events) {
        this._economy = economy;
        this._events = events;
        this._clicks = 0;
        this._lastClick = 0;
        this._comboLevel = 0;
        this._timer = null;
    }

    onClick() {
        const now = Date.now();
        if (now - this._lastClick < Config.COMBO_TIMEOUT) {
            this._clicks++;
        } else {
            this._clicks = 1;
        }
        this._lastClick = now;

        clearTimeout(this._timer);
        this._timer = setTimeout(() => this._reset(), Config.COMBO_TIMEOUT);

        const oldLevel = this._comboLevel;
        this._comboLevel = 0;
        for (let i = Config.COMBO_THRESHOLDS.length - 1; i >= 0; i--) {
            if (this._clicks >= Config.COMBO_THRESHOLDS[i]) {
                this._comboLevel = i;
                break;
            }
        }

        if (this._comboLevel > oldLevel) {
            this._events.emit('comboUp', { level: this._comboLevel, mult: this.getMult() });
        }
    }

    getMult() { return Config.COMBO_LEVELS[this._comboLevel] || 1; }
    getLevel() { return this._comboLevel; }
    getClicks() { return this._clicks; }
    getNextThreshold() {
        const next = Config.COMBO_THRESHOLDS[this._comboLevel + 1];
        return next !== undefined ? next : null;
    }

    _reset() {
        this._clicks = 0;
        this._comboLevel = 0;
        this._events.emit('comboReset', {});
    }

    getState() { return {}; }
    loadState() {}
}
