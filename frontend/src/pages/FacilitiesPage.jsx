import SEO from '../components/SEO';
/**
 * FacilitiesPage.jsx
 * Rebuilt from scratch.
 * Hero: Aether Ribbon Mesh (animated canvas with cursor-reactive ribbons)
 * Sections: [Space reserved for future content blocks]
 * Footer: Shared <Footer /> component
 */

import { useEffect, useRef, useState } from 'react';
import CarouselStacked from '../components/ui/carousel-stacked';
import BorderGlow from '../components/ui/BorderGlow';
import { getClubs } from '../services/api';
import { localizedText, useLanguage } from '../context/LanguageContext';

const TRANSLATIONS = {
  en: {
    heroLabel: "PSNM UPS · CAMPUS FACILITIES",
    heroTitle: "FACILITIES",
    heroSubtitle: "World-class infrastructure designed to inspire curiosity, creativity, and academic excellence — all under one roof.",
    scroll: "SCROLL",
    sectionLabel: "CAMPUS INFRASTRUCTURE",
    sectionTitle: "Our Facilities",
    sectionDesc: "Drag or swipe the cards to explore each facility. Tap a dot to jump directly to any item.",
    clubsLabel: "STUDENT LIFE",
    clubsTitle: "Clubs & Activities",
    clubsDesc: "From agriculture to radio, from Sanskrit to sustainability — our clubs give every student a stage to discover their passion."
  },
  ml: {
    heroLabel: "PSNM UPS · ക്യാമ്പസ് സൗകര്യങ്ങൾ",
    heroTitle: "സൗകര്യങ്ങൾ",
    heroSubtitle: "ജിജ്ഞാസ, സർഗ്ഗാത്മകത, അക്കാദമിക് മികവ് എന്നിവയ്ക്ക് പ്രചോദനം നൽകുന്നതിനായി രൂപകൽപ്പന ചെയ്ത ലോകോത്തര അടിസ്ഥാന സൗകര്യങ്ങൾ - എല്ലാം ഒരേ മേൽക്കൂരയിൽ.",
    scroll: "സ്ക്രോൾ ചെയ്യുക",
    sectionLabel: "ക്യാമ്പസ് അടിസ്ഥാന സൗകര്യങ്ങൾ",
    sectionTitle: "ഞങ്ങളുടെ സൗകര്യങ്ങൾ",
    sectionDesc: "ഓരോ സൗകര്യവും പര്യവേക്ഷണം ചെയ്യാൻ കാർഡുകൾ വലിക്കുകയോ സ്വൈപ്പ് ചെയ്യുകയോ ചെയ്യുക.",
    clubsLabel: "വിദ്യാർത്ഥി ജീവിതം",
    clubsTitle: "ക്ലബ്ബുകളും പ്രവർത്തനങ്ങളും",
    clubsDesc: "കൃഷിമുതൽ റേഡിയോ വരെ, സംസ്കൃതം മുതൽ സുസ്ഥിരത വരെ - ഞങ്ങളുടെ ക്ലബ്ബുകൾ ഓരോ വിദ്യാർത്ഥിക്കും അവരുടെ കഴിവുകൾ കണ്ടെത്താൻ ഒരു വേദി നൽകുന്നു."
  }
};
/* =========================================================
   PARTICLE CLASS (converted from TypeScript to plain JS)
========================================================= */
class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 2;
    this.vy = (Math.random() - 0.5) * 2;
    this.maxLife = 80 + Math.random() * 60;
    this.life = this.maxLife;
    this.size = 1 + Math.random() * 2;
    this.color = color;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life -= 1;
    this.vx *= 0.98;
    this.vy *= 0.98;
  }

  draw(ctx) {
    if (this.life <= 0) return;
    ctx.globalAlpha = this.life / this.maxLife;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1.0;
  }
}

/* =========================================================
   AETHER RIBBON MESH — HERO COMPONENT
========================================================= */
function AetherRibbonMesh() {
  const canvasRef = useRef(null);
  const { language } = useLanguage();
  const t = TRANSLATIONS[language];
  
  // The hero section is locked to a dark theme for optimal ribbon visuals

  // Canvas animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrameId;
    let width = 0;
    let height = 0;

    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0, active: false };
    const particles = [];
    const clickRipple = { x: 0, y: 0, radius: 0, maxRadius: 400, speed: 14 };

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    const handlePointerMove = (e) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      mouse.targetX = clientX - width / 2;
      mouse.targetY = clientY - height / 2;
      mouse.active = true;
    };

    const handlePointerLeave = () => {
      mouse.targetX = 0;
      mouse.targetY = 0;
      mouse.active = false;
    };

    const handlePointerDown = (e) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      clickRipple.x = clientX;
      clickRipple.y = clientY;
      clickRipple.radius = 0;

      // Cyan particles for the dark theme
      const pColor = 'rgba(56, 189, 248, 0.85)';
      for (let i = 0; i < 30; i++) {
        particles.push(new Particle(clickRipple.x, clickRipple.y, pColor));
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('mouseleave', handlePointerLeave);
    window.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('touchstart', handlePointerDown, { passive: true });

    let lastTime = performance.now();
    let time = 0;

    const noise = (x, t, o) =>
      (Math.sin(x * 0.0012 + t * 0.25 + o) +
        Math.cos(x * 0.0028 - t * 0.4 + o * 2)) /
      2;

    const render = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      time += dt * 0.85;

      // Smooth mouse lerp
      const lerpFactor = 1 - Math.exp(-9 * dt);
      mouse.x += (mouse.targetX - mouse.x) * lerpFactor;
      mouse.y += (mouse.targetY - mouse.y) * lerpFactor;

      // Deep space dark background
      const bgColor = '#030712';
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, width, height);

      // Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw(ctx);
        if (p.life <= 0) particles.splice(i, 1);
      }

      // Click ripple
      if (clickRipple.radius < clickRipple.maxRadius) {
        clickRipple.radius += clickRipple.speed;
      }

      const layers = [
        {
          ribbonCount: 16,
          step: 4,
          offsetMod: 0,
          freqScale: 0.0035,
          ampScale: 55,
          speedScale: 1.1,
          primary: true,
        },
        {
          ribbonCount: 10,
          step: 6,
          offsetMod: 1.2,
          freqScale: 0.0075,
          ampScale: 30,
          speedScale: 0.7,
          primary: false,
        },
      ];

      layers.forEach((layer) => {
        ctx.globalCompositeOperation = layer.primary ? 'source-over' : 'screen';

        const gradient = ctx.createLinearGradient(0, 0, width, 0);
        gradient.addColorStop(0, `rgba(56, 189, 248, ${layer.primary ? 0.1 : 0.02})`);
        gradient.addColorStop(0.5, `rgba(96, 165, 250, ${layer.primary ? 0.8 : 0.35})`);
        gradient.addColorStop(1, `rgba(168, 85, 247, ${layer.primary ? 0.1 : 0.02})`);

        for (let r = 0; r < layer.ribbonCount; r++) {
          const ribbonProgress = r / layer.ribbonCount;
          const yOffset =
            height * 0.22 + r * (height * 0.032) + layer.offsetMod * 35;
          const baseAlpha = (1 - ribbonProgress * 0.75) * 0.8;

          const rippleDistort =
            clickRipple.radius < clickRipple.maxRadius
              ? Math.sin((time * 2 + ribbonProgress * Math.PI) * 2) *
                ((clickRipple.maxRadius / Math.max(clickRipple.radius, 1)) * 2.5)
              : 0;

          ctx.beginPath();

          for (let x = 0; x <= width + layer.step; x += layer.step) {
            const edgeEnvelope = Math.sin((x / width) * Math.PI);

            const nFreq = 1 + noise(x, time, ribbonProgress) * 0.18;
            const nAmp = 1 + noise(x * 2, -time, ribbonProgress * 0.5) * 0.15;

            const wave1 =
              Math.sin(
                x * (layer.freqScale * nFreq) +
                  time * layer.speedScale +
                  r * 0.18
              ) *
              (layer.ampScale * edgeEnvelope * nAmp);
            const wave2 =
              Math.cos(x * 0.008 - time * 0.7 + r * 0.1) * (20 * edgeEnvelope);
            const wave3 =
              Math.sin(x * 0.018 + time * 1.4) * (8 * edgeEnvelope);

            const cursorXWorld = width / 2 + mouse.x;
            const distToMouseX = Math.abs(x - cursorXWorld);
            const mouseRadius = layer.primary ? 380 : 220;
            const mouseFactor = Math.exp(
              -Math.pow(distToMouseX / mouseRadius, 2)
            );
            const mouseDisplacement =
              Math.sin(x * 0.015 + time * 2.6) *
              (mouseFactor * (layer.primary ? 50 : 25) * edgeEnvelope);

            const rippleFactor = Math.exp(
              -Math.pow(
                Math.abs(distToMouseX - clickRipple.radius) /
                  (25 + rippleDistort),
                2
              )
            );
            const rippleDisplacement =
              rippleFactor * rippleDistort * (1.8 - ribbonProgress);

            const y =
              yOffset +
              wave1 +
              wave2 +
              wave3 +
              mouseDisplacement +
              rippleDisplacement +
              mouse.y * (ribbonProgress * 0.1);

            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);

            // Accent node dots
            if (layer.primary && x % 48 === 0) {
              ctx.fillStyle = 'rgba(56, 189, 248, 0.3)';
              ctx.fillRect(x - 1, y - 1, 2, 2);
            }
          }

          ctx.globalAlpha = baseAlpha;
          ctx.strokeStyle = gradient;
          ctx.lineWidth =
            (layer.primary ? 1.4 : 0.8) + (1 - ribbonProgress) * 0.5;
          ctx.stroke();
        }
      });

      ctx.globalAlpha = 1.0;
      ctx.globalCompositeOperation = 'source-over';
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('mouseleave', handlePointerLeave);
      window.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('touchstart', handlePointerDown);
    };
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        userSelect: 'none',
        background: '#030712',
      }}
    >
      <SEO title="Facilities" />
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, display: 'block', cursor: 'default' }}
      />

      {/* Hero overlay text */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          height: '100%',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '0 1rem',
          pointerEvents: 'none',
          mixBlendMode: 'difference',
          color: '#ffffff',
        }}
      >
        {/* Label */}
        <span
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '0.75rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            marginBottom: '1rem',
            fontWeight: 700,
            color: '#60a5fa',
          }}
        >
          {t.heroLabel}
        </span>

        {/* Main heading */}
        <h1
          className={language === 'ml' ? 'lang-ml' : ''}
          aria-label={t.heroTitle}
          style={{
            fontFamily: language === 'ml' ? "'Noto Serif Malayalam', 'Anek Malayalam', serif" : "'Playfair Display', serif",
            fontSize: 'clamp(1.5rem, 8vw, 7rem)',
            fontWeight: 900,
            letterSpacing: language === 'ml' ? 'normal' : '-0.05em',
            textTransform: 'uppercase',
            lineHeight: 1,
            margin: 0,
          }}
        >
          {(() => {
            const words = t.heroTitle.split(' ');
            let idx = 0;
            return words.map((word, wi) => (
              <span key={wi} style={{ display: 'inline' }}>
                <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
                  {language === 'ml' ? (
                    <span
                      aria-hidden="true"
                      style={{
                        display: 'inline-block',
                        animation: 'letterFall 0.6s cubic-bezier(0.18, 0.89, 0.32, 1.28) both',
                        animationDelay: `${0.15 + wi * 0.1}s`,
                      }}
                    >
                      {word}
                    </span>
                  ) : (
                    word.split('').map((ch, ci) => {
                      const delay = 0.15 + idx * 0.035;
                      idx++;
                      return (
                        <span
                          key={ci}
                          aria-hidden="true"
                          style={{
                            display: 'inline-block',
                            animation: 'letterFall 0.6s cubic-bezier(0.18, 0.89, 0.32, 1.28) both',
                            animationDelay: `${delay}s`,
                          }}
                        >
                          {ch}
                        </span>
                      );
                    })
                  )}
                </span>
                {wi < words.length - 1 ? ' ' : ''}
              </span>
            ));
          })()}
        </h1>

        {/* Subtitle */}
        <p
          style={{
            marginTop: '1.5rem',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
            maxWidth: '32rem',
            opacity: 0.75,
            lineHeight: 1.7,
          }}
        >
          {t.heroSubtitle}
        </p>

        {/* Scroll cue */}
        <div
          style={{
            marginTop: '3rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            opacity: 0.5,
            animation: 'floatCue 2s ease-in-out infinite',
          }}
        >
          <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '0.65rem', letterSpacing: '0.2em', fontWeight: 700 }}>
            {t.scroll}
          </span>
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
            <rect x="6" y="0" width="4" height="4" fill="currentColor" opacity="0.5" />
            <rect x="6" y="6" width="4" height="4" fill="currentColor" opacity="0.7" />
            <rect x="6" y="12" width="4" height="4" fill="currentColor" opacity="0.9" />
          </svg>
        </div>
      </div>

      {/* Float and text animation keyframes */}
      <style>{`
        @keyframes floatCue {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
        @keyframes letterFall {
          0% { opacity: 0; transform: translateY(-60px) rotate(-8deg); }
          100% { opacity: 1; transform: translateY(0) rotate(0); }
        }
      `}</style>
    </div>
  );
}

/* =========================================================
   FACILITIES PAGE — MAIN EXPORT
========================================================= */
export default function FacilitiesPage() {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language];
  return (
    <>
      {/* ── HERO ── */}
      <AetherRibbonMesh />

      {/* ── FACILITIES CAROUSEL SECTION ── */}
      <section
        style={{
          position: 'relative',
          background: 'linear-gradient(180deg, #f7fafc 0%, #f0f7ff 100%)',
          padding: '8rem 0 4rem',
        }}
      >
        {/* Soft wave transition from dark hero to light facilities */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', overflow: 'hidden', lineHeight: 0, transform: 'translateY(-1px)' }}>
          <svg viewBox="0 0 1440 320" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: '120px' }}>
            <path fill="#030712" fillOpacity="1" d="M0,160L48,165.3C96,171,192,181,288,160C384,139,480,85,576,96C672,107,768,181,864,208C960,235,1056,213,1152,192C1248,171,1344,149,1392,138.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
          </svg>
        </div>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem', padding: '0 1.5rem' }}>
          <span
            style={{
              display: 'inline-block',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#2563EB',
              marginBottom: '0.75rem',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            {t.sectionLabel}
          </span>
          <h2
            className={language === 'ml' ? 'lang-ml' : ''}
            style={{
              fontFamily: language === 'ml' ? "'Noto Serif Malayalam', 'Anek Malayalam', serif" : "'Playfair Display', serif",
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 900,
              letterSpacing: language === 'ml' ? 'normal' : '-0.04em',
              color: '#0F172A',
              margin: '0 0 1rem',
              lineHeight: 1.1,
            }}
          >
            {t.sectionTitle}
          </h2>
          <p
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '1rem',
              color: '#64748B',
              maxWidth: '36rem',
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            {t.sectionDesc}
          </p>
        </div>

        {/* Backend-connected stacked carousel */}
        <CarouselStacked />
      </section>

      {/* ── CLUBS SECTION ── */}
      <ClubsSection />
    </>
  );
}

/* =========================================================
   CLUBS SECTION COMPONENT
========================================================= */
function ClubsSection() {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const { language } = useLanguage();
  const t = TRANSLATIONS[language];
  const sectionRef = useRef(null);

  // Fetch clubs from backend
  useEffect(() => {
    getClubs()
      .then((res) => {
        setClubs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load clubs:', err);
        setLoading(false);
      });
  }, []);

  // Intersection observer for stagger-in animation
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        background: 'linear-gradient(180deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)',
        padding: '10rem 0 7rem',
        overflow: 'hidden',
      }}
    >
      {/* Soft wave transition from light facilities to dark clubs */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', overflow: 'hidden', lineHeight: 0, transform: 'translateY(-1px)', zIndex: 0 }}>
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: '140px' }}>
          <path fill="#f0f7ff" fillOpacity="1" d="M0,224L60,213.3C120,203,240,181,360,186.7C480,192,600,224,720,224C840,224,960,192,1080,165.3C1200,139,1320,117,1380,106.7L1440,96L1440,0L1380,0C1320,0,1200,0,1080,0C840,0,720,0,600,0C480,0,360,0,240,0C120,0,60,0,0,0Z"></path>
        </svg>
      </div>
      {/* Ambient blobs - Optimized by removing heavy blur filters */}
      <div style={{
        position: 'absolute', top: '-10%', left: '-5%',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(37,99,235,0.1), transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-10%', right: '-5%',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(124,58,237,0.1), transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Section header */}
      <div style={{ textAlign: 'center', marginBottom: '4rem', padding: '0 1.5rem', position: 'relative', zIndex: 1 }}>
        <span style={{
          display: 'inline-block',
          fontSize: '0.75rem',
          fontWeight: 700,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: '#818cf8',
          marginBottom: '0.75rem',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}>
          {t.clubsLabel}
        </span>
        <h2 
          className={language === 'ml' ? 'lang-ml' : ''}
          style={{
          fontFamily: language === 'ml' ? "'Noto Serif Malayalam', 'Anek Malayalam', serif" : "'Playfair Display', serif",
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: 900,
          letterSpacing: language === 'ml' ? 'normal' : '-0.04em',
          color: '#f8fafc',
          margin: '0 0 1rem',
          lineHeight: 1.1,
        }}>
          {t.clubsTitle}
        </h2>
        <p style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: '1rem',
          color: '#94a3b8',
          maxWidth: '38rem',
          margin: '0 auto',
          lineHeight: 1.7,
        }}>
          {t.clubsDesc}
        </p>
      </div>

      {/* Grid */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1.5rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: '1.25rem',
        position: 'relative',
        zIndex: 1,
      }}>
        {loading
          ? [...Array(8)].map((_, i) => (
              <div key={i} style={{
                height: '140px', borderRadius: '1.25rem',
                background: 'rgba(255,255,255,0.06)',
                animation: 'pulse 1.5s ease-in-out infinite',
                animationDelay: `${i * 0.1}s`,
              }} />
            ))
          : clubs.map((club, i) => (
              <BorderGlow
                key={club._id}
                borderRadius={20}
                backgroundColor="rgba(255, 255, 255, 0.04)"
                style={{
                  padding: '1.5rem',
                  cursor: 'default',
                  transition: 'transform 0.3s ease, opacity 0.3s ease, box-shadow 0.3s ease',
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(15px)',
                  transitionDelay: `${i * 0.02}s`,
                  willChange: 'transform, opacity',
                  height: '100%'
                }}
              >

                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  color: '#f1f5f9',
                  margin: '0 0 0.5rem',
                  letterSpacing: '-0.01em',
                }}>
                  {localizedText({ en: club.name, ml: club.nameMl }, language)}
                </h3>
                {localizedText({ en: club.description, ml: club.descriptionMl }, language) && (
                  <p style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: '0.82rem',
                    color: '#94a3b8',
                    margin: 0,
                    lineHeight: 1.6,
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}>
                    {localizedText({ en: club.description, ml: club.descriptionMl }, language)}
                  </p>
                )}
              </BorderGlow>
            ))
        }
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </section>
  );
}
