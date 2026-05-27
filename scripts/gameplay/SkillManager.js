class SkillManager {
    constructor(economy, upgradeManager) {
        this._economy = economy;
        this._upgradeManager = upgradeManager;
        this.skillPoints = 0;
        this.levels = {};
        SKILLS.forEach(s => { this.levels[s.id] = 0; });

        this._genCostDiscount = 0;
        this._xpMult = 1;
        this._offlineMult = 1;
        this._critBonus = 0;
    }

    addSkillPoint(amount) {
        this.skillPoints += amount;
    }

    canUpgrade(skillId) {
        const skill = SKILLS.find(s => s.id === skillId);
        if (!skill) return false;
        const level = this.levels[skillId] || 0;
        if (level >= skill.maxLevel) return false;
        return this.skillPoints >= skill.costs[level];
    }

    upgrade(skillId) {
        if (!this.canUpgrade(skillId)) return false;
        const skill = SKILLS.find(s => s.id === skillId);
        const level = this.levels[skillId];
        this.skillPoints -= skill.costs[level];
        this.levels[skillId] = level + 1;
        this._applyAll();
        return true;
    }

    _applyAll() {
        let clickMult = 1;
        let globalMult = 1;
        this._genCostDiscount = 0;
        this._xpMult = 1;
        this._offlineMult = 1;
        this._critBonus = 0;

        SKILLS.forEach(skill => {
            const level = this.levels[skill.id] || 0;
            if (level === 0) return;
            const total = skill.effectPerLevel * level;
            switch (skill.effectType) {
                case 'click_mult':        clickMult += total; break;
                case 'global_mult':       globalMult += total; break;
                case 'gen_cost_discount': this._genCostDiscount = Math.min(0.4, total); break;
                case 'xp_mult':           this._xpMult = 1 + total; break;
                case 'offline_mult':      this._offlineMult = 1 + total; break;
                case 'crit_chance':       this._critBonus += total; break;
            }
        });

        this._economy.setSkillClickMult(clickMult);
        this._economy.setSkillGlobalMult(globalMult);
        if (this._upgradeManager) {
            this._upgradeManager.setSkillCostDiscount(this._genCostDiscount);
        }
    }

    getGenCostDiscount() { return this._genCostDiscount; }
    getXpMult()          { return this._xpMult; }
    getOfflineMult()     { return this._offlineMult; }
    getCritBonus()       { return this._critBonus; }

    getState() {
        return { skillPoints: this.skillPoints, levels: { ...this.levels } };
    }

    loadState(s) {
        if (!s) return;
        this.skillPoints = s.skillPoints || 0;
        SKILLS.forEach(skill => {
            this.levels[skill.id] = s.levels?.[skill.id] || 0;
        });
        this._applyAll();
    }
}
