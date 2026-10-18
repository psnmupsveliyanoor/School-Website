import SEO from '../components/SEO';
import { useState } from 'react';
import { FaInstagram, FaYoutube, FaFacebook, } from "react-icons/fa";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaWhatsapp,
} from "react-icons/fa";
import { localizedText, useLanguage } from '../context/LanguageContext';

const TRANSLATIONS = {
  en: {
    heroTitle: "Contact Us",
    heroSubtitle: "We'd love to hear from you. Reach out and our team will respond as soon as possible.",
    getInTouch: "Get in Touch",
    ourLocation: "Our Location",
    sendMessage: "Send Us a Message",
    fullName: "Full Name",
    emailAddress: "Email Address",
    subject: "Subject",
    message: "Message",
    sending: "Sending...",
    sendBtn: "Send Message",
    followUs: "Follow Us",
    successTitle: "Message Received",
    successMsg: "Thank you for contacting us. We'll get back to you soon.",
    errorTitle: "Message Not Sent",
    errorMsg: "Something went wrong while sending your message. Please try again in a few moments."
  },
  ml: {
    heroTitle: "ബന്ധപ്പെടുക",
    heroSubtitle: "നിങ്ങളിൽ നിന്ന് കേൾക്കാൻ ഞങ്ങൾ ആഗ്രഹിക്കുന്നു. ബന്ധപ്പെടുക, ഞങ്ങളുടെ ടീം എത്രയും വേഗം മറുപടി നൽകും.",
    getInTouch: "ബന്ധപ്പെടുക",
    ourLocation: "ഞങ്ങളുടെ സ്ഥലം",
    sendMessage: "ഞങ്ങൾക്ക് ഒരു സന്ദേശം അയയ്ക്കുക",
    fullName: "പൂർണ്ണമായ പേര്",
    emailAddress: "ഇമെയിൽ വിലാസം",
    subject: "വിഷയം",
    message: "സന്ദേശം",
    sending: "അയയ്ക്കുന്നു...",
    sendBtn: "സന്ദേശം അയക്കുക",
    followUs: "ഞങ്ങളെ പിന്തുടരുക",
    successTitle: "സന്ദേശം ലഭിച്ചു",
    successMsg: "ഞങ്ങളെ ബന്ധപ്പെട്ടതിന് നന്ദി. ഞങ്ങൾ ഉടൻ നിങ്ങളെ ബന്ധപ്പെടും.",
    errorTitle: "സന്ദേശം അയച്ചില്ല",
    errorMsg: "നിങ്ങളുടെ സന്ദേശം അയയ്ക്കുന്നതിനിടെ എന്തോ കുഴപ്പമുണ്ടായി. കുറച്ച് നിമിഷങ്ങൾക്ക് ശേഷം വീണ്ടും ശ്രമിക്കുക."
  }
};


const CONTACT_DETAILS = [
  {
    icon: <FaMapMarkerAlt />,
    label: { en: "Address", ml: "വിലാസം" },
    value: { en: "Psnm Ups Velliyanoor, Vellanad, Thiruvananthapuram 695543, Kerala", ml: "പിഎസ്എൻഎം യുപിഎസ് വെളിയന്നൂർ, വെള്ളനാട്, തിരുവനന്തപുരം 695543, കേരളം" },
  },
  {
    icon: <FaPhoneAlt />,
    label: { en: "Phone", ml: "ഫോൺ" },
    value: { en: "+91 9446529919", ml: "+91 9446529919" },
  },
  {
    icon: <FaEnvelope />,
    label: { en: "Email", ml: "ഇമെയിൽ" },
    value: { en: "psnmupsveliyanoor@gmail.com", ml: "psnmupsveliyanoor@gmail.com" },
  },
  {
    icon: <FaClock />,
    label: { en: "Office Hours", ml: "ഓഫീസ് സമയം" },
    value: { en: "Mon–Fri\n9:45 AM – 4:15 PM", ml: "തിങ്കൾ–വെള്ളി\nരാവിലെ 9:45 – വൈകുന്നേരം 4:15" },
  },
];
export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const { language } = useLanguage();
  const t = TRANSLATIONS[language];

  const handleChange = (e) => {
    setForm((f) => ({
      ...f,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send");
      }
      setLoading(false);
      setShowErrorToast(false);
      setShowToast(true);




      setForm({
        name: '',
        email: '',
        subject: '',
        message: '',
      });


    } catch (error) {
      console.error(error);

      setLoading(false);
      setShowToast(false);
      setShowErrorToast(true);
    }
  };


  return (
    <div className="relative overflow-hidden">
      <SEO title="Contact Us" />
      {/* PREMIUM BACKGROUND */}

      <div
        className="absolute inset-0 -z-20"
        style={{
          background: `
            radial-gradient(at 20% 20%, rgba(37,99,235,.12) 0px, transparent 50%),
            radial-gradient(at 80% 0%, rgba(124,58,237,.10) 0px, transparent 50%),
            radial-gradient(at 0% 50%, rgba(6,182,212,.08) 0px, transparent 50%),
            #F7FAFC
          `,
        }}
      />

      {/* FLOATING BLOBS */}

      <div
        className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full blur-[100px] -z-10"
        style={{
          background:
            'radial-gradient(circle, rgba(37,99,235,.25), transparent 70%)',
        }}
      />

      <div
        className="absolute -bottom-32 -right-20 w-[500px] h-[500px] rounded-full blur-[100px] -z-10"
        style={{
          background:
            'radial-gradient(circle, rgba(124,58,237,.22), transparent 70%)',
        }}
      />

      {/* HERO */}

      <section className="pt-32 pb-20">
        <div className="section-container text-center">
          {/* <span className="inline-block text-blue-600 uppercase tracking-[0.2em] text-7xl font-bold mb-4">
            Contact Us
          </span> */}

          <h1 className={`text-5xl md:text-7xl font-bold text-slate-900 mb-6 ${language === 'ml' ? 'lang-ml' : ''}`}>
            {t.heroTitle}
          </h1>

          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            {t.heroSubtitle}
          </p>
        </div>
      </section>

      {/* CONTENT */}

      <section className="pb-24">
        <div className="section-container">
          <div className="flex flex-col gap-10">

            {/* TOP SECTION */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              {/* GET IN TOUCH */}
              <div className="lg:col-span-3 py-12">
                <div className="text-center mb-10">
                  <h2 className={`text-4xl font-bold text-[#0b2454] ${language === 'ml' ? 'lang-ml' : ''}`}>
                    {t.getInTouch}
                  </h2>

                  <div className="w-16 h-1 bg-blue-600 mx-auto mt-4 rounded-full" />
                </div>

                <div className="grid md:grid-cols-4 divide-x divide-slate-200">
                  {CONTACT_DETAILS.map(({ icon, label, value }) => (
                    <div
                      key={label}
                      className="
    flex
    flex-col
    items-center
    text-center
    px-4
  "
                    >
                      <div
                        className="
    w-16 h-16
    rounded-full
    bg-blue-50
    text-blue-600
    flex items-center justify-center
    text-2xl
    mb-4
  "
                      >
                        {icon}
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-1">
                          {localizedText(label, language)}
                        </p>

                        <p className="text-slate-600 whitespace-pre-line text-sm leading-relaxed">
                          {localizedText(value, language)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>


            </div>

            {/* BOTTOM SECTION */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

              {/* MAP */}
              <div
                className="

bg-white
border border-slate-200
rounded-lg
p-6
shadow-sm
"
              >
                <div className="mb-6">
                  <h2 className={`text-3xl font-bold text-[#0b2454] ${language === 'ml' ? 'lang-ml' : ''}`}>
                    {t.ourLocation}
                  </h2>

                  <div className="w-12 h-1 bg-blue-600 mt-3 rounded-full" />
                </div>

                <div className="overflow-hidden rounded-2xl">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3945.1657409476156!2d77.05974567477506!3d8.580057891464463!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05b7557e771699%3A0x71034cdba991407c!2sPSNM%20UPS%20Velliyanoor!5e0!3m2!1sen!2sin!4v1782214505962!5m2!1sen!2sin"
                    width="100%"
                    style={{ border: 0, height: "min(500px, 60vh)" }}
                    loading="lazy"
                    allowFullScreen
                    title="School Location"
                  />
                </div>
              </div>

              {/* FORM */}
              <div
                className="

bg-white
border border-slate-200
rounded-lg
p-8
shadow-sm
"
              >
                <div className="mb-6">
                  <h2 className={`text-3xl font-bold text-[#0b2454] ${language === 'ml' ? 'lang-ml' : ''}`}>
                    {t.sendMessage}
                  </h2>

                  <div className="w-12 h-1 bg-blue-600 mt-3 rounded-full" />
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                  <input
                    type="text"
                    name="name"
                    placeholder={t.fullName}
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="px-4 py-3 rounded-xl border-2 border-slate-200"
                  />

                  <input
                    type="email"
                    name="email"
                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                    title="Please enter a valid email address"
                    placeholder={t.emailAddress}
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="px-4 py-3 rounded-xl border-2 border-slate-200"
                  />

                  <input
                    type="text"
                    name="subject"
                    placeholder={t.subject}
                    value={form.subject}
                    onChange={handleChange}
                    required
                    className="px-4 py-3 rounded-xl border-2 border-slate-200"
                  />

                  <textarea
                    rows={6}
                    name="message"
                    placeholder={t.message}
                    value={form.message}
                    onChange={handleChange}
                    required
                    className="px-4 py-3 rounded-xl border-2 border-slate-200 resize-none"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="
mt-6
py-4
rounded-full
text-white
font-semibold
bg-[#2563EB]
hover:bg-[#1D4ED8]
transition
disabled:opacity-60
disabled:cursor-not-allowed
"

                  >

                    {loading ? t.sending : t.sendBtn} </button>


                </form>

              </div>

            </div>


            {/* SOCIAL MEDIA */}

            <div className="mt-16 text-center">

              <h2 className={`text-3xl font-bold text-[#0b2454] mb-8 ${language === 'ml' ? 'lang-ml' : ''}`}>
                {t.followUs}
              </h2>

              <div className="flex justify-center items-center gap-4 sm:gap-10 flex-wrap">

                <a
                  href="https://www.facebook.com/people/Psnmups-Veliyannoor-Ups/100087982974005/#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-slate-900 hover:scale-110 transition"
                >
                  <FaFacebook size={50} />
                </a>

                <a
                  href="https://www.youtube.com/@psnmupsups8565"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-slate-900 hover:scale-110 transition"
                >
                  <FaYoutube size={50} />
                </a>

                <a
                  href="https://wa.me/919446529919"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-slate-900 hover:scale-110 transition"
                >
                  <FaWhatsapp size={50} />
                </a>

                <a
                  href="mailto:psnmupsveliyanoor@gmail.com"
                  className="text-slate-600 hover:text-slate-900 hover:scale-110 transition"
                >
                  <FaEnvelope size={50} />
                </a>

              </div>

            </div>
          </div>

        </div>
        {showToast && (

          <div
            className="
      fixed
      bottom-6
      right-6
      z-50
      bg-white
      border
      border-green-200
      shadow-xl
      rounded-xl
      p-5
      max-w-sm
      animate-[slideIn_.4s_ease]
    "
          >
            <div className="flex items-start gap-4">


              <div className="text-green-600 text-xl">
                ✓
              </div>

              <div className="flex-1">
                <h4 className="font-semibold text-slate-900">
                  {t.successTitle}
                </h4>

                <p className="text-sm text-slate-600 mt-1">
                  {t.successMsg}
                </p>
              </div>

              <button
                onClick={() => setShowToast(false)}
                className="
    text-slate-500
    hover:text-slate-900
    font-bold
    text-xl
    leading-none
  "
              >
                ✕
              </button>

            </div>


          </div>
        )}

        {showErrorToast && (

          <div
            className="
      fixed
      bottom-6
      right-6
      z-50
      bg-white
      border
      border-red-200
      shadow-xl
      rounded-xl
      p-5
      max-w-sm
      animate-[slideIn_.4s_ease]
    "
          >
            <div className="flex items-start gap-4">

              <div className="text-red-600 text-xl">
                ⚠
              </div>

              <div className="flex-1">
                <h4 className="font-semibold text-slate-900">
                  {t.errorTitle}
                </h4>

                <p className="text-sm text-slate-600 mt-1">
                  {t.errorMsg}
                </p>
              </div>

              <button
                onClick={() => setShowErrorToast(false)}
                className="
      text-slate-500
      hover:text-slate-900
      font-bold
      text-xl
    "
              >
                ×
              </button>

            </div>


          </div>
        )}


      </section>
    </div>
  );
}