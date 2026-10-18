import SEO from '../components/SEO';
/**
 * HomePage.jsx
 * Premium Modern School Homepage
 * Fully Self Contained with English/Malayalam Localization Switcher
 * Mobile First Responsive
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getGallery } from '../services/api';
import CRTVideoPlayer from '../components/CRTVideoPlayer';
import { getAnnouncements } from '../services/api';
import { localizedText, useLanguage } from '../context/LanguageContext';

/* =========================================================
   TRANSLATION DICTIONARY
========================================================= */
const TRANSLATIONS = {
  en: {
    logo: "AUXANOVO",
    navHome: "Home",
    navAcademics: "Academics",
    navAdmissions: "Admissions",
    navFacilities: "Facilities",
    navContact: "Contact",
    heroPill: "✦ Welcome To PSNM UPS",
    heroTitlePre: "Inspiring Future ",
    heroTitleSpan: "Leaders",
    heroSubtitle: "A place where innovation, discipline, and creativity shape tomorrow’s leaders.",
    btnExplore: "Explore Our School",
    btnAdmissions: "Admissions Open",
    floatingCardTitle: "Quality Education",
    floatingCardDesc: "Nurturing young minds through quality education, strong values, engaging learning experiences, and a supportive school environment.",
    announcementsLabel: "📢 Announcements",
    pillarsLabel: "OUR PILLARS",
    pillarsTitle: "Built For Every Learner",
    exploreMore: "Explore →",
    visionLabel: "GLOBAL VISION",
    quoteText: "“We are always one step ahead”",
    quoteAuthor: "— P. S. Nataraja Pillai",
    achievementsLabel: "ACHIEVEMENTS",
    achievementsTitle: "Our Recent Milestones",
    galleryLabel: "GALLERY",
    galleryTitle: "School Life",
    btnFullGallery: "View Full Gallery",
    leadershipLabel: "LEADERSHIP",
    leadershipTitle: "Management Testimonials",
    footerText: "© 2026 Auxanovo Educational Framework. All rights reserved.",

    // Dynamic items translated
    announcements: [
      "Admissions Open for 2026",
      "Annual Day Registration Started",
      "PTA Meeting on Friday"
    ],
    features: [
      { title: "Academics", desc: "World-class curriculum with innovative learning methods." },
      { title: "Admissions", desc: "Simple admission process with student-first approach." },
      { title: "Facilities", desc: "Modern campus, digital labs, sports & creative spaces." }
    ],
    achievements: [
      { title: "State Level Science Fair Winners", desc: "Our students secured first place in the Kerala State Science Innovation Challenge." },
      { title: "100% Board Exam Results", desc: "Students achieved exceptional results in CBSE board examinations." },
      { title: "National Football Champions", desc: "Our under-17 team won the national interschool championship." }
    ],
    testimonials: [
      { name: "Priya M K", role: "Head Mistress", text: "We believe education should inspire curiosity and leadership." },
      { name: "Pradeep Narayan M K", role: "School Manager", text: "Our campus is designed to nurture every child's potential." },
      { name: "Ramya Rani V T", role: "Senior Assistant", text: "We are committed to academic excellence and values." }
    ]
  },
  ml: {
    logo: "AUXANOVO",
    navHome: "ഹോം",
    navAcademics: "അക്കാദമിക്സ്",
    navAdmissions: "അഡ്മിഷൻ",
    navFacilities: "സൗകര്യങ്ങൾ",
    navContact: "ബന്ധപ്പെടുക",
    heroPill: "✦ പി എസ് എൻ എം യു പി സ്കൂളിലേക്ക് സ്വാഗതം",
    heroTitlePre: "ഭാവിയിലെ നേതാക്കളെ ",
    heroTitleSpan: "വളർത്തിയെടുക്കുന്നു",
    heroSubtitle: "നവീകരണവും അച്ചടക്കവും സർഗ്ഗാത്മകതയും നാളത്തെ നേതാക്കളെ രൂപപ്പെടുത്തുന്ന ഒരിടം.",
    btnExplore: "ക്യാമ്പസ് കാണുക",
    btnAdmissions: "അഡ്മിഷൻ ആരംഭിച്ചു",
    floatingCardTitle: "പ്രീമിയം നിലവാരം",
    floatingCardDesc: "ആധുനിക ചട്ടക്കൂടുകൾക്ക് ചുറ്റും രൂപകൽപ്പന ചെയ്ത മികച്ച ഭാവി വിദ്യാഭ്യാസ മാതൃകകൾ അനുഭവിക്കുക.",
    announcementsLabel: "📢 അറിയിപ്പുകൾ",
    pillarsLabel: "ഞങ്ങളുടെ തൂണുകൾ",
    pillarsTitle: "ഓരോ പഠിതാവിനും അനുയോജ്യം",
    exploreMore: "കൂടുതലറിയാൻ →",
    visionLabel: "ആഗോള ദർശനം",
    quoteText: "“ഞങ്ങൾ എപ്പോഴും ഒരു പടി മുന്നിലാണ്.”",
    quoteAuthor: "— പി. എസ്. നാടാരാജ പിള്ള",
    achievementsLabel: "നേട്ടങ്ങൾ",
    achievementsTitle: "ഞങ്ങളുടെ സമീപകാല നാഴികക്കല്ലുകൾ",
    galleryLabel: "ഗാലറി",
    galleryTitle: "ക്യാമ്പസ് ജീവിതം",
    btnFullGallery: "മുഴുവൻ ഗാലറിയും കാണുക",
    leadershipLabel: "നേതൃത്വം",
    leadershipTitle: "മാനേജ്‌മെന്റ് സാക്ഷ്യപത്രങ്ങൾ",
    footerText: "© 2026 ഓക്സനോവോ എഡ്യൂക്കേഷണൽ ഫ്രെയിംവർക്ക്. എല്ലാ അവകാശങ്ങളും നിക്ഷിപ്തം.",

    // Dynamic items translated
    announcements: [
      "2026-ലേക്കുള്ള അഡ്മിഷൻ ആരംഭിച്ചു",
      "ആനുവൽ ഡേ രജിസ്ട്രേഷൻ ആരംഭിച്ചു",
      "വെള്ളിയാഴ്ച പിടിഎ യോഗം ചേരുന്നു"
    ],
    features: [
      { title: "അക്കാദമിക്സ്", desc: "നൂതന പഠന രീതികളുള്ള ലോകോത്തര പാഠ്യപദ്ധതി." },
      { title: "അഡ്മിഷൻ", desc: "വിദ്യാർത്ഥികൾക്ക് മുൻഗണന നൽകുന്ന ലളിതമായ പ്രവേശന നടപടികൾ." },
      { title: "സൗകര്യങ്ങൾ", desc: "ആധുനിക ക്യാമ്പസ്, ഡിജിറ്റൽ ലാബുകൾ, കായിക-സർഗ്ഗാത്മക ഇടങ്ങൾ." }
    ],
    achievements: [
      { title: "സംസ്ഥാന തല സയൻസ് ഫെയർ വിജയികൾ", desc: "കേരള സംസ്ഥാന സയൻസ് ഇന്നൊവേഷൻ ചലഞ്ചിൽ ഞങ്ങളുടെ വിദ്യാർത്ഥികൾ ഒന്നാം സ്ഥാനം നേടി." },
      { title: "100% ബോർഡ് പരീക്ഷാ ഫലം", desc: "സിബിഎസ്ഇ ബോർഡ് പരീക്ഷകളിൽ വിദ്യാർത്ഥികൾ മികച്ച വിജയം നേടി." },
      { title: "ദേശീയ ഫുട്ബോൾ ചാമ്പ്യന്മാർ", desc: "ഞങ്ങളുടെ അണ്ടർ-17 ടീം ദേശീയ ഇന്റർസ്കൂൾ ചാമ്പ്യൻഷിപ്പ് നേടി." }
    ],
    testimonials: [
      { name: "പ്രിയ എം. കെ.", role: "പ്രധാനാധ്യാപിക", text: "വിദ്യാഭ്യാസം ജിജ്ഞാസയ്ക്കും നേതൃത്വപാടവത്തിനും പ്രചോദനമാകണമെന്ന് ഞങ്ങൾ വിശ്വസിക്കുന്നു." },
      { name: "പ്രദീപ് നാരായൺ എം. കെ.", role: "സ്കൂൾ മാനേജർ", text: "ഓരോ കുട്ടിയുടെയും കഴിവുകൾ വളർത്തിയെടുക്കാനാണ് ഞങ്ങളുടെ ക്യാമ്പസ് രൂപകൽപ്പന ചെയ്തിരിക്കുന്നത്." },
      { name: "രമ്യ റാണി വി. ടി.", role: "സീനിയർ അസിസ്റ്റന്റ്", text: "അക്കാദമിക് മികവിനും മൂല്യങ്ങൾക്കും ഞങ്ങൾ പ്രതിജ്ഞാബദ്ധരാണ്." }
    ]
  }
};

/* =========================================================
   STATIC ASSETS CONFIGS
========================================================= */

const TESTIMONIAL_AVATARS = [
  "https://res.cloudinary.com/djkxnali0/image/upload/v1783010572/Priya_M_K_-_Head_Mistress_ptiyyz.png",
  "https://res.cloudinary.com/djkxnali0/image/upload/v1783010572/Pradeep_Narayan_M_K_-_School_Manager_zjcoog.png",
  "https://res.cloudinary.com/djkxnali0/image/upload/v1783010572/Ramya_Rani_V_T_-_Senior_Assistant_w3v1hv.png"
];

const FEATURE_EMOJIS = ["📘", "🎓", "🏫"];

/* =========================================================
   SCROLL REVEAL HOOK
========================================================= */
function useReveal() {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShow(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, show];
}

/* =========================================================
   MAIN COMPONENT
========================================================= */
export default function HomePage() {
  const { language: lang, setLanguage } = useLanguage();
  const [adminAnnouncements, setAdminAnnouncements] = useState([]);
  const t = TRANSLATIONS[lang]; // Pointer to current language collection

  useEffect(() => {
    getAnnouncements()
      .then((res) => setAdminAnnouncements(res.data))
      .catch(console.error);
  }, []);

  const announcements = adminAnnouncements.length
    ? adminAnnouncements.map((item) => localizedText({ en: item.title, ml: item.titleMl }, lang))
    : t.announcements;

  return (
    <>
      <SEO title="Home" />
      <GlobalStyles />

      {/* NAVBAR */}
      {/* 
<header className="navbar">
        <div className="logo">{t.logo}</div>
        <nav>
          <Link to="/">{t.navHome}</Link>
          <Link to="/academics">{t.navAcademics}</Link>
          <Link to="/admissions">{t.navAdmissions}</Link>
          <Link to="/facilities">{t.navFacilities}</Link>
        </nav>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div className="lang-switcher">
            <button 
              className={`lang-btn ${lang === 'en' ? 'active' : ''}`} 
              onClick={() => setLang('en')}
            >
              EN
            </button>
            <button 
              className={`lang-btn ${lang === 'ml' ? 'active' : ''}`} 
              onClick={() => setLang('ml')}
            >
              മല
            </button>
          </div>

          <Link to="/contact" className="btn btn-outline" style={{ padding: '0.6rem 1.5rem' }}>
            {t.navContact}
          </Link>
        </div>
      </header> 
*/}


      {/* HERO */}
      <section className="hero-section">
        {/* Mobile-only language switcher. The desktop navbar can remain unchanged. */}
        <div className="hero-mobile-language" role="group" aria-label="Language selector">
          <button
            type="button"
            className={`hero-lang-btn ${lang === 'en' ? 'active' : ''}`}
            onClick={() => setLanguage('en')}
            aria-pressed={lang === 'en'}
          >
            EN
          </button>
          <button
            type="button"
            className={`hero-lang-btn ${lang === 'ml' ? 'active' : ''}`}
            onClick={() => setLanguage('ml')}
            aria-pressed={lang === 'ml'}
          >
            മല
          </button>
        </div>

        <div className="hero-inner">

          {/* Text and Card Container */}
          <div className="hero-content">
            <div>
              <span className="section-label">{t.heroPill}</span>
              {/* Added break-words to handle long Malayalam characters */}
              <h1 className="break-words" aria-label={t.heroTitlePre + t.heroTitleSpan}>
                {(() => {
                  let idx = 0;

                  // Helper function to safely split complex scripts into complete grapheme clusters
                  const splitGraphemes = (str) => {
                    if (typeof Intl !== "undefined" && Intl.Segmenter) {
                      const segmenter = new Intl.Segmenter(lang, { granularity: "grapheme" });
                      return Array.from(segmenter.segment(str), (s) => s.segment);
                    }
                    return Array.from(str); // Fallback for environments lacking Segmenter support
                  };

                  const renderText = (text) => {
                    return text.split(' ').map((word, wi, arr) => (
                      <span key={wi} style={{ display: 'inline' }}>
                        <span style={{ display: 'inline-block', whiteSpace: 'normal', overflowWrap: 'anywhere', maxWidth: '100%' }}>
                          {splitGraphemes(word).map((ch, ci) => {
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
                          })}
                        </span>
                        {wi < arr.length - 1 ? ' ' : ''}
                      </span>
                    ));
                  };

                  return (
                    <>
                      {renderText(t.heroTitlePre)}
                      <span>{renderText(t.heroTitleSpan)}</span>
                    </>
                  );
                })()}
              </h1>
              <p className="hero-lead">{t.heroSubtitle}</p>
              <div className="cta-group">
                <Link to="/about" className="btn btn-primary">{t.btnExplore}</Link>
                <Link to="/admissions" className="btn btn-admissions">{t.btnAdmissions}</Link>
              </div>
            </div>

            {/* Floating Information Card */}
            <div className="hero-floating-card relative w-full max-w-sm">
              <h3>{t.floatingCardTitle}</h3>
              <p>{t.floatingCardDesc}</p>
            </div>
          </div>

          {/* TV Player Container */}
          <div className="hero-video">
            <CRTVideoPlayer />
          </div>

        </div>
      </section>

      {/* MARQUEE / ANNOUNCEMENTS */}

      <section className="marquee-wrapper">
        <div className="marquee-label">{t.announcementsLabel}</div>
        <div className="marquee-track">
          <div className="marquee-inner">
            {[...announcements, ...announcements].map((title, i) => (
              <div key={i} className="marquee-item">
                <span>{title}</span>
                {/* Announcement Separation Character */}
                <span style={{ marginLeft: '4rem', color: 'red', opacity: 0.8 }}>✦</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="grid-section" style={{ position: 'relative' }}>
        <div style={{ marginBottom: '4rem', position: 'relative', zIndex: 1 }}>
          <span className="section-label">{t.pillarsLabel}</span>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginTop: '0.5rem' }}>{t.pillarsTitle}</h2>
        </div>

        <div className="grid-container" style={{ position: 'relative', zIndex: 1 }}>
          {t.features.map((item, i) => (
            <Link to={i === 0 ? "/academics" : i === 1 ? "/admissions" : "/facilities"} className="card" key={i}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{FEATURE_EMOJIS[i]}</div>
              <span className="card-meta">PILLAR 0{i + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <span style={{ display: 'inline-block', marginTop: '1.5rem', color: 'var(--accent-primary)', fontWeight: '700' }}>
                {t.exploreMore}
              </span>
            </Link>
          ))}
        </div>

        {/* Soft wave transition to dark Quote Section */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', overflow: 'hidden', lineHeight: 0, transform: 'translateY(1px)', zIndex: 0 }}>
          <svg viewBox="0 0 1440 320" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: '140px' }}>
            <path fill="#081120" fillOpacity="1" d="M0,192L48,176C96,160,192,128,288,133.3C384,139,480,181,576,202.7C672,224,768,224,864,208C960,192,1056,160,1152,149.3C1248,139,1344,149,1392,154.7L1440,160L1440,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* QUOTE SECTION */}
      <QuoteSection t={t} />

      
      {/* GALLERY */}
      <GallerySection t={t} />

      {/* TESTIMONIALS */}
      <Testimonials t={t} />
    </>
  );
}

/* =========================================================
   SUB SECTIONS WITH INJECTED LOCALIZATION LOOKUPS
========================================================= */

function QuoteSection({ t }) {
  const [ref, show] = useReveal();
  return (
    <section ref={ref} className="dark-block" style={{ opacity: show ? 1 : 0.9, transition: 'opacity 0.6s ease' }}>
      <div className="dark-content">
        <span className="dark-meta">{t.visionLabel}</span>
        <blockquote>{t.quoteText}</blockquote>
        <cite>{t.quoteAuthor}</cite>
      </div>
    </section>
  );
}

function Timeline({ t }) {
  const dates = ["2026", "2025", "2025"];
  return (
    <section className="grid-section" style={{ position: 'relative', background: 'var(--bg-soft)' }}>
      {/* Soft wave transition from dark Quote Section */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', overflow: 'hidden', lineHeight: 0, transform: 'translateY(-1px)', zIndex: 0 }}>
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: '140px' }}>
          <path fill="#0F172A" fillOpacity="1" d="M0,64L80,90.7C160,117,320,171,480,181.3C640,192,800,160,960,138.7C1120,117,1280,107,1360,101.3L1440,96L1440,0L0,0Z"></path>
        </svg>
      </div>

      <div style={{ marginBottom: '4rem', position: 'relative', zIndex: 1 }}>
        <span className="section-label">{t.achievementsLabel}</span>
        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginTop: '0.5rem' }}>{t.achievementsTitle}</h2>
      </div>
      <div className="grid-container" style={{ position: 'relative', zIndex: 1 }}>
        {t.achievements.map((item, i) => (
          <div className="card" key={i}>
            <span className="card-meta">{dates[i]}</span>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function GallerySection({ t }) {
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const res = await getGallery();

        // Make sure we always work with an array.
        const items = Array.isArray(res.data) ? res.data : [];

        // Home page should display images only, not videos.
        const imageItems = items.filter(
          (item) =>
            item &&
            item.fileType !== 'video' &&
            item.imageUrl
        );

        // Randomize the MongoDB gallery and select 8 images.
        const shuffled = [...imageItems].sort(
          () => Math.random() - 0.5
        );

        setGalleryImages(shuffled.slice(0, 8));
      } catch (error) {
        console.error('Failed to load gallery images:', error);
        setGalleryImages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryImages();
  }, []);

  return (
    <section className="grid-section">
      <div style={{ marginBottom: '4rem' }}>
        <span className="section-label">{t.galleryLabel}</span>

        <h2
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            marginTop: '0.5rem'
          }}
        >
          {t.galleryTitle}
        </h2>
      </div>

      {/* Loading State */}
      {loading && (
        <div
          style={{
            textAlign: 'center',
            padding: '3rem',
            color: 'var(--text-soft)'
          }}
        >
          Loading gallery...
        </div>
      )}

      {/* Empty State */}
      {!loading && galleryImages.length === 0 && (
        <div
          style={{
            textAlign: 'center',
            padding: '3rem',
            color: 'var(--text-soft)'
          }}
        >
          No gallery images available.
        </div>
      )}

      {/* Gallery Grid */}
      {!loading && galleryImages.length > 0 && (
        <div
          className="grid-container"
          style={{
            gridTemplateColumns:
              'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem'
          }}
        >
          {galleryImages.map((item) => (
            <div
              className="card"
              key={item._id}
              style={{
                padding: '0',
                overflow: 'hidden',
                height: '280px'
              }}
            >
              <img
                src={item.imageUrl}
                alt={
                  item.title ||
                  item.titleMl ||
                  'Gallery image'
                }
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform .5s ease'
                }}
                className="gallery-img-hover"
              />
            </div>
          ))}
        </div>
      )}

      {/* View Full Gallery Button */}
      <div
        style={{
          marginTop: '3rem',
          textAlign: 'center'
        }}
      >
        <Link
          to="/gallery"
          className="btn btn-primary"
        >
          {t.btnFullGallery}
        </Link>
      </div>
    </section>
  );
}

function Testimonials({ t }) {
  return (
    <section className="grid-section" style={{ background: 'var(--bg-soft)' }}>
      <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
        <span className="section-label">{t.leadershipLabel}</span>
        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginTop: '0.5rem' }}>{t.leadershipTitle}</h2>
      </div>
      <div className="grid-container">
        {t.testimonials.map((item, i) => (
          <div className="card" key={i} style={{ textAlign: 'center' }}>
            <img
              src={TESTIMONIAL_AVATARS[i]}
              alt=""
              style={{ width: '90px', height: '90px', borderRadius: '50%', margin: '0 auto 1.5rem auto', display: 'block', background: 'rgba(37,99,235,.1)' }}
            />
            <p style={{ fontStyle: 'italic', marginBottom: '1.5rem' }}>"{item.text}"</p>
            <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', marginBottom: '0.2rem' }}>{item.name}</h4>
            <span className="card-meta" style={{ margin: '0' }}>{item.role}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* =========================================================
   GLOBAL STYLES (Includes New Language Switcher Rules)
========================================================= */
function GlobalStyles() {
  return (
    <style>{`
      :root {
        --font-body-en: 'Plus Jakarta Sans', sans-serif;
        --font-body-ml: 'Noto Sans Malayalam', 'Anek Malayalam', sans-serif;
        --font-heading-en: 'Playfair Display', serif;
        --font-heading-ml: 'Noto Serif Malayalam', 'Anek Malayalam', serif;

        --bg-main: #F7FAFC;
        --bg-soft: #F0F7FF;
        --bg-card: rgba(255, 255, 255, 0.72);
        --text-main: #0F172A;
        --text-soft: #475569;
        --text-light: #94A3B8;
        --accent-primary: #2563EB;
        --accent-secondary: #06B6D4;
        --accent-purple: #7C3AED;
        --dark-section: #081120;
        --dark-surface: #0F172A;
        --dark-text: #F8FAFC;
        --border: rgba(15, 23, 42, 0.08);
        --shadow-soft: 0 10px 30px rgba(37, 99, 235, 0.08);
        --shadow-premium: 0 25px 80px rgba(15, 23, 42, 0.14);
        --radius-md: 24px;
      }

      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: var(--font-body-en), var(--font-body-ml);
        background:
          radial-gradient(at 20% 20%, rgba(37, 99, 235, .12) 0px, transparent 50%),
          radial-gradient(at 80% 0%, rgba(124, 58, 237, .10) 0px, transparent 50%),
          var(--bg-main);
        color: var(--text-main);
        line-height: 1.8; /* Slightly taller line-height for Malayalam script ligatures */
        overflow-x: hidden;
      }

      /* Language specific overrides when language is active */
      [lang="ml"] body,
      .lang-ml {
        font-family: var(--font-body-ml), var(--font-body-en);
      }

      h1, h2, h3, h4 {
        font-family: var(--font-heading-en), var(--font-heading-ml);
        line-height: 1.25;
        letter-spacing: -0.02em; /* Malayalam script requires reduced negative letter spacing */
        word-wrap: break-word;
        overflow-wrap: break-word;
      }

      /* Display styling adjustments when Malayalam is selected */
      .lang-ml h1,
      .lang-ml h2,
      .lang-ml h3,
      .lang-ml h4 {
        font-family: var(--font-heading-ml), var(--font-heading-en);
        letter-spacing: normal !important; /* Removes negative tracking which causes Malayalam letter overlap */
      }

      .section-label {
        display: inline-block;
        font-size: .78rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: .22em;
        color: var(--accent-primary);
        margin-bottom: 1.2rem;
      }

      /* BUTTONS */
      .btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        border: none;
        cursor: pointer;
        padding: 0.7rem 1.5rem;
        border-radius: 999px;
        font-weight: 600;
        transition: transform .45s cubic-bezier(.16, 1, .3, 1), box-shadow .45s ease;
      }

      .btn-primary {
        background: linear-gradient(135deg, #2563EB, #7C3AED);
        color: white;
        box-shadow: 0 14px 40px rgba(37, 99, 235, .22);
      }

      .btn-primary:hover {
        transform: translateY(-4px) scale(1.02);
        box-shadow: 0 22px 60px rgba(37, 99, 235, .32);
      }

      .btn-admissions {
        background: rgba(255, 255, 255, .45);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        border: 1px solid rgba(255, 255, 255, .5);
        color: var(--text-main);
      }
      
      .btn-admissions:hover {
        background: var(--accent-primary);
        color: white;
      }

      /* HERO SECTION
         Only the hero styles are changed here. The sections below keep their
         existing layout and styling. */
      .hero-section {
        position: relative;
        min-height: 100svh;
        display: flex;
        align-items: center;
        padding: clamp(6.5rem, 10vh, 8rem) 6% clamp(3rem, 6vh, 5rem);
        overflow: hidden;
      }

      .hero-inner {
        width: 100%;
        max-width: 1600px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: minmax(0, 1.08fr) minmax(320px, .92fr);
        align-items: center;
        gap: clamp(2rem, 5vw, 5rem);
      }

      .hero-content {
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 2rem;
      }

      .hero-section h1 {
        width: 100%;
        max-width: 100%;
        font-size: clamp(3rem, 6.2vw, 6.5rem);
        line-height: 1.08;
        margin-bottom: 1.75rem;
      }

      /* Allow long Malayalam words to wrap instead of pushing the title
         underneath/behind the video player. */
      .hero-section h1 > span,
      .hero-section h1 > span > span,
      .hero-section h1 > span > span > span {
        max-width: 100%;
      }

      .hero-section h1 span {
        background: linear-gradient(to right, var(--accent-primary), var(--accent-purple));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .hero-lead {
        width: 100%;
        max-width: 680px;
        font-size: clamp(1rem, 1.5vw, 1.3rem);
        margin-bottom: 2rem;
      }

      .cta-group {
        display: flex;
        align-items: center;
        gap: 1rem;
        flex-wrap: wrap;
      }

      /* The old absolute positioning caused the card to overlap the hero.
         It now participates in the normal layout flow. */
      .hero-floating-card {
        position: static;
        width: min(100%, 420px);
        margin-top: 0;
        padding: 1.5rem;
        border-radius: var(--radius-md);
        background: rgba(255, 255, 255, .5);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, .5);
        box-shadow: var(--shadow-premium);
      }

      .hero-video {
        width: 100%;
        min-width: 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .hero-video > * {
        width: 100%;
        max-width: 720px;
      }

      /* Hidden on desktop so an existing desktop navbar switcher is not duplicated. */
      .hero-mobile-language {
        display: none;
      }

      .hero-lang-btn {
        min-width: 44px;
        min-height: 38px;
        padding: .45rem .7rem;
        border: 0;
        border-radius: 999px;
        background: transparent;
        color: var(--text-main);
        font: inherit;
        font-weight: 700;
        cursor: pointer;
      }

      .hero-lang-btn.active {
        background: white;
        color: var(--accent-primary);
        box-shadow: 0 4px 18px rgba(15, 23, 42, .10);
      }

      /* GRID LAYOUTS & CARDS */
      .grid-section {
        padding: 8rem 6%;
      }

      .grid-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 2rem;
      }

      .card {
        position: relative;
        overflow: hidden;
        padding: 3rem;
        border-radius: var(--radius-md);
        background: var(--bg-card);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, .4);
        transition: transform .5s ease, box-shadow .5s ease;
        box-shadow: var(--shadow-soft);
        text-decoration: none;
        color: inherit;
      }

      .card:hover {
        transform: translateY(-10px);
        box-shadow: var(--shadow-premium);
      }

      .card-meta {
        display: inline-block;
        margin-bottom: 1.4rem;
        font-size: .78rem;
        letter-spacing: .16em;
        text-transform: uppercase;
        color: var(--accent-primary);
        font-weight: 700;
      }

      .card h3 {
        font-size: 1.8rem;
        margin-bottom: 1rem;
      }

      /* DARK FUTURISTIC BLOCK */
      .dark-block {
        padding: 10rem 6%;
        background: linear-gradient(180deg, #081120, #0F172A);
        color: var(--dark-text);
        text-align: center;
      }

      .dark-content {
        max-width: 950px;
        margin: auto;
      }

      .dark-meta {
        display: inline-block;
        margin-bottom: 2rem;
        font-size: .8rem;
        letter-spacing: .22em;
        text-transform: uppercase;
        color: #7DD3FC;
      }

      blockquote {
        font-size: clamp(1.8rem, 5vw, 3.5rem);
        line-height: 1.3;
        margin-bottom: 2rem;
        color: white;
      }

      /* MARQUEE */
      .marquee-wrapper {
        display: flex;
        align-items: center;
        gap: 2rem;
        overflow: hidden;
        background: #081120; 
        padding: 1.5rem 6%;
        border-top: 1px solid rgba(255, 255, 255, 0.08);
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      }

      .marquee-label {
        white-space: nowrap;
        font-weight: 700;
        color: #7DD3FC; 
        text-transform: uppercase;
        font-size: 0.9rem;
      }

      .marquee-track {
        overflow: hidden;
        flex: 1;
      }

      .marquee-inner {
        display: flex;
        gap: 4rem;
        width: max-content;
        animation: marqueeAnimation 25s linear infinite;
        color: #F8FAFC; 
      }

      @keyframes marqueeAnimation {
        from { transform: translateX(0); }
        to { transform: translateX(-50%); }
      }

      @keyframes letterFall {
        0% { opacity: 0; transform: translateY(-60px) rotate(-8deg); }
        100% { opacity: 1; transform: translateY(0) rotate(0); }
      }

      @media(max-width: 1100px) {
        .hero-inner {
          grid-template-columns: 1fr;
          gap: 3rem;
        }

        .hero-content {
          width: 100%;
        }

        .hero-section h1 {
          font-size: clamp(3rem, 8vw, 5rem);
        }

        .hero-lead {
          max-width: 760px;
        }

        .hero-video {
          width: min(100%, 760px);
          margin: 0 auto;
        }

        .hero-floating-card {
          width: min(100%, 520px);
        }
      }

      @media(max-width: 768px) {
        .hero-section {
          min-height: auto;
          align-items: stretch;
          padding: 5.75rem 1.25rem 3.5rem;
        }

        .hero-mobile-language {
          position: absolute;
          top: 1rem;
          right: 1.25rem;
          z-index: 10;
          display: flex;
          align-items: center;
          gap: .15rem;
          padding: .2rem;
          border: 1px solid rgba(15, 23, 42, .08);
          border-radius: 999px;
          background: rgba(255, 255, 255, .72);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          box-shadow: 0 8px 24px rgba(15, 23, 42, .10);
        }

        .hero-inner {
          gap: 2.5rem;
        }

        .hero-section h1 {
          font-size: clamp(2.35rem, 11vw, 4rem);
          line-height: 1.12;
          margin-bottom: 1.25rem;
        }

        .hero-lead {
          font-size: 1rem;
          line-height: 1.7;
          margin-bottom: 1.5rem;
        }

        .cta-group {
          gap: .75rem;
        }

        .btn {
          padding: .7rem 1.1rem;
        }

        .hero-floating-card {
          width: 100%;
          padding: 1.25rem;
        }

        .hero-video {
          width: 100%;
        }

        .hero-video > * {
          max-width: 100%;
        }

        .marquee-wrapper {
          flex-direction: column;
          align-items: flex-start;
          gap: 0.5rem;
        }
      }

      @media(max-width: 420px) {
        .hero-section {
          padding-left: 1rem;
          padding-right: 1rem;
        }

        .hero-section h1 {
          font-size: clamp(2.1rem, 11vw, 3rem);
        }

        .cta-group .btn {
          width: 100%;
        }
      }
    `}</style>
  );
}