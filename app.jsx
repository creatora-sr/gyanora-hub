import React, { useState, useEffect, useRef } from 'react';

// Formspree endpoint — Gyanora Hub contact form
const FORMSPREE_ACTION = 'https://formspree.io/f/xeaaagae';

// --- BACKGROUND CANVAS ANIMATION COMPONENT ---
const BackgroundCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particles array
    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 1,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      color: Math.random() > 0.5 ? 'rgba(245, 158, 11, ' : 'rgba(37, 99, 235, ',
      alpha: Math.random() * 0.5 + 0.2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle glowing background nodes
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.fill();

        // Connect nearby nodes
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(245, 158, 11, ${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-60"
    />
  );
};

// --- DATA DEFINITIONS ---
const COURSES = [
  {
    id: 1,
    title: 'AI & Prompting Training',
    cat: 'ai',
    desc: 'ChatGPT & Google Gemini का व्यावहारिक उपयोग, ऑटोमेटेड कंटेंट, ग्राफिक्स एवं कोड प्रॉम्प्टिंग।',
    status: 'Available Soon',
  },
  {
    id: 2,
    title: 'AI Visuals & Media Masterclass',
    cat: 'ai',
    desc: 'AI फोटो, वीडियो, पोस्टर एवं Voiceover कंटेंट निर्माण की पूर्ण ट्रेनिंग।',
    status: 'Upcoming',
  },
  {
    id: 3,
    title: 'No-Code Web & App Building',
    cat: 'dev',
    desc: 'बिना कोडिंग के आधुनिक रेस्पॉन्सिव वेबसाइट्स और ऐप्स तैयार करना सीखें।',
    status: 'Upcoming',
  },
  {
    id: 4,
    title: 'Custom AI Agents & n8n Automation',
    cat: 'automation',
    desc: 'बिजनेस ऑटोमेशन, ऑटोमेटेड लीड फ़्लो और AI एजेंट डेवलपमेंट।',
    status: 'Upcoming',
  },
  {
    id: 5,
    title: 'Digital Marketing & SEO Growth',
    cat: 'growth',
    desc: 'Search Engine Optimization, Google Ranking और Social Media Marketing',
    status: 'Coming Soon',
  },
  {
    id: 6,
    title: 'YouTube Creator & Branding Mastery',
    cat: 'growth',
    desc: 'चैनल सेटअप, वीडियो SEO, थंबनेल डिजाइनिंग एवं ऑडियंस ग्रोथ स्ट्रैटेजी।',
    status: 'Coming Soon',
  },
];

const SERVICES_TABS = [
  { id: 'ai', label: 'AI Services' },
  { id: 'web', label: 'Web Development' },
  { id: 'automation', label: 'Automation' },
  { id: 'marketing', label: 'Digital Marketing' },
  { id: 'design', label: 'Design & Video' },
];

const SERVICES_DATA = {
  ai: [
    {
      title: 'AI Chatbot Development',
      desc: 'आपकी वेबसाइट और सोशल चैनल्स के लिए चौबीसों घंटे काम करने वाले स्मार्ट AI चैटबॉट्स।',
      icon: '🤖',
    },
    {
      title: 'Custom AI Agent Setup',
      desc: 'बिजनेस कार्यों को ऑटोमैटिक करने और डेटा प्रोसेस करने वाले AI एजेंट्स।',
      icon: '⚙️',
    },
    {
      title: 'Customer Support AI',
      desc: 'ग्राहक सवालों का तुरंत और सटीक उत्तर देने वाली AI सपोर्ट प्रणाली।',
      icon: '🎧',
    },
  ],
  web: [
    {
      title: 'Business & Coaching Websites',
      desc: 'कंपनियों, कोचिंग सेंटर्स और प्रोफेशनल्स के लिए हाई-स्पीड SEO फ्रेंडली वेबसाइट्स।',
      icon: '🌐',
    },
    {
      title: 'WhatsApp & AI Integration',
      desc: 'वेबसाइट से सीधे WhatsApp और AI चैटबॉट जोड़कर 1-Click डायरेक्ट लीड पाना।',
      icon: '💬',
    },
    {
      title: 'Hosting, Domain & SSL',
      desc: 'सुरक्षित सर्वर सेटअप, डोमेन रजिस्ट्रेशन और नियमित वेबसाइट मेंटेनेंस।',
      icon: '🔒',
    },
  ],
  automation: [
    {
      title: 'n8n Workflow Automation',
      desc: 'विभिन्न ऐप्स के बीच डेटा ट्रांसमिशन को बिना किसी इंसानी झंझट के ऑटोमेट करना।',
      icon: '🔄',
    },
    {
      title: 'Instant Lead Notifications',
      desc: 'फॉर्म भरते ही ईमेल और व्हाट्सएप पर तुरंत अलर्ट भेजने की स्वचालित व्यवस्था।',
      icon: '⚡',
    },
    {
      title: 'Google Sheets & CRM Connect',
      desc: 'ग्राहक डेटा को ऑटोमैटिक तरीके से गूगल शीट्स या CRM में मैनेज करना।',
      icon: '📊',
    },
  ],
  marketing: [
    {
      title: 'Search Engine Optimization (SEO)',
      desc: 'गूगल पर आपकी वेबसाइट को टॉप पर लाने के लिए On-Page और Technical SEO।',
      icon: '🔍',
    },
    {
      title: 'YouTube Growth & SEO',
      desc: 'चैनल ब्रांडिंग, वीडियो SEO, थंबनेल डिजाइनिंग और कंटेंट स्ट्रेटेजी।',
      icon: '📺',
    },
    {
      title: 'Social Media Management',
      desc: 'Facebook, Instagram और LinkedIn हैंडल्स का कंटेंट मैनेजमेंट और प्रमोशन।',
      icon: '📱',
    },
  ],
  design: [
    {
      title: 'Logo & Brand Identity',
      desc: 'व्यावसायिक पहचान बनाने वाले आकर्षक लोगो, विजिटिंग कार्ड और ब्रोशर।',
      icon: '🎨',
    },
    {
      title: 'Reels & Video Editing',
      desc: 'AI वॉइसओवर और सबटाइटल्स के साथ प्रो-लेवल Reels & YouTube एडिट।',
      icon: '🎬',
    },
    {
      title: 'Google Business Digitalization',
      desc: 'स्थानीय दुकानों और बिजनेस की गूगल मैप्स पर सही उपस्थिति दर्ज कराना।',
      icon: '📍',
    },
  ],
};

// --- MAIN APP COMPONENT ---
export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('ai');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courseFilter, setCourseFilter] = useState('all');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);

  // Filtered courses
  const filteredCourses =
    courseFilter === 'all'
      ? COURSES
      : COURSES.filter((c) => c.cat === courseFilter);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Jab tak Formspree form ID set nahi hai, local success message dikhao
    if (FORMSPREE_ACTION.includes('YOUR_FORM_ID')) {
      setFormSubmitted(true);
      return;
    }
    try {
      const res = await fetch(FORMSPREE_ACTION, {
        method: 'POST',
        body: new FormData(e.currentTarget),
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setFormSubmitted(true);
      } else {
        alert('Maaf kijiye, form submit nahi ho paya. Dobara try karein.');
      }
    } catch (err) {
      alert('Network error: form submit nahi ho paya. Dobara try karein.');
    }
  };

  return (
    <div className="bg-[#0B0F17] text-[#E2E8F0] font-sans min-h-screen relative selection:bg-[#F59E0B] selection:text-black overflow-x-hidden">
      {/* Animated Background */}
      <BackgroundCanvas />

      <!-- FLOATING DIRECT CONTACT BUTTONS (Bottom Right) -->
      <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3">
        <a
          href="https://wa.me/918171643770"
          target="_blank"
          rel="noopener noreferrer"
          title="WhatsApp 8171643770"
          className="w-13 h-13 rounded-full bg-green-500 text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform border border-green-300/40"
        >
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.26 8.26 0 01-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 4.54 0 8.24 3.7 8.24 8.24s-3.7 8.24-8.24 8.24zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28z" />
          </svg>
        </a>
        <a
          href="tel:8171643770"
          title="Call 8171643770"
          className="w-13 h-13 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-black flex items-center justify-center shadow-2xl hover:scale-110 transition-transform border border-amber-300/40 group"
        >
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1.003 1.003 0 011.02-.24c1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
          </svg>
        </a>
        <a
          href="tel:9259680648"
          title="Call 9259680648"
          className="w-13 h-13 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-black flex items-center justify-center shadow-2xl hover:scale-110 transition-transform border border-amber-300/40"
        >
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1.003 1.003 0 011.02-.24c1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
          </svg>
        </a>
        <a
          href="mailto:apkaapnanewslive24@gmail.com"
          title="Send Email"
          className="w-13 h-13 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform border border-blue-400/40"
        >
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
          </svg>
        </a>
      </div>

      <!-- NAVBAR -->
      <nav class="fixed top-0 left-0 w-full z-40 bg-[#0B0F17]/90 backdrop-blur-md border-b border-gray-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#" className="flex items-center space-x-3 group">
              {logoFailed ? (
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-black text-xl shadow-lg shrink-0">
                  🎓
                </div>
              ) : (
                <img
                  src="logo.png"
                  alt="Gyanora Hub"
                  className="h-11 w-auto object-contain transition-transform group-hover:scale-105"
                  onError={() => setLogoFailed(true)}
                />
              )}
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-wider bg-gradient-to-r from-amber-300 via-amber-500 to-amber-600 bg-clip-text text-transparent">
                  GYANORA HUB
                </span>
                <span className="text-[9px] text-gray-400 tracking-widest uppercase">
                  ज्ञान से सफलता तक का सफर
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8 text-sm font-medium">
              <a
                href="#about"
                className="hover:text-amber-400 transition-colors"
              >
                हमारे बारे में
              </a>
              <a
                href="#education"
                className="hover:text-amber-400 transition-colors"
              >
                कोर्सेज
              </a>
              <a
                href="#services"
                className="hover:text-amber-400 transition-colors"
              >
                सेवाएँ
              </a>
              <a
                href="#contact"
                className="bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold px-6 py-2.5 rounded-full shadow-lg hover:shadow-amber-500/25 transition-all hover:-translate-y-0.5"
              >
                संपर्क करें
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-300 hover:text-amber-400 focus:outline-none"
            >
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#151C2C] border-b border-gray-800 px-6 py-4 space-y-3">
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-gray-200 border-b border-gray-800"
            >
              हमारे बारे में
            </a>
            <a
              href="#education"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-gray-200 border-b border-gray-800"
            >
              ऑनलाइन कोर्सेज
            </a>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-gray-200 border-b border-gray-800"
            >
              सेवाएँ (Services)
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2.5 text-center font-bold bg-amber-500 text-black rounded-xl mt-2"
            >
              संपर्क करें
            </a>
          </div>
        )}
      </nav>

      <!-- HERO SECTION -->
      <section className="relative pt-36 pb-20 lg:pt-48 lg:pb-32 px-4 max-w-7xl mx-auto text-center z-10">
        <div className="flex justify-center mb-6">
          <div className="p-2.5 rounded-full bg-gradient-to-r from-amber-500/20 to-blue-500/20 border border-amber-500/30 backdrop-blur-md">
            {logoFailed ? (
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-amber-400/20 to-amber-600/20 flex items-center justify-center text-5xl sm:text-6xl shadow-2xl">
                🎓
              </div>
            ) : (
              <img
                src="logo.png"
                alt="Logo"
                className="w-24 h-24 sm:w-32 sm:h-32 object-contain rounded-full shadow-2xl"
                onError={() => setLogoFailed(true)}
              />
            )}
          </div>
        </div>

        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30 mb-6">
          🚀 Education | AI | Web Dev | Automation | Digital Growth
        </span>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
          <span className="block text-white">आधुनिक तकनीक और AI से</span>
          <span className="bg-gradient-to-r from-amber-300 via-amber-500 to-amber-600 bg-clip-text text-transparent">
            अपने सपनों को दें नई उड़ान
          </span>
        </h1>

        <p className="max-w-3xl mx-auto text-base sm:text-lg text-gray-400 mb-10 leading-relaxed">
          Gyanora Hub में हम विद्यार्थियों, युवाओं, शिक्षकों और व्यवसायों को
          व्यावहारिक कौशलों, AI टूल्स, वेब डेवलपमेंट और ऑटोमेशन से जोड़कर डिजिटल
          दुनिया में आगे बढ़ाते हैं।
        </p>

        {/* HERO DIRECT CLICKABLE ACTION ICONS */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
          <a
            href="tel:8171643770"
            className="flex items-center space-x-3 px-5 py-3 rounded-full bg-[#151C2C] border border-amber-500/40 hover:border-amber-400 text-amber-400 hover:bg-amber-500/10 transition"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1.003 1.003 0 011.02-.24c1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
            </svg>
            <span className="text-sm font-semibold">Call Direct 1</span>
          </a>

          <a
            href="tel:9259680648"
            className="flex items-center space-x-3 px-5 py-3 rounded-full bg-[#151C2C] border border-amber-500/40 hover:border-amber-400 text-amber-400 hover:bg-amber-500/10 transition"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1.003 1.003 0 011.02-.24c1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
            </svg>
            <span className="text-sm font-semibold">Call Direct 2</span>
          </a>

          <a
            href="mailto:apkaapnanewslive24@gmail.com"
            className="flex items-center space-x-3 px-5 py-3 rounded-full bg-[#151C2C] border border-blue-500/40 hover:border-blue-400 text-blue-400 hover:bg-blue-500/10 transition"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
            <span className="text-sm font-semibold">Send Email Direct</span>
          </a>

          <a
            href="https://wa.me/918171643770"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 px-5 py-3 rounded-full bg-[#151C2C] border border-green-500/40 hover:border-green-400 text-green-400 hover:bg-green-500/10 transition"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.26 8.26 0 01-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 4.54 0 8.24 3.7 8.24 8.24s-3.7 8.24-8.24 8.24zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28z" />
            </svg>
            <span className="text-sm font-semibold">WhatsApp Direct</span>
          </a>
        </div>
      </section>

      <!-- ABOUT SECTION -->
      <section
        id="about"
        className="py-16 bg-[#151C2C]/50 border-y border-gray-800/80 px-4 relative z-10"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-amber-500 text-xs font-semibold uppercase tracking-wider">
              01. हमारे बारे में (About Us)
            </span>
            <h2 class="text-3xl sm:text-4xl font-bold text-white mt-2 mb-6">
              ज्ञान से सफलता तक का एक मजबूत सफर
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              Gyanora Hub एक एजुकेशन और डिजिटल सर्विस प्लेटफॉर्म है, जिसका
              उद्देश्य लोगों, विद्यार्थियों, शिक्षकों, छोटे-बड़े व्यवसायों और
              संस्थानों को आधुनिक तकनीक, AI और डिजिटल सेवाओं से जोड़ना है।
            </p>
            <div className="p-4 rounded-xl bg-[#0B0F17] border border-amber-500/30 flex items-start space-x-4">
              <span className="text-2xl">🎯</span>
              <div>
                <h4 className="font-bold text-white">हमारा विजन</h4>
                <p className="text-xs text-gray-400 mt-1">
                  सीखने से लेकर डिजिटल निर्माण और बिजनेस ग्रोथ तक, एक ही
                  प्लेटफॉर्म पर उपयोगी समाधान उपलब्ध कराना।
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#151C2C] p-6 rounded-2xl border border-amber-500/20 text-center">
              <span className="text-3xl block mb-2">🎓</span>
              <h3 className="font-bold text-white">व्यावहारिक शिक्षा</h3>
              <p className="text-xs text-gray-400 mt-1">AI & Digital Skills</p>
            </div>
            <div className="bg-[#151C2C] p-6 rounded-2xl border border-blue-500/20 text-center">
              <span className="text-3xl block mb-2">🤖</span>
              <h3 className="font-bold text-white">AI Solutions</h3>
              <p className="text-xs text-gray-400 mt-1">Agents & Chatbots</p>
            </div>
            <div className="bg-[#151C2C] p-6 rounded-2xl border border-blue-500/20 text-center">
              <span className="text-3xl block mb-2">💻</span>
              <h3 className="font-bold text-white">Web Design</h3>
              <p className="text-xs text-gray-400 mt-1">Modern & Responsive</p>
            </div>
            <div className="bg-[#151C2C] p-6 rounded-2xl border border-amber-500/20 text-center">
              <span className="text-3xl block mb-2">📈</span>
              <h3 className="font-bold text-white">Digital Growth</h3>
              <p className="text-xs text-gray-400 mt-1">Marketing & SEO</p>
            </div>
          </div>
        </div>
      </section>

      <!-- COURSES SECTION -->
      <section id="education" className="py-20 px-4 max-w-7xl mx-auto z-10 relative">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-amber-500 text-xs font-semibold uppercase tracking-wider">
            02. Education & Online Courses
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">
            शिक्षा एवं ऑनलाइन प्रशिक्षण
          </h2>
          <p className="text-gray-400 mt-3 text-sm">
            श्रेणी के अनुसार कोर्सेज देखें और अपनी पसंद का कोर्स चुनें:
          </p>

          {/* Course Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {[
              { id: 'all', label: 'सभी कोर्सेज' },
              { id: 'ai', label: 'AI & Prompting' },
              { id: 'dev', label: 'Web & No-Code' },
              { id: 'automation', label: 'Automation' },
              { id: 'growth', label: 'Growth & SEO' },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setCourseFilter(btn.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition ${
                  courseFilter === btn.id
                    ? 'bg-amber-500 text-black shadow-md'
                    : 'bg-[#151C2C] text-gray-400 hover:text-white'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((c) => (
            <div
              key={c.id}
              className="bg-[#151C2C] p-6 rounded-2xl border border-amber-500/20 flex flex-col justify-between hover:border-amber-500/50 transition"
            >
              <div>
                <span className="text-xs font-semibold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 inline-block mb-3">
                  {c.status}
                </span>
                <h3 className="font-bold text-lg text-white mb-2">{c.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-6">
                  {c.desc}
                </p>
              </div>
              <button
                onClick={() => setSelectedCourse(c)}
                className="w-full py-2.5 bg-[#0B0F17] border border-gray-700 hover:border-amber-500 text-gray-300 hover:text-amber-400 text-xs font-bold rounded-xl transition"
              >
                विवरण देखें
              </button>
            </div>
          ))}
        </div>
      </section>

      <!-- SERVICES SECTION -->
      <section
        id="services"
        className="py-20 bg-[#151C2C]/30 border-t border-gray-800 px-4 relative z-10"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-amber-500 text-xs font-semibold uppercase tracking-wider">
              03. Digital Services
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">
              हमारी प्रमुख डिजिटल सेवाएँ
            </h2>
          </div>

          {/* Service Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {SERVICES_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition ${
                  activeTab === tab.id
                    ? 'bg-amber-500 text-black shadow-lg'
                    : 'bg-[#151C2C] text-gray-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SERVICES_DATA[activeTab].map((item, idx) => (
              <div
                key={idx}
                className="bg-[#151C2C] p-6 rounded-2xl border border-amber-500/20"
              >
                <span className="text-3xl mb-4 block">{item.icon}</span>
                <h3 className="font-bold text-lg text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <!-- CONTACT SECTION WITH DIRECT CLICKABLE ICONS -->
      <section id="contact" className="py-20 px-4 max-w-4xl mx-auto relative z-10">
        <div className="bg-[#151C2C] p-8 md:p-12 rounded-3xl border border-amber-500/30">
          <div className="text-center mb-8">
            <span className="text-amber-500 text-xs font-semibold uppercase tracking-wider">
              संपर्क करें (Contact Us)
            </span>
            <h2 className="text-3xl font-bold text-white mt-1">
              अपने प्रोजेक्ट या ट्रेनिंग की शुरुआत करें
            </h2>
            <p className="text-xs text-gray-400 mt-2">
              कॉल या ईमेल करने के लिए नीचे दिए गए आइकॉन पर सीधे टैप करें:
            </p>

            {/* DIRECT ACTION ICON BAR */}
            <div className="flex flex-wrap justify-center items-center gap-6 mt-6">
              <a
                href="tel:8171643770"
                title="Call 8171643770"
                aria-label="Call 8171643770"
                className="flex items-center space-x-3 bg-[#0B0F17] px-5 py-3 rounded-2xl border border-amber-500/40 hover:border-amber-400 text-amber-400 transition"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1.003 1.003 0 011.02-.24c1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                <span className="text-xs font-bold">Call</span>
              </a>

              <a
                href="https://wa.me/918171643770"
                title="WhatsApp 8171643770"
                aria-label="WhatsApp 8171643770"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 bg-[#0B0F17] px-5 py-3 rounded-2xl border border-green-500/40 hover:border-green-400 text-green-400 transition"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.26 8.26 0 01-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 4.54 0 8.24 3.7 8.24 8.24s-3.7 8.24-8.24 8.24zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28z" />
                </svg>
                <span className="text-xs font-bold">WhatsApp</span>
              </a>

              <a
                href="tel:9259680648"
                title="Call 9259680648"
                aria-label="Call 9259680648"
                className="flex items-center space-x-3 bg-[#0B0F17] px-5 py-3 rounded-2xl border border-amber-500/40 hover:border-amber-400 text-amber-400 transition"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1.003 1.003 0 011.02-.24c1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                <span className="text-xs font-bold">Call</span>
              </a>

              <a
                href="https://wa.me/919259680648"
                title="WhatsApp 9259680648"
                aria-label="WhatsApp 9259680648"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 bg-[#0B0F17] px-5 py-3 rounded-2xl border border-green-500/40 hover:border-green-400 text-green-400 transition"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.26 8.26 0 01-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 4.54 0 8.24 3.7 8.24 8.24s-3.7 8.24-8.24 8.24zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28z" />
                </svg>
                <span className="text-xs font-bold">WhatsApp</span>
              </a>

              <a
                href="mailto:apkaapnanewslive24@gmail.com"
                title="Send Email"
                aria-label="Send Email"
                className="flex items-center space-x-3 bg-[#0B0F17] px-5 py-3 rounded-2xl border border-blue-500/40 hover:border-blue-400 text-blue-400 transition"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                <span className="text-xs font-bold">Send Email</span>
              </a>
            </div>
          </div>

          {/* Form */}
          {!formSubmitted ? (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="आपका नाम (Full Name) *"
                  className="w-full bg-[#0B0F17] border border-gray-700 rounded-xl p-3.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="व्हाट्सएप / फोन नंबर *"
                  className="w-full bg-[#0B0F17] border border-gray-700 rounded-xl p-3.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <input
                type="email"
                name="email"
                placeholder="ईमेल आईडी (Email)"
                className="w-full bg-[#0B0F17] border border-gray-700 rounded-xl p-3.5 text-xs text-white focus:outline-none focus:border-amber-500"
              />

              <textarea
                name="message"
                rows="4"
                placeholder="आपका संदेश या सवाल..."
                className="w-full bg-[#0B0F17] border border-gray-700 rounded-xl p-3.5 text-xs text-white focus:outline-none focus:border-amber-500"
              ></textarea>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold py-4 rounded-xl shadow-lg"
              >
                फॉर्म जमा करें (Submit Inquiry)
              </button>
            </form>
          ) : (
            <div className="p-6 bg-green-900/40 border border-green-500 rounded-xl text-center text-green-300">
              <h4 className="font-bold text-lg mb-1">धन्यवाद!</h4>
              <p className="text-xs">
                आपका संदेश प्राप्त हो गया है। Gyanora Hub टीम जल्द आपसे संपर्क
                करेगी।
              </p>
            </div>
          )}
        </div>
      </section>

      <!-- COURSE DETAILS MODAL -->
      {selectedCourse && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#151C2C] border border-amber-500/40 rounded-3xl p-6 sm:p-8 max-w-lg w-full relative">
            <button
              onClick={() => setSelectedCourse(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"
            >
              ✕
            </button>
            <span className="text-xs font-semibold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 inline-block mb-3">
              {selectedCourse.status}
            </span>
            <h3 className="text-xl font-bold text-white mb-3">
              {selectedCourse.title}
            </h3>
            <p className="text-sm text-gray-300 mb-6 leading-relaxed">
              {selectedCourse.desc}
            </p>
            <div className="flex gap-3">
              <a
                href="#contact"
                onClick={() => setSelectedCourse(null)}
                className="flex-1 text-center py-3 bg-amber-500 text-black font-bold text-xs rounded-xl"
              >
                Enquire Now
              </a>
              <button
                onClick={() => setSelectedCourse(null)}
                className="px-5 py-3 bg-gray-800 text-gray-300 text-xs font-semibold rounded-xl"
              >
                बंद करें
              </button>
            </div>
          </div>
        </div>
      )}

      <!-- FOOTER -->
      <footer class="bg-[#0B0F17] border-t border-gray-800/80 py-10 px-4 text-center text-xs text-gray-400 relative z-10">
        <p>© Gyanora Hub — ज्ञान से सफलता तक का सफर | सर्वाधिकार सुरक्षित</p>
      </footer>
    </div>
  );
}