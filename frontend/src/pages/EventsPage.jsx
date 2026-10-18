import SEO from '../components/SEO';
import { useState, useEffect } from 'react';
import { getEvents } from '../services/api';
import { localizedText, useLanguage } from '../context/LanguageContext';

const TRANSLATIONS = {
  en: {
    heroLabel: "School Events",
    heroTitle: "Moments from our journey.",
    heroSubtitle: "A glimpse into the celebrations, activities and achievements that shape life at our school.",
    loading: "Loading events…",
    noEvents: "No events yet.",
    upcomingEvents: "Upcoming Events",
    pastEvents: "Past Events",
    moreEvents: "More Events",
    viewFullImage: "View full image",
    undated: "Undated"
  },
  ml: {
    heroLabel: "സ്കൂൾ ഇവന്റുകൾ",
    heroTitle: "ഞങ്ങളുടെ യാത്രയിലെ നിമിഷങ്ങൾ.",
    heroSubtitle: "ഞങ്ങളുടെ സ്കൂളിലെ ജീവിതത്തെ രൂപപ്പെടുത്തുന്ന ആഘോഷങ്ങൾ, പ്രവർത്തനങ്ങൾ, നേട്ടങ്ങൾ എന്നിവയിലേക്കൊരു നോട്ടം.",
    loading: "ഇവന്റുകൾ ലോഡുചെയ്യുന്നു…",
    noEvents: "ഇതുവരെ ഇവന്റുകൾ ഒന്നുമില്ല.",
    upcomingEvents: "വരാനിരിക്കുന്ന ഇവന്റുകൾ",
    pastEvents: "കഴിഞ്ഞ ഇവന്റുകൾ",
    moreEvents: "മറ്റ് ഇവന്റുകൾ",
    viewFullImage: "മുഴുവൻ ചിത്രവും കാണുക",
    undated: "തിയ്യതി ഇല്ലാത്തത്"
  }
};
function formatDate(d) {
  return new Date(d).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
}

function EventModal({ event, onClose, language }) {
  if (!event) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      style={{ animation: 'fadeIn .3s ease' }}
    >
      <SEO title="Events" />
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-2xl max-h-[92vh] min-h-0 flex flex-col overflow-hidden rounded-3xl border border-white/40"
        onClick={(e) => e.stopPropagation()}
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          background: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(24px)',
          boxShadow: '0 25px 80px rgba(15,23,42,0.18)',
          animation: 'modalIn .35s cubic-bezier(.16,1,.3,1)',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
          style={{ background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.6)' }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="4" y1="4" x2="12" y2="12" />
            <line x1="12" y1="4" x2="4" y2="12" />
          </svg>
        </button>

        {/* Full image */}
        <div className="overflow-y-auto modal-scroll flex flex-col items-center p-4 sm:p-6">
          <img
            src={event.imageUrl || 'https://placehold.co/800x500?text=Event'}
            alt={localizedText({ en: event.title, ml: event.titleMl }, language)}
            className="w-full h-auto shrink-0 rounded-2xl object-contain"
            style={{ maxHeight: '72vh' }}
          />
          <div className="w-full text-center mt-5 px-2">
            {event.date && (
              <span className="inline-block text-xs font-bold uppercase tracking-[0.16em] text-blue-600 mb-2">
                {formatDate(event.date)}
              </span>
            )}
            <h2
              className="text-xl sm:text-2xl font-bold text-slate-900"
              style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '-0.02em', lineHeight: 1.2 }}
            >
              {localizedText({ en: event.title, ml: event.titleMl }, language)}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

function EventCard({ event, onSelect, language }) {
  return (
    <div
      onClick={() => onSelect(event)}
      className="group relative mb-6 break-inside-avoid overflow-hidden rounded-3xl border border-white/40 cursor-pointer transition-all duration-500 hover:-translate-y-1.5"
      style={{
        background: 'rgba(255,255,255,0.72)',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 10px 30px rgba(37,99,235,0.08)',
      }}
    >
      {/* Full image (uncropped) */}
      <div className="w-full overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(37,99,235,.04), rgba(124,58,237,.04))' }}>
        <img
          src={event.imageUrl || 'https://placehold.co/800x500?text=Event'}
          alt={localizedText({ en: event.title, ml: event.titleMl }, language)}
          loading="lazy"
          className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </div>

      {/* Caption */}
      <div className="p-5 relative">
        {event.date ? (
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.14em] text-blue-600 mb-1.5">
            {formatDate(event.date)}
          </span>
        ) : (
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.14em] text-purple-500 mb-1.5">
            {TRANSLATIONS[language].undated}
          </span>
        )}
        <h3
          className="font-semibold text-slate-900 leading-snug"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {localizedText({ en: event.title, ml: event.titleMl }, language)}
        </h3>
        <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-blue-600">
          {TRANSLATIONS[language].viewFullImage}
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </span>
      </div>
    </div>
  );
}

function EventSection({ label, accent, items, onSelect, language }) {
  if (!items || items.length === 0) return null;
  const accentColor = accent === 'purple' ? 'text-purple-600' : 'text-blue-600';
  return (
    <div>
      <span className={`inline-block text-xs font-bold uppercase tracking-[0.16em] ${accentColor} mb-5`}>
        {label}
      </span>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
        {items.map((event) => (
          <EventCard key={event._id} event={event} onSelect={onSelect} language={language} />
        ))}
      </div>
    </div>
  );
}

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { language } = useLanguage();
  const t = TRANSLATIONS[language];

  useEffect(() => {
    getEvents()
      .then((res) => setEvents(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!selectedEvent) return;
    const handler = (e) => { if (e.key === 'Escape') setSelectedEvent(null); };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', handler); document.body.style.overflow = ''; };
  }, [selectedEvent]);

  // Split into Upcoming (date >= today, soonest first), Past (date < today,
  // newest first), and Undated (no date, shown last).
  const now = new Date();
  const upcoming = events
    .filter((e) => e.date && new Date(e.date) >= now)
    .sort((a, b) => new Date(a.date) - new Date(b.date));
  const past = events
    .filter((e) => e.date && new Date(e.date) < now)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  const undated = events.filter((e) => !e.date);

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        background: `
          radial-gradient(at 20% 20%, rgba(37,99,235,.12) 0px, transparent 50%),
          radial-gradient(at 80% 0%, rgba(124,58,237,.10) 0px, transparent 50%),
          radial-gradient(at 0% 50%, rgba(6,182,212,.08) 0px, transparent 50%),
          #F7FAFC
        `,
      }}
    >
      {/* Ambient blobs */}
      <div
        className="fixed -top-[10%] -left-[10%] w-[500px] h-[500px] rounded-full opacity-50 -z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(37,99,235,.25), transparent 70%)',
          filter: 'blur(90px)',
          animation: 'floatBlob 14s ease-in-out infinite',
        }}
      />
      <div
        className="fixed -bottom-[20%] -right-[10%] w-[500px] h-[500px] rounded-full opacity-50 -z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(124,58,237,.22), transparent 70%)',
          filter: 'blur(90px)',
          animation: 'floatBlob 18s ease-in-out infinite',
        }}
      />

      {/* Hero */}
      <section className="relative flex flex-col justify-center items-center text-center pt-36 pb-8 px-[6%]">
        <span
          className="inline-block text-xs font-bold uppercase tracking-[0.22em] text-blue-600 mb-3"
          style={{ animation: 'heroIn 1s cubic-bezier(.16,1,.3,1) both' }}
        >
          {t.heroLabel}
        </span>
        <h1
          className={`text-slate-900 mb-4 max-w-[800px] ${language === 'ml' ? 'lang-ml' : ''}`}
          aria-label={t.heroTitle}
          style={{
            fontFamily: language === 'ml' ? "'Noto Serif Malayalam', 'Anek Malayalam', serif" : "'Playfair Display', serif",
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            lineHeight: 1.05,
            letterSpacing: language === 'ml' ? 'normal' : '-0.04em',
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
        <p className="text-slate-500 max-w-xl mb-2" style={{ fontSize: 'clamp(0.95rem, 1.6vw, 1.1rem)', animation: 'heroIn 1s cubic-bezier(.16,1,.3,1) both', animationDelay: '.24s' }}>
          {t.heroSubtitle}
        </p>
      </section>

      {/* Gallery */}
      <section className="px-[6%] pb-24 pt-4">
        {loading ? (
          <div className="text-center py-20 text-slate-400">{t.loading}</div>
        ) : (upcoming.length + past.length + undated.length) === 0 ? (
          <p className="text-center text-slate-400 py-20">{t.noEvents}</p>
        ) : (
          <div className="max-w-7xl mx-auto flex flex-col gap-14">
            <EventSection label={t.upcomingEvents} accent="blue" items={upcoming} onSelect={setSelectedEvent} language={language} />
            <EventSection label={t.pastEvents} accent="purple" items={past} onSelect={setSelectedEvent} language={language} />
            <EventSection label={t.moreEvents} accent="purple" items={undated} onSelect={setSelectedEvent} language={language} />
          </div>
        )}
      </section>

      {/* Event detail modal */}
      <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} language={language} />

      <style>{`
        @keyframes floatBlob {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-30px) translateX(20px); }
        }
        @keyframes heroIn {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes letterFall {
          0% { opacity: 0; transform: translateY(-60px) rotate(-8deg); }
          100% { opacity: 1; transform: translateY(0) rotate(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalIn {
          from { opacity: 0; transform: translateY(24px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .modal-scroll { scrollbar-width: none; -ms-overflow-style: none; }
        .modal-scroll::-webkit-scrollbar { width: 0; height: 0; display: none; }
      `}</style>
    </div>
  );
}
