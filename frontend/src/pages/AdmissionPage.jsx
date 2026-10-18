import SEO from '../components/SEO';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { localizedText, useLanguage } from '../context/LanguageContext';

const TRANSLATIONS = {
  en: {
    heroBadge: "Admissions Open 2026–27",
    heroTitle1: "Begin Your Journey at ",
    heroTitle2: "PSNM.",
    heroSubtitle: "We welcome curious minds and driven learners from across Kerala. Explore our admission process, seat availability, and apply for the 2026–27 academic year today.",
    applyNow: "Apply Now",
    viewProcess: "View Process",
    stat1Label: "Classes Offered",
    stat1Value: "V – VII",
    stat2Label: "School Type",
    stat2Value: "Government Aided",
    stat3Label: "Admission",
    stat3Value: "Based on Availability",
    stat4Label: "Application Fee",
    stat4Value: " As per Government Rules",
    processLabel: "How It Works",
    processTitle: "Admission Process",
    processDesc: "A clear, five-step path from enquiry to your first day at PSNM.",
    docsLabel: "Checklist",
    docsTitle: "Documents Required",
    docsDesc: "Please keep the required documents ready while applying for admission. Original documents may be required for verification by the school.",
    infoTitle: "Admission Information",
    infoItems: [
      { event: "Application Opens", value: "January 2026" },
      { event: "Classes Begin", value: "June 2026" },
      { event: "Office Hours", value: "9:30 AM – 3:30 PM" }
    ],
    contactBtn: "Contact School Office",
    quoteLabel: "A Message From Our Head Mistress",
    quoteText: "\"Every child who walks through our doors brings a unique story. Our role is to make sure that story becomes one of confidence, curiosity, and compassion.\"",
    quoteCite: "— The Head Mistress, PSNM Upper Primary School",
    startLabel: "Get Started",
    startTitle: "Admission & Enquiry",
    startDesc: "Submit an admission application for Classes V–VII. The school office will review your application and contact you regarding the next steps.",
    faqLabel: "FAQs",
    faqTitle: "Frequently Asked Questions",
    faqMore: "Have more questions?",
    faqContact: "Contact the admissions office →",
    ctaLabel: "Admissions Open 2026",
    ctaTitle: "Ready to take the first step?",
    ctaDesc: "Join thousands of PSNM alumni who've gone on to achieve great things. Seats are limited — apply early to secure your child's place.",
    ctaApply: "Apply Now",
    ctaCall: "Call the Admissions Office",
    footer: "© 2026 PSNM School — Crafted by AUXANOVO"
  },
  ml: {
    heroBadge: "പ്രവേശനം ആരംഭിച്ചിരിക്കുന്നു 2026–27",
    heroTitle1: "നിങ്ങളുടെ യാത്ര ആരംഭിക്കുക ",
    heroTitle2: "PSNM-ൽ.",
    heroSubtitle: "കേരളത്തിലുടനീളമുള്ള വിദ്യാർത്ഥികളെ ഞങ്ങൾ സ്വാഗതം ചെയ്യുന്നു. ഞങ്ങളുടെ പ്രവേശന പ്രക്രിയ, സീറ്റ് ലഭ്യത എന്നിവയെക്കുറിച്ച് അറിയുകയും 2026-27 അധ്യയന വർഷത്തേക്കായി ഇന്ന് തന്നെ അപേക്ഷിക്കുകയും ചെയ്യുക.",
    applyNow: "ഇപ്പോൾ അപേക്ഷിക്കുക",
    viewProcess: "പ്രക്രിയ കാണുക",
    stat1Label: "ക്ലാസുകൾ",
    stat1Value: "V – VII",
    stat2Label: "സ്കൂൾ തരം",
    stat2Value: "ഗവൺമെൻ്റ് എയ്ഡഡ്",
    stat3Label: "പ്രവേശനം",
    stat3Value: "ലഭ്യതയുടെ അടിസ്ഥാനത്തിൽ",
    stat4Label: "അപേക്ഷാ ഫീസ്",
    stat4Value: " സർക്കാർ നിയമപ്രകാരം",
    processLabel: "പ്രക്രിയ",
    processTitle: "പ്രവേശന പ്രക്രിയ",
    processDesc: "അന്വേഷണം മുതൽ PSNM-ലെ നിങ്ങളുടെ ആദ്യ ദിവസം വരെയുള്ള വ്യക്തമായ അഞ്ച് ഘട്ടങ്ങൾ.",
    docsLabel: "ചെക്ക്‌ലിസ്റ്റ്",
    docsTitle: "ആവശ്യമായ രേഖകൾ",
    docsDesc: "പ്രവേശനത്തിന് അപേക്ഷിക്കുമ്പോൾ ആവശ്യമായ രേഖകൾ തയ്യാറാക്കി വെക്കുക. സ്കൂളിൻ്റെ പരിശോധനയ്ക്കായി അസ്സൽ രേഖകൾ ആവശ്യമായി വന്നേക്കാം.",
    infoTitle: "പ്രവേശന വിവരങ്ങൾ",
    infoItems: [
      { event: "അപേക്ഷ ആരംഭിക്കുന്നത്", value: "ജനുവരി 2026" },
      { event: "ക്ലാസുകൾ ആരംഭിക്കുന്നത്", value: "ജൂൺ 2026" },
      { event: "ഓഫീസ് സമയം", value: "9:30 AM – 3:30 PM" }
    ],
    contactBtn: "സ്കൂൾ ഓഫീസുമായി ബന്ധപ്പെടുക",
    quoteLabel: "ഹെഡ് മിസ്ട്രസിൻ്റെ സന്ദേശം",
    quoteText: "\"ഞങ്ങളുടെ പടി കടന്നെത്തുന്ന ഓരോ കുട്ടിയും ഒരു പ്രത്യേക കഥ കൊണ്ടുവരുന്നു. ആ കഥ ആത്മവിശ്വാസത്തിൻ്റെയും ജിജ്ഞാസയുടെയും അനുകമ്പയുടെയും ഒന്നായി മാറുന്നുവെന്ന് ഉറപ്പാക്കുക എന്നതാണ് ഞങ്ങളുടെ പങ്ക്.\"",
    quoteCite: "— ഹെഡ് മിസ്ട്രസ്, പി.എസ്.എൻ.എം യു.പി സ്കൂൾ",
    startLabel: "ആരംഭിക്കുക",
    startTitle: "പ്രവേശനവും അന്വേഷണവും",
    startDesc: "V-VII ക്ലാസുകളിലേക്കുള്ള പ്രവേശന അപേക്ഷ സമർപ്പിക്കുക. സ്കൂൾ ഓഫീസ് നിങ്ങളുടെ അപേക്ഷ പരിശോധിച്ച് തുടർനടപടികൾക്കായി നിങ്ങളുമായി ബന്ധപ്പെടും.",
    faqLabel: "പതിവ് ചോദ്യങ്ങൾ",
    faqTitle: "പതിവായി ചോദിക്കുന്ന ചോദ്യങ്ങൾ",
    faqMore: "കൂടുതൽ ചോദ്യങ്ങളുണ്ടോ?",
    faqContact: "അഡ്മിഷൻ ഓഫീസുമായി ബന്ധപ്പെടുക →",
    ctaLabel: "പ്രവേശനം 2026",
    ctaTitle: "ആദ്യ ചുവടുവെക്കാൻ തയ്യാറാണോ?",
    ctaDesc: "വലിയ നേട്ടങ്ങൾ കൈവരിച്ച ആയിരക്കണക്കിന് PSNM പൂർവ്വ വിദ്യാർത്ഥികളോടൊപ്പം ചേരുക. സീറ്റുകൾ പരിമിതമാണ് — നിങ്ങളുടെ കുട്ടിയുടെ സ്ഥാനം ഉറപ്പാക്കാൻ നേരത്തെ അപേക്ഷിക്കുക.",
    ctaApply: "ഇപ്പോൾ അപേക്ഷിക്കുക",
    ctaCall: "അഡ്മിഷൻ ഓഫീസിലേക്ക് വിളിക്കുക",
    footer: "© 2026 PSNM സ്കൂൾ — തയ്യാറാക്കിയത് AUXANOVO"
  }
};

const STEPS = [
  {
    number: '01',
    title: { en: 'Apply for Admission', ml: 'പ്രവേശനത്തിനായി അപേക്ഷിക്കുക' },
    desc: { en: 'Collect the admission form from the school or complete the online application, if online admission is available. Enter the student’s personal and academic details.', ml: 'സ്കൂളിൽ നിന്ന് അഡ്മിഷൻ ഫോം വാങ്ങുക അല്ലെങ്കിൽ ഓൺലൈൻ അപേക്ഷ പൂർത്തിയാക്കുക. വിദ്യാർത്ഥിയുടെ വ്യക്തിഗത, അക്കാദമിക് വിവരങ്ങൾ നൽകുക.' },
    icon: '📋',
  },
  {
    number: '02',
    title: { en: 'Submit Documents', ml: 'രേഖകൾ സമർപ്പിക്കുക' },
    desc: { en: 'Submit the required documents such as the birth certificate, previous school records, Transfer Certificate (TC), Aadhaar details, and photographs, as applicable.', ml: 'ജനന സർട്ടിഫിക്കറ്റ്, മുൻ സ്കൂൾ രേഖകൾ, ട്രാൻസ്ഫർ സർട്ടിഫിക്കറ്റ് (TC), ആധാർ വിവരങ്ങൾ, ഫോട്ടോകൾ തുടങ്ങിയ ആവശ്യമായ രേഖകൾ സമർപ്പിക്കുക.' },
    icon: '📁',
  },
  {
    number: '03',
    title: { en: 'Document Verification', ml: 'രേഖകളുടെ പരിശോധന' },
    desc: { en: 'The school will verify the application and submitted documents. If required, additional information or documents may be requested.', ml: 'സ്കൂൾ അപേക്ഷയും സമർപ്പിച്ച രേഖകളും പരിശോധിക്കും. ആവശ്യമെങ്കിൽ കൂടുതൽ വിവരങ്ങളോ രേഖകളോ ചോദിച്ചേക്കാം.' },
    icon: '🔍',
  },
  {
    number: '04',
    title: { en: 'Admission Confirmation', ml: 'പ്രവേശനം ഉറപ്പാക്കൽ' },
    desc: { en: 'Once the application is verified and a seat is available, the school will confirm the student’s admission and provide further instructions.', ml: 'അപേക്ഷ പരിശോധിച്ച് സീറ്റ് ലഭ്യമായാൽ, സ്കൂൾ വിദ്യാർത്ഥിയുടെ പ്രവേശനം ഉറപ്പാക്കുകയും കൂടുതൽ വിവരങ്ങൾ നൽകുകയും ചെയ്യും.' },
    icon: '✅',
  },
  {
    number: '05',
    title: { en: 'Complete Enrollment', ml: 'പ്രവേശനം പൂർത്തിയാക്കൽ' },
    desc: { en: 'Complete the required school formalities, submit any remaining documents, and complete applicable fee or other admission procedures to officially enroll the student.', ml: 'ആവശ്യമായ സ്കൂൾ നടപടിക്രമങ്ങൾ പൂർത്തിയാക്കുക, ബാക്കിയുള്ള രേഖകൾ സമർപ്പിക്കുക, കൂടാതെ വിദ്യാർത്ഥിയെ ഔദ്യോഗികമായി ചേർക്കുന്നതിന് ബാധകമായ ഫീസോ മറ്റ് പ്രവേശന നടപടിക്രമങ്ങളോ പൂർത്തിയാക്കുക.' },
    icon: '🎓',
  },
];

const DOCUMENTS = [
  { en: 'Birth Certificate', ml: 'ജനന സർട്ടിഫിക്കറ്റ്' },
  { en: 'Previous Class Report Card / Progress Report', ml: 'മുൻ ക്ലാസിലെ റിപ്പോർട്ട് കാർഡ് / പ്രോഗ്രസ് റിപ്പോർട്ട്' },
  { en: 'Transfer Certificate (TC) from Previous School', ml: 'മുമ്പത്തെ സ്കൂളിൽ നിന്നുള്ള ട്രാൻസ്ഫർ സർട്ടിഫിക്കറ്റ് (TC)' },
  { en: 'Aadhaar Card details of the Student', ml: 'വിദ്യാർത്ഥിയുടെ ആധാർ കാർഡ് വിവരങ്ങൾ' },
  { en: 'Passport-size Photographs', ml: 'പാസ്പോർട്ട് സൈസ് ഫോട്ടോകൾ' },
  { en: 'Caste / Community Certificate (if applicable)', ml: 'ജാതി / കമ്മ്യൂണിറ്റി സർട്ടിഫിക്കറ്റ് (ബാധകമെങ്കിൽ)' },
  { en: 'Disability Certificate (if applicable)', ml: 'വൈകല്യ സർട്ടിഫിക്കറ്റ് (ബാധകമെങ്കിൽ)' },
];

const FAQS = [
  {
    q: { en: 'When does admission begin for the next academic year?', ml: 'അടുത്ത അധ്യയന വർഷത്തേക്കുള്ള പ്രവേശനം എപ്പോഴാണ് ആരംഭിക്കുന്നത്?' },
    a: { en: 'Admission generally begins before the start of the new academic year. Parents and students can contact the school office for the current admission schedule and availability of seats.', ml: 'പുതിയ അധ്യയന വർഷം ആരംഭിക്കുന്നതിന് മുമ്പാണ് സാധാരണയായി പ്രവേശനം ആരംഭിക്കുന്നത്. നിലവിലെ പ്രവേശന ഷെഡ്യൂളിനും സീറ്റുകളുടെ ലഭ്യതയ്ക്കും രക്ഷിതാക്കൾക്കും വിദ്യാർത്ഥികൾക്കും സ്കൂൾ ഓഫീസുമായി ബന്ധപ്പെടാം.' },
  },
  {
    q: { en: 'Which classes are available for admission?', ml: 'ഏത് ക്ലാസുകളിലേക്കാണ് പ്രവേശനം ലഭിക്കുന്നത്?' },
    a: { en: 'The school offers admission for Classes V, VI, and VII, subject to seat availability and the applicable admission rules.', ml: 'സീറ്റ് ലഭ്യതയ്ക്കും ബാധകമായ പ്രവേശന നിയമങ്ങൾക്കും വിധേയമായി സ്കൂൾ V, VI, VII ക്ലാസുകളിലേക്ക് പ്രവേശനം നൽകുന്നു.' },
  },
  {
    q: { en: 'Is there an entrance examination or interview?', ml: 'പ്രവേശന പരീക്ഷയോ ഇൻ്റർവ്യൂവോ ഉണ്ടോ?' },
    a: { en: 'No entrance examination or interview is normally conducted for admission to Classes V–VII in a Government or Government-aided school. Admission is processed based on the applicable school and government guidelines.', ml: 'സർക്കാർ അല്ലെങ്കിൽ എയ്ഡഡ് സ്കൂളിൽ V-VII ക്ലാസുകളിലേക്കുള്ള പ്രവേശനത്തിന് സാധാരണയായി പ്രവേശന പരീക്ഷയോ ഇൻ്റർവ്യൂവോ നടത്താറില്ല. ബാധകമായ സ്കൂൾ, സർക്കാർ മാർഗ്ഗനിർദ്ദേശങ്ങളുടെ അടിസ്ഥാനത്തിലാണ് പ്രവേശനം നടക്കുന്നത്.' },
  },
  {
    q: { en: 'What documents are required for admission?', ml: 'പ്രവേശനത്തിന് ആവശ്യമായ രേഖകൾ എന്തൊക്കെയാണ്?' },
    a: { en: 'Parents should provide the required documents such as the birth certificate, previous class progress report, Transfer Certificate (if applicable), Aadhaar details, photographs, and other certificates where applicable.', ml: 'ജനന സർട്ടിഫിക്കറ്റ്, മുൻ ക്ലാസിലെ പ്രോഗ്രസ് റിപ്പോർട്ട്, ട്രാൻസ്ഫർ സർട്ടിഫിക്കറ്റ് (ബാധകമെങ്കിൽ), ആധാർ വിവരങ്ങൾ, ഫോട്ടോഗ്രാഫുകൾ തുടങ്ങിയ ആവശ്യമായ രേഖകൾ രക്ഷിതാക്കൾ നൽകണം.' },
  },
  {
    q: { en: 'What is the medium of instruction?', ml: 'പഠന മാധ്യമം ഏതാണ്?' },
    a: { en: 'The medium of instruction depends on the school and the approved language/medium of the respective class. Parents can contact the school office for information about the available medium of instruction and language subjects.', ml: 'പഠന മാധ്യമം സ്കൂളിനെയും അതാത് ക്ലാസിലെ അംഗീകൃത ഭാഷ/മാധ്യമത്തെയും ആശ്രയിച്ചിരിക്കുന്നു. ലഭ്യമായ പഠന മാധ്യമത്തെയും ഭാഷാ വിഷയങ്ങളെയും കുറിച്ചുള്ള വിവരങ്ങൾക്ക് രക്ഷിതാക്കൾക്ക് സ്കൂൾ ഓഫീസുമായി ബന്ധപ്പെടാം.' },
  },
  {
    q: { en: 'Are there any fees for admission?', ml: 'പ്രവേശനത്തിന് ഫീസ് എന്തെങ്കിലുമുണ്ടോ?' },
    a: { en: 'Applicable fees, if any, are collected according to the rules prescribed for Government and Government-aided schools. Parents can contact the school office for details about the current fee structure.', ml: 'സർക്കാർ, എയ്ഡഡ് സ്കൂളുകൾക്ക് നിർദ്ദേശിച്ചിട്ടുള്ള നിയമങ്ങൾ അനുസരിച്ചാണ് ബാധകമായ ഫീസ് ഈടാക്കുന്നത്. നിലവിലെ ഫീസ് ഘടനയെക്കുറിച്ചുള്ള വിവരങ്ങൾക്ക് രക്ഷിതാക്കൾക്ക് സ്കൂൾ ഓഫീസുമായി ബന്ധപ്പെടാം.' },
  },
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
      <SEO title="Admissions" />
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
          content: '',
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
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  );
}

function BtnPrimary({ children, onClick, type = 'button', style = {} }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      type={type}
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem 2rem',
        borderRadius: 999,
        border: 'none',
        cursor: 'pointer',
        fontWeight: 600,
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: '0.95rem',
        background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
        color: 'white',
        boxShadow: hov
          ? '0 22px 60px rgba(37,99,235,0.32)'
          : '0 14px 40px rgba(37,99,235,0.22)',
        transform: hov ? 'translateY(-4px) scale(1.02)' : 'none',
        transition: 'transform 0.45s cubic-bezier(.16,1,.3,1), box-shadow 0.45s ease',
        ...style,
      }}
    >
      {children}
    </button>
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
      <Link
        to={to}
        style={base}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      type={type}
      onClick={onClick}
      style={base}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {children}
    </button>
  );
}

function FAQ({ q, a, language }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        borderRadius: S.radiusSm,
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.4)',
        boxShadow: S.shadowSoft,
        marginBottom: '1rem',
      }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.4rem 2rem',
          background: S.bgCard,
          backdropFilter: 'blur(20px)',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          transition: 'background 0.3s ease',
        }}
      >
        <span
          className={language === 'ml' ? 'lang-ml' : ''}
          style={{
            fontFamily: language === 'ml' ? "'Noto Serif Malayalam', 'Anek Malayalam', serif" : "'Plus Jakarta Sans', sans-serif",
            fontWeight: 600,
            fontSize: '0.95rem',
            color: '#0F172A',
            paddingRight: '1rem',
          }}
        >
          {localizedText(q, language)}
        </span>
        <span
          style={{
            flexShrink: 0,
            width: 28,
            height: 28,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: '1.1rem',
            background: open
              ? 'linear-gradient(135deg, #2563EB, #7C3AED)'
              : 'rgba(37,99,235,0.1)',
            color: open ? 'white' : S.accentPrimary,
            transform: open ? 'rotate(45deg)' : 'none',
            transition: 'all 0.3s ease',
          }}
        >
          +
        </span>
      </button>
      {open && (
        <div
          style={{
            padding: '1.4rem 2rem',
            background: S.bgSoft,
            borderTop: '1px solid rgba(37,99,235,0.1)',
            fontFamily: language === 'ml' ? "'Noto Serif Malayalam', 'Anek Malayalam', serif" : "'Plus Jakarta Sans', sans-serif",
            fontSize: '0.92rem',
            color: '#475569',
            lineHeight: 1.7,
          }}
        >
          {localizedText(a, language)}
        </div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function AdmissionPage() {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language];

  // Load demo fonts (Playfair Display + Plus Jakarta Sans) to match index.html exactly
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

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '10rem 6% 6rem',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'relative', zIndex: 1 }}>
          <SectionLabel>{t.heroBadge}</SectionLabel>

          <h1
            className={language === 'ml' ? 'lang-ml' : ''}
            aria-label={`${t.heroTitle1}${t.heroTitle2}`}
            style={{
              fontFamily: language === 'ml' ? "'Noto Serif Malayalam', 'Anek Malayalam', serif" : "'Playfair Display', serif",
              fontSize: 'clamp(4rem, 9vw, 7rem)',
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: language === 'ml' ? 'normal' : '-0.04em',
              color: '#0F172A',
              maxWidth: 1100,
              marginBottom: '2rem',
            }}
          >
            {(() => {
              let idx = 0;
              const renderText = (text) => {
                return text.split(' ').map((word, wi, arr) => (
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
                ));
              };
              return (
                <>
                  {renderText(t.heroTitle1)}
                  <span style={{ color: S.accentPrimary }}>{renderText(t.heroTitle2)}</span>
                </>
              );
            })()}
          </h1>

          <p
            style={{
              fontSize: 'clamp(1.05rem, 2vw, 1.3rem)',
              color: '#475569',
              maxWidth: 720,
              marginBottom: '3rem',
            }}
          >
            {t.heroSubtitle}
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <BtnPrimary
              onClick={() => {
                document.getElementById('process-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {t.applyNow}
            </BtnPrimary>
            <BtnOutline
              onClick={() =>
                document.getElementById('process-section')?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              {t.viewProcess}
            </BtnOutline>
          </div>
        </div>

        {/* Stat cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '1.2rem',
            marginTop: '5rem',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {[
            { label: t.stat1Label, value: t.stat1Value }, 
            { label: t.stat2Label, value: t.stat2Value }, 
            { label: t.stat3Label, value: t.stat3Value }, 
            { label: t.stat4Label, value: t.stat4Value }, 
          ].map(({ label, value }) => (
            <div
              key={label}
              style={{
                borderRadius: S.radiusSm,
                padding: '1.4rem 1.2rem',
                textAlign: 'center',
                background: S.bgCard,
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.4)',
                boxShadow: S.shadowSoft,
              }}
            >
              <p
                className={language === 'ml' ? 'lang-ml' : ''}
                style={{
                  fontFamily: language === 'ml' ? "'Noto Serif Malayalam', 'Anek Malayalam', serif" : "'Playfair Display', serif",
                  fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                  fontWeight: 700,
                  color: S.accentPrimary,
                  lineHeight: 1.1,
                  marginBottom: '0.4rem',
                }}
              >
                {value}
              </p>
              <p
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.16em',
                  color: '#475569',
                }}
              >
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Admission Process ────────────────────────────────────────────── */}
      <section id="process-section" style={{ padding: '8rem 6%' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <SectionLabel>{t.processLabel}</SectionLabel>
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
            {t.processTitle}
          </h2>
          <p style={{ color: '#475569', fontSize: '1.05rem', maxWidth: 580, margin: '0 auto' }}>
            {t.processDesc}
          </p>
        </div>

        <div style={{ position: 'relative' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '2rem',
            }}
          >
            {STEPS.map(({ number, title, desc, icon }) => (
              <div
                key={number}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.4rem',
                    boxShadow: '0 14px 40px rgba(37,99,235,0.22)',
                    flexShrink: 0,
                  }}
                >
                  <span style={{ fontSize: '1.6rem', lineHeight: 1 }}>{icon}</span>
                  <span
                    style={{
                      fontSize: '0.62rem',
                      fontWeight: 700,
                      letterSpacing: '0.16em',
                      color: 'rgba(255,255,255,0.7)',
                      marginTop: 2,
                    }}
                  >
                    {number}
                  </span>
                </div>
                <h3
                  className={language === 'ml' ? 'lang-ml' : ''}
                  style={{
                    fontFamily: language === 'ml' ? "'Noto Serif Malayalam', 'Anek Malayalam', serif" : "'Playfair Display', serif",
                    fontSize: '1.2rem',
                    fontWeight: 600,
                    color: '#0F172A',
                    marginBottom: '0.6rem',
                    letterSpacing: language === 'ml' ? 'normal' : '-0.02em',
                  }}
                >
                  {localizedText(title, language)}
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.6 }}>{localizedText(desc, language)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Documents Required ────────────────────────────────────────────── */}
      <section style={{ position: 'relative', padding: '8rem 6%' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '4rem',
            alignItems: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Text side */}
          <div>
            <SectionLabel>{t.docsLabel}</SectionLabel>

            <h2
              className={language === 'ml' ? 'lang-ml' : ''}
              style={{
                fontFamily: language === 'ml' ? "'Noto Serif Malayalam', 'Anek Malayalam', serif" : "'Playfair Display', serif",
                fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
                fontWeight: 700,
                letterSpacing: language === 'ml' ? 'normal' : '-0.04em',
                lineHeight: 1.05,
                color: '#0F172A',
                marginBottom: '1rem',
              }}
            >
              {t.docsTitle}
            </h2>

            <p
              style={{
                color: '#475569',
                marginBottom: '2rem',
                lineHeight: 1.7,
              }}
            >
              {t.docsDesc}
            </p>

            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
              }}
            >
              {DOCUMENTS.map((doc) => (
                <li
                  key={localizedText(doc, 'en')}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.85rem',
                    marginBottom: '0.9rem',
                  }}
                >
                  <span
                    style={{
                      flexShrink: 0,
                      marginTop: 2,
                      width: 22,
                      height: 22,
                      borderRadius: '50%',
                      background: 'rgba(37,99,235,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 20 20"
                      fill={S.accentPrimary}
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>

                  <span
                    style={{
                      fontSize: '0.92rem',
                      color: '#334155',
                    }}
                  >
                    {localizedText(doc, language)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Admission Information Card */}
          <div
            style={{
              position: 'relative',
              overflow: 'hidden',
              padding: '3rem',
              borderRadius: S.radiusMd,
              background:
                'linear-gradient(135deg, #1e40af 0%, #7C3AED 100%)',
              color: 'white',
              boxShadow: '0 25px 80px rgba(37,99,235,0.28)',
            }}
          >
            {/* Glow orb */}
            <div
              style={{
                position: 'absolute',
                top: '-60px',
                right: '-60px',
                width: 280,
                height: 280,
                borderRadius: '50%',
                background:
                  'radial-gradient(circle, rgba(6,182,212,.3), transparent 70%)',
                filter: 'blur(50px)',
                pointerEvents: 'none',
              }}
            />

            <div
              style={{
                position: 'relative',
                zIndex: 1,
              }}
            >
              <p
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.22em',
                  color: '#7DD3FC',
                  marginBottom: '1.8rem',
                }}
              >
                {t.infoTitle}
              </p>

              <div>
                {t.infoItems.map(({ event, value }, i, arr) => (
                  <div
                    key={event}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '1rem',
                      borderBottom:
                        i < arr.length - 1
                          ? '1px solid rgba(255,255,255,0.12)'
                          : 'none',
                      paddingBottom: i < arr.length - 1 ? '1rem' : 0,
                      marginBottom: i < arr.length - 1 ? '1rem' : 0,
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.9rem',
                        color: 'rgba(255,255,255,0.8)',
                      }}
                    >
                      {event}
                    </span>

                    <span
                      style={{
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        color: 'white',
                        textAlign: 'right',
                      }}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '2rem' }}>
                <BtnOutline
                  to="/contact"
                  style={{
                    fontSize: '0.88rem',
                    padding: '0.7rem 1.5rem',
                  }}
                >
                  {t.contactBtn}
                </BtnOutline>
              </div>
            </div>
          </div>
        </div>

        {/* Soft wave transition to dark Principal Quote section */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            overflow: 'hidden',
            lineHeight: 0,
            transform: 'translateY(1px)',
            zIndex: 0,
          }}
        >
          <svg
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            style={{
              display: 'block',
              width: '100%',
              height: '140px',
            }}
          >
            <path
              fill="#081120"
              fillOpacity="1"
              d="M0,96L40,112C80,128,160,160,240,160C320,160,400,128,480,112C560,96,640,96,720,106.7C800,117,880,139,960,144C1040,149,1120,139,1200,128C1280,117,1360,107,1400,101.3L1440,96L1440,320L0,320Z"
            />
          </svg>
        </div>
      </section>

      {/* ── Principal Quote — dark cinematic block ───────────────────────── */}
      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          padding: '10rem 6%',
          background: 'linear-gradient(180deg, #081120, #0F172A)',
          textAlign: 'center',
        }}
      >
        {/* Ambient glow */}
        <div
          style={{
            position: 'absolute',
            width: 700,
            height: 700,
            top: '-200px',
            right: '-100px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59,130,246,.15), transparent 70%)',
            filter: 'blur(60px)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            maxWidth: 950,
            margin: '0 auto',
          }}
        >
          <SectionLabel light>{t.quoteLabel}</SectionLabel>
          <blockquote
            className={language === 'ml' ? 'lang-ml' : ''}
            style={{
              fontFamily: language === 'ml' ? "'Noto Serif Malayalam', 'Anek Malayalam', serif" : "'Playfair Display', serif",
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              lineHeight: 1.2,
              fontWeight: 600,
              color: 'white',
              margin: '0 0 2rem',
            }}
          >
            {t.quoteText}
          </blockquote>
          <cite style={{ fontStyle: 'normal', color: 'rgba(255,255,255,0.65)', fontSize: '1rem' }}>
            {t.quoteCite}
          </cite>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section style={{ padding: '8rem 6%', background: S.bgSoft }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <SectionLabel>{t.faqLabel}</SectionLabel>
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
            {t.faqTitle}
          </h2>
        </div>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          {FAQS.map((faq) => (
            <FAQ key={faq.q.en} {...faq} language={language} />
          ))}
        </div>
        <p style={{ textAlign: 'center', fontSize: '0.88rem', color: '#94A3B8', marginTop: '2.5rem' }}>
          {t.faqMore}{' '}
          <Link to="/contact" style={{ color: S.accentPrimary, fontWeight: 600, textDecoration: 'none' }}>
            {t.faqContact}
          </Link>
        </p>
      </section>

      {/* ── Bottom CTA — dark cinematic block ───────────────────────────── */}
      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          padding: '10rem 6%',
          background: 'linear-gradient(180deg, #081120, #0F172A)',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: 700,
            height: 700,
            bottom: '-200px',
            left: '-100px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(124,58,237,.15), transparent 70%)',
            filter: 'blur(60px)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            maxWidth: 800,
            margin: '0 auto',
          }}
        >
          <SectionLabel light>{t.ctaLabel}</SectionLabel>
          <blockquote
            className={language === 'ml' ? 'lang-ml' : ''}
            style={{
              fontFamily: language === 'ml' ? "'Noto Serif Malayalam', 'Anek Malayalam', serif" : "'Playfair Display', serif",
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              lineHeight: 1.2,
              fontWeight: 600,
              color: 'white',
              margin: '0 0 2.5rem',
            }}
          >
            {t.ctaTitle}
          </blockquote>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1.05rem', marginBottom: '3rem' }}>
            {t.ctaDesc}
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <BtnPrimary
              onClick={() => {
                document.getElementById('process-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {t.ctaApply}
            </BtnPrimary>
            <BtnOutline to="/contact">
              {t.ctaCall}
            </BtnOutline>
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

      {/* Keyframe + pseudo-class injection */}
      <style>{`
        @keyframes floatBlob {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50%       { transform: translateY(-30px) translateX(20px); }
        }
        @keyframes letterFall {
          0% { opacity: 0; transform: translateY(-60px) rotate(-8deg); }
          100% { opacity: 1; transform: translateY(0) rotate(0); }
        }
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
        input:focus, select:focus, textarea:focus {
          border-color: #2563EB !important;
          box-shadow: 0 0 0 3px rgba(37,99,235,0.12) !important;
          outline: none !important;
        }
        input[type="date"]::-webkit-calendar-picker-indicator {
          opacity: 0.5;
          cursor: pointer;
        }
        @media (max-width: 992px) {
          .auxanovo-hero-floating-card {
            position: relative !important;
            right: auto !important;
            bottom: auto !important;
            margin-top: 3rem !important;
            width: 100% !important;
          }
        }
        @media (max-width: 768px) {
          .auxanovo-nav { display: none !important; }
          .auxanovo-navbar { width: 95% !important; padding: 1rem 1.2rem !important; }
        }
      `}</style>
    </div>
  );
}