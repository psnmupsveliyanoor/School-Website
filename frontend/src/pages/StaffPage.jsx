import SEO from '../components/SEO';
import { useState, useEffect } from 'react';
import { getStaff } from '../services/api';
import { localizedText, useLanguage } from '../context/LanguageContext';

const TRANSLATIONS = {
  en: {
    heroLabel: "Our Faculty",
    heroTitle: "Our Team",
    loading: "Loading team...",
    noStaff: "No staff members found."
  },
  ml: {
    heroLabel: "ഞങ്ങളുടെ അധ്യാപകർ",
    heroTitle: "ഞങ്ങളുടെ ടീം",
    loading: "ടീമിനെ ലോഡുചെയ്യുന്നു...",
    noStaff: "സ്റ്റാഫ് അംഗങ്ങളെ കണ്ടെത്തിയില്ല."
  }
};
export default function StaffPage() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();
  const t = TRANSLATIONS[language];

  useEffect(() => {
    getStaff()
      .then((res) => setStaff(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    /* 1. Set pt-0 here to anchor the page to the absolute top of the screen */
    <div className="min-h-screen pb-20 bg-[#F7FAFC]"
      style={{
        background: "radial-gradient(at 20% 20%, rgba(37,99,235,.12) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(124,58,237,.10) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(6,182,212,.08) 0px, transparent 50%), #F7FAFC"
      }}>

      {/* 2. Use pt-32 here to provide clearance for the fixed navbar */}
      <div className="max-w-[1180px] mx-auto px-8 pt-32">

        {/* Header */}
        <div className="mb-20">
          <span className="inline-block text-[0.78rem] font-bold uppercase tracking-[0.22em] text-[#2563EB] mb-4">
            {t.heroLabel}
          </span>
          <h1
            className={`font-['Playfair_Display'] text-[clamp(2.5rem,5vw,4rem)] font-bold mb-6 text-[#0F172A] tracking-tighter leading-[1.05] ${language === 'ml' ? 'lang-ml' : ''}`}
            aria-label={t.heroTitle}
            style={{
              fontFamily: language === 'ml' ? "'Noto Serif Malayalam', 'Anek Malayalam', serif" : "'Playfair Display', serif",
              letterSpacing: language === 'ml' ? 'normal' : 'inherit'
            }}
          >
            {(() => {
              const text = t.heroTitle;
              let idx = 0;
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
      <SEO title="Staff" />
                            {ch}
                          </span>
                        );
                      })
                    )}
                  </span>
                  {wi < arr.length - 1 ? ' ' : ''}
                </span>
              ));
            })()}
          </h1>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="text-center py-20 text-[#94A3B8]">{t.loading}</div>
        ) : staff.length === 0 ? (
          <p className="text-center text-[#475569] py-20">{t.noStaff}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
            {staff.map((member) => (
              <div
                key={member._id}
                className="group relative p-8 rounded-[24px] bg-[rgba(255,255,255,0.72)] backdrop-blur-[20px] border border-[rgba(255,255,255,0.4)] shadow-[0_10px_30px_rgba(37,99,235,0.08)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_80px_rgba(15,23,42,0.14)]"
              >
                <img
                  src={member.imageUrl || 'https://placehold.co/300x300?text=Staff'}
                  alt={localizedText({ en: member.name, ml: member.nameMl }, language)}
                  className="w-20 h-20 rounded-full object-cover mb-6 border-4 border-blue-50"
                />
                <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#0F172A] mb-1">{localizedText({ en: member.name, ml: member.nameMl }, language)}</h3>
                <p className="text-[#2563EB] font-medium text-sm mb-3 uppercase tracking-wider">{localizedText({ en: member.role, ml: member.roleMl }, language)}</p>
                <p className="text-sm text-[#475569] leading-relaxed mb-6">{localizedText({ en: member.bio, ml: member.bioMl }, language)}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes letterFall {
          0% { opacity: 0; transform: translateY(-60px) rotate(-8deg); }
          100% { opacity: 1; transform: translateY(0) rotate(0); }
        }
      `}</style>
    </div>
  );
}