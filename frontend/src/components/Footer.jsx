import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const year = new Date().getFullYear();
  const { language } = useLanguage();
  const ml = language === 'ml';

  return (
    <footer style={{ background: '#081120', color: '#F8FAFC', fontFamily: "'Plus Jakarta Sans', sans-serif", padding: '5rem 6% 2rem 6%', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #2563EB, #7C3AED)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '1.2rem' }}>P</div>
              <span style={{ fontWeight: '700', color: 'white', fontSize: '1.1rem', letterSpacing: '0.1em' }}>PSNM UPS</span>
            </div>
            <p style={{ fontSize: '0.9rem', color: '#94A3B8', lineHeight: '1.8' }}>
              {ml ? '1985 മുതൽ മനസ്സുകളെ പരിപോഷിപ്പിക്കുകയും സ്വഭാവം രൂപപ്പെടുത്തുകയും മികവിന് പ്രചോദനം നൽകുകയും ചെയ്യുന്നു.' : 'Nurturing minds, building character, and inspiring excellence since 1985. A place where innovation, discipline, and creativity shape tomorrow’s leaders.'}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{ color: '#7DD3FC', fontWeight: '700', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1.5rem', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{ml ? 'പ്രധാന ലിങ്കുകൾ' : 'Quick Links'}</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.95rem' }}>
              {[
                { to: '/', label: ml ? 'ഹോം' : 'Home' },
                { to: '/about', label: ml ? 'ഞങ്ങളെക്കുറിച്ച്' : 'About Us' },
                { to: '/events', label: ml ? 'ഇവന്റുകൾ' : 'Events' },
                { to: '/staff', label: ml ? 'ഞങ്ങളുടെ ടീം' : 'Our Team' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} style={{ color: '#E2E8F0', textDecoration: 'none', transition: 'color 0.3s ease' }} onMouseOver={(e) => e.target.style.color = '#38BDF8'} onMouseOut={(e) => e.target.style.color = '#E2E8F0'}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h3 style={{ color: '#7DD3FC', fontWeight: '700', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1.5rem', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{ml ? 'പര്യവേക്ഷണം' : 'Explore'}</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.95rem' }}>
              {[
                { to: '/facilities', label: ml ? 'സൗകര്യങ്ങൾ' : 'Facilities' },
                { to: '/gallery', label: ml ? 'ഗാലറി' : 'Gallery' },
                { to: '/contact', label: ml ? 'ബന്ധപ്പെടുക' : 'Contact' },
                { to: '/admin', label: ml ? 'അഡ്മിൻ പോർട്ടൽ' : 'Admin Portal' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} style={{ color: '#E2E8F0', textDecoration: 'none', transition: 'color 0.3s ease' }} onMouseOver={(e) => e.target.style.color = '#38BDF8'} onMouseOut={(e) => e.target.style.color = '#E2E8F0'}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 style={{ color: '#7DD3FC', fontWeight: '700', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1.5rem', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{ml ? 'ബന്ധപ്പെടുക' : 'Contact'}</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem', color: '#94A3B8' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <span style={{ color: '#38BDF8', marginTop: '0.1rem' }}>📍</span>
                <span>PSNM UPS
Thiruvananthapuram, Kerala
</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ color: '#38BDF8' }}>📞</span>
                <a href="tel:+91 9446529919" style={{ color: '#94A3B8', textDecoration: 'none', transition: 'color 0.3s ease' }} onMouseOver={(e) => e.target.style.color = '#38BDF8'} onMouseOut={(e) => e.target.style.color = '#94A3B8'}>tel:+91 9446529919</a>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ color: '#38BDF8' }}>✉️</span>
                <a href="psnmupsveliyanoor@gmail.com" style={{ color: '#94A3B8', textDecoration: 'none', transition: 'color 0.3s ease' }} onMouseOver={(e) => e.target.style.color = '#38BDF8'} onMouseOut={(e) => e.target.style.color = '#94A3B8'}>psnmupsveliyanoor@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div style={{ paddingTop: '2rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)', textAlign: 'center', fontSize: '0.85rem', color: '#64748B' }}>
          © {year} Auxanovo Educational Framework. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
