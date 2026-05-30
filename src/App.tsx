import React, { useState, useEffect } from 'react';
import { 
  Compass, Shield, Award, Users, FileText, Database, 
  ChevronRight, ChevronLeft, Globe, Moon, Sun, LogIn, 
  LogOut, Download, Mail, Phone, MapPin, Send, HelpCircle, 
  Bookmark, ArrowRight, Sparkles, AlertCircle, Info, Menu, X
} from 'lucide-react';

import { 
  Language, ArchiveItem, Category, SystemUser, AuditLog, SystemStats 
} from './types';

import { 
  INITIAL_CATEGORIES, INITIAL_ITEMS, INITIAL_CASE_STUDIES, 
  INITIAL_USERS, INITIAL_AUDIT_LOGS, INITIAL_STATS 
} from './data';

import BrochureModal from './components/BrochureModal';
import AuthSystem from './components/AuthSystem';
import Dashboard from './components/Dashboard';
import AdminPanel from './components/AdminPanel';

export default function App() {
  // --- Language & Theme Configuration ---
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('irth_lang');
    return (saved as Language) || 'AR'; // Default to Arabic (Client requirement: bilingual with RTL/LTR)
  });

  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('irth_theme');
    return (saved as 'dark' | 'light') || 'dark'; // Direction A is immersive dark by default
  });

  // App active view router: 'landing' | 'dashboard' | 'admin' | 'auth'
  const [activeRoute, setActiveRoute] = useState<'landing' | 'dashboard' | 'admin' | 'auth'>('landing');

  // --- Persistent Local Database State ---
  const [items, setItems] = useState<ArchiveItem[]>(() => {
    const saved = localStorage.getItem('irth_items');
    return saved ? JSON.parse(saved) : INITIAL_ITEMS;
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('irth_categories');
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
  });

  const [users, setUsers] = useState<SystemUser[]>(() => {
    const saved = localStorage.getItem('irth_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem('irth_audit_logs');
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  // --- Session State ---
  const [session, setSession] = useState<{ name: string; role: string } | null>(() => {
    const saved = localStorage.getItem('irth_session');
    return saved ? JSON.parse(saved) : null;
  });

  // --- Modal & Navigation States ---
  const [brochureOpen, setBrochureOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // --- Sync database states with LocalStorage ---
  useEffect(() => {
    localStorage.setItem('irth_lang', lang);
    localStorage.setItem('irth_theme', theme);
  }, [lang, theme]);

  useEffect(() => {
    localStorage.setItem('irth_items', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem('irth_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('irth_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('irth_audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  useEffect(() => {
    if (session) {
      localStorage.setItem('irth_session', JSON.stringify(session));
    } else {
      localStorage.removeItem('irth_session');
    }
  }, [session]);

  // --- Hero Section Carousel States (Reference image layout matching) ---
  const [heroIdx, setHeroIdx] = useState(0);
  const heroSlides = [
    {
      id: 'slide-1',
      titleEN: 'AL-ULA & HEGRA',
      titleAR: 'رحلة العلا والحِجْر الأثرية',
      descEN: 'Behold the absolute monument of Saudi Arabia ancestral presence. Centuries-old hand-carved Nabataean tombs layered beneath timeless golden desert mountain horizons.',
      descAR: 'شاهد الشواهد الشامخة للعمق التاريخي وحضارة الأنباط. مدافن أثرية منحوتة في الصخر منذ وعاء الزمان لتبهر الألباب تحت شمس العلا وسكينة الصحراء الروحية.',
      bgUrl: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&q=80&w=1600',
      bookmarkText: 'HEGRA ARCHIVE'
    },
    {
      id: 'slide-2',
      titleEN: 'HISTORIC JEDDAH',
      titleAR: 'جدة التاريخية (البلد)',
      descEN: 'Discover Al-Balad, a gateway of regional commerce and cultural crossroads styled with beautiful ancient Roshan balconies and unique coral-stone facades.',
      descAR: 'استكشف حواري جدة التاريخية ومبانيها الأثرية الفريدة المشيدة بالحجر المرجاني العريق والمزدانة بالرواشين الخشبية المحفورة التي تعكس كرم الضيافة وبهاء التراث الفني.',
      bgUrl: 'https://images.unsplash.com/photo-1623345805780-8f01f714e65f?auto=format&fit=crop&q=80&w=1600',
      bookmarkText: 'BALAD REGISTRY'
    },
    {
      id: 'slide-3',
      titleEN: 'AT-TURAIF DIRIYAH',
      titleAR: 'حي الطريف التاريخي بالدرعية',
      descEN: 'Explore the ancestral seat of Saudi statehood. Historic mud-baked palaces certified by UNESCO showcasing beautiful Najdi structural geometry and royal councils.',
      descAR: 'تنقل في مهد تأسيس الدولة والعمق التاريخي لحي الطريف التاريخي المسجل باليونسكو، المزدان بقصور طينية تقليدية تكشف عظمة الريادة ونبل الهوية النجدية الأصيلة.',
      bgUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1600',
      bookmarkText: 'DIRIYAH SCHEME'
    }
  ];

  // Auto carousel slide transition
  useEffect(() => {
    if (activeRoute !== 'landing') return;
    const interval = setInterval(() => {
      setHeroIdx(prev => (prev + 1) % heroSlides.length);
    }, 12000); // 12 seconds per slide for peaceful reading
    return () => clearInterval(interval);
  }, [activeRoute]);

  // --- Audit Logging Helper ---
  const addAuditLog = (actionEN: string, actionAR: string, target: string) => {
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      user: session ? session.name : 'System Gateway',
      actionEN,
      actionAR,
      target,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'Success'
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // --- Global Navigation Triggers ---
  const handleLoginSuccess = (name: string, role: string) => {
    setSession({ name, role });
    addAuditLog(`User session authenticated as ${role}`, `تمت مصادقة جلسة دخول المستخدم بنجاح برتبة: ${role}`, name); 
    setActiveRoute('dashboard');
  };

  const handleLogout = () => {
    if (session) {
      addAuditLog(`User session logged out`, `تم إنهاء جلسة دخول الموظف وخروجه الآمن`, session.name);
    }
    setSession(null);
    setActiveRoute('landing');
  };

  // Dictionary for Bilingual Global Static Text
  const uiText = {
    EN: {
      siteTitle: 'IRTH | Preservation Portal',
      brand: 'IRTH',
      arabicWord: 'إرث',
      tagline: 'PRESERVING KNOWLEDGE & LEGACY',
      home: 'Home Sanctuary',
      caseStudies: 'Case Studies Center',
      aboutUs: 'Chronicles & Legacy',
      contact: 'Custodian Liaison',
      portalTerminal: 'Portal Terminal',
      adminTerminal: 'Control Sovereign Panel',
      logout: 'Lock & Rest Terminal',
      museumSoon: 'Virtual Museum (Soon)',
      comingSoon: 'Coming Soon',
      aboutTitle: 'Our Sacred Stewardship',
      aboutText1: 'Irth is a private, multi-tenant digital preservation fortress built for Middle Eastern sovereign offices, ancestry networks, and legacy organisations. We leverage museum-grade raw cataloging protocols and high-end digital storage indices.',
      aboutText2: 'Our infrastructure is physically resident inside Riyadh Region (Oracle Cloud Infrastructure) ensuring absolute compliance with Saudi Arabia PDPL data privacy laws and NCA security criteria.',
      brochureBlockTitle: 'Download Platform Technical Profile',
      brochureBlockDesc: 'Obtain our detailed architectural brochure outlining compliance metrics, database tenancy isolates, and Unifonic SMS credentials configuration.',
      brochureBtn: 'Access Technical Details Profile',
      footerCopy: '© 2026 IRTH Digital Preservation Vaults. All sovereign records isolation protocols locked. Riyadh, Kingdom of Saudi Arabia.',
      heroSlogan: 'Sovereign Digitisation',
      exploreBtn: 'Explore Cultural Archives',
      contactTitle: 'Inquire with Custodians',
      contactSub: 'Establish a secure digital vault framework for your office or lineage.',
      contactName: 'Inquirer Name',
      contactEmail: 'Official Institutional Email',
      contactMsg: 'Detailed Archival Scale Needs',
      contactSend: 'Transmit Inquiry Signature',
      contactSuccess: 'Inquiry transmitted to custody operators (Simulation).',
      featuresTitle: 'Platform Content Modules',
      featuresSub: 'Irth supports a wide variety of historical artifact registries:'
    },
    AR: {
      siteTitle: 'منصة إرث الرقمية | حفظ التراث العريق',
      brand: 'إرث',
      arabicWord: 'إرث',
      tagline: 'حفظ المعرفة والإرث والذاكرة العريقة',
      home: 'الصفاء الرئيسي',
      caseStudies: 'مركز دراسات الحفظ',
      aboutUs: 'من نحن والرسالة',
      contact: 'تواصل مع الأمناء',
      portalTerminal: 'بوابة المؤرخين للولوج',
      adminTerminal: 'لوحة التحكم والسيادة',
      logout: 'تسجيل خروج مغلق وبآمن',
      museumSoon: 'المتحف الافتراضي (قريباً)',
      comingSoon: 'قريباً جداً',
      aboutTitle: 'أمانة الحفظ ومستودع التاريخ',
      aboutText1: 'منصة "إرث" هي حصن رقمي خاص ومغلق، مبني بمعايير متحفية مرموقة ليخدم العائلات العريقة، المكاتب السيادية، والمؤسسات التراثية في المملكة العربية السعودية والشرق الأوسط، لحفظ المخطوطات والوسائط والعملات برمزية تامة وأمان قطعي.',
      aboutText2: 'تستضيف المنصة خوادمها الفائقة في سحابة أوراكل للذكاء الاصطناعي بنطاق مدينة الرياض، مما يضمن خضوع البيانات بالكامل لنظام حماية البيانات الشخصية السعودي (PDPL) والضوابط الأساسية للأمن السيبراني الصادرة عن (NCA).',
      brochureBlockTitle: 'تحميل ملف التعريف الفني للمنصة',
      brochureBlockDesc: 'احصل على الكتيب التقني الشامل الذي يستعرض الهيكل البرمجي والترابط التقني مع بوابات التوثيق والرسائل والامتثال الأمني.',
      brochureBtn: 'عرض الكتيب التقني للمنصة',
      footerCopy: 'جميع الحقوق وعزل البيانات الأرشيفية محفوظة لمنصة إرث © ٢٠٢٦. خوادم الرياض، المملكة العربية السعودية.',
      heroSlogan: 'الترميم الرقمي السيادي',
      exploreBtn: 'استكشاف الأرشيف والوثائق',
      contactTitle: 'تواصل مع أمناء المنظومة',
      contactSub: 'اطلب تأسيس خزانة رقمية مغلقة ومستقلة لعائلتكم العريقة أو جهاتكم الرسمية.',
      contactName: 'اسم المتقدم بالطلب',
      contactEmail: 'البريد الإلكتروني المؤسسي الرسمي',
      contactMsg: 'تفاصيل حجم ونوع المحفوظات المستهدفة',
      contactSend: 'إرسال طلب التوثيق والربط',
      contactSuccess: 'تم إرسال طلبكم لأمناء منظومة إرث بنجاح (محاكاة).',
      featuresTitle: 'أقسام وتصنيفات المحتوى الرقمي',
      featuresSub: 'تدعم منصة إرث طيفاً واسعاً من مدونات ومصادر التاريخ والتراث والأنساب بالفهرسة الذكية:'
    }
  };

  const currentUi = uiText[lang];

  return (
    <div 
      className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
        theme === 'dark' ? 'royal-background-dark text-stone-200' : 'royal-background-light text-stone-800'
      }`}
    >
      
      {/* ----------------- Navigation Header ----------------- */}
      <header 
        id="irth-main-navigation-header" 
        className={`sticky top-0 z-40 transition-all ${
          theme === 'dark' ? 'bg-[#0a0f0d]/90 border-b border-emerald-900/40' : 'bg-stone-50/95 border-b border-amber-500/15'
        } backdrop-blur-md px-6 py-4`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo Brand Title */}
          <div 
            onClick={() => setActiveRoute('landing')}
            className="flex items-center gap-3 cursor-pointer text-amber-500 hover:text-amber-400 transition"
          >
            <div className="p-2.5 rounded-lg bg-emerald-950/80 border border-amber-500/30 text-amber-500">
              <Compass className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <span className="text-xl font-bold font-serif tracking-widest text-amber-400 block">
                {currentUi.arabicWord} | {currentUi.brand}
              </span>
              <span className="text-[9px] uppercase tracking-widest text-emerald-600 font-mono block">
                {currentUi.tagline}
              </span>
            </div>
          </div>

          {/* Desktop Links Suite */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold">
            <button 
              id="nav-link-home"
              onClick={() => setActiveRoute('landing')} 
              className={`hover:text-amber-400 transition ${activeRoute === 'landing' ? 'text-amber-500 underline decoration-amber-500/40 underline-offset-4' : 'text-stone-400'}`}
            >
              {currentUi.home}
            </button>
            <button 
              id="nav-link-cases"
              onClick={() => { setActiveRoute('landing'); setTimeout(() => document.getElementById('case-studies-anchor')?.scrollIntoView({ behavior: 'smooth' }), 100); }} 
              className="text-stone-400 hover:text-amber-400 transition"
            >
              {currentUi.caseStudies}
            </button>
            <button 
              id="nav-link-about"
              onClick={() => { setActiveRoute('landing'); setTimeout(() => document.getElementById('about-anchor')?.scrollIntoView({ behavior: 'smooth' }), 100); }} 
              className="text-stone-400 hover:text-amber-400 transition"
            >
              {currentUi.aboutUs}
            </button>
            <button 
              id="nav-link-contact"
              onClick={() => { setActiveRoute('landing'); setTimeout(() => document.getElementById('contact-anchor')?.scrollIntoView({ behavior: 'smooth' }), 100); }} 
              className="text-stone-400 hover:text-amber-400 transition"
            >
              {currentUi.contact}
            </button>
            <button 
              id="nav-link-museum-soon"
              onClick={() => alert(lang === 'AR' ? 'المعرض الافتراضي ثلاثي الأبعاد قيد التصميم المعماري حالياً.' : '3D Museum is under architects drafting phase.')}
              className="text-stone-500 hover:text-stone-400 flex items-center gap-1 transition"
            >
              <Award className="w-3.5 h-3.5 text-amber-600" />
              <span>{currentUi.museumSoon}</span>
            </button>
          </nav>

          {/* Utility buttons at the Right (Lang switch, Theme switch, Login Terminal) */}
          <div className="hidden lg:flex items-center gap-3.5">
            
            {/* Language Selection Switcher */}
            <button 
              id="lang-switcher-toggle"
              onClick={() => setLang(prev => prev === 'EN' ? 'AR' : 'EN')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-800 text-stone-400 hover:text-amber-400 hover:border-amber-400/40 text-xs font-mono transition"
              title="Switch Platform Language (RTL/LTR Translation)"
            >
              <Globe className="w-4 h-4 text-emerald-500" />
              <span>{lang === 'EN' ? 'ARABIC (AR)' : 'ENGLISH (EN)'}</span>
            </button>

            {/* Accessible Theme Switcher */}
            <button 
              id="theme-switcher-toggle"
              onClick={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg border border-stone-800 text-stone-400 hover:text-amber-400 transition"
              title="Toggle Accessibility Color Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-stone-600" />}
            </button>

            {/* Portal login / Session panel switch */}
            {session ? (
              <div id="logged-user-actions-panel" className="flex items-center gap-2">
                <button
                  id="dashboard-terminal-routing-btn"
                  onClick={() => setActiveRoute('dashboard')}
                  className="px-4 py-2 bg-emerald-950 hover:bg-emerald-910 border border-emerald-800 text-emerald-400 rounded-lg text-xs font-bold transition"
                >
                  {lang === 'AR' ? 'مركز الفهرسة' : 'Archive Terminal'}
                </button>
                {session.role === 'Administrator' && (
                  <button
                    id="admin-terminal-routing-btn"
                    onClick={() => setActiveRoute('admin')}
                    className="px-4 py-2 bg-amber-950 hover:bg-amber-910 border border-amber-800 text-amber-400 rounded-lg text-xs font-bold transition"
                  >
                    {lang === 'AR' ? 'منصة الإشراف' : 'Supervisor Portal'}
                  </button>
                )}
                <button
                  id="header-logout-btn"
                  onClick={handleLogout}
                  className="p-2 border border-red-900/60 hover:bg-red-950/20 text-red-400 hover:text-red-300 rounded-lg transition"
                  title={currentUi.logout}
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                id="initiate-auth-portal-btn"
                onClick={() => setActiveRoute('auth')}
                className="flex items-center gap-1.5 px-4 block py-2.5 bg-gradient-to-r from-emerald-800 to-emerald-700 hover:from-emerald-700 hover:to-emerald-600 text-stone-100 hover:text-stone-300 rounded-lg text-xs font-extrabold border border-amber-500/20 shadow transition cursor-pointer"
              >
                <LogIn className="w-4 h-4 text-amber-400" />
                <span>{currentUi.portalTerminal}</span>
              </button>
            )}

          </div>

          {/* Hamburger Mobile Menu toggle icon */}
          <div className="flex lg:hidden items-center gap-2">
            <button 
              onClick={() => setLang(prev => prev === 'EN' ? 'AR' : 'EN')}
              className="p-1 px-2.5 rounded border border-stone-800 text-stone-400 text-xs font-mono"
            >
              {lang === 'EN' ? 'AR' : 'EN'}
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded border border-stone-800 text-stone-300 hover:text-amber-400"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer Overlay options */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 py-4 px-4 bg-stone-900 border-t border-stone-800 rounded-lg space-y-4">
            <nav className="flex flex-col gap-2.5 text-sm font-medium">
              <button 
                onClick={() => { setActiveRoute('landing'); setMobileMenuOpen(false); }} 
                className="text-stone-300 hover:text-amber-400 text-left p-2"
              >
                {currentUi.home}
              </button>
              <button 
                onClick={() => { setActiveRoute('landing'); setMobileMenuOpen(false); setTimeout(() => document.getElementById('case-studies-anchor')?.scrollIntoView({ behavior: 'smooth' }), 100); }} 
                className="text-stone-300 hover:text-amber-400 text-left p-2"
              >
                {currentUi.caseStudies}
              </button>
              <button 
                onClick={() => { setActiveRoute('landing'); setMobileMenuOpen(false); setTimeout(() => document.getElementById('about-anchor')?.scrollIntoView({ behavior: 'smooth' }), 100); }} 
                className="text-stone-300 hover:text-amber-400 text-left p-2"
              >
                {currentUi.aboutUs}
              </button>
              <button 
                onClick={() => { setActiveRoute('landing'); setMobileMenuOpen(false); setTimeout(() => document.getElementById('contact-anchor')?.scrollIntoView({ behavior: 'smooth' }), 100); }} 
                className="text-stone-300 hover:text-amber-400 text-left p-2"
              >
                {currentUi.contact}
              </button>
            </nav>

            <div className="pt-3 border-t border-stone-800 flex flex-col gap-2">
              <button 
                onClick={() => { setTheme(prev => prev === 'dark' ? 'light' : 'dark'); setMobileMenuOpen(false); }}
                className="text-xs text-stone-400 hover:text-stone-100 flex items-center gap-2 p-2"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-stone-600" />}
                <span>Toggle Color Mode</span>
              </button>

              {session ? (
                <div className="space-y-2 pt-2">
                  <button 
                    onClick={() => { setActiveRoute('dashboard'); setMobileMenuOpen(false); }}
                    className="w-full py-2 bg-emerald-950 text-emerald-400 text-xs font-bold rounded"
                  >
                    Archive Terminal
                  </button>
                  {session.role === 'Administrator' && (
                    <button 
                      onClick={() => { setActiveRoute('admin'); setMobileMenuOpen(false); }}
                      className="w-full py-2 bg-amber-950 text-amber-400 text-xs font-bold rounded"
                    >
                      Supervisor Admin
                    </button>
                  )}
                  <button 
                    onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                    className="w-full py-2 bg-red-950/20 text-red-400 border border-red-500/10 text-xs font-bold rounded"
                  >
                    Lock Session
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => { setActiveRoute('auth'); setMobileMenuOpen(false); }}
                  className="w-full py-2.5 bg-gradient-to-r from-emerald-800 to-emerald-700 text-stone-100 text-xs font-bold rounded text-center"
                >
                  {currentUi.portalTerminal}
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* ----------------- Central Content Routing ----------------- */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-8">
        
        {/* VIEW 1: LANDING PAGE WITH REFERENCE CAROUSEL SLIDER */}
        {activeRoute === 'landing' && (
          <div className="space-y-16">
            
            {/* Carousel Full Screen Banner Mockup (Matches layout design prompt reference) */}
            <div 
              id="irth-heritage-carousel-showcase"
              className="relative rounded-2xl overflow-hidden h-[540px] md:h-[600px] border border-amber-500/10 shadow-2xl flex flex-col justify-between p-8"
              style={{ 
                backgroundImage: `linear-gradient(rgba(10, 15, 13, 0.45), rgba(10, 15, 13, 0.9)), url(${heroSlides[heroIdx].bgUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'background-image 1.2s ease-in-out',
                direction: lang === 'AR' ? 'rtl' : 'ltr'
              }}
            >
              
              {/* Carousel Header details */}
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-amber-400 font-mono tracking-widest text-[10px] uppercase bg-stone-950/80 px-3 py-1.5 rounded-full border border-emerald-900/30">
                  {currentUi.heroSlogan} • KINGDOM ARCHIVE
                </span>
                
                {/* Micro indicators for active slide matching "01", "02", "03" from prompt reference */}
                <span className="font-mono text-stone-300 text-sm bg-black/40 px-2.5 py-1 rounded">
                  0{heroIdx + 1} / 0{heroSlides.length}
                </span>
              </div>

              {/* Central Title/Paragraph layout aligning exact spacing and explorer button */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end py-4">
                
                {/* Active Slider Details Block */}
                <div className="lg:col-span-7 space-y-4 text-left">
                  <span className="text-[10px] font-mono font-bold text-amber-500 uppercase tracking-widest">
                    {lang === 'AR' ? 'سلسلة المعالم والآثار المقيدة' : 'ROYAL PROTECTION SERIES'}
                  </span>
                  
                  <h2 className="text-4xl md:text-5xl font-extrabold font-serif tracking-tight text-white leading-tight">
                    {lang === 'AR' ? heroSlides[heroIdx].titleAR : heroSlides[heroIdx].titleEN}
                  </h2>
                  
                  <p className="text-xs md:text-sm text-stone-200 leading-relaxed max-w-xl font-serif">
                    {lang === 'AR' ? heroSlides[heroIdx].descAR : heroSlides[heroIdx].descEN}
                  </p>

                  <div className="pt-2">
                    <button 
                      id="hero-explore-archives-btn"
                      onClick={() => {
                        if (!session) {
                          setActiveRoute('auth');
                        } else {
                          setActiveRoute('dashboard');
                        }
                      }}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-800 to-emerald-700 hover:from-emerald-700 text-stone-100 text-xs font-bold rounded-lg shadow-lg hover:shadow-xl border border-amber-500/20 transition cursor-pointer"
                    >
                      <Compass className="w-4 h-4 text-amber-400" />
                      <span>{currentUi.exploreBtn}</span>
                    </button>
                  </div>
                </div>

                {/* Floating list of carousel items matching thumbnail cards deck on right of reference screenshot */}
                <div className="lg:col-span-5 flex justify-end gap-3.5 overflow-x-auto py-2">
                  {heroSlides.map((slide, idx) => {
                    const isSelected = idx === heroIdx;
                    return (
                      <div 
                        key={slide.id}
                        id={`thumbnail-card-${idx}`}
                        onClick={() => setHeroIdx(idx)}
                        className={`w-32 md:w-36 h-48 rounded-xl overflow-hidden shrink-0 filter transition-all cursor-pointer relative border-2 ${
                          isSelected ? 'border-amber-400 scale-105 shadow-2xl' : 'border-stone-800 opacity-60 hover:opacity-100 hover:border-amber-400/40'
                        }`}
                      >
                        <img 
                          src={slide.bgUrl} 
                          alt={slide.titleEN} 
                          className="w-full h-full object-cover" 
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent p-2.5 flex flex-col justify-between align-stretch text-left">
                          
                          {/* Bookmarking floating absolute tag like target refer screenshot */}
                          <div className="flex justify-end pr-0.5 pt-0.5">
                            <span className="p-1 rounded-full bg-white/10 backdrop-blur-md text-amber-400">
                              <Bookmark className="w-3 h-3 fill-amber-400" />
                            </span>
                          </div>

                          <div className="space-y-0.5">
                            <span className="text-[8px] text-amber-400 font-mono tracking-widest block uppercase">
                              {slide.bookmarkText}
                            </span>
                            <span className="text-[10px] text-stone-100 font-serif font-semibold truncate block leading-tight">
                              {lang === 'AR' ? slide.titleAR : slide.titleEN}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>

              {/* Slider chevron buttons at the very bottom center */}
              <div className="flex justify-between items-center border-t border-white/10 pt-4 text-xs text-stone-400 font-mono">
                <span>RIYADH SAUDI ARABIA ARCHIVES // KSA-RESTORE-v1.2</span>
                <div className="flex gap-2.5">
                  <button 
                    onClick={() => setHeroIdx(prev => (prev - 1 + heroSlides.length) % heroSlides.length)}
                    className="p-1.5 rounded-full bg-stone-900/80 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-800 transition"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setHeroIdx(prev => (prev + 1) % heroSlides.length)}
                    className="p-1.5 rounded-full bg-stone-900/80 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-800 transition"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>

            {/* Platform Content Modules overview */}
            <section className="space-y-6">
              <div className="text-center space-y-2 max-w-xl mx-auto">
                <span className="text-xs font-semibold text-emerald-500 font-mono uppercase tracking-widest block">
                  {lang === 'AR' ? 'محاور الرصد والتدوين' : 'SYSTEM MODULES'}
                </span>
                <h3 className="text-2xl font-bold font-serif text-amber-400">
                  {currentUi.featuresTitle}
                </h3>
                <p className="text-xs text-stone-400">
                  {currentUi.featuresSub}
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div className="p-5 rounded-xl bg-stone-950/70 border border-stone-800 hover:border-amber-500/20 transition-all space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-950 flex items-center justify-center text-amber-400 shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <h4 className="font-semibold text-stone-100 font-serif">
                    {lang === 'AR' ? 'الوثائق والقرارات' : 'Official Treaties'}
                  </h4>
                  <p className="text-xs text-stone-400 leading-relaxed font-serif">
                    {lang === 'AR' ? 'تسجيل فوري للمواثيق الملكية والقرارات والبيانات الحكومية التاريخية.' : 'High-security preservation copy of state and royal charters verified under strict signature audits.'}
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-stone-950/70 border border-stone-800 hover:border-amber-500/20 transition-all space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-950 flex items-center justify-center text-amber-400 shrink-0">
                    <Database className="w-5 h-5" />
                  </div>
                  <h4 className="font-semibold text-stone-100 font-serif">
                    {lang === 'AR' ? 'المخطوطات والكتب النادرة' : 'Historic Manuscript Scrolls'}
                  </h4>
                  <p className="text-xs text-stone-400 leading-relaxed font-serif">
                    {lang === 'AR' ? 'فهرست كامل للرقوق والمؤلفات الإسلامية القديمة المسجلة عبر الأجيال.' : 'Foliation indices mapping ancient Islamic astronomical, chemical, and philosophical parchment books.'}
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-stone-950/70 border border-stone-800 hover:border-amber-500/20 transition-all space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-950 flex items-center justify-center text-amber-400 shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <h4 className="font-semibold text-stone-100 font-serif">
                    {lang === 'AR' ? 'الأفلام والصور' : 'Multi-spectral Photography'}
                  </h4>
                  <p className="text-xs text-stone-400 leading-relaxed font-serif">
                    {lang === 'AR' ? 'صور عالية التوقيع وثنائية الطبقات توثق معالم الجزيرة وساكنيها.' : 'Dual-layer ortho-rectified visual representations capturing early Najd and Hijaz communities.'}
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-stone-950/70 border border-stone-800 hover:border-amber-500/20 transition-all space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-950 flex items-center justify-center text-amber-400 shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <h4 className="font-semibold text-stone-100 font-serif">
                    {lang === 'AR' ? 'التسجيلات الشفهية' : 'Spoken Legacies'}
                  </h4>
                  <p className="text-xs text-stone-400 leading-relaxed font-serif">
                    {lang === 'AR' ? 'أشرطة السرد الشفوي لكبار السن والرواة المحفوظين.' : 'High-fidelity audio recordings capturing old Bedouin poetry, clan registers, and region keeper stories.'}
                  </p>
                </div>
              </div>
            </section>

            {/* About us Stewardship text block (4.1 Request) */}
            <section id="about-anchor" className="grid gap-12 lg:grid-cols-2 items-center pt-8 border-t border-stone-900">
              <div className="space-y-5">
                <span className="text-[10px] font-bold text-amber-500 tracking-widest uppercase font-mono">
                  {lang === 'AR' ? 'أمانة الحفظ ومبادئ الأرشيف' : 'STEWARDSHIP MANIFESTO'}
                </span>
                <h3 className="text-2xl font-bold font-serif text-stone-100">
                  {currentUi.aboutTitle}
                </h3>
                <p className="text-xs md:text-sm text-stone-300 leading-relaxed font-serif">
                  {currentUi.aboutText1}
                </p>
                <div className="p-4 rounded-lg bg-emerald-950/20 border border-emerald-900/30 text-xs text-stone-400 leading-relaxed flex items-start gap-2.5">
                  <Shield className="w-5 h-5 text-amber-500 shrink-0" />
                  <span>
                    {currentUi.aboutText2}
                  </span>
                </div>
              </div>

              {/* Decorative side illustration (Faux technical metadata codex) */}
              <div className="p-6 rounded-xl bg-stone-950 border border-stone-800 space-y-4">
                <h4 className="text-xs font-bold font-mono text-emerald-500 uppercase tracking-widest">
                  RIYADH INTEGRITY STATUS
                </h4>
                
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between py-1.5 border-b border-stone-900">
                    <span className="text-stone-500">RESIDENCY GATEWAY</span>
                    <span className="text-stone-300">ORACLE OCI - RYD (LOCALIZED)</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-stone-900">
                    <span className="text-stone-500">MFA STATUS</span>
                    <span className="text-emerald-400 font-semibold">CONNECTED (UNIFONIC API)</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-stone-900">
                    <span className="text-stone-500">TENANCY SECURITY</span>
                    <span className="text-stone-300">ROW-LEVEL INDEPENDENCY (RLS)</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-stone-900">
                    <span className="text-stone-500">PROTECTION LEVEL</span>
                    <span className="text-stone-300">SAUDI NATIONAL SECURITY COMPLIANCE</span>
                  </div>
                </div>

                <div className="p-3 text-[10px] text-stone-500 rounded bg-stone-900 text-center font-serif leading-relaxed">
                  {lang === 'AR' ? 'جميع المطابقات والخصائص الأمنية تتبع الهيئة الوطنية للأمن السيبراني (NCA)' : 'All preservation matrices correspond directly with NCA regulations.'}
                </div>
              </div>
            </section>

            {/* Interactive Technical Brochure Block (Brochure trigger on landing 4.1) */}
            <section className="p-8 rounded-2xl bg-gradient-to-br from-emerald-955 via-emerald-950/30 to-stone-950 border border-amber-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-amber-500" />
                  <h4 className="text-lg font-bold font-serif text-stone-100">{currentUi.brochureBlockTitle}</h4>
                </div>
                <p className="text-xs text-stone-400 max-w-xl">
                  {currentUi.brochureBlockDesc}
                </p>
              </div>
              <button
                id="landing-open-brochure-modal-btn"
                onClick={() => setBrochureOpen(true)}
                className="px-6 py-3 bg-stone-900 hover:bg-stone-850 text-amber-400 hover:text-amber-300 border border-amber-500/20 text-xs font-bold rounded-lg transition-all flex items-center gap-2 cursor-pointer w-full md:w-auto justify-center"
              >
                <Download className="w-4 h-4 text-amber-400" />
                <span>{currentUi.brochureBtn}</span>
              </button>
            </section>

            {/* Historic Case Studies Segment (4.1 Request) */}
            <section id="case-studies-anchor" className="space-y-6 pt-8 border-t border-stone-900">
              <div className="text-center space-y-1.5 max-w-xl mx-auto">
                <span className="text-[10px] font-bold text-emerald-500 font-mono tracking-widest uppercase block">
                  {lang === 'AR' ? 'مشاريع متميزة وقصص نجاح' : 'CASE LOG REFERENCE UNIT'}
                </span>
                <h3 className="text-2xl font-bold font-serif text-amber-400">
                  {lang === 'AR' ? 'مركز دراسات حفظ التجارب والترميم' : 'Sovereign Case Studies Center'}
                </h3>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {INITIAL_CASE_STUDIES.map(cs => (
                  <div key={cs.id} className="p-6 rounded-xl bg-stone-950 border border-stone-800 space-y-4 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[10px] text-stone-500 font-mono">
                        <span>CLIENT: {lang === 'AR' ? cs.clientAR : cs.clientEN}</span>
                        <span>{cs.year}</span>
                      </div>
                      <h4 className="text-sm font-bold font-serif text-stone-200">
                        {lang === 'AR' ? cs.titleAR : cs.titleEN}
                      </h4>
                      <p className="text-xs text-stone-400 leading-relaxed font-serif">
                        {lang === 'AR' ? cs.summaryAR : cs.summaryEN}
                      </p>
                    </div>

                    <div className="p-3.5 rounded bg-stone-900 text-xs font-serif leading-relaxed text-stone-400">
                      <span className="text-[10px] text-amber-500 font-mono block uppercase font-bold mb-1">{lang === 'AR' ? 'النتائج والمكتسبات:' : 'Outcomes Secured:'}</span>
                      <ul className="list-disc list-inside space-y-1">
                        {(lang === 'AR' ? cs.outcomesAR : cs.outcomesEN).map((out, idx) => (
                          <li key={idx}>{out}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Custodian Liaison / Contact Section */}
            <section id="contact-anchor" className="p-8 rounded-2xl bg-stone-950 border border-stone-850 space-y-6">
              <div className="space-y-1.5">
                <h3 className="text-xl font-bold font-serif text-amber-400">{currentUi.contactTitle}</h3>
                <p className="text-xs text-stone-400 max-w-xl">{currentUi.contactSub}</p>
              </div>

              <form 
                onSubmit={(e) => { e.preventDefault(); alert(currentUi.contactSuccess); }}
                className="grid gap-4 sm:grid-cols-2 text-xs"
              >
                <div className="space-y-1">
                  <label className="text-[11px] text-stone-400">{currentUi.contactName}</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Al-Faisal Office"
                    className="w-full bg-stone-900 border border-stone-800 focus:border-amber-400 rounded p-2.5 text-stone-200"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] text-stone-400">{currentUi.contactEmail}</label>
                  <input 
                    type="email" 
                    placeholder="office@address.sa"
                    className="w-full bg-stone-900 border border-stone-800 focus:border-amber-400 rounded p-2.5 text-stone-200"
                    required
                  />
                </div>
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-[11px] text-stone-400">{currentUi.contactMsg}</label>
                  <textarea 
                    rows={3} 
                    placeholder={lang === 'AR' ? 'اذكر سعة الأرشيف المطلوب وفئاته...' : 'Please describe estimates scale indexation rules...'}
                    className="w-full bg-stone-900 border border-stone-800 focus:border-amber-400 rounded p-2.5 text-stone-200"
                    required
                  />
                </div>
                <div className="sm:col-span-2 pt-2 flex justify-end">
                  <button 
                    type="submit" 
                    className="px-5 py-2.5 bg-emerald-950 hover:bg-emerald-900 text-emerald-400 font-bold border border-emerald-800 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{currentUi.contactSend}</span>
                  </button>
                </div>
              </form>
            </section>

          </div>
        )}

        {/* VIEW 2: PORTAL TERMINAL AUTHENTICATION TERMINAL */}
        {activeRoute === 'auth' && (
          <AuthSystem 
            lang={lang} 
            onLoginSuccess={handleLoginSuccess} 
            onCancel={() => setActiveRoute('landing')} 
          />
        )}

        {/* VIEW 3: SECURE DEPOSIT / INDEXING WORKSPACE (DASHBOARD) */}
        {activeRoute === 'dashboard' && (
          <Dashboard 
            lang={lang}
            items={items}
            categories={categories}
            setItems={setItems}
            setCategories={setCategories}
            userDisplayName={session ? session.name : 'Unknown Operator'}
            userRole={session ? session.role : 'Viewer'}
            addAuditLog={addAuditLog}
          />
        )}

        {/* VIEW 4: SUPERVISOR ADMINISTRATIVE HUB */}
        {activeRoute === 'admin' && (
          <AdminPanel 
            lang={lang}
            users={users}
            setUsers={setUsers}
            auditLogs={auditLogs}
            categories={categories}
            stats={INITIAL_STATS}
            addAuditLog={addAuditLog}
          />
        )}

      </main>

      {/* ----------------- Global Technical Brochure Modal Overlay ----------------- */}
      <BrochureModal 
        isOpen={brochureOpen} 
        onClose={() => setBrochureOpen(false)} 
        lang={lang} 
      />

      {/* ----------------- Global Platform Footer ----------------- */}
      <footer 
        id="irth-sovereign-platform-footer" 
        className={`mt-16 py-8 px-6 transition-colors border-t ${
          theme === 'dark' ? 'bg-[#060a08] border-emerald-950/80 text-stone-500' : 'bg-stone-100 border-amber-500/10 text-stone-600'
        }`}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          
          {/* Trademark details */}
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-amber-500" />
            <span className="font-mono text-[10px] tracking-wider uppercase">
              {currentUi.brand} Digital Archives Pool // NCA COMPLIANT // GCC ORIGIN
            </span>
          </div>

          <p className="text-center md:text-right text-[11px] font-serif leading-relaxed">
            {currentUi.footerCopy}
          </p>

        </div>
      </footer>

    </div>
  );
}
