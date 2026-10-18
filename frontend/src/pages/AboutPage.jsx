import SEO from '../components/SEO';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { localizedText, useLanguage } from '../context/LanguageContext';

const TRANSLATIONS = {
  en: {
    heroBadge: "Since 1976",
    heroTitle: "P.S.N.M U.P. School Veliyannoor",
    heroSubtitle: "Building Futures Since 1976 — Nurturing Knowledge, Values, and Excellence for a Better Tomorrow.",
    scroll: "Scroll to explore",
    storyLabel: "Our Story",
    storyTitle: "A Legacy of Learning Since 1976",
    story1: "P.S.N.M U.P. School, Veliyannoor, began its journey on 1 June 1976 with a vision to provide quality education rooted in knowledge, values, and social responsibility. Established in memory of the renowned social reformer and philanthropist P. S. Nataraja Pillai, the school has served generations of students while nurturing a culture of excellence and lifelong learning.",
    story2: "Over nearly five decades, the school has evolved into a respected centre of academic achievement, arts, sports, and co-curricular excellence. Supported by dedicated educators, an active PTA, and a vibrant local community, we create an environment where every child is encouraged to discover their talents, build confidence, and reach their full potential.",
    story3: "Today, P.S.N.M U.P. School continues to embrace modern teaching methods, digital learning, and holistic student development while remaining true to its founding mission — shaping knowledgeable, compassionate, and responsible citizens prepared to contribute meaningfully to society.",
    missionTitle: "Our Mission",
    missionQuote: "\"To develop the full potential of every child by fostering knowledge, character, creativity, and responsibility, enabling them to lead meaningful lives and contribute positively to society.\"",
    pillarsTitle: "Our Pillars",
    campusLabel: "Campus Experience",
    campusTitle: "Spaces Designed for Growth",
    valuesTitle: "Our Values",
    valKnowl: "Knowledge",
    valKnowlLabel: "Learning & Discovery",
    valKnowl1: "Cultivating a passion for learning and discovery",
    valKnowl2: "Encouraging academic excellence and innovation",
    valKnowl3: "Building strong foundations for future success",
    valVals: "Values",
    valValsLabel: "Integrity & Respect",
    valVals1: "Promoting integrity, discipline, and respect",
    valVals2: "Developing responsible and compassionate citizens",
    valVals3: "Strengthening social awareness and human values",
    valGrow: "Growth",
    valGrowLabel: "Development & Excellence",
    valGrow1: "Nurturing talents in arts, sports, and leadership",
    valGrow2: "Encouraging creativity, confidence, and teamwork",
    valGrow3: "Preparing students for life in a changing world",
    leadersLabel: "Our Leaders",
    leadersTitle: "Leadership & Governing Body",
    leadersDesc: "Words from the people who guide our institution's vision.",
    footer: "© 2026 PSNM School — Crafted by AUXANOVO"
  },
  ml: {
    heroBadge: "1976 മുതൽ",
    heroTitle: "പി.എസ്.എൻ.എം യു.പി സ്കൂൾ വെളിയന്നൂർ",
    heroSubtitle: "1976 മുതൽ ഭാവിയെ രൂപപ്പെടുത്തുന്നു — ഒരു നല്ല നാളേക്കായി അറിവും മൂല്യങ്ങളും മികവും വളർത്തുന്നു.",
    scroll: "കൂടുതൽ അറിയാൻ സ്ക്രോൾ ചെയ്യുക",
    storyLabel: "ഞങ്ങളുടെ യാത്ര",
    storyTitle: "1976 മുതലുള്ള പഠന പാരമ്പര്യം",
    story1: "അറിവ്, മൂല്യങ്ങൾ, സാമൂഹിക പ്രതിബദ്ധത എന്നിവയിൽ വേരൂന്നിയ ഗുണനിലവാരമുള്ള വിദ്യാഭ്യാസം നൽകുക എന്ന കാഴ്ചപ്പാടോടെയാണ് വെളിയന്നൂർ പി.എസ്.എൻ.എം യു.പി സ്കൂൾ 1976 ജൂൺ 1 ന് യാത്ര ആരംഭിച്ചത്. പ്രശസ്ത സാമൂഹിക പരിഷ്കർത്താവും ജീവകാരുണ്യ പ്രവർത്തകനുമായ പി.എസ്. നടരാജ പിള്ളയുടെ സ്മരണയ്ക്കായി സ്ഥാപിതമായ ഈ വിദ്യാലയം വിദ്യാർത്ഥികളുടെ തലമുറകളെ സേവിച്ചു.",
    story2: "അഞ്ച് പതിറ്റാണ്ടിലേറെയായി, ഈ സ്കൂൾ അക്കാദമിക് നേട്ടങ്ങൾ, കലകൾ, കായികരംഗം, പാഠ്യേതര മികവ് എന്നിവയുടെ ബഹുമാനിക്കപ്പെടുന്ന കേന്ദ്രമായി മാറി. അർപ്പണബോധമുള്ള അധ്യാപകർ, സജീവമായ ഒരു പിടിഎ, പ്രാദേശിക സമൂഹം എന്നിവയുടെ പിന്തുണയോടെ, ഓരോ കുട്ടിക്കും അവരുടെ കഴിവുകൾ കണ്ടെത്താനും ആത്മവിശ്വാസം വളർത്താനും പൂർണ്ണ ശേഷിയിലെത്താനും പ്രോത്സാഹിപ്പിക്കുന്ന ഒരു അന്തരീക്ഷം ഞങ്ങൾ സൃഷ്ടിക്കുന്നു.",
    story3: "ഇന്ന്, പി.എസ്.എൻ.എം യു.പി സ്കൂൾ ആധുനിക അധ്യാപന രീതികൾ, ഡിജിറ്റൽ ലേണിംഗ്, സമഗ്ര വിദ്യാർത്ഥി വികസനം എന്നിവ സ്വീകരിക്കുന്നത് തുടരുമ്പോഴും അതിൻ്റെ സ്ഥാപക ദൗത്യത്തോട് വിശ്വസ്തത പുലർത്തുന്നു - അറിവും അനുകമ്പയും ഉത്തരവാദിത്തവുമുള്ള പൗരന്മാരെ സമൂഹത്തിന് അർത്ഥവത്തായ സംഭാവന നൽകാൻ പ്രാപ്തരാക്കുന്നു.",
    missionTitle: "ഞങ്ങളുടെ ലക്ഷ്യം",
    missionQuote: "\"അറിവ്, സ്വഭാവം, സർഗ്ഗാത്മകത, ഉത്തരവാദിത്തം എന്നിവ വളർത്തിയെടുക്കുന്നതിലൂടെ ഓരോ കുട്ടിയുടെയും മുഴുവൻ കഴിവുകളും വികസിപ്പിക്കുക, അർത്ഥവത്തായ ജീവിതം നയിക്കാനും സമൂഹത്തിന് ഗുണപരമായ സംഭാവന നൽകാനും അവരെ പ്രാപ്തരാക്കുക.\"",
    pillarsTitle: "ഞങ്ങളുടെ മികവുകൾ",
    campusLabel: "ക്യാമ്പസ് അനുഭവം",
    campusTitle: "വളർച്ചയ്ക്കായി രൂപകൽപ്പന ചെയ്ത ഇടങ്ങൾ",
    valuesTitle: "ഞങ്ങളുടെ മൂല്യങ്ങൾ",
    valKnowl: "അറിവ്",
    valKnowlLabel: "പഠനവും കണ്ടെത്തലും",
    valKnowl1: "പഠിക്കാനും കണ്ടെത്താനുമുള്ള ആവേശം വളർത്തിയെടുക്കുന്നു",
    valKnowl2: "അക്കാദമിക് മികവും നവീകരണവും പ്രോത്സാഹിപ്പിക്കുന്നു",
    valKnowl3: "ഭാവി വിജയത്തിനായി ശക്തമായ അടിത്തറ കെട്ടിപ്പടുക്കുന്നു",
    valVals: "മൂല്യങ്ങൾ",
    valValsLabel: "സത്യസന്ധതയും ബഹുമാനവും",
    valVals1: "സത്യസന്ധത, അച്ചടക്കം, ബഹുമാനം എന്നിവ പ്രോത്സാഹിപ്പിക്കുന്നു",
    valVals2: "ഉത്തരവാദിത്തവും അനുകമ്പയുമുള്ള പൗരന്മാരെ വാർത്തെടുക്കുന്നു",
    valVals3: "സാമൂഹിക അവബോധവും മാനുഷിക മൂല്യങ്ങളും ശക്തിപ്പെടുത്തുന്നു",
    valGrow: "വളർച്ച",
    valGrowLabel: "വികസനവും മികവും",
    valGrow1: "കല, കായികം, നേതൃത്വം എന്നിവയിലെ കഴിവുകൾ വളർത്തുന്നു",
    valGrow2: "സർഗ്ഗാത്മകത, ആത്മവിശ്വാസം, ടീം വർക്ക് എന്നിവ പ്രോത്സാഹിപ്പിക്കുന്നു",
    valGrow3: "മാറിക്കൊണ്ടിരിക്കുന്ന ഒരു ലോകത്ത് ജീവിക്കാൻ വിദ്യാർത്ഥികളെ തയ്യാറാക്കുന്നു",
    leadersLabel: "ഞങ്ങളുടെ നേതാക്കൾ",
    leadersTitle: "നേതൃത്വവും ഭരണസമിതിയും",
    leadersDesc: "ഞങ്ങളുടെ സ്ഥാപനത്തിൻ്റെ കാഴ്ചപ്പാടിനെ നയിക്കുന്ന വ്യക്തികളുടെ വാക്കുകൾ.",
    footer: "© 2026 PSNM സ്കൂൾ — തയ്യാറാക്കിയത് AUXANOVO"
  }
};

const PREMIUM_FEATURES = [
  {
    meta: { en: '01 / ACADEMICS', ml: '01 / പഠനം' },
    title: { en: 'Excellence in Learning', ml: 'പഠനത്തിലെ മികവ്' },
    desc: { en: 'Strong academic programmes designed to nurture knowledge, critical thinking, creativity, and a lifelong passion for learning.', ml: 'അറിവ്, വിമർശനാത്മക ചിന്ത, സർഗ്ഗാത്മകത, പഠനത്തോടുള്ള അഭിനിവേശം എന്നിവ വളർത്തുന്നതിനായി രൂപകൽപ്പന ചെയ്ത ശക്തമായ അക്കാദമിക് പ്രോഗ്രാമുകൾ.' },
  },
  {
    meta: { en: '02 / INNOVATION', ml: '02 / നവീകരണം' },
    title: { en: 'Technology & Research', ml: 'സാങ്കേതികവിദ്യയും ഗവേഷണവും' },
    desc: { en: 'ICT-enabled classrooms, technology-integrated teaching, and innovative learning experiences preparing students for the future.', ml: 'ഭാവിക്ക് വിദ്യാർത്ഥികളെ സജ്ജമാക്കുന്ന ഐസിടി സജ്ജീകരിച്ച ക്ലാസ് മുറികൾ, സാങ്കേതികവിദ്യ സംയോജിപ്പിച്ച അധ്യാപനം, നൂതന പഠന അനുഭവങ്ങൾ.' },
  },
  {
    meta: { en: '03 / GLOBAL CULTURE', ml: '03 / ആഗോള സംസ്കാരം' },
    title: { en: 'Leadership & Community', ml: 'നേതൃത്വവും സമൂഹവും' },
    desc: { en: 'Encouraging discipline, responsibility, confidence, and social awareness to develop compassionate future leaders.', ml: 'അനുകമ്പയുള്ള ഭാവി നേതാക്കളെ വാർത്തെടുക്കാൻ അച്ചടക്കം, ഉത്തരവാദിത്തം, ആത്മവിശ്വാസം, സാമൂഹിക അവബോധം എന്നിവ പ്രോത്സാഹിപ്പിക്കുന്നു.' },
  },
];

const CAMPUS_FEATURES = [
  {
    title: { en: 'Architectural Spaces', ml: 'വാസ്തുവിദ്യാ ഇടങ്ങൾ' },
    desc: { en: 'Well-equipped classrooms, library resources, and learning spaces that support engaging and student-centred education.', ml: 'മികച്ച സജ്ജീകരണങ്ങളുള്ള ക്ലാസ് മുറികൾ, ലൈബ്രറി വിഭവങ്ങൾ, മികച്ച വിദ്യാഭ്യാസത്തെ പിന്തുണയ്ക്കുന്ന പഠന ഇടങ്ങൾ.' },
  },
  {
    title: { en: 'Creative Arts', ml: 'സർഗ്ഗാത്മക കലകൾ' },
    desc: { en: "Dedicated opportunities for music, arts, cultural activities, and creative expression that nurture every student's talents.", ml: 'സംഗീതം, കലകൾ, സാംസ്കാരിക പ്രവർത്തനങ്ങൾ എന്നിവയ്ക്ക് അവസരങ്ങൾ.' },
  },
  {
    title: { en: 'Sports & Wellness', ml: 'കായികവും ആരോഗ്യവും' },
    desc: { en: 'Encouraging physical fitness, teamwork, sportsmanship, and healthy lifestyles through active participation and training.', ml: 'സജീവമായ പങ്കാളിത്തത്തിലൂടെ കായികക്ഷമത, ടീം വർക്ക് എന്നിവ പ്രോത്സാഹിപ്പിക്കുന്നു.' },
  },
];

const TESTIMONIALS = [
  {
    name: { en: 'Shri. Pradeep Narayan M K', ml: 'ശ്രീ. പ്രദീപ് നാരായൺ എം കെ' },
    role: { en: 'School Manager', ml: 'സ്കൂൾ മാനേജർ' },
    quote: { en: "With nearly five decades of educational excellence, P.S.N.M U.P. School continues to inspire young minds through quality teaching, holistic development, and a commitment to preparing students for the future. Our unwavering commitment to every child's potential is what sets us apart.", ml: "ഏകദേശം അഞ്ച് പതിറ്റാണ്ടത്തെ വിദ്യാഭ്യാസ മികവിലൂടെ, പി.എസ്.എൻ.എം യു.പി. സ്കൂൾ യുവമനസ്സുകളെ പ്രചോദിപ്പിക്കുന്നത് തുടരുന്നു. ഓരോ കുട്ടിയോടുമുള്ള ഞങ്ങളുടെ അചഞ്ചലമായ പ്രതിബദ്ധതയാണ് ഞങ്ങളെ വ്യത്യസ്തരാക്കുന്നത്." },
  },
  {
    name: { en: 'Mrs. Priya M K', ml: 'ശ്രീമതി. പ്രിയ എം കെ' },
    role: { en: 'Head Mistress', ml: 'ഹെഡ് മിസ്ട്രസ്' },
    quote: { en: 'We believe education is not merely the transmission of knowledge but the ignition of curiosity. Our policies are built around that philosophy.', ml: 'വിദ്യാഭ്യാസം അറിവ് കൈമാറുക മാത്രമല്ല, ജിജ്ഞാസ ഉണർത്തുക കൂടിയാണെന്ന് ഞങ്ങൾ വിശ്വസിക്കുന്നു. ഞങ്ങളുടെ നയങ്ങൾ ആ തത്വശാസ്ത്രത്തിന് ചുറ്റുമാണ് നിർമ്മിച്ചിരിക്കുന്നത്.' },
  },
  {
    name: { en: 'Mrs. Ramya Rani V T', ml: 'ശ്രീമതി. രമ്യ  റാണി വി ടി' },
    role: { en: 'Senior Assistant', ml: 'സീനിയർ അസിസ്റ്റൻ്റ്' },
    quote: { en: 'The school nurtures not only academic excellence but also creativity, discipline, and leadership. Every student is encouraged to discover their strengths and become a responsible member of society.', ml: 'സ്കൂൾ അക്കാദമിക് മികവ് മാത്രമല്ല, സർഗ്ഗാത്മകത, അച്ചടക്കം, നേതൃത്വം എന്നിവയും വളർത്തുന്നു. തങ്ങളുടെ കഴിവുകൾ കണ്ടെത്തി സമൂഹത്തിലെ ഉത്തരവാദിത്തമുള്ള അംഗമാകാൻ ഓരോ വിദ്യാർത്ഥിയേയും പ്രോത്സാഹിപ്പിക്കുന്നു.' },
  },
];

const CAROUSEL_IMAGES = [
  'https://res.cloudinary.com/c3jl70ey/image/upload/v1783146008/side1_orhmjc.jpg',
  'https://res.cloudinary.com/c3jl70ey/image/upload/v1783146006/side3_t17xpt.jpg',
  'https://res.cloudinary.com/c3jl70ey/image/upload/v1783146017/side2_l3copc.jpg',
];

// ─── Shared inline styles mirroring AUXANOVO CSS vars ────────────────────────

const S = {
  // Backgrounds
  bgMain: '#F7FAFC',
  bgSoft: '#F0F7FF',
  bgCard: 'rgba(255,255,255,0.72)',

  // Accents
  accentPrimary: '#2563EB',
  accentPurple: '#7C3AED',
  accentCyan: '#06B6D4',

  // Dark
  darkSection: '#081120',
  darkSurface: '#0F172A',

  // Radius
  radiusSm: '14px',
  radiusMd: '24px',
  radiusLg: '42px',

  // Shadows
  shadowSoft: '0 10px 30px rgba(37,99,235,0.08)',
  shadowPremium: '0 25px 80px rgba(15,23,42,0.14)',
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionLabel({ children, light = false }) {
  return (
    <span
      style={{
        display: 'inline-block',
        fontSize: '0.78rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.22em',
        color: light ? '#7DD3FC' : S.accentPrimary,
        marginBottom: '1.2rem',
      }}
    >
      <SEO title="About Us" />
      {children}
    </span>
  );
}

function GlassCard({ children, style = {}, className = '' }) {
  return (
    <div
      className={className}
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: '3rem',
        borderRadius: S.radiusMd,
        background: S.bgCard,
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.4)',
        boxShadow: S.shadowSoft,
        transition: 'transform 0.5s ease, box-shadow 0.5s ease',
        ...style,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-10px)';
        e.currentTarget.style.boxShadow = S.shadowPremium;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = S.shadowSoft;
      }}
    >
      {/* Decorative orb top-right */}
      <div
        style={{
          position: 'absolute',
          width: 180,
          height: 180,
          top: -40,
          right: -40,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37,99,235,.12), transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div style={{ position: 'relative', zIndex: 1, height: '100%' }}>{children}</div>
    </div>
  );
}

function BtnOutline({ children, onClick, as: Tag = 'button', to, type = 'button', style = {} }) {
  const [hov, setHov] = useState(false);
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem 2rem',
    borderRadius: 999,
    cursor: 'pointer',
    fontWeight: 600,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: '0.95rem',
    background: hov ? 'white' : 'rgba(255,255,255,0.45)',
    backdropFilter: 'blur(16px)',
    border: '1px solid rgba(255,255,255,0.5)',
    color: '#0F172A',
    textDecoration: 'none',
    transform: hov ? 'translateY(-3px)' : 'none',
    transition: 'transform 0.45s cubic-bezier(.16,1,.3,1), background 0.3s ease',
    ...style,
  };
  if (to) {
    return (
      <Link to={to} style={base} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} style={base} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      {children}
    </button>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function AboutPage() {
  const [scrollY, setScrollY] = useState(0);
  const [activeImage, setActiveImage] = useState(0);
  const { language } = useLanguage();
  const t = TRANSLATIONS[language];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Load demo fonts (Playfair Display + Plus Jakarta Sans) to match AdmissionPage exactly
  useEffect(() => {
    const id = 'auxanovo-font-link';
    if (!document.getElementById(id)) {
      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href =
        'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap';
      document.head.appendChild(link);
    }
  }, []);

  return (
    <div
      style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        background: `
          radial-gradient(at 20% 20%, rgba(37,99,235,.12) 0px, transparent 50%),
          radial-gradient(at 80% 0%, rgba(124,58,237,.10) 0px, transparent 50%),
          radial-gradient(at 0% 50%, rgba(6,182,212,.08) 0px, transparent 50%),
          #F7FAFC
        `,
        color: '#0F172A',
        lineHeight: 1.7,
        overflowX: 'hidden',
        WebkitFontSmoothing: 'antialiased',
        position: 'relative',
      }}
    >
      {/* Page-level ambient blobs — mirrors body::before / body::after */}
      <div
        style={{
          position: 'fixed',
          top: '-10%',
          left: '-10%',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37,99,235,.25), transparent 70%)',
          filter: 'blur(90px)',
          opacity: 0.55,
          zIndex: -1,
          pointerEvents: 'none',
          animation: 'floatBlob 14s ease-in-out infinite',
        }}
      />
      <div
        style={{
          position: 'fixed',
          bottom: '-20%',
          right: '-10%',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,.22), transparent 70%)',
          filter: 'blur(90px)',
          opacity: 0.55,
          zIndex: -1,
          pointerEvents: 'none',
          animation: 'floatBlob 18s ease-in-out infinite',
        }}
      />

      {/* ── Navbar ───────────────────────────────────────────────────────── */}


      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        {/* Parallax Background Image */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            transform: `translateY(${scrollY * 0.5}px)`,
            transition: 'transform 0.1s ease-out',
          }}
        >
          <img
            src="https://res.cloudinary.com/c3jl70ey/image/upload/v1783064289/aboutimage_oyyott.jpg"
            alt="P.S.N.M U.P. School"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        {/* Dark Gradient Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(8,17,32,.55), rgba(8,17,32,.42), rgba(8,17,32,.68))',
          }}
        />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 900, margin: '0 auto', padding: '0 6%', textAlign: 'center', color: 'white' }}>
          {/* Since 1976 Badge */}
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.7rem 1.6rem',
              borderRadius: 999,
              background: 'rgba(255,255,255,.16)',
              backdropFilter: 'blur(18px)',
              border: '1px solid rgba(255,255,255,.28)',
              boxShadow: '0 10px 35px rgba(255,255,255,.08)',
              fontSize: '0.78rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '.22em',
              color: '#7DD3FC',
              marginBottom: '2.2rem',
              animation: 'fadeInUp 1s ease-out both',
            }}
          >
            {t.heroBadge}
          </span>

          {/* Main Heading */}
          <h1
            className={language === 'ml' ? 'lang-ml' : ''}
            aria-label={t.heroTitle}
            style={{
              fontFamily: language === 'ml' ? "'Noto Serif Malayalam', 'Anek Malayalam', serif" : "'Playfair Display', serif",
              fontSize: language === 'ml' ? 'clamp(2.4rem, 5.5vw, 4.2rem)' : 'clamp(3rem, 7vw, 5.5rem)',
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: language === 'ml' ? 'normal' : '-0.04em',
              marginBottom: '1.5rem',
            }}
          >
            {(() => {
              let idx = 0;
              const lines = language === 'ml' ? ['പി.എസ്.എൻ.എം യു.പി സ്കൂൾ', 'വെളിയന്നൂർ'] : ['P.S.N.M U.P. School', 'Veliyannoor'];
              return lines.map((line, li) => (
                <span key={li} style={{ display: 'block' }}>
                  {line.split(' ').map((word, wi, arr) => (
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
                      {wi < arr.length - 1 ? ' ' : ''}
                    </span>
                  ))}
                </span>
              ));
            })()}
          </h1>

          {/* Subheading */}
          <p
            style={{
              fontSize: 'clamp(1.05rem, 2vw, 1.3rem)',
              color: 'rgba(255,255,255,0.82)',
              maxWidth: 680,
              margin: '0 auto',
              animation: 'fadeInUp 1s ease-out 0.6s both',
            }}
          >
            {t.heroSubtitle}
          </p>
        </div>

        {/* Scroll Indicator */}
        <div style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', zIndex: 2 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,.72)', textTransform: 'uppercase', letterSpacing: '.18em', fontWeight: 700 }}>
              {t.scroll}
            </span>
            <svg className="auxanovo-bounce" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* ── History & Mission ───────────────────────────────────────────── */}
      <section style={{ position: 'relative', padding: '8rem 6%', background: S.bgSoft }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '4rem',
              alignItems: 'center',
              marginBottom: '4rem',
            }}
          >
            {/* Text side */}
            <div>
              <SectionLabel>{t.storyLabel}</SectionLabel>
              <h2
                className={language === 'ml' ? 'lang-ml' : ''}
                style={{
                  fontFamily: language === 'ml' ? "'Noto Serif Malayalam', 'Anek Malayalam', serif" : "'Playfair Display', serif",
                  fontSize: 'clamp(2rem, 4.5vw, 3rem)',
                  fontWeight: 700,
                  letterSpacing: language === 'ml' ? 'normal' : '-0.04em',
                  lineHeight: 1.1,
                  color: '#0F172A',
                  marginBottom: '1.5rem',
                }}
              >
                {t.storyTitle}
              </h2>

              <p style={{ color: '#475569', marginBottom: '1.2rem', lineHeight: 1.8, textAlign: 'justify' }}>
                {t.story1}
              </p>

              <p style={{ color: '#475569', marginBottom: '1.2rem', lineHeight: 1.8, textAlign: 'justify' }}>
                {t.story2}
              </p>

              <p style={{ color: '#475569', lineHeight: 1.8, textAlign: 'justify' }}>
                {t.story3}
              </p>
            </div>

            {/* Image Carousel */}
            <div>
              <GlassCard style={{ padding: 0, height: 'min(384px, 70vw)', borderRadius: S.radiusLg }}>
                {CAROUSEL_IMAGES.map((image, idx) => (
                  <img
                    key={idx}
                    src={image}
                    alt={`School Campus ${idx + 1}`}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      opacity: idx === activeImage ? 1 : 0,
                      transition: 'opacity 1s ease-in-out',
                    }}
                  />
                ))}
              </GlassCard>

              {/* Carousel Indicators */}
              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '1.5rem' }}>
                {CAROUSEL_IMAGES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    aria-label={`View image ${idx + 1}`}
                    style={{
                      width: idx === activeImage ? 34 : 12,
                      height: 12,
                      borderRadius: 999,
                      border: 'none',
                      cursor: 'pointer',
                      background: idx === activeImage ? 'linear-gradient(135deg, #2563EB, #7C3AED)' : '#CBD5E1',
                      transition: 'all 0.35s ease',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* MISSION STATEMENT */}
          <GlassCard style={{ textAlign: 'center', padding: '3rem' }}>
            <h3
              className={language === 'ml' ? 'lang-ml' : ''}
              style={{
                fontFamily: language === 'ml' ? "'Noto Serif Malayalam', 'Anek Malayalam', serif" : "'Playfair Display', serif",
                fontSize: '1.7rem',
                fontWeight: 700,
                marginBottom: '1.2rem',
                background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                display: 'inline-block',
              }}
            >
              {t.missionTitle}
            </h3>
            <blockquote
              style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: 'italic',
                fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
                lineHeight: 1.7,
                color: '#475569',
                maxWidth: 760,
                margin: '0 auto',
              }}
            >
              {t.missionQuote}
            </blockquote>
          </GlassCard>
        </div>

        {/* Soft wave transition to dark Our Pillars section */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', overflow: 'hidden', lineHeight: 0, transform: 'translateY(1px)', zIndex: 0 }}>
          <svg viewBox="0 0 1440 320" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: '140px' }}>
            <path fill="#081120" fillOpacity="1" d="M0,160L30,170.7C60,181,120,203,180,213.3C240,224,300,224,360,208C420,192,480,160,540,154.7C600,149,660,171,720,181.3C780,192,840,192,900,176C960,160,1020,128,1080,133.3C1140,139,1200,181,1260,186.7C1320,192,1380,160,1410,144L1440,128L1440,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* ── Premium Features (Our Pillars) — dark cinematic block ─────────── */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '8rem 6%', background: 'linear-gradient(180deg, #081120, #0F172A)' }}>
        <div
          style={{
            position: 'absolute',
            width: 720,
            height: 720,
            top: -220,
            right: -120,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59,130,246,.15), transparent 70%)',
            filter: 'blur(70px)',
            pointerEvents: 'none',
          }}
        />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1200, margin: '0 auto' }}>
          <h2
            className={language === 'ml' ? 'lang-ml' : ''}
            style={{
              fontFamily: language === 'ml' ? "'Noto Serif Malayalam', 'Anek Malayalam', serif" : "'Playfair Display', serif",
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
              fontWeight: 700,
              letterSpacing: language === 'ml' ? 'normal' : '-0.04em',
              lineHeight: 1.05,
              color: 'white',
              marginBottom: '4rem',
            }}
          >
            {t.pillarsTitle}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
            {PREMIUM_FEATURES.map(({ meta, title, desc }, idx) => (
              <GlassCard key={idx}>
                <SectionLabel>{localizedText(meta, language)}</SectionLabel>
                <h3
                  className={language === 'ml' ? 'lang-ml' : ''}
                  style={{
                    fontFamily: language === 'ml' ? "'Noto Serif Malayalam', 'Anek Malayalam', serif" : "'Playfair Display', serif",
                    fontSize: '1.4rem',
                    fontWeight: 700,
                    color: '#0F172A',
                    marginBottom: '0.8rem',
                    letterSpacing: language === 'ml' ? 'normal' : '-0.02em',
                  }}
                >
                  {localizedText(title, language)}
                </h3>
                <p style={{ color: '#475569', lineHeight: 1.7, fontSize: '0.92rem' }}>{localizedText(desc, language)}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── Campus Experience ───────────────────────────────────────────── */}
      <section style={{ position: 'relative', padding: '8rem 6%', background: S.bgSoft }}>
        {/* Soft wave transition from dark Our Pillars section */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', overflow: 'hidden', lineHeight: 0, transform: 'translateY(-1px)', zIndex: 0 }}>
          <svg viewBox="0 0 1440 320" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: '140px' }}>
            <path fill="#0F172A" fillOpacity="1" d="M0,128L48,117.3C96,107,192,85,288,101.3C384,117,480,171,576,170.7C672,171,768,117,864,101.3C960,85,1056,107,1152,117.3C1248,128,1344,128,1392,128L1440,128L1440,0L0,0Z"></path>
          </svg>
        </div>

        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <SectionLabel>{t.campusLabel}</SectionLabel>
            <h2
              className={language === 'ml' ? 'lang-ml' : ''}
              style={{
                fontFamily: language === 'ml' ? "'Noto Serif Malayalam', 'Anek Malayalam', serif" : "'Playfair Display', serif",
                fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
                fontWeight: 700,
                letterSpacing: language === 'ml' ? 'normal' : '-0.04em',
                lineHeight: 1.05,
                color: '#0F172A',
              }}
            >
              {t.campusTitle}
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
            {CAMPUS_FEATURES.map(({ title, desc }, idx) => (
              <GlassCard key={idx}>
                <h3
                  className={language === 'ml' ? 'lang-ml' : ''}
                  style={{
                    fontFamily: language === 'ml' ? "'Noto Serif Malayalam', 'Anek Malayalam', serif" : "'Playfair Display', serif",
                    fontSize: '1.4rem',
                    fontWeight: 700,
                    color: '#0F172A',
                    marginBottom: '0.8rem',
                    letterSpacing: language === 'ml' ? 'normal' : '-0.02em',
                  }}
                >
                  {localizedText(title, language)}
                </h3>
                <p style={{ color: '#475569', lineHeight: 1.7, fontSize: '0.92rem' }}>{localizedText(desc, language)}</p>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Soft wave transition to dark Our Values section */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', overflow: 'hidden', lineHeight: 0, transform: 'translateY(1px)', zIndex: 0 }}>
          <svg viewBox="0 0 1440 320" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: '140px' }}>
            <path fill="#081120" fillOpacity="1" d="M0,224L60,213.3C120,203,240,181,360,186.7C480,192,600,224,720,224C840,224,960,192,1080,165.3C1200,139,1320,117,1380,106.7L1440,96L1440,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* ── Core Values — dark cinematic block ──────────────────────────── */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '8rem 6%', background: 'linear-gradient(180deg, #081120, #0F172A)' }}>
        <div
          style={{
            position: 'absolute',
            width: 720,
            height: 720,
            bottom: -220,
            left: -120,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(124,58,237,.15), transparent 70%)',
            filter: 'blur(70px)',
            pointerEvents: 'none',
          }}
        />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1200, margin: '0 auto' }}>
          <h2
            className={language === 'ml' ? 'lang-ml' : ''}
            style={{
              fontFamily: language === 'ml' ? "'Noto Serif Malayalam', 'Anek Malayalam', serif" : "'Playfair Display', serif",
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
              fontWeight: 700,
              letterSpacing: language === 'ml' ? 'normal' : '-0.04em',
              lineHeight: 1.05,
              color: 'white',
              textAlign: 'center',
              marginBottom: '4.5rem',
            }}
          >
            {t.valuesTitle}
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '3rem' }}>
            {/* KNOWLEDGE */}
            <div>
              <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '1.05rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.16em', color: 'white', marginBottom: '1rem' }}>
                {t.valKnowl}
              </h3>
              <SectionLabel light>{t.valKnowlLabel}</SectionLabel>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {[t.valKnowl1, t.valKnowl2, t.valKnowl3].map((item) => (
                  <li key={item} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <span style={{ color: S.accentCyan, marginTop: 4 }}>•</span>
                    <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.92rem', lineHeight: 1.6 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* VALUES */}
            <div>
              <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '1.05rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.16em', color: 'white', marginBottom: '1rem' }}>
                {t.valVals}
              </h3>
              <SectionLabel light>{t.valValsLabel}</SectionLabel>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {[t.valVals1, t.valVals2, t.valVals3].map((item) => (
                  <li key={item} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <span style={{ color: S.accentCyan, marginTop: 4 }}>•</span>
                    <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.92rem', lineHeight: 1.6 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* GROWTH */}
            <div>
              <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '1.05rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.16em', color: 'white', marginBottom: '1rem' }}>
                {t.valGrow}
              </h3>
              <SectionLabel light>{t.valGrowLabel}</SectionLabel>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {[t.valGrow1, t.valGrow2, t.valGrow3].map((item) => (
                  <li key={item} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <span style={{ color: S.accentCyan, marginTop: 4 }}>•</span>
                    <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.92rem', lineHeight: 1.6 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials — Leadership & Governing Body ──────────────────── */}
      <section style={{ position: 'relative', padding: '8rem 6%' }}>
        {/* Soft wave transition from dark Our Values section */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', overflow: 'hidden', lineHeight: 0, transform: 'translateY(-1px)', zIndex: 0 }}>
          <svg viewBox="0 0 1440 320" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: '140px' }}>
            <path fill="#0F172A" fillOpacity="1" d="M0,256L48,229.3C96,203,192,149,288,154.7C384,160,480,224,576,218.7C672,213,768,139,864,128C960,117,1056,171,1152,197.3C1248,224,1344,224,1392,224L1440,224L1440,0L0,0Z"></path>
          </svg>
        </div>

        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <SectionLabel>{t.leadersLabel}</SectionLabel>
            <h2
              className={language === 'ml' ? 'lang-ml' : ''}
              style={{
                fontFamily: language === 'ml' ? "'Noto Serif Malayalam', 'Anek Malayalam', serif" : "'Playfair Display', serif",
                fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
                fontWeight: 700,
                letterSpacing: language === 'ml' ? 'normal' : '-0.04em',
                lineHeight: 1.05,
                color: '#0F172A',
                marginBottom: '1rem',
              }}
            >
              {t.leadersTitle}
            </h2>
            <p style={{ color: '#475569', fontSize: '1.05rem', maxWidth: 580, margin: '0 auto' }}>
              {t.leadersDesc}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {TESTIMONIALS.map(({ name, role, quote }, i) => (
              <GlassCard key={i} style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.6rem', color: S.accentPrimary, opacity: 0.35, lineHeight: 1, marginBottom: '0.6rem' }}>
                  "
                </div>
                <p
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontStyle: 'italic',
                    lineHeight: 1.7,
                    color: '#475569',
                    marginBottom: '1.6rem',
                    fontSize: '0.95rem',
                    flexGrow: 1,
                  }}
                >
                  {localizedText(quote, language)}
                </p>
                <div>
                  <p style={{ fontWeight: 700, color: '#0F172A', fontSize: '0.95rem', marginBottom: '0.2rem' }}>{localizedText(name, language)}</p>
                  <p style={{ fontSize: '0.82rem', fontWeight: 600, color: S.accentPrimary }}>{localizedText(role, language)}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer
        style={{
          padding: '5rem 6%',
          textAlign: 'center',
          color: '#475569',
          borderTop: '1px solid rgba(15,23,42,.06)',
        }}
      >
        <p>{t.footer}</p>
      </footer>

      {/* Keyframe + pseudo-class injection (mirrors AdmissionPage's styles.css behaviors not expressible inline) */}
      <style>{`
        @keyframes floatBlob {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50%       { transform: translateY(-30px) translateX(20px); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes letterFall {
          0% { opacity: 0; transform: translateY(-60px) rotate(-8deg); }
          100% { opacity: 1; transform: translateY(0) rotate(0); }
        }
        @keyframes auxBounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(8px); }
        }
        .auxanovo-bounce { animation: auxBounce 2s ease-in-out infinite; }
        .auxanovo-navlink { position: relative; transition: .35s ease; }
        .auxanovo-navlink::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -8px;
          width: 0%;
          height: 2px;
          border-radius: 999px;
          background: linear-gradient(90deg, #2563EB, #7C3AED);
          transition: .4s ease;
        }
        .auxanovo-navlink:hover { color: #2563EB !important; }
        .auxanovo-navlink:hover::after { width: 100%; }
        ::selection { background: #2563EB; color: white; }
        ::-webkit-scrollbar { width: 10px; }
        ::-webkit-scrollbar-track { background: #EAF2FF; }
        ::-webkit-scrollbar-thumb {
          border-radius: 999px;
          background: linear-gradient(180deg, #2563EB, #7C3AED);
        }
        @media (max-width: 768px) {
          .auxanovo-nav { display: none !important; }
          .auxanovo-navbar { width: 95% !important; padding: 1rem 1.2rem !important; }
        }
      `}</style>
    </div>
  );
}