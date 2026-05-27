class AudioManager {
    constructor() {
        this._ctx = null;
        this._enabled = true;
        this._sfxVol = 0.4;
        this._musicVol = 0.15;
        this._musicGain = null;
        this._musicNodes = [];
        this._musicStarted = false;
    }

    _getCtx() {
        if (!this._ctx) {
            try { this._ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch { return null; }
        }
        if (this._ctx.state === 'suspended') this._ctx.resume();
        return this._ctx;
    }

    _playTone(freq, type, duration, vol = 0.3, detune = 0) {
        const ctx = this._getCtx();
        if (!ctx || !this._enabled) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = type;
        osc.frequency.value = freq;
        osc.detune.value = detune;
        const t = ctx.currentTime;
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(vol * this._sfxVol, t + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, t + duration);
        osc.start(t);
        osc.stop(t + duration + 0.05);
    }

    _playNoise(duration, vol = 0.2, filter = 800) {
        const ctx = this._getCtx();
        if (!ctx || !this._enabled) return;
        const bufSize = ctx.sampleRate * duration;
        const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
        const data = buf.getChannelData(0);
        for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
        const src = ctx.createBufferSource();
        src.buffer = buf;
        const filt = ctx.createBiquadFilter();
        filt.type = 'bandpass';
        filt.frequency.value = filter;
        const gain = ctx.createGain();
        src.connect(filt);
        filt.connect(gain);
        gain.connect(ctx.destination);
        const t = ctx.currentTime;
        gain.gain.setValueAtTime(vol * this._sfxVol, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + duration);
        src.start(t);
    }

    click() {
        this._playTone(880, 'sine', 0.08, 0.25);
        this._playTone(1320, 'sine', 0.06, 0.15, 0);
    }

    critClick() {
        this._playTone(440, 'square', 0.05, 0.15);
        setTimeout(() => this._playTone(660, 'square', 0.05, 0.2), 50);
        setTimeout(() => this._playTone(880, 'sine', 0.15, 0.35), 100);
        setTimeout(() => this._playTone(1100, 'sine', 0.1, 0.3), 150);
    }

    buy() {
        this._playTone(523, 'sine', 0.1, 0.2);
        setTimeout(() => this._playTone(659, 'sine', 0.1, 0.2), 60);
        setTimeout(() => this._playTone(784, 'sine', 0.15, 0.25), 120);
    }

    upgrade() {
        [261, 329, 392, 523].forEach((f, i) => {
            setTimeout(() => this._playTone(f, 'sine', 0.12, 0.25), i * 80);
        });
    }

    levelUp() {
        [261, 329, 392, 523, 659].forEach((f, i) => {
            setTimeout(() => this._playTone(f * 2, 'square', 0.15, 0.3), i * 70);
        });
    }

    achievement() {
        this._playTone(784, 'sine', 0.08, 0.3);
        setTimeout(() => this._playTone(1047, 'sine', 0.08, 0.1), 80);
        setTimeout(() => this._playTone(1319, 'sine', 0.2, 0.4), 160);
    }

    prestige() {
        for (let i = 0; i < 8; i++) {
            setTimeout(() => this._playTone(261 * (1 + i * 0.15), 'sine', 0.3, 0.35), i * 100);
        }
    }

    notification() { this._playTone(660, 'sine', 0.12, 0.2); }
    error() { this._playTone(220, 'sawtooth', 0.15, 0.3); }
    event() {
        this._playTone(440, 'square', 0.05, 0.2);
        setTimeout(() => this._playTone(880, 'sine', 0.2, 0.4), 100);
    }

    startAmbient() {
        if (this._musicStarted) return;
        const ctx = this._getCtx();
        if (!ctx) return;
        this._musicStarted = true;
        this._musicGain = ctx.createGain();
        this._musicGain.gain.value = this._musicVol;
        this._musicGain.connect(ctx.destination);
        this._createAmbientLayer(55, 0.15);
        this._createAmbientLayer(110, 0.08);
        this._createAmbientLayer(220, 0.04);
        this._createArpeggio();
    }

    _createAmbientLayer(freq, vol) {
        const ctx = this._getCtx();
        if (!ctx) return;
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = freq;
        const gain = ctx.createGain();
        gain.gain.value = vol;
        const lfo = ctx.createOscillator();
        lfo.frequency.value = 0.1 + Math.random() * 0.2;
        const lfoGain = ctx.createGain();
        lfoGain.gain.value = vol * 0.3;
        lfo.connect(lfoGain);
        lfoGain.connect(gain.gain);
        osc.connect(gain);
        gain.connect(this._musicGain);
        osc.start();
        lfo.start();
        this._musicNodes.push(osc, lfo);
    }

    _createArpeggio() {
        const ctx = this._getCtx();
        if (!ctx) return;
        const notes = [130.81, 164.81, 196, 261.63, 329.63];
        let i = 0;
        const play = () => {
            if (!this._musicStarted) return;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.value = notes[i % notes.length];
            const t = ctx.currentTime;
            gain.gain.setValueAtTime(0, t);
            gain.gain.linearRampToValueAtTime(0.04 * this._musicVol, t + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.001, t + 0.8);
            osc.connect(gain);
            gain.connect(this._musicGain);
            osc.start(t);
            osc.stop(t + 0.85);
            i++;
            setTimeout(play, 400 + Math.random() * 200);
        };
        play();
    }

    setMusicVol(v) {
        this._musicVol = v;
        if (this._musicGain) this._musicGain.gain.value = v;
    }

    setSfxVol(v) { this._sfxVol = v; }

    setEnabled(v) {
        this._enabled = v;
        if (this._musicGain && this._ctx) {
            this._musicGain.gain.setTargetAtTime(v ? this._musicVol : 0, this._ctx.currentTime, 0.1);
        }
    }

    isEnabled() { return this._enabled; }

    get sfxVol() { return this._sfxVol; }
    get musicVol() { return this._musicVol; }

    getState() {
        return { sfxVol: this._sfxVol, musicVol: this._musicVol, enabled: this._enabled };
    }

    loadState(s) {
        if (!s) return;
        if (s.sfxVol !== undefined) this._sfxVol = s.sfxVol;
        if (s.musicVol !== undefined) {
            this._musicVol = s.musicVol;
            if (this._musicGain) this._musicGain.gain.value = s.musicVol;
        }
        if (s.enabled !== undefined) {
            this._enabled = s.enabled;
            if (this._musicGain && this._ctx) {
                this._musicGain.gain.setTargetAtTime(s.enabled ? this._musicVol : 0, this._ctx.currentTime, 0.1);
            }
        }
    }
}
