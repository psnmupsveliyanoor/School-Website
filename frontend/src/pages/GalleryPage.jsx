import SEO from '../components/SEO';
import { useState, useEffect } from 'react';
import { getGallery } from '../services/api';
import { localizedText, useLanguage } from '../context/LanguageContext';

const TRANSLATIONS = {
  en: {
    heroLabel: "Visual Chronicles",
    heroTitle: "Gallery",
    heroSubtitle: "A visual journey through life at our school — celebrating special events, student achievements, school activities, and everyday moments.",
    all: "All",
    loading: "Loading premium collection...",
    noMedia: "No media found in this domain."
  },
  ml: {
    heroLabel: "കാഴ്ചകൾ",
    heroTitle: "ഗാലറി",
    heroSubtitle: "ഞങ്ങളുടെ സ്കൂളിലെ ജീവിതത്തിലൂടെയുള്ള ഒരു ദൃശ്യയാത്ര - പ്രത്യേക പരിപാടികൾ, വിദ്യാർത്ഥികളുടെ നേട്ടങ്ങൾ, സ്കൂൾ പ്രവർത്തനങ്ങൾ, ദൈനംദിന നിമിഷങ്ങൾ എന്നിവ ആഘോഷിക്കുന്നു.",
    all: "എല്ലാം",
    loading: "ഗാലറി ലോഡുചെയ്യുന്നു...",
    noMedia: "ഈ വിഭാഗത്തിൽ ചിത്രങ്ങളൊന്നും കണ്ടെത്തിയില്ല."
  }
};
export default function GalleryPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const { language } = useLanguage();
  const t = TRANSLATIONS[language];

  useEffect(() => {
    getGallery()
      .then((res) => setItems(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const categories = ['All', ...Array.from(new Set(items.map((i) => localizedText({ en: i.category, ml: i.categoryMl }, language))))];
  const filtered = activeCategory === 'All' ? items : items.filter((i) => localizedText({ en: i.category, ml: i.categoryMl }, language) === activeCategory);

  // Split for masonry layout: first item is the large feature, rest go to the 2x2 grid and overflow
  const feature = filtered[0] || null;
  const rest = filtered.slice(1);

  return (
    <div className="min-h-screen bg-[#F7FAFC] font-sans text-[#0F172A] antialiased selection:bg-[#2563EB] selection:text-white relative overflow-hidden before:fixed before:w-[500px] before:h-[500px] before:rounded-full before:top-[-10%] before:left-[-10%] before:bg-radial-gradient before:blur-[90px] before:opacity-55 before:-z-10">
      <SEO title="Gallery" />

      {/* Page Hero (Dark Cinematic Block Style) */}
      <section className="relative pt-40 pb-28 bg-gradient-to-b from-[#081120] to-[#0F172A] text-[#F8FAFC] overflow-hidden text-center px-6 before:absolute before:w-[700px] before:h-[700px] before:-top-[200px] before:-right-[100px] before:rounded-full before:bg-[radial-gradient(circle,rgba(59,130,246,0.15),transparent_70%)] before:blur-[60px]">
        <div className="max-w-5xl mx-auto relative z-10">
          <span className="inline-block text-[0.78rem] font-bold uppercase tracking-[0.22em] text-[#7DD3FC] mb-4">
            {t.heroLabel}
          </span>
          <h1
            className={`font-serif text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.05] text-white ${language === 'ml' ? 'lang-ml' : ''}`}
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
          <p className="text-[#94A3B8] text-lg md:text-xl max-w-2xl mx-auto font-normal leading-relaxed">
            {t.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-24 px-[6%]">
        <div className="max-w-[1400px] mx-auto">

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 justify-center mb-16 relative z-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 backdrop-blur-md border ${activeCategory === cat
                    ? 'bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white border-transparent shadow-[0_14px_40px_rgba(37,99,235,0.22)] scale-102'
                    : 'bg-white/70 text-[#475569] border-[rgba(15,23,42,0.08)] hover:border-[#2563EB]/40 hover:text-[#2563EB] hover:-translate-y-0.5'
                  }`}
              >
                {cat === 'All' ? t.all : cat}
              </button>
            ))}
          </div>

          {/* Core Content Loading/Empty States */}
          {loading ? (
            <div className="text-center py-24 font-medium tracking-wide text-[#94A3B8]">
              {t.loading}
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-center text-[#475569] py-24 font-serif text-xl italic">
              {t.noMedia}
            </p>
          ) : (
            <>
              {/* Asymmetric / Premium Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

                {/* Large Feature Media Block */}
                {feature && (
                  <div className="md:row-span-2 md:col-span-1 rounded-[24px] overflow-hidden shadow-[0_10px_30px_rgba(37,99,235,0.08)] hover:shadow-[0_25px_80px_rgba(15,23,42,0.14)] bg-white/72 backdrop-blur-xl border border-white/40 transition-all duration-500 hover:-translate-y-2 group relative h-[400px] md:h-auto">
                    {feature.fileType === 'video' ? (
                      <video
                        src={feature.imageUrl}
                        controls
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src={feature.imageUrl}
                        alt={localizedText({ en: feature.title, ml: feature.titleMl }, language)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#081120]/80 via-[#0F172A]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-8 pointer-events-none">
                      <div>
                        <span className="text-[0.7rem] font-bold uppercase tracking-widest text-[#7DD3FC] block mb-1">
                          {localizedText({ en: feature.category, ml: feature.categoryMl }, language)}
                        </span>
                        <h3 className="font-serif text-2xl text-white font-semibold leading-snug">
                          {localizedText({ en: feature.title, ml: feature.titleMl }, language)}
                        </h3>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2x2 Right Sub-Grid */}
                {rest.slice(0, 4).map((item) => (
                  <div
                    key={item._id}
                    className="rounded-[24px] overflow-hidden shadow-[0_10px_30px_rgba(37,99,235,0.08)] hover:shadow-[0_25px_80px_rgba(15,23,42,0.14)] bg-white/72 backdrop-blur-xl border border-white/40 transition-all duration-500 hover:-translate-y-2 group"
                  >
                    <div className="relative overflow-hidden">
                      {item.fileType === 'video' ? (
                        <video
                          src={item.imageUrl}
                          controls
                          className="w-full h-56 object-cover"
                        />
                      ) : (
                        <img
                          src={item.imageUrl}
                          alt={localizedText({ en: item.title, ml: item.titleMl }, language)}
                          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#081120]/80 via-[#0F172A]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-6 pointer-events-none">
                        <div>
                          <p className="text-[#7DD3FC] text-xs uppercase tracking-wider font-bold mb-0.5">{localizedText({ en: item.category, ml: item.categoryMl }, language)}</p>
                          <h4 className="text-white font-serif text-lg font-medium">{localizedText({ en: item.title, ml: item.titleMl }, language)}</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Overflow Items — Secondary Clean Uniform Grid */}
              {rest.length > 4 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                  {rest.slice(4).map((item) => (
                    <div
                      key={item._id}
                      className="rounded-[14px] overflow-hidden shadow-[0_10px_30px_rgba(37,99,235,0.04)] hover:shadow-[0_25px_80px_rgba(15,23,42,0.1)] bg-white/72 border border-white/40 transition-all duration-500 hover:-translate-y-1.5 group"
                    >
                      <div className="relative overflow-hidden">
                        {item.fileType === 'video' ? (
                          <video
                            src={item.imageUrl}
                            controls
                            className="w-full h-44 object-cover"
                          />
                        ) : (
                          <img
                            src={item.imageUrl}
                            alt={localizedText({ en: item.title, ml: item.titleMl }, language)}
                            className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#081120]/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-4 pointer-events-none">
                          <div>
                            <p className="text-white font-serif text-sm font-medium tracking-wide">{localizedText({ en: item.title, ml: item.titleMl }, language)}</p>
                            <p className="text-[#7DD3FC] text-[10px] uppercase tracking-widest mt-0.5">{localizedText({ en: item.category, ml: item.categoryMl }, language)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <style>{`
        @keyframes letterFall {
          0% { opacity: 0; transform: translateY(-60px) rotate(-8deg); }
          100% { opacity: 1; transform: translateY(0) rotate(0); }
        }
      `}</style>
    </div>
  );
}