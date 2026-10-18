import { createContext, useContext, useMemo, useState } from 'react';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => localStorage.getItem('siteLanguage') || 'en');

  const value = useMemo(() => ({
    language,
    setLanguage: (nextLanguage) => {
      const next = nextLanguage === 'ml' ? 'ml' : 'en';
      localStorage.setItem('siteLanguage', next);
      setLanguage(next);
    },
    toggleLanguage: () => {
      const next = language === 'en' ? 'ml' : 'en';
      localStorage.setItem('siteLanguage', next);
      setLanguage(next);
    },
  }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}

export function localizedText(value, language) {
  if (!value) return '';
  if (typeof value === 'string') return value;
  return value[language] || value.en || value.ml || '';
}
