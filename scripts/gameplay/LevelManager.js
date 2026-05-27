class LevelManager {
    constructor(events) {
        this._events = events;
        this.level = 1;
        this.xp = 0;
        this.totalXp = 0;
    }

    xpForLevel(lvl) {
        return Math.floor(100 * Math.pow(1.15, lvl - 1));
    }

    addXP(amount) {
        this.xp += amount;
        this.totalXp += amount;
        let leveled = false;
        while (this.xp >= this.xpForLevel(this.level)) {
            this.xp -= this.xpForLevel(this.level);
            this.level++;
            leveled = true;
            this._events.emit('levelUp', { level: this.level });
        }
        return leveled;
    }

    xpFromNeurons(neurons) {
        return Math.max(1, Math.floor(Math.log10(Math.max(10, neurons))));
    }

    getProgress() {
        const needed = this.xpForLevel(this.level);
        return { cur: this.xp, max: needed, pct: this.xp / needed };
    }

    getState() { return { level: this.level, xp: this.xp, totalXp: this.totalXp }; }

    loadState(s) {
        if (!s) return;
        this.level = s.level || 1;
        this.xp = s.xp || 0;
        this.totalXp = s.totalXp || 0;
    }
}
