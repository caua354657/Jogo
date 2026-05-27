class SaveManager {
    constructor() {
        this._key = Config.SAVE_KEY;
        this._backupKey = Config.SAVE_KEY + '_bak';
        this._lastSave = 0;
    }

    save(state) {
        try {
            const data = JSON.stringify({ ...state, savedAt: Date.now(), version: Config.VERSION });
            const existing = localStorage.getItem(this._key);
            if (existing) localStorage.setItem(this._backupKey, existing);
            localStorage.setItem(this._key, data);
            this._lastSave = Date.now();
            return true;
        } catch (e) {
            console.error('Save failed:', e);
            return false;
        }
    }

    load() {
        try {
            const raw = localStorage.getItem(this._key);
            if (!raw) return null;
            return JSON.parse(raw);
        } catch (e) {
            console.warn('Primary save corrupt, trying backup...');
            try {
                const bak = localStorage.getItem(this._backupKey);
                return bak ? JSON.parse(bak) : null;
            } catch { return null; }
        }
    }

    wipe() {
        localStorage.removeItem(this._key);
        localStorage.removeItem(this._backupKey);
    }

    exportFile() {
        const raw = localStorage.getItem(this._key);
        if (!raw) return false;
        try {
            const data = JSON.parse(raw);
            const json = JSON.stringify(data, null, 2);
            const blob = new Blob([json], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            const date = new Date().toISOString().split('T')[0];
            a.download = `nexuscore_save_${date}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            return true;
        } catch { return false; }
    }

    importFile(file) {
        return new Promise((resolve, reject) => {
            if (!file || !file.name.endsWith('.json')) {
                reject('Arquivo inválido. Use um .json exportado pelo jogo.');
                return;
            }
            const reader = new FileReader();
            reader.onload = e => {
                try {
                    const data = JSON.parse(e.target.result);
                    if (!data.economy || !data.upgrades || !data.stats) {
                        reject('Save inválido ou de outro jogo.');
                        return;
                    }
                    // Back up current save before overwriting
                    const existing = localStorage.getItem(this._key);
                    if (existing) localStorage.setItem(this._backupKey, existing);
                    localStorage.setItem(this._key, JSON.stringify(data));
                    resolve();
                } catch {
                    reject('Arquivo corrompido ou inválido.');
                }
            };
            reader.onerror = () => reject('Erro ao ler o arquivo.');
            reader.readAsText(file);
        });
    }

    timeSinceSave() {
        return this._lastSave ? (Date.now() - this._lastSave) / 1000 : null;
    }
}
