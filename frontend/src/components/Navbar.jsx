import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./Navbar.css"; // Update the path if your CSS is elsewhere
import { useLanguage } from "../context/LanguageContext";

const NAV_LINKS = [
  { to: "/", en: "Home", ml: "ഹോം" },
  { to: "/about", en: "About", ml: "ഞങ്ങളെക്കുറിച്ച്" },
  { to: "/admissions", en: "Admissions", ml: "അഡ്മിഷൻ" },
  { to: "/events", en: "Events", ml: "ഇവന്റുകൾ" },
  { to: "/staff", en: "Our Team", ml: "ഞങ്ങളുടെ ടീം" },
  { to: "/facilities", en: "Facilities", ml: "സൗകര്യങ്ങൾ" },
  { to: "/gallery", en: "Gallery", ml: "ഗാലറി" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage } = useLanguage();

  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>

        {/* LOGO */}

        <Link to="/" className="logo">
          PSNM UPS
        </Link>

        {/* DESKTOP NAV */}

        <nav className="desktop-nav">
          {NAV_LINKS.map(({ to, en, ml }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              {language === "ml" ? ml : en}
            </NavLink>
          ))}
        </nav>

        {/* RIGHT SIDE */}

        <div className="navbar-right">

          <div className="lang-switcher">
            <button
              className={`lang-btn ${language === "en" ? "active" : ""}`}
              onClick={() => setLanguage("en")}
            >
              EN
            </button>

            <button
              className={`lang-btn ${language === "ml" ? "active" : ""}`}
              onClick={() => setLanguage("ml")}
            >
              മല
            </button>
          </div>

          <Link to="/contact" className="btn btn-outline">
            {language === "ml" ? "ബന്ധപ്പെടുക" : "Contact"}
          </Link>

        </div>

        {/* MOBILE BUTTON */}

        <button
          className="mobile-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

      </header>

      {/* MOBILE MENU */}

      {menuOpen && (
        <div className="mobile-menu">

          {NAV_LINKS.map(({ to, en, ml }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                isActive ? "mobile-link active" : "mobile-link"
              }
            >
              {language === "ml" ? ml : en}
            </NavLink>
          ))}

          <Link to="/contact" className="btn btn-outline mobile-contact">
            {language === "ml" ? "ബന്ധപ്പെടുക" : "Contact"}
          </Link>

        </div>
      )}
    </>
  );
}