class NeuralBackground {
    constructor(canvas) {
        this._canvas = canvas;
        this._ctx = canvas.getContext('2d');
        this._nodes = [];
        this._snow  = [];
        this._fog   = [];
        this._sparks = [];
        this._scan  = false;
        this._grid  = false;
        this._t     = 0;
        this._resize();
        window.addEventListener('resize', () => this._resize());
        this._init();
    }

    reinit() { this._init(); }

    _resize() {
        this._canvas.width  = window.innerWidth;
        this._canvas.height = window.innerHeight;
        this._init();
    }

    _getSkin()  { return document.body.dataset.skin || 'default'; }

    _getTheme() {
        const skin = this._getSkin();
        /* fill  = base background fill colour
           col1  = primary node colour (70 % of nodes)
           col2  = secondary node colour (30 % of nodes)
           mix   = connection line colour when two different-colour nodes meet
           edge  = edge darkening gradient stop
           center= centre gradient stop (usually near-transparent) */
        const T = {
            default:  { fill:'#050510', col1:'#00f5ff', col2:'#7b2fff', mix:'#aa44ff', edge:'rgba(5,5,16,0.6)',    center:'rgba(10,5,40,0.0)'  },
            christmas:{ fill:'#030b05', col1:'#dc143c', col2:'#228b22', mix:'#8b4000', edge:'rgba(3,10,4,0.72)',   center:'rgba(15,3,3,0.0)'   },
            halloween:{ fill:'#050008', col1:'#ff6400', col2:'#9b30ff', mix:'#cc3080', edge:'rgba(5,0,10,0.75)',   center:'rgba(10,0,18,0.0)'  },
            newyear:  { fill:'#030308', col1:'#ffd700', col2:'#a0a0a0', mix:'#d8a020', edge:'rgba(3,3,10,0.65)',   center:'rgba(8,8,5,0.0)'    },
            cyberpunk:{ fill:'#020010', col1:'#ff0080', col2:'#00f5ff', mix:'#8800cc', edge:'rgba(2,0,16,0.75)',   center:'rgba(5,0,22,0.0)'   },
            pixelneon:{ fill:'#020008', col1:'#00ff88', col2:'#ff00ff', mix:'#8800ff', edge:'rgba(2,0,8,0.70)',    center:'rgba(4,0,12,0.0)'   },
        };
        return T[skin] || T.default;
    }

    _init() {
        const theme = this._getTheme();
        this._nodes = [];
        const count = Config.NEURAL_NODES;
        for (let i = 0; i < count; i++) {
            this._nodes.push({
                x: Math.random() * this._canvas.width,
                y: Math.random() * this._canvas.height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                r: 1.5 + Math.random() * 2.5,
                pulse: Math.random() * Math.PI * 2,
                pulseSpeed: 0.02 + Math.random() * 0.03,
                color: Math.random() < 0.7 ? theme.col1 : theme.col2,
            });
        }
        this._initEffects();
    }

    _initEffects() {
        const skin = this._getSkin();
        this._snow   = [];
        this._fog    = [];
        this._sparks = [];
        this._scan   = false;
        this._grid   = false;

        if (skin === 'christmas') {
            for (let i = 0; i < 90; i++) this._snow.push(this._newSnow(true));
        } else if (skin === 'halloween') {
            for (let i = 0; i < 6; i++) this._fog.push(this._newFog());
        } else if (skin === 'cyberpunk') {
            this._scan = true;
        } else if (skin === 'pixelneon') {
            this._grid = true;
        }
        // newyear: sparks are spawned dynamically in update()
    }

    /* ── Effect factories ── */
    _newSnow(randomY = false) {
        return {
            x: Math.random() * this._canvas.width,
            y: randomY ? Math.random() * this._canvas.height : -6,
            vy: 0.22 + Math.random() * 0.68,
            vx: (Math.random() - 0.5) * 0.3,
            r:  0.5 + Math.random() * 2,
            alpha: 0.3 + Math.random() * 0.55,
            wobble: Math.random() * Math.PI * 2,
            wobbleSpeed: 0.007 + Math.random() * 0.014,
        };
    }

    _newFog() {
        const W = this._canvas.width, H = this._canvas.height;
        const cols = ['rgba(155,48,255,', 'rgba(255,100,0,'];
        return {
            x: Math.random() * W,
            y: Math.random() * H,
            r: 180 + Math.random() * 240,
            alpha: 0.024 + Math.random() * 0.028,
            vx: (Math.random() - 0.5) * 0.11,
            vy: (Math.random() - 0.5) * 0.07,
            pulse: Math.random() * Math.PI * 2,
            col: cols[Math.floor(Math.random() * cols.length)],
        };
    }

    _newSpark() {
        const W = this._canvas.width, H = this._canvas.height;
        return {
            x: 0.15 * W + Math.random() * W * 0.7,
            y: H + 5,
            vx: (Math.random() - 0.5) * 1.8,
            vy: -(1.8 + Math.random() * 3.5),
            life: 1,
            decay: 0.008 + Math.random() * 0.014,
            r:  0.5 + Math.random() * 1.5,
            col: Math.random() < 0.65 ? 'rgba(255,215,0,' : 'rgba(255,248,192,',
        };
    }

    /* ── Update ── */
    update() {
        this._t += 0.01;

        // Snow
        for (let i = 0; i < this._snow.length; i++) {
            const s = this._snow[i];
            s.wobble += s.wobbleSpeed;
            s.y += s.vy;
            s.x += s.vx + Math.sin(s.wobble) * 0.28;
            if (s.y > this._canvas.height + 6) this._snow[i] = this._newSnow(false);
        }

        // Fog
        for (const f of this._fog) {
            f.x += f.vx; f.y += f.vy; f.pulse += 0.009;
            const W = this._canvas.width, H = this._canvas.height;
            if (f.x < -f.r) f.x = W + f.r;
            if (f.x > W + f.r) f.x = -f.r;
            if (f.y < -f.r) f.y = H + f.r;
            if (f.y > H + f.r) f.y = -f.r;
        }

        // New Year sparks
        if (this._getSkin() === 'newyear') {
            if (Math.random() < 0.055) this._sparks.push(this._newSpark());
            for (let i = this._sparks.length - 1; i >= 0; i--) {
                const s = this._sparks[i];
                s.x += s.vx; s.y += s.vy;
                s.vy *= 0.992;
                s.life -= s.decay;
                if (s.life <= 0) this._sparks.splice(i, 1);
            }
        }

        // Neural nodes
        this._nodes.forEach(n => {
            n.x += n.vx; n.y += n.vy;
            n.pulse += n.pulseSpeed;
            if (n.x < 0 || n.x > this._canvas.width)  n.vx *= -1;
            if (n.y < 0 || n.y > this._canvas.height) n.vy *= -1;
            n.x = Math.max(0, Math.min(this._canvas.width,  n.x));
            n.y = Math.max(0, Math.min(this._canvas.height, n.y));
        });
    }

    /* ── Draw ── */
    draw() {
        const ctx = this._ctx;
        const W = this._canvas.width, H = this._canvas.height;
        const theme = this._getTheme();

        // Base fill
        ctx.fillStyle = theme.fill;
        ctx.fillRect(0, 0, W, H);

        // Pixel grid (Pixel Neon) — drawn first, beneath nodes
        if (this._grid) this._drawGrid(ctx, W, H);

        // Radial vignette
        const grad = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.max(W, H) * 0.7);
        grad.addColorStop(0, theme.center);
        grad.addColorStop(1, theme.edge);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, W, H);

        // Halloween fog
        for (const f of this._fog) {
            const pulse = 0.82 + Math.sin(f.pulse) * 0.18;
            const rr = f.r * pulse;
            const fg = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, rr);
            fg.addColorStop(0, f.col + f.alpha + ')');
            fg.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.save();
            ctx.globalAlpha = 1;
            ctx.fillStyle = fg;
            ctx.beginPath(); ctx.arc(f.x, f.y, rr, 0, Math.PI * 2); ctx.fill();
            ctx.restore();
        }

        // Node connections
        ctx.save();
        for (let i = 0; i < this._nodes.length; i++) {
            for (let j = i + 1; j < this._nodes.length; j++) {
                const a = this._nodes[i], b = this._nodes[j];
                const dx = a.x - b.x, dy = a.y - b.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 180) {
                    const alpha = (1 - dist / 180) * 0.25;
                    const pulse = (Math.sin(a.pulse) + Math.sin(b.pulse)) * 0.05;
                    ctx.strokeStyle = a.color === b.color ? a.color : theme.mix;
                    ctx.globalAlpha  = alpha + pulse;
                    ctx.lineWidth    = 0.6;
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.stroke();
                    // Data packet
                    if (Math.random() < 0.001) {
                        const t = (Date.now() % 2000) / 2000;
                        ctx.globalAlpha = 0.8;
                        ctx.fillStyle = a.color;
                        ctx.beginPath();
                        ctx.arc(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t, 2, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }
            }
        }
        ctx.restore();

        // Neural nodes
        this._nodes.forEach(n => {
            const pulse = Math.sin(n.pulse);
            ctx.save();
            ctx.globalAlpha  = 0.6 + pulse * 0.3;
            ctx.fillStyle    = n.color;
            ctx.shadowColor  = n.color;
            ctx.shadowBlur   = 8 + pulse * 6;
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.r + pulse * 0.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        });

        // Christmas snow
        if (this._snow.length > 0) {
            for (const s of this._snow) {
                ctx.save();
                ctx.globalAlpha = s.alpha;
                ctx.fillStyle   = '#ffffff';
                ctx.shadowColor = '#ccffe8';
                ctx.shadowBlur  = 4;
                ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
                ctx.restore();
            }
        }

        // New Year sparks
        if (this._sparks.length > 0) {
            for (const s of this._sparks) {
                ctx.save();
                ctx.globalAlpha = s.life;
                ctx.fillStyle   = s.col + s.life + ')';
                ctx.shadowColor = '#ffd700';
                ctx.shadowBlur  = 7;
                ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
                ctx.restore();
            }
        }

        // Cyberpunk scanlines — drawn last (on top)
        if (this._scan) this._drawScanlines(ctx, W, H);
    }

    /* ── Effect renderers ── */
    _drawScanlines(ctx, W, H) {
        ctx.save();
        ctx.globalAlpha = 0.045;
        ctx.fillStyle = '#000000';
        for (let y = 0; y < H; y += 4) ctx.fillRect(0, y, W, 2);
        // Moving neon sweep
        const sweepY = ((this._t * 28) % (H + 80)) - 40;
        ctx.globalAlpha = 0.07;
        ctx.fillStyle = '#ff0080';
        ctx.fillRect(0, sweepY, W, 2);
        ctx.restore();
    }

    _drawGrid(ctx, W, H) {
        const size = 24;
        ctx.save();
        ctx.strokeStyle = 'rgba(255,0,255,0.06)';
        ctx.lineWidth   = 0.5;
        for (let x = 0; x < W; x += size) {
            ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
        }
        for (let y = 0; y < H; y += size) {
            ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
        }
        // Pulsing grid dots
        const phase = this._t;
        ctx.fillStyle   = '#00ff88';
        ctx.shadowColor = '#00ff88';
        ctx.shadowBlur  = 5;
        for (let gx = 0; gx < W; gx += size * 3) {
            for (let gy = 0; gy < H; gy += size * 3) {
                const flicker = (Math.sin(phase + gx * 0.09 + gy * 0.09) + 1) * 0.5;
                ctx.globalAlpha = flicker * 0.32;
                ctx.beginPath(); ctx.arc(gx, gy, 1.5, 0, Math.PI * 2); ctx.fill();
            }
        }
        ctx.restore();
    }
}
