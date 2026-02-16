
import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { ServiceCardProps, BlogPost } from './types';
import VoiceConsultant from './components/VoiceConsultant';
import mainImage from './images/Dashboards-min.png';
import ecommerceImage from './images/Ecommerce.png';
import mobileAppImage from './images/Mobile-Application-min.png';
import blogCode from './images/blog-code.jpg';
import blogAi from './images/blog-ai.jpg';
import blogUx from './images/blog-ux.jpg';


type Page = 'home' | 'services' | 'blog' | 'contact';
type Language = 'ar' | 'en';

// Icons Components
const WebIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
);

const DesignIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
    <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
    <path d="M2 2l7.586 7.586"></path>
    <circle cx="11" cy="11" r="2"></circle>
  </svg>
);

const MobileIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
    <line x1="12" y1="18" x2="12.01" y2="18"></line>
  </svg>
);

const AIIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M12 2a10 10 0 1 0 10 10H12V2z"></path>
    <path d="M12 12L2.21 12"></path>
    <path d="M12 12l5.44-5.44"></path>
    <path d="M12 12l5.44 5.44"></path>
    <path d="M12 12l-5.44 5.44"></path>
    <path d="M12 12l-5.44-5.44"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const SecurityIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);

const CartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <circle cx="9" cy="21" r="1"></circle>
    <circle cx="20" cy="21" r="1"></circle>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
  </svg>
);

const LogoIcon = () => (
  <div className="relative w-12 h-12 flex items-center justify-center group">
    <div className="absolute inset-0 bg-violet-600 rounded-2xl rotate-3 group-hover:rotate-6 transition-transform duration-300"></div>
    <div className="absolute inset-0 bg-white border-2 border-slate-900 rounded-2xl -rotate-3 group-hover:rotate-0 transition-transform duration-300 flex items-center justify-center overflow-hidden">
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-slate-900 font-black">
        <path d="M10 30V10L30 30V10" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="34" cy="34" r="4" fill="#7c3aed" className="animate-pulse" />
      </svg>
    </div>
  </div>
);

const translations = {
  ar: {
    nav: { home: 'الرئيسية', services: 'خدماتنا', blog: 'المدونة', contact: 'اتصل بنا', start: 'ابدأ مشروعك' },
    hero: {
      badge: 'نقطة التحول في مسارك الرقمي',
      title1: '',
      title2: 'نحن نصنع مستقبلاً رقمياً.',
      desc: 'نقطة كود (NOKTA CODES) شركة برمجية متخصصة في ابتكار الحلول البرمجية. نحن شريكك التقني في بناء حلول رقمية فعالة تحدث أثرا حقيقيا',
      cta1: 'اطلب استشارة مجانية',
      cta2: ''
    },
    tech: { title: 'نحن نستخدم', span: 'أحدث التقنيات' },
    vision: {
      badge: 'منهجية النقطة',
      title1: 'الدقة هي لغتنا',
      title2: 'والإبداع هو هدفنا',
      desc: 'في نقطة كود، لا نكتب مجرد أسطر برمجية. نحن نهندس تجارب متكاملة تبدأ من أصغر التفاصيل لتصل إلى أضخم النتائج.',
      items: ['تحليل دقيق للاحتياجات', 'واجهات مصمّمة لراحة المستخدم وسهولة الاستخدام', 'أكواد برمجية خالية من العيوب'],
      cta: 'تعرف على خدماتنا',
      statLabel: 'ثقة العملاء',
      statValue: 'أكثر من 50 مشروعاً ناجحاً'
    },
    services: {
      title1: 'ماذا',
      title2: 'نقدم؟',
      desc: 'خدمات برمجية وتصميمية متكاملة تضع مشروعك في مقدمة المنافسين.',
      items: [
        { t: 'تطوير الويب', d: 'نبني منصات رقمية فائقة السرعة، آمنة، وقابلة للتوسع لتواكب نمو أعمالك المستقبلي.' },
        { t: 'تجربة المستخدم (UX/UI)', d: 'نصمم واجهات لا تُنسى تجمع بين الجمالية والوظيفة لضمان أفضل تفاعل مع عملائك.' },
        { t: 'تطبيقات الجوال', d: 'نحول فكرتك إلى تطبيق جوال احترافي يعمل بكفاءة على أنظمة iOS و Android.' },
        { t: 'انظمة ادارة العملاء CRM والمبيعات', d: 'نظم متطورة لإدارة علاقات عملائك ومتابعة المبيعات لزيادة الإغلاقات ورفع نسبة الرضا.' },
        { t: 'انظمة ادارة الموارد ERP', d: 'نربط كافة أقسام مؤسستك في نظام موحد يمنحك رؤية شاملة وتحكماً كاملاً في الموارد.' },
        { t: 'منصات التجارة الرقمية', d: 'حلول متاجر إلكترونية متكاملة تمنحك تجربة بيع سلسة وتزيد من عوائدك.' }
      ]
    },

    blog: {
      title1: 'المدونة',
      title2: 'الرقمية',
      desc: 'مقالات تقنية تساعدك على فهم أحدث صيحات التكنولوجيا ومستقبل الأعمال.',
      readMore: 'تابع القراءة',
      posts: [
        {
          t: 'أهمية الموقع الإلكتروني لمشروعك',
          d: 'في عصر الرقمنة، موقعك هو واجهتك الأولى. اكتشف كيف يزيد من مصداقيتك ويضاعف مبيعاتك.',
          date: '25 فبراير 2025',
          img: blogCode,
          content: [
            'في ظل التطور التكنولوجي المتسارع، لم يعد الموقع الإلكتروني مجرد صفحة تعريفية، بل أصبح عصب الأعمال التجارية الحديثة. هو موظفك الذي لا ينام، وواجهتك التي يراها العالم بأسره.',
            'أولاً: المصداقية والاحترافية. تشير الدراسات إلى أن 75% من المستخدمين يحكمون على مصداقية الشركة من خلال تصميم موقعها الإلكتروني. الموقع المصمم بعناية يعكس اهتمامك بالتفاصيل واحترامك لعملائك.',
            'ثانياً: الوصول العالمي. بينما يقتصر متجرك التقليدي على موقع جغرافي محدد، يفتح الموقع الإلكتروني أبوابك للعالم أجمع. يمكنك الوصول لعملاء في قارات أخرى وأنت في مكانك.',
            'ثالثاً: التحليل والبيانات. توفر المواقع الإلكترونية أدوات تحليل دقيقة تمكنك من فهم سلوك عملائك، ماذا يحبون، وكيف يتفاعلون مع منتجاتك، مما يساعدك على اتخاذ قرارات تسويقية صائبة.',
            'ختاماً، الاستثمار في موقع إلكتروني احترافي ليس تكلفة، بل هو استثمار بعيد المدى يضمن لك البقاء في سباق المنافسة.'
          ]
        },
        {
          t: 'مستقبل الويب والذكاء الاصطناعي',
          d: 'كيف ستغير تقنيات الـ AI والـ Web3 طريقة تفاعلنا مع الإنترنت وبناء التطبيقات.',
          date: '20 فبراير 2025',
          img: blogAi,
          content: [
            'نحن نعيش اليوم بداية ثورة الويب الثالث (Web3) والذكاء الاصطناعي التولديري (Generative AI). هذا الثنائي سيغير وجه الإنترنت كما نعرفه.',
            'الذكاء الاصطناعي لم يعد مجرد أداة مساعدة، بل أصبح شريكاً في التصميم والتطوير. أدوات مثل GitHub Copilot و ChatGPT تساعد المبرمجين على كتابة أكواد أسرع وأكثر دقة، مما يفسح المجال للتركيز على الإبداع وحل المشكلات المعقدة.',
            'من ناحية أخرى، تمنحنا تقنيات الويب الدلالي (Semantic Web) فهماً أعمق للمحتوى. محركات البحث لن تبحث فقط عن الكلمات المفتاحية، بل ستفهم "المعنى" و "السياق" وراء كل عملية بحث.',
            'التخصيص الفائق (Hyper-personalization) هو العنوان القادم. المواقع ستتكيف تلقائياً مع تفضيلات كل مستخدم، لتقدم تجربة فريدة تماماً لكل زائر.',
            'الاستعداد لهذا المستقبل يتطلب مرونة في التعلم وتبنياً سريعاً للأدوات الجديدة. المستقبل يبنى اليوم.'
          ]
        },
        {
          t: 'تجربة المستخدم (UX) كمعيار للنجاح',
          d: 'لماذا يعتبر التصميم الذي يركز على الإنسان هو العامل الأهم في نجاح المنتجات الرقمية.',
          date: '15 فبراير 2025',
          img: blogUx,
          content: [
            'جمال التصميم وحده لا يكفي. إذا لم يكن المنتج سهلاً للاستخدام، فلن ينجح. هنا يأتي دور تجربة المستخدم (UX) لتكون هي الفيصل.',
            'تجربة المستخدم ليست مجرد ألوان وأزرار، بل هي رحلة العميل كاملة داخل منتجك الرقمي. من لحظة الدخول وحتى إتمام الشراء أو الخدمة.',
            'البساطة هي سر التعقيد. التحدي الأكبر لأي مصمم هو تحويل العمليات المعقدة إلى خطوات بسيطة وبديهية لا تتطلب تفكيراً من المستخدم.',
            'التعاطف (Empathy) هو قلب الـ UX. يجب أن تفهم مشاعر المستخدم، إحباطاته، واحتياجاته لتصمم حلاً يلامس واقعه ويحل مشكلته فعلياً.',
            'الشركات التي تضع تجربة المستخدم في أولوياتها (مثل Apple و Google) هي التي تتصدر المشهد اليوم. اجعل المستخدم بطلك، وسيجعل منتجك ناجحاً.'
          ]
        }
      ]
    },
    contact: {
      badge: 'تواصل مع الخبراء',
      title1: 'لنضع النقطة',
      title2: 'على الحروف معاً',
      desc: 'فريقنا جاهز لتحويل فكرتك إلى واقع ملموس. لا تتردد في البدء الآن.',
      email: 'البريد الرسمي',
      location: 'مقرنا',
      locValue: ['دمشق – سوريا', 'اسطنبول – تركيا'],
      namePlac: 'اسمك الكريم',
      emailPlac: 'بريدك الإلكتروني',
      phonePlac: 'رقم الهاتف (اختياري)',
      msgPlac: 'ما هي فكرتك القادمة؟',
      send: 'إرسال الرسالة الآن',
      options: ['تطوير ويب', 'تطبيق جوال', 'هوية بصرية', 'ذكاء اصطناعي'],
      whatsapp: 'تواصل عبر واتساب'
    },
    footer: {
      desc: 'NOKTA CODES هي الشريك المثالي لكل من يبحث عن التميز الرقمي.',
      quickLinks: 'روابط سريعة',
      contact: 'معلومات التواصل',
      rights: 'جميع الحقوق محفوظة.'
    }
  },
  en: {
    nav: { home: 'Home', services: 'Services', blog: 'Insights', contact: 'Contact', start: 'Start Project' },
    hero: {
      badge: 'The Turning Point of Your Digital Journey',
      title1: 'Every code starts with a',
      title2: 'Smart Dot.',
      desc: 'NOKTA CODES is a boutique agency specializing in crafting premium software solutions.',
      cta1: 'Get a Quote',
      cta2: 'View Results'
    },
    tech: { title: 'Our', span: 'Tech Stack' },
    vision: {
      badge: 'The Nokta Methodology',
      title1: 'Precision is our language',
      title2: 'Creativity is our goal',
      desc: 'At NOKTA CODES, we engineer seamless experiences starting from the smallest detail to the biggest impact.',
      items: ['Precise Needs Analysis', 'Next-Gen User Interfaces', 'Flawless Clean Code'],
      cta: 'Learn our philosophy',
      statLabel: 'Client Trust',
      statValue: '50+ Successful Projects'
    },
    services: {
      title1: 'Our',
      title2: 'Services',
      desc: 'Integrated software and design solutions that put your project ahead of the competition.',
      items: [
        { t: 'Premium Web Dev', d: 'Building industry-leading websites with high speed and full responsiveness.' },
        { t: 'NOKTA UX Design', d: 'UI/UX design focused on simplicity, beauty, and effectiveness.' },
        { t: 'Mobile Applications', d: 'Android and iOS apps with performance beyond expectations.' },
        { t: 'CRM & Sales Solutions', d: 'Advanced systems to manage customer relationships and boost sales performance.' },
        { t: 'ERP Systems', d: 'Unifying your business processes into one secure system for total control.' },
        { t: 'E-Commerce Systems', d: 'Smart selling platforms built for rapid growth and scaling.' }
      ]
    },

    blog: {
      title1: 'Digital',
      title2: 'Thoughts',
      desc: 'Technical articles helping you understand the latest tech trends.',
      readMore: 'Read More',
      posts: [
        { t: 'Why Precision Matters?', d: 'How small details impact large-scale project success.', date: 'Feb 20, 2025', img: blogCode },
        { t: 'Future of Design 2025', d: 'The shift towards absolute simplicity and interactive AI.', date: 'Feb 12, 2025', img: blogAi },
        { t: 'Speed is King', d: 'The importance of performance optimization in modern web apps.', date: 'Feb 05, 2025', img: blogUx }
      ]
    },
    contact: {
      badge: 'Talk to Experts',
      title1: 'Let’s Connect',
      title2: 'The Dots Together',
      desc: 'Our team is ready to turn your idea into reality.',
      email: 'Official Email',
      location: 'Our Hub',
      locValue: ['Damascus - Syria', 'Istanbul - Turkey'],
      namePlac: 'Your Name',
      emailPlac: 'Your Email',
      phonePlac: 'Phone Number (Optional)',
      msgPlac: 'What is your next big idea?',
      send: 'Send Message Now',
      options: ['Web Development', 'Mobile App', 'Branding', 'AI Solutions'],
      whatsapp: 'Chat via WhatsApp'
    },
    footer: {
      desc: 'NOKTA CODES is the perfect partner for digital excellence.',
      quickLinks: 'Quick Links',
      contact: 'Contact Info',
      rights: 'All rights reserved.'
    }
  }
};

const Header: React.FC<{ activePage: Page, setActivePage: (p: Page) => void, lang: Language, setLang: (l: Language) => void }> = ({ activePage, setActivePage, lang, setLang }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = translations[lang].nav;

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const handlePageChange = (page: Page) => {
    setActivePage(page);
    setIsMenuOpen(false);
  };

  const menuItems = [
    { id: 'home', label: t.home },
    { id: 'services', label: t.services },

    { id: 'blog', label: t.blog },
    { id: 'contact', label: t.contact }
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[100] glass-effect border-b border-slate-100 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => handlePageChange('home')}>
            <LogoIcon />
            <div className="flex flex-col">
              <span className="text-xl font-black text-slate-900 leading-none">NOKTA</span>
              <span className="text-xs font-bold text-violet-600 tracking-[0.2em]">CODES</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-10 font-bold text-sm">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handlePageChange(item.id as Page)}
                className={`transition-all relative py-1 uppercase tracking-wider ${activePage === item.id ? 'text-violet-600' : 'hover:text-violet-600 text-slate-500'}`}
              >
                {item.label}
                {activePage === item.id && <span className="absolute -bottom-1 left-0 right-0 h-1 bg-violet-600 rounded-full"></span>}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <button onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')} className="px-4 py-2 rounded-xl bg-slate-50 text-slate-700 hover:bg-slate-100 transition-all font-bold text-xs">
              {lang === 'ar' ? 'English' : 'العربية'}
            </button>
            <button onClick={() => handlePageChange('contact')} className="hidden sm:block bg-slate-900 hover:bg-violet-700 px-7 py-3 rounded-2xl font-black text-sm text-white transition-all shadow-xl shadow-slate-900/10">
              {t.start}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-slate-900 hover:text-violet-600 transition-all z-[120]">
              {isMenuOpen ? <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg> : <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-7 6h7" /></svg>}
            </button>
          </div>
        </div>
      </header>

      <div className={`md:hidden fixed inset-0 z-[110] bg-white transition-all duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <nav className="relative h-full flex flex-col items-center justify-center p-10 gap-10">
          {menuItems.map((item, index) => (
            <button key={item.id} onClick={() => handlePageChange(item.id as Page)} className={`text-5xl sm:text-7xl font-black tracking-tighter transition-all duration-700 transform ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} ${activePage === item.id ? 'text-violet-600' : 'text-slate-200 hover:text-slate-900'}`} style={{ transitionDelay: `${index * 80 + 300}ms` }}>
              {item.label}
            </button>
          ))}
          <button onClick={() => handlePageChange('contact')} className={`mt-20 w-full max-w-sm py-7 bg-slate-900 rounded-[32px] font-black text-2xl text-white shadow-2xl transition-all ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '800ms' }}>
            {t.start}
          </button>
        </nav>
      </div>
    </>
  );
};

const BackgroundEffects = () => (
  <>
    <div className="absolute inset-0 nokta-grid -z-10"></div>
    <div className="orb w-[450px] h-[450px] bg-violet-400 top-[10%] -right-20"></div>
    <div className="orb w-[350px] h-[350px] bg-blue-300 bottom-[10%] -left-20" style={{ animationDelay: '-7s' }}></div>
    <div className="orb w-[200px] h-[200px] bg-indigo-200 top-[40%] left-[20%] opacity-10" style={{ animationDelay: '-12s' }}></div>
  </>
);

const Hero: React.FC<{ onCtaClick: () => void, lang: Language }> = ({ onCtaClick, lang }) => {
  const t = translations[lang].hero;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const visuals = [mainImage, ecommerceImage, mobileAppImage];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % visuals.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [visuals.length]);

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <BackgroundEffects />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <div className={`text-center ${lang === 'en' ? 'lg:text-left' : 'lg:text-right'} order-2 lg:order-1`}>
            <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-violet-50 border border-violet-100 mb-8 mx-auto ${lang === 'en' ? 'lg:mx-0' : 'lg:mx-0'}`}>
              <span className="w-2.5 h-2.5 rounded-full bg-violet-600 animate-pulse"></span>
              <span className="text-sm font-black uppercase tracking-widest text-violet-700">{t.badge}</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-[1.1] tracking-tighter text-slate-900">
              {t.title1} <span className="gradient-text">{t.title2}</span>
            </h1>

            <p className="text-lg md:text-2xl text-slate-500 mb-12 leading-relaxed font-medium max-w-2xl mx-auto lg:mx-0">
              {t.desc}
            </p>

            <div className={`flex flex-col sm:flex-row items-center gap-6 justify-center ${lang === 'en' ? 'lg:justify-start' : 'lg:justify-start'}`}>
              <button onClick={onCtaClick} className="w-full sm:w-auto px-10 py-5 bg-slate-900 hover:bg-violet-700 rounded-2xl font-black text-xl transition-all shadow-xl shadow-slate-900/20 text-white hover:scale-105 active:scale-95">
                {t.cta1}
              </button>
              {t.cta2 && (
                <button className="w-full sm:w-auto px-10 py-5 bg-white border-2 border-slate-100 text-slate-900 hover:border-violet-200 hover:text-violet-700 rounded-2xl font-black text-xl transition-all active:scale-95">
                  {t.cta2}
                </button>
              )}
            </div>
          </div>

          {/* Visuals / Slideshow */}
          <div className="relative order-1 lg:order-2 h-[400px] md:h-[500px] lg:h-[600px] w-full">
            <div className="absolute inset-0 bg-violet-100/50 rounded-[40px] -rotate-6 scale-90 blur-3xl opacity-50 animate-pulse"></div>

            <div className="relative h-full w-full rounded-[40px] overflow-hidden card-shadow border-4 border-white">
              {visuals.map((img, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                >
                  <img src={img} alt={`Slide ${index + 1}`} className="w-full h-full object-contain" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const WhatsAppButton: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = translations[lang].contact;
  return (
    <div className="fixed bottom-8 right-8 z-[90] group flex items-center gap-4">
      <div className={`opacity-0 group-hover:opacity-100 transition-opacity bg-white border border-slate-100 px-5 py-3 rounded-2xl text-sm font-black text-slate-900 shadow-2xl whitespace-nowrap pointer-events-none ${lang === 'ar' ? 'order-2' : 'order-1'}`}>
        {t.whatsapp}
      </div>
      <a href="https://wa.me/963992073150" target="_blank" rel="noopener noreferrer" className={`w-16 h-16 bg-[#25D366] rounded-[24px] flex items-center justify-center shadow-2xl shadow-[#25D366]/30 hover:scale-110 transition-all ${lang === 'ar' ? 'order-1' : 'order-2'}`}>
        <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.634 1.437h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
      </a>
    </div>
  );
};

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon }) => (
  <div className="bg-white p-10 rounded-[40px] border border-slate-100 card-shadow transition-all group text-start h-full">
    <div className="w-16 h-16 bg-violet-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-violet-600 group-hover:text-white text-violet-600 transition-all duration-500">{icon}</div>
    <h3 className="text-2xl font-black mb-5 text-slate-900">{title}</h3>
    <p className="text-slate-500 leading-relaxed font-medium">{description}</p>
  </div>
);



const ArticleView: React.FC<{ article: BlogPost; onBack: () => void; lang: Language }> = ({ article, onBack, lang }) => (
  <div className="max-w-4xl mx-auto pt-40 pb-20 px-6 animate-in fade-in slide-in-from-bottom-10 duration-700">
    <button onClick={onBack} className={`mb-12 flex items-center gap-3 text-slate-500 hover:text-violet-600 transition-colors font-bold ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
      <svg className={`w-6 h-6 ${lang === 'ar' ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
      {lang === 'ar' ? 'العودة للمقالات' : 'Back to Articles'}
    </button>
    <div className="rounded-[40px] overflow-hidden mb-12 h-[400px] w-full relative card-shadow">
      <img src={article.img} className="w-full h-full object-cover" alt={article.t} />
      <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-5 py-2 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-900 shadow-xl">{article.date}</div>
    </div>
    <h1 className="text-4xl md:text-5xl font-black mb-10 text-slate-900 leading-tight">{article.t}</h1>
    <div className="prose prose-lg prose-slate max-w-none">
      {article.content?.map((paragraph, idx) => (
        <p key={idx} className="text-xl text-slate-600 leading-loose mb-6 font-medium">{paragraph}</p>
      ))}
    </div>
  </div>
);

const Footer: React.FC<{ setActivePage: (p: Page) => void, lang: Language }> = ({ setActivePage, lang }) => {
  const t = translations[lang].footer;
  const nt = translations[lang].nav;
  return (
    <footer className="pt-32 pb-16 px-6 border-t border-slate-800 bg-slate-900 text-start">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-20 mb-20">
          <div className="col-span-2">
            <div className="flex items-center gap-4 mb-8 group cursor-pointer" onClick={() => setActivePage('home')}>
              <LogoIcon />
              <div className="flex flex-col"><span className="text-3xl font-black text-white leading-none tracking-tighter">NOKTA CODES</span><span className="text-xs font-bold text-violet-400 tracking-[0.3em]">DIGITAL STUDIO</span></div>
            </div>
            <p className="text-slate-400 text-xl mb-12 max-w-md font-medium">{t.desc}</p>
            <div className="flex gap-6">
              <a href="https://www.instagram.com/noktacodes?igsh=MXBna3B4eDk4MGhseA==" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors font-black uppercase tracking-widest text-xs">Instagram</a>
              <a href="https://www.facebook.com/share/18D8vauvqS/" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors font-black uppercase tracking-widest text-xs">Facebook</a>
            </div>
          </div>
          <div>
            <h4 className="font-black text-white text-lg mb-8 uppercase tracking-widest">{t.quickLinks}</h4>
            <ul className="space-y-5 text-slate-400 font-bold text-sm">
              <li><button onClick={() => setActivePage('home')} className="hover:text-white transition-colors">{nt.home}</button></li>

              <li><button onClick={() => setActivePage('services')} className="hover:text-white transition-colors">{nt.services}</button></li>
              <li><button onClick={() => setActivePage('blog')} className="hover:text-white transition-colors">{nt.blog}</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black text-white text-lg mb-8 uppercase tracking-widest">{t.contact}</h4>
            <p className="text-slate-400 mb-3 text-sm font-bold">+963 992 073 150</p>
            <p className="text-slate-400 mb-3 text-sm font-bold">info@noktacodes.com</p>
            <div className="mt-6">
              {(translations[lang].contact.locValue as string[]).map((loc, i) => (
                <p key={i} className="text-violet-400 text-sm font-black">{loc}</p>
              ))}
            </div>
          </div>
        </div>
        <div className="text-center text-slate-500 text-xs font-bold border-t border-slate-800 pt-12">&copy; {new Date().getFullYear()} NOKTA CODES STUDIO. {t.rights}</div>
      </div>
    </footer>
  );
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);
  const [lang, setLang] = useState<Language>('ar');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentPage, activeArticle]);

  useEffect(() => { document.documentElement.lang = lang; document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'; }, [lang]);

  const form = useRef<HTMLFormElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    setIsSending(true);

    // TODO: Replace 'YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', 'YOUR_PUBLIC_KEY' with your actual EmailJS credentials
    // Get them from https://dashboard.emailjs.com/
    emailjs.sendForm('service_zl3w46o', 'template_3eqdlqr', form.current, 'SOE3B2haYOE8eaCIc')
      .then((result) => {
        setIsSent(true);
        setIsSending(false);
        form.current?.reset();
        setTimeout(() => setIsSent(false), 5000);
      }, (error) => {
        console.error(error.text);
        setIsSending(false);
        alert(lang === 'ar' ? 'فشل الإرسال. يرجى المحاولة مرة أخرى.' : 'Failed to send. Please try again.');
      });
  };
  const renderPage = () => {
    const t = translations[lang];
    const serviceIcons = [<WebIcon />, <DesignIcon />, <MobileIcon />, <AIIcon />, <SecurityIcon />, <CartIcon />];
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero onCtaClick={() => setCurrentPage('contact')} lang={lang} />
            <section className="py-24 bg-slate-50/50 border-y border-slate-100 relative overflow-hidden">
              <div className="absolute inset-0 nokta-grid opacity-20 -z-10"></div>
              <div className="max-w-7xl mx-auto px-6 text-center">
                <h2 className="text-4xl md:text-5xl font-black mb-16 text-slate-900">{t.tech.title} <span className="text-violet-600">{t.tech.span}</span></h2>
                <div className="flex flex-wrap justify-center gap-16 md:gap-24 opacity-30 hover:opacity-100 transition-opacity duration-700">
                  {['React', 'Gemini AI', 'Next.js', 'PostgreSQL', 'TypeScript', 'Node.js'].map(tech => <span key={tech} className="text-2xl md:text-4xl font-black text-slate-900 tracking-tighter">{tech}</span>)}
                </div>
              </div>
            </section>
            <section className="py-40 relative">
              <div className={`max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-32 ${lang === 'en' ? 'text-left' : 'text-right'}`}>
                <div className="flex-1">
                  <span className="text-violet-600 font-black text-lg mb-6 block uppercase tracking-widest">{t.vision.badge}</span>
                  <h2 className="text-5xl md:text-7xl lg:text-8xl font-black mb-12 leading-tight text-slate-900">{t.vision.title1} <br /> <span className="text-violet-600">{t.vision.title2}</span></h2>
                  <p className="text-xl md:text-2xl text-slate-500 leading-relaxed mb-16 font-medium">{t.vision.desc}</p>
                  <ul className="space-y-8 mb-20">
                    {t.vision.items.map((item, i) => <li key={i} className={`flex items-center gap-6 text-2xl font-black text-slate-900 ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse justify-end'}`}>{item}<div className="w-10 h-10 rounded-2xl bg-violet-600 flex items-center justify-center text-white shrink-0 shadow-xl shadow-violet-600/20"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg></div></li>)}
                  </ul>
                  <button onClick={() => setCurrentPage('services')} className={`text-slate-900 font-black text-2xl flex items-center gap-4 group ${lang === 'en' ? 'flex-row' : 'flex-row-reverse'}`}>{t.vision.cta}<svg className={`w-10 h-10 p-2 rounded-full border-2 border-slate-900 transition-all duration-300 group-hover:bg-slate-900 group-hover:text-white ${lang === 'ar' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg></button>
                </div>
              </div>
            </section>
          </>
        );
      case 'services':
        return (
          <section className="relative pt-60 pb-32 px-6 overflow-hidden">
            <BackgroundEffects />
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-32"><h2 className="text-6xl md:text-8xl font-black mb-8 text-slate-900">{t.services.title1} <span className="text-violet-600">{t.services.title2}</span></h2><p className="text-slate-500 max-w-3xl mx-auto text-xl font-medium">{t.services.desc}</p></div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">{t.services.items.map((s, idx) => <ServiceCard key={idx} title={s.t} description={s.d} icon={serviceIcons[idx]} />)}</div>
            </div>
          </section>
        );

      case 'blog':
        return (
          <section className="relative pt-60 pb-32 px-6 overflow-hidden">
            <BackgroundEffects />
            {activeArticle ? (
              <ArticleView article={activeArticle} onBack={() => setActiveArticle(null)} lang={lang} />
            ) : (
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-32"><h2 className="text-6xl md:text-8xl font-black mb-8 text-slate-900">{t.blog.title1} <span className="text-violet-600">{t.blog.title2}</span></h2><p className="text-slate-500 max-w-3xl mx-auto text-xl font-medium">{t.blog.desc}</p></div>
                <div className="grid md:grid-cols-3 gap-16">{t.blog.posts.map((post: any, idx: number) => <div key={idx} className="bg-white rounded-[40px] overflow-hidden border border-slate-100 card-shadow group text-start"><div className="h-64 w-full overflow-hidden relative"><img src={post.img} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" alt={post.t} /><div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-900">{post.date}</div></div><div className="p-10"><h3 className="text-2xl font-black mb-5 text-slate-900 group-hover:text-violet-600 transition-colors">{post.t}</h3><p className="text-slate-500 text-sm mb-10 leading-relaxed font-medium">{post.d}</p><button onClick={() => setActiveArticle(post)} className={`text-slate-900 font-black text-sm flex items-center gap-3 ${lang === 'en' ? 'flex-row' : 'flex-row-reverse'}`}>{t.blog.readMore}<svg className={`w-5 h-5 ${lang === 'ar' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg></button></div></div>)}</div>
              </div>
            )}
          </section>
        );
      case 'contact':
        return (
          <section className="relative pt-60 pb-32 px-6 overflow-hidden">
            <BackgroundEffects />
            <div className={`max-w-7xl mx-auto grid lg:grid-cols-2 gap-32 ${lang === 'en' ? 'text-left' : 'text-right'}`}>
              <div>
                <span className="text-violet-600 font-black text-lg mb-6 block uppercase tracking-widest">{t.contact.badge}</span><h2 className="text-6xl md:text-[100px] font-black mb-10 leading-[0.85] tracking-tighter text-slate-900">{t.contact.title1} <br /><span className="text-violet-600">{t.contact.title2}</span></h2><p className="text-slate-500 text-2xl mb-20 leading-tight font-medium">{t.contact.desc}</p>
                <div className="space-y-12">
                  <div className={`flex items-center gap-6 ${lang === 'en' ? 'flex-row' : 'flex-row-reverse'}`}><div className="w-16 h-16 bg-slate-900 rounded-[24px] flex items-center justify-center text-white font-black text-2xl shadow-2xl">@</div><div><p className="text-xs text-slate-400 font-black uppercase tracking-widest mb-1">{t.contact.email}</p><p className="text-slate-900 font-black text-xl">info@noktacodes.com</p></div></div>
                  <div className={`flex items-start gap-6 ${lang === 'en' ? 'flex-row' : 'flex-row-reverse'}`}><div className="w-16 h-16 bg-violet-600 rounded-[24px] flex items-center justify-center text-white shadow-2xl shrink-0"><svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg></div><div><p className="text-xs text-slate-400 font-black uppercase tracking-widest mb-1">{t.contact.location}</p>{(t.contact.locValue as string[]).map((loc, i) => <p key={i} className="text-slate-900 font-black text-xl">{loc}</p>)}</div></div>
                </div>
              </div>
              <div className="bg-white p-12 rounded-[56px] card-shadow border border-slate-50">
                <form ref={form} onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3"><label className="text-xs font-black uppercase tracking-widest text-slate-400 px-4">{t.contact.namePlac}</label><input name="user_name" id="name" required className="w-full bg-slate-50 border-2 border-slate-50 rounded-[24px] p-6 focus:border-violet-600 outline-none transition-all text-slate-900 font-bold" /></div>
                    <div className="space-y-3"><label className="text-xs font-black uppercase tracking-widest text-slate-400 px-4">{t.contact.emailPlac}</label><input name="user_email" id="email" type="email" required className="w-full bg-slate-50 border-2 border-slate-50 rounded-[24px] p-6 focus:border-violet-600 outline-none transition-all text-slate-900 font-bold" /></div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3"><label className="text-xs font-black uppercase tracking-widest text-slate-400 px-4">{t.contact.phonePlac}</label><input name="user_phone" id="phone" type="tel" className="w-full bg-slate-50 border-2 border-slate-50 rounded-[24px] p-6 focus:border-violet-600 outline-none transition-all text-slate-900 font-bold" /></div>
                    <div className="space-y-3"><label className="text-xs font-black uppercase tracking-widest text-slate-400 px-4">Project Type</label><select name="service" id="service" className="w-full bg-slate-50 border-2 border-slate-50 rounded-[24px] p-6 focus:border-violet-600 outline-none appearance-none text-slate-900 font-bold">{t.contact.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}</select></div>
                  </div>
                  <div className="space-y-3"><label className="text-xs font-black uppercase tracking-widest text-slate-400 px-4">Brief</label><textarea name="message" id="message" required className="w-full bg-slate-50 border-2 border-slate-50 rounded-[24px] p-6 h-48 focus:border-violet-600 outline-none transition-all text-slate-900 font-bold resize-none" placeholder={t.contact.msgPlac}></textarea></div>
                  <button type="submit" disabled={isSending} className="w-full bg-slate-900 py-7 rounded-[28px] font-black text-2xl text-white hover:bg-violet-700 transition-all shadow-2xl shadow-slate-900/20 disabled:opacity-70 disabled:cursor-not-allowed">
                    {isSending ? (lang === 'ar' ? 'جاري الإرسال...' : 'Sending...') : isSent ? (lang === 'ar' ? 'تم الإرسال بنجاح!' : 'Message Sent!') : t.contact.send}
                  </button>
                </form>
              </div>
            </div>
          </section>
        );
      default: return null;
    }
  };

  return (
    <div className="min-h-screen selection:bg-violet-600 selection:text-white overflow-x-hidden text-slate-900">
      <Header activePage={currentPage} setActivePage={setCurrentPage} lang={lang} setLang={setLang} />
      <main className="transition-all duration-700">{renderPage()}</main>
      <Footer setActivePage={setCurrentPage} lang={lang} />
      <WhatsAppButton lang={lang} />

    </div>
  );
}
