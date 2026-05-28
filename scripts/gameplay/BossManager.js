class BossManager {
    constructor(game) {
        this._game      = game;
        this.boss       = null;   // current boss state from server
        this.myDamage   = 0;
        this.myRank     = null;
        this.top        = [];

        this._dmgBuffer  = 0;
        this._lastFlush  = 0;
        this._flushDelay = 400;   // ms between server attack calls
        this._pollTimer  = null;
        this._passiveAcc = 0;     // accumulated passive damage
    }

    // ── Public ──────────────────────────────────────────────────────────────

    /** Called every game tick with dt in seconds. Accumulates passive DPS. */
    tick(dt) {
        if (!this.boss || this.boss.status !== 'active') return;
        const passiveDps = this._game.economy.getEffectiveNPS() * 0.0005; // 0.05% NPS
        this._passiveAcc += passiveDps * dt;

        // Flush buffer every 400ms
        const now = Date.now();
        if (now - this._lastFlush >= this._flushDelay && this._dmgBuffer + this._passiveAcc > 0) {
            this._flush();
        }
    }

    /** Called on each click while boss panel is open. */
    attackClick() {
        if (!this.boss || this.boss.status !== 'active') return;
        const dmg = this._game.economy.getClickValue() * this._game.combo.getMult();
        this._dmgBuffer += dmg;

        const now = Date.now();
        if (now - this._lastFlush >= this._flushDelay) {
            this._flush();
        }
    }

    startPolling(ms = 4000) {
        this.stopPolling();
        this.fetchState();                                   // immediate first fetch
        this._pollTimer = setInterval(() => this.fetchState(), ms);
    }

    stopPolling() {
        if (this._pollTimer) { clearInterval(this._pollTimer); this._pollTimer = null; }
        // Flush any remaining damage before leaving
        if (this._dmgBuffer + this._passiveAcc > 0) this._flush();
    }

    async fetchState() {
        try {
            const res  = await fetch('api/boss.php?action=state');
            const data = await res.json();
            if (!data.ok) return;

            this.boss     = data.boss;
            this.myDamage = data.myDamage || 0;
            this.myRank   = data.myRank   || null;
            this.top      = data.top      || [];

            // Server-side rewards granted
            if (data.rewards && (data.rewards.neurons > 0 || data.rewards.diamonds > 0)) {
                this._applyRewards(data.rewards);
            }

            this._game.events.emit('bossStateUpdate', { boss: this.boss });
        } catch { /* offline */ }
    }

    // ── Private ─────────────────────────────────────────────────────────────

    async _flush() {
        const total = this._dmgBuffer + Math.floor(this._passiveAcc);
        if (total <= 0) return;
        if (!this._game.account.isLoggedIn()) {
            // Apply locally for offline preview (no server update)
            if (this.boss) this.boss.currentHp = Math.max(0, (this.boss.currentHp || 0) - total);
            this._dmgBuffer  = 0;
            this._passiveAcc = 0;
            return;
        }

        this._dmgBuffer  = 0;
        this._passiveAcc = 0;
        this._lastFlush  = Date.now();

        try {
            const res = await fetch('api/boss.php', {
                method:  'POST',
                headers: { 'Content-Type': 'application/json' },
                body:    JSON.stringify({ action: 'attack', damage: total }),
            });
            const data = await res.json();
            if (data.ok && this.boss) {
                this.boss.currentHp = data.currentHp;
                this.boss.pct       = data.pct;
                this.myDamage       = data.myDamage;
                if (data.defeated && this.boss.status === 'active') {
                    this.boss.status = 'defeated';
                    this._game.events.emit('bossDefeated', { boss: this.boss });
                    this._game.audio.upgrade();
                }
                this._game.events.emit('bossHit', { hp: data.currentHp, pct: data.pct, dmg: total });
            }
        } catch { /* network error — damage lost */ }
    }

    _applyRewards(rewards) {
        const g = this._game;
        if (rewards.neurons > 0) g.economy.addNeurons(rewards.neurons);
        if (rewards.diamonds > 0) {
            g.economy.prestigeTokens += rewards.diamonds;
            g.economy._updatePrestigeMult?.();
        }
        const bossData = this.boss ? (BOSS_TYPES[this.boss.type] || {}) : {};
        const name = bossData.name || 'Boss';
        g.notify(`${bossData.deathMsg || 'Boss derrotado!'} +${rewards.diamonds} 💎`, 'gold');
        g.events.emit('bossRewardClaimed', rewards);
    }
}
