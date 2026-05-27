class TutorialManager {
    constructor(events, missionManager) {
        this._events = events;
        this._missions = missionManager;
        this._overlay = null;
        this._active = false;
        this._dismissed = false;
    }

    init() {
        this._overlay = document.getElementById('tutorial-overlay');
        if (!this._overlay) return;
        document.getElementById('tutorial-close')?.addEventListener('click', () => this.dismiss());
        this._update();
        this._events.on('missionComplete', () => this._update());
    }

    _update() {
        if (this._dismissed) return;
        const m = this._missions.getActiveTutorial();
        if (!m) { this.dismiss(); return; }

        const titleEl = document.getElementById('tutorial-title');
        const descEl = document.getElementById('tutorial-desc');
        const progEl = document.getElementById('tutorial-progress');
        const p = this._missions.progress[m.id];

        if (titleEl) titleEl.textContent = m.icon + ' ' + m.name;
        if (descEl) descEl.textContent = m.desc;
        if (progEl && p) {
            progEl.style.width = (p.pct * 100) + '%';
        }

        if (this._overlay) this._overlay.classList.remove('hidden');
        this._active = true;
    }

    dismiss() {
        this._dismissed = true;
        this._active = false;
        if (this._overlay) this._overlay.classList.add('hidden');
    }

    isActive() { return this._active; }

    getState() { return { dismissed: this._dismissed }; }
    loadState(s) {
        if (s?.dismissed) {
            this._dismissed = true;
            if (this._overlay) this._overlay.classList.add('hidden');
        }
    }
}
