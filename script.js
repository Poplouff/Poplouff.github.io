/* ── Détection tactile ───────────────────────────────────── */
const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

/* ── Curseur (desktop uniquement) ────────────────────────── */
if (!isTouchDevice) {
    const cursorDot = document.createElement('div');
    const cursorRing = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    cursorRing.className = 'cursor-ring';
    document.body.append(cursorDot, cursorRing);

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });

    (function animateCursor() {
        ringX += (mouseX - ringX) * 0.12;
        ringY += (mouseY - ringY) * 0.12;
        cursorRing.style.left = ringX + 'px';
        cursorRing.style.top = ringY + 'px';
        requestAnimationFrame(animateCursor);
    })();
}

/* ── Tap ripple (mobile uniquement) ─────────────────────── */
if (isTouchDevice) {
    document.body.style.cursor = 'auto';

    document.addEventListener('touchstart', e => {
        const touch = e.touches[0];
        const ripple = document.createElement('div');
        ripple.className = 'touch-ripple';
        ripple.style.left = touch.clientX + 'px';
        ripple.style.top = touch.clientY + 'px';
        ripple.textContent = '+';
        document.body.appendChild(ripple);
        setTimeout(() => ripple.remove(), 650);
    }, { passive: true });
}

/* ── Canvas constellation (style Minecraft nocturne) ─────── */
const canvas = document.getElementById('stars-canvas');
const ctx = canvas.getContext('2d');

let stars = [];
const STAR_COUNT = 200;
const CONNECT_DIST = 100; /* Distance max pour tracer une ligne entre étoiles */

/* Couleurs Minecraft : étoiles blanches, jaunes et bleu diamant */
const STAR_COLORS = [
    [245, 245, 245],   /* Blanc */
    [255, 220, 100],   /* Or */
    [85,  255, 255],   /* Diamant */
    [200, 230, 200],   /* Vert pâle */
];

function resizeCanvas() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', () => { resizeCanvas(); initStars(); });
resizeCanvas();

class Star {
    constructor() { this.reset(true); }

    reset(initial = false) {
        this.x = Math.random() * canvas.width;
        this.y = initial ? Math.random() * canvas.height : -2;
        /* Taille pixelisée : valeurs entières par paliers */
        this.radius = Math.floor(Math.random() * 2) + 1;
        this.alpha = Math.random() * 0.6 + 0.2;
        this.speed = Math.random() * 0.06 + 0.01;
        this.twinkleSpeed = Math.random() * 0.006 + 0.002;
        this.twinkleDir = Math.random() > 0.5 ? 1 : -1;
        this.color = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];
    }

    update() {
        this.y += this.speed;
        this.alpha += this.twinkleSpeed * this.twinkleDir;
        if (this.alpha > 0.9 || this.alpha < 0.1) this.twinkleDir *= -1;
        if (this.y > canvas.height + 2) this.reset();
    }

    draw() {
        const [r, g, b] = this.color;
        /* Dessin carré (pixelisé) plutôt que rond */
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.alpha})`;
        ctx.fillRect(
            Math.round(this.x) - this.radius,
            Math.round(this.y) - this.radius,
            this.radius * 2,
            this.radius * 2
        );
    }
}

function initStars() {
    stars = Array.from({ length: STAR_COUNT }, () => new Star());
}

/* Position de la souris pour les constellations interactives */
let mx = -9999, my = -9999;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

function drawConstellations() {
    for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
            const dx = stars[i].x - stars[j].x;
            const dy = stars[i].y - stars[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < CONNECT_DIST) {
                /* Distance de la souris au milieu du segment */
                const midX = (stars[i].x + stars[j].x) / 2;
                const midY = (stars[i].y + stars[j].y) / 2;
                const mdx = midX - mx;
                const mdy = midY - my;
                const mouseDist = Math.sqrt(mdx * mdx + mdy * mdy);

                /* N'affiche les lignes que si la souris est proche */
                const maxMouseDist = 180;
                if (mouseDist > maxMouseDist) continue;

                const proximity = 1 - mouseDist / maxMouseDist;
                const alpha = (1 - dist / CONNECT_DIST) * 0.3 * proximity;

                ctx.beginPath();
                ctx.moveTo(Math.round(stars[i].x), Math.round(stars[i].y));
                ctx.lineTo(Math.round(stars[j].x), Math.round(stars[j].y));
                /* Vert Creeper pour les constellations */
                ctx.strokeStyle = `rgba(85, 255, 85, ${alpha})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => { s.update(); s.draw(); });
    drawConstellations();
    requestAnimationFrame(animate);
}

initStars();
animate();

/* ── Parallax hero + navbar ──────────────────────────────── */
const hero = document.querySelector('.hero');
const nav  = document.querySelector('.nav');
window.addEventListener('scroll', () => {
    hero.style.transform = `translateY(${window.scrollY * 0.18}px)`;
    nav.classList.toggle('scrolled', window.scrollY > 10);
});

/* ── Intersection Observer (sections + projets) ──────────── */
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.15 });

document.querySelectorAll('.section, .project').forEach(el => observer.observe(el));
