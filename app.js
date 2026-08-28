// Phone number for WhatsApp redirects (country code format without +)
const WHATSAPP_PHONE = "8801700000000";

// Language Translation Dictionaries
const translations = {
  en: {
    // Navigation
    "nav-about": "About",
    "nav-services": "Services",
    "nav-packages": "Packages",
    "nav-portfolio": "Works",
    "nav-why": "Why Us",
    "nav-blogs": "Blogs",
    "blog-back": "Back to Blogs",
    "nav-faq": "FAQs",
    "nav-contact": "Contact",
    "nav-cta": "Make An Enquiry",

    // Hero
    "hero-badge": "Growth & ROI Engineered",
    "hero-title-1": "Scale Your Business with",
    "hero-title-2": "Next-Gen Digital Marketing",
    "hero-description": "Omnix Network helps modern businesses grow their digital presence, dominate organic search, run high-yield advertising campaigns, and convert audiences into loyal clients.",
    "hero-badge-1": "Growth & ROI Engineered",
    "hero-title-1-s1": "Scale Your Business with",
    "hero-title-2-s1": "Next-Gen Digital Marketing",
    "hero-description-s1": "Omnix Network helps modern businesses grow their digital presence, dominate organic search, run high-yield advertising campaigns, and convert audiences into loyal clients.",
    "hero-badge-2": "Dominate Search Rankings",
    "hero-title-1-s2": "Rank #1 on Google &",
    "hero-title-2-s2": "Drive Organic Traffic",
    "hero-description-s2": "Target the right keywords, optimize site speed, build high-authority links, and capture high-intent customers actively searching for your business.",
    "hero-badge-3": "Social Media Supremacy",
    "hero-title-1-s3": "Engage Audiences &",
    "hero-title-2-s3": "Boost Brand Authority",
    "hero-description-s3": "Establish a dominant brand presence on Facebook, Instagram, LinkedIn, and TikTok with high-yielding social campaigns and viral content strategies.",
    "hero-badge-4": "Premium Tech Engineering",
    "hero-title-1-s4": "Build High-Performance",
    "hero-title-2-s4": "Web & Mobile Applications",
    "hero-description-s4": "Design responsive, highly secure, and blazing-fast applications optimized for conversion, speed, and standard SEO principles.",
    "hero-btn-primary": "Make an enquiry",
    "hero-btn-secondary": "Learn More",
    "hero-trust": "Trusted by high-performing local & international businesses",
    "hero-stats-1-lbl": "Campaign ROI",
    "hero-stats-2-lbl": "Active Reach",
    "hero-visual-live": "Live Analytics",
    "hero-visual-status": "Consultant online now",
    "hero-visual-chat": "Chat",
    "hero-bar-seo": "Search Visibility",
    "hero-bar-ads": "Social Media Ads CTR",
    "hero-bar-conversion": "Lead Conversion",

    // About Us (Red Sparrow style)
    "about-title-main": "What we do.",
    "about-desc-1": "Omnix Network, a premier digital marketing agency in Dhaka, Bangladesh, offers comprehensive and top-notch 360° digital marketing services, including web design and development, professional search engine optimization (SEO), social media marketing (SMM), content development, Facebook and Google advertising, motion graphics and audiovisuals, lead generation, media buying, back-office support, and more.",
    "about-desc-2": "As one of the best SEO agencies in Bangladesh, Omnix Network is dedicated to enhancing the website's online presence, which drives results. Omnix Network stands as a full-service digital marketing company in Bangladesh by ensuring all kinds of digital marketing solutions for small, medium, and large businesses and is committed to empowering businesses and individuals to achieve their full potential by crafting customized digital strategies with creative solutions that align perfectly with their specific needs, with a focus on driving success through data-driven strategies.",
    "about-desc-3": "Since our establishment, Omnix Network has been at the forefront of design and technology. We continuously push the boundaries of creativity to deliver amazing client results. Our holistic approach takes you on a complete journey, guiding you through implementing and tracking your comprehensive marketing strategy. We tailor our services to your unique business needs, ensuring your online presence flourishes and generates more traffic.",
    "about-cta-btn": "Connect With Experts",
    "about-ph-title": "Philosophy",
    "about-ph-sub": "Trust pays off",
    "about-ph-desc": "We believe in fostering solid partnerships. Every campaign structure is fully transparent with live dashboards.",
    "about-team-title": "Teamwork",
    "about-team-sub": "Committed and creative",
    "about-team-desc": "Specialized designers, developers, copywriters, and media buyers collaborating daily to engineer conversions.",

    // Services
    "services-badge": "Agency Services",
    "services-title": "Services We Provide",
    "services-description": "We construct result-oriented campaigns designed to elevate your company's visibility, engagement, and conversion funnel.",

    // Why Choose Us
    "why-badge": "Core Advantages",
    "why-title": "Why Choose Omnix?",
    "why-description": "We operate as a growth partnership rather than a third-party vendor. Everything we build and launch matches your specific business bottom-line goals.",
    "why-trust-lbl": "Our Commitment",
    "why-trust-val": "100% Transparency & Weekly Reports",
    "why-card1-title": "ROI Driven Strategies",
    "why-card1-desc": "We set exact, trackable goals for each campaign. If it does not drive a positive return, we adjust or pause instantly.",
    "why-card2-title": "Interactive Performance Dashboards",
    "why-card2-desc": "Clients get access to live campaign portals to view ad spent metrics, lead quality, and reach performance in real time.",
    "why-card3-title": "Specialist Account Managers",
    "why-card3-desc": "No middle-men. You talk directly with seasoned marketing experts and creative directors who run your campaigns daily.",
    "why-card4-title": "Omni-Channel Lead Routing",
    "why-card4-desc": "We connect site leads directly into your WhatsApp and messaging setups, making closing sales automated and instant.",

    // Portfolio
    "portfolio-badge": "Client Success Studies",
    "portfolio-title": "Recent Campaigns & Works",
    "portfolio-metric-lbl": "Result Metric",
    "portfolio-btn": "Case details",

    // Feedback
    "feedback-badge": "Client Reviews",
    "feedback-title": "What Clients Say.",
    "feedback-description": "Discover what business founders and client directors say about our campaign execution.",
    "feedback-form-title": "Send Client Feedback",
    "feedback-form-name": "Full Name",
    "feedback-form-company": "Company / Role",
    "feedback-form-rating": "Rating Score",
    "feedback-form-msg": "Testimonial Comment",
    "feedback-form-btn": "Send Feedback via WhatsApp",

    // Contact
    "contact-badge": "Let's Talk?",
    "contact-form-title": "Make An Enquiry",

    // Footer
    "footer-desc": "Omnix Network is a premium results-first digital marketing agency. We design customer acquisition funnels, manage social ads, and build lightning-fast web code platforms.",
    "footer-services-title": "Agency Offerings",
    "footer-contact-title": "Multiple Offices",
    "footer-office-1": "Banani Office",
    "footer-office-2": "Sydney Office",
    "footer-status": "Engineered with high performance systems",
    
    // Popup
    "popup-badge": "Quick Consultation",
    "popup-title": "Start Your Project",
    "popup-desc": "Let us know what you need and our campaign planners will respond within 2 hours.",
    "popup-form-name": "Your Name",
    "popup-form-phone": "Phone Number",
    "popup-form-service": "Select Service",
    "popup-form-message": "Brief Details",
    "popup-form-submit": "Submit Inquiry via WhatsApp"
  },
  bn: {
    // Navigation
    "nav-about": "সম্পর্কে",
    "nav-services": "সেবাসমূহ",
    "nav-packages": "প্যাকেজসমূহ",
    "nav-portfolio": "প্রজেক্টসমূহ",
    "nav-why": "কেন আমরা",
    "nav-blogs": "ব্লগ",
    "blog-back": "ব্লগে ফিরে যান",
    "nav-faq": "জিজ্ঞাসা",
    "nav-contact": "যোগাযোগ",
    "nav-cta": "অনুসন্ধান করুন",

    // Hero
    "hero-badge": "গ্রোথ এবং আরওআই গ্যারান্টিযুক্ত",
    "hero-title-1": "আপনার ব্যবসাকে বৃদ্ধি করুন",
    "hero-title-2": "আধুনিক ডিজিটাল মার্কেটিং দ্বারা",
    "hero-description": "ওমনিক্স নেটওয়ার্ক আধুনিক ব্যবসাগুলোকে তাদের ডিজিটাল উপস্থিতি বাড়াতে, অর্গানিক সার্চে আধিপত্য বিস্তার করতে, লাভজনক বিজ্ঞাপন চালাতে এবং শ্রোতাদের অনুগত গ্রাহকে রূপান্তর করতে সহায়তা করে।",
    "hero-badge-1": "গ্রোথ এবং আরওআই গ্যারান্টিযুক্ত",
    "hero-title-1-s1": "আপনার ব্যবসাকে বৃদ্ধি করুন",
    "hero-title-2-s1": "আধুনিক ডিজিটাল মার্কেটিং দ্বারা",
    "hero-description-s1": "ওমনিক্স নেটওয়ার্ক আধুনিক ব্যবসাগুলোকে তাদের ডিজিটাল উপস্থিতি বাড়াতে, অর্গানিক সার্চে আধিপত্য বিস্তার করতে, লাভজনক বিজ্ঞাপন চালাতে এবং শ্রোতাদের অনুগত গ্রাহকে রূপান্তর করতে সহায়তা করে।",
    "hero-badge-2": "সার্চ ইঞ্জিনে শীর্ষস্থান অর্জন করুন",
    "hero-title-1-s2": "গুগলে ১ নম্বর র‍্যাঙ্ক করুন এবং",
    "hero-title-2-s2": "অর্গানিক ট্রাফিক বৃদ্ধি করুন",
    "hero-description-s2": "সরের সঠিক কিওয়ার্ড টার্গেট করুন, আপনার সাইটের আর্কিটেকচার অপ্টিমাইজ করুন, হাই-কোয়ালিটি ব্যাকলিংক তৈরি করুন এবং আপনার সেবার জন্য অনুসন্ধানকারী সক্রিয় কাস্টমারদের আকর্ষণ করুন।",
    "hero-badge-3": "সোশ্যাল মিডিয়ায় আধিপত্য",
    "hero-title-1-s3": "দর্শকদের আকৃষ্ট করুন এবং",
    "hero-title-2-s3": "ব্র্যান্ডের গ্রহণযোগ্যতা বাড়ান",
    "hero-description-s3": "ভাইরাল কনটেন্ট এবং লাভজনক পেইড বিজ্ঞাপনের সাহায্যে ফেসবুক, ইনস্টাগ্রাম, লিঙ্কডইন এবং টিকটকে শক্তিশালী ও প্রভাবশালী ব্র্যান্ডের উপস্থিতি গড়ে তুলুন।",
    "hero-badge-4": "প্রিমিয়াম ইঞ্জিনিয়ারিং",
    "hero-title-1-s4": "তৈরি করুন হাই-পারফরম্যান্স",
    "hero-title-2-s4": "ওয়েব এবং মোবাইল অ্যাপস",
    "hero-description-s4": "কনভার্সন, ইউজেবিলিটি, স্পিড এবং এসইও স্ট্যান্ডার্ডের সাথে সামঞ্জস্য রেখে আধুনিক, নিরাপদ এবং গতিময় রেসপন্সিভ অ্যাপ্লিকেশন ডিজাইন করুন।",
    "hero-btn-primary": "অনুসন্ধান করুন",
    "hero-btn-secondary": "আরও জানুন",
    "hero-trust": "শীর্ষস্থানীয় দেশীয় এবং আন্তর্জাতিক প্রতিষ্ঠানগুলোর বিশ্বস্ত অংশীদার",
    "hero-stats-1-lbl": "ক্যাম্পেইন আরওআই (ROI)",
    "hero-stats-2-lbl": "সক্রিয় দর্শক সংখ্যা",
    "hero-visual-live": "লাইভ অ্যানালিটিক্স",
    "hero-visual-status": "কনসালটেন্ট অনলাইনে আছেন",
    "hero-visual-chat": "চ্যাট করুন",
    "hero-bar-seo": "সার্চ ভিজিবিলিটি",
    "hero-bar-ads": "সোশ্যাল মিডিয়া অ্যাডস CTR",
    "hero-bar-conversion": "লিড কনভার্সন",

    // About Us
    "about-title-main": "আমাদের কার্যক্রম।",
    "about-desc-1": "ওমনিক্স নেটওয়ার্ক, ঢাকা, বাংলাদেশের একটি প্রিমিয়ার ডিজিটাল মার্কেটিং এজেন্সি, যা ওয়েব ডিজাইন এবং ডেভেলপমেন্ট, প্রফেশনাল সার্চ ইঞ্জিন অপ্টিমাইজেশন (SEO), সোশ্যাল মিডিয়া মার্কেটিং (SMM), কনটেন্ট ডেভেলপমেন্ট, ফেসবুক ও গুগল অ্যাডভার্টাইজিং, মোশন গ্রাফিক্স এবং অডিও ভিজ্যুয়াল সহ সব ধরণের ৩৬০° ডিজিটাল মার্কেটিং সেবা প্রদান করে থাকে।",
    "about-desc-2": "বাংলাদেশের অন্যতম সেরা এসইও এজেন্সি হিসাবে, ওমনিক্স নেটওয়ার্ক অনলাইন উপস্থিতি বাড়ানোর জন্য কাজ করে। আমরা সৃজনশীল সমাধানের সাথে কাস্টমাইজড ডিজিটাল কৌশল তৈরি করে প্রতিটি ব্যবসা এবং ব্যক্তিদের তাদের লক্ষ্যে পৌঁছাতে প্রতিশ্রুতিবদ্ধ।",
    "about-desc-3": "প্রতিষ্ঠার পর থেকে, ওমনিক্স নেটওয়ার্ক ডিজাইন ও প্রযুক্তির অগ্রভাগে রয়েছে। আমরা অসাধারণ ক্লায়েন্ট ফলাফল সরবরাহ করার জন্য ক্রমাগত সৃজনশীলতার সীমানা প্রসারিত করি। আমাদের সামগ্রিক পদ্ধতি আপনাকে একটি সম্পূর্ণ যাত্রায় নিয়ে যায় এবং অনলাইন উপস্থিতি বাড়ায়।",
    "about-cta-btn": "বিশেষজ্ঞদের সাথে যুক্ত হন",
    "about-ph-title": "মূল দর্শন",
    "about-ph-sub": "বিশ্বাসই মূল চাবিকাঠি",
    "about-ph-desc": "আমরা শক্তিশালী অংশীদারিত্ব তৈরিতে বিশ্বাস করি। প্রতিটি ক্যাম্পেইনে আমরা শতভাগ স্বচ্ছতা বজায় রাখি।",
    "about-team-title": "দলগত কাজ",
    "about-team-sub": "প্রতিশ্রুতিবদ্ধ এবং সৃজনশীল",
    "about-team-desc": "আমাদের দক্ষ ডিজাইনার, ডেভেলপার, কপিরাইটার এবং মিডিয়া বায়াররা প্রতিদিন কাজ করেন আপনার রেভিনিউ বাড়াতে।",

    // Services
    "services-badge": "এজেন্সি সেবাসমূহ",
    "services-title": "সেবাসমূহ যা আমরা প্রদান করি",
    "services-description": "আমরা আপনার কোম্পানির দৃশ্যমানতা, ব্যস্ততা এবং রূপান্তর বাড়াতে ফলাফল-ভিত্তিক বিজ্ঞাপন ক্যাম্পেইন পরিচালনা করি।",

    // Why Choose Us
    "why-badge": "আমাদের মূল সুবিধা",
    "why-title": "ওমনিক্স কেন সেরা পছন্দ?",
    "why-description": "আমরা কেবল একটি সার্ভিস প্রোভাইডার হিসেবে নয়, বরং অংশীদার হিসেবে আপনার বিজনেস গ্রোথ অর্জনে কাজ করি।",
    "why-trust-lbl": "আমাদের প্রতিশ্রুতি",
    "why-trust-val": "১০০% স্বচ্ছতা ও প্রতি সপ্তাহের কাজের রিপোর্ট",
    "why-card1-title": "ফলাফল-মুখী স্ট্র্যাটেজি",
    "why-card1-desc": "আমরা প্রতি ক্যাম্পেইনে সঠিক লক্ষ্য নির্ধারণ করি। যদি এটি ইতিবাচক রিটার্ন না আনে, আমরা তা পরিবর্তন করি।",
    "why-card2-title": "ইন্টারেক্টিভ পারফরম্যান্স পোর্টাল",
    "why-card2-desc": "ক্লায়েন্টদের লাইভ ক্যাম্পেইন ড্যাশবোর্ড দেওয়া হয় যাতে তারা অ্যাড বাজেট এবং লিড কোয়ালিটি সরাসরি দেখতে পারেন।",
    "why-card3-title": "দক্ষ অ্যাকাউন্ট ম্যানেজার",
    "why-card3-desc": "কোনো মধ্যস্থতাকারী নেই। আপনি সরাসরি আমাদের অভিজ্ঞ মার্কেটারদের সাথে প্রতি সপ্তাহে মিটিং করতে পারবেন।",
    "why-card4-title": "অটোমেটেড কাস্টমার রাউটিং",
    "why-card4-desc": "আমরা সাইটের লিডগুলো সরাসরি আপনার হোয়াটসঅ্যাপ নম্বরে পাঠিয়ে দেই, যা সেলস ক্লোজিংকে অত্যন্ত সহজ করে।",

    // Portfolio
    "portfolio-badge": "সাফল্যের কেস স্টাডি",
    "portfolio-title": "সাম্প্রতিক ক্যাম্পেইন ও কাজসমূহ",
    "portfolio-metric-lbl": "অর্জিত ফলাফল",
    "portfolio-btn": "বিস্তারিত দেখুন",

    // Feedback
    "feedback-badge": "গ্রাহকদের প্রতিক্রিয়া",
    "feedback-title": "গ্রাহকরা যা বলছেন।",
    "feedback-description": "ওমনিক্স নেটওয়ার্কের ক্যাম্পেইন পরিচালনা সম্পর্কে আমাদের ক্লায়েন্টরা কী ভাবছেন তা জানুন।",
    "feedback-form-title": "মতামত জমা দিন",
    "feedback-form-name": "আপনার নাম",
    "feedback-form-company": "কোম্পানি / পদবি",
    "feedback-form-rating": "রেটিং স্কোর",
    "feedback-form-msg": "মূল্যায়ন বা মন্তব্য",
    "feedback-form-btn": "হোয়াটসঅ্যাপের মাধ্যমে মতামত পাঠান",

    // Contact
    "contact-badge": "চলুন কথা বলি?",
    "contact-form-title": "অনুসন্ধান ফরম",

    // Footer
    "footer-desc": "ওমনিক্স নেটওয়ার্ক একটি প্রিমিয়াম রেজাল্টস-ফার্স্ট ডিজিটাল মার্কেটিং এজেন্সি। আমরা কাস্টমার একুইজিশন ফানেল তৈরি করি এবং হাই-পারফরম্যান্স ওয়েবসাইট বানাই।",
    "footer-services-title": "সেবাসমূহ",
    "footer-contact-title": "অফিসসমূহ",
    "footer-office-1": "বনানী অফিস",
    "footer-office-2": "সিডনি অফিস",
    "footer-status": "হাই-পারফরম্যান্স সিস্টেমের সাথে পরিচালিত",
    
    // Popup
    "popup-badge": "দ্রুত পরামর্শ",
    "popup-title": "আপনার প্রজেক্ট শুরু করুন",
    "popup-desc": "আপনার প্রয়োজনীয়তা আমাদের জানান এবং আমাদের পরিকল্পনাকারীরা ২ ঘণ্টার মধ্যে যোগাযোগ করবেন।",
    "popup-form-name": "আপনার নাম",
    "popup-form-phone": "ফোন নম্বর",
    "popup-form-service": "সার্ভিস নির্বাচন করুন",
    "popup-form-message": "সংক্ষিপ্ত বিবরণ",
    "popup-form-submit": "হোয়াটসঅ্যাপের মাধ্যমে সাবমিট করুন"
  }
};

// Global State
let currentLang = localStorage.getItem("omnix_lang") || "en";

// Testimonials Data (Inspired by Red Sparrow real client review details)
const testimonials = [
  {
    name: "Aminul Hakim",
    company: "CEO, Amber IT Ltd",
    rating: "⭐⭐⭐⭐⭐",
    text: {
      en: "Omnix Network worked hard to develop a website and create a comprehensive SEO strategy for our businesses, positively influencing our search ranking and helping new visitors to find us right away. These effects are quantifiable via web analytics.",
      bn: "ওমনিক্স নেটওয়ার্ক আমাদের ব্যবসার জন্য ওয়েবসাইট তৈরি এবং একটি বিস্তারিত এসইও কৌশল প্রণয়নে কঠোর পরিশ্রম করেছে, যা সার্চ র‍্যাংকিংয়ে আমাদের দারুণভাবে সাহায্য করেছে। ফলাফলগুলো আমরা অ্যানালিটিক্স ড্যাশবোর্ডে সহজেই দেখতে পাই।"
    }
  },
  {
    name: "Dr. Burhanuddin Ahmed Sadiq",
    company: "Managing Director, Surecell Medical Bangladesh",
    rating: "⭐⭐⭐⭐⭐",
    text: {
      en: "We enjoyed working with Omnix for about a year. Their team of visionaries and data-driven approach are hands down a great choice. They never run out of tremendous ideas. Their vast experience and technical skills are promising.",
      bn: "আমরা প্রায় এক বছর ধরে ওমনিক্সের সাথে কাজ করে আনন্দিত। তাদের টিম কাস্টমার ড্রাইভ করার নতুন নতুন আইডিয়া নিয়ে কাজ করে। ডিজিটাল মার্কেটিংয়ে তাদের কারিগরি দক্ষতা আমাদের ব্যবসা বৃদ্ধির বড় চালিকাশক্তি।"
    }
  },
  {
    name: "Naini Musa",
    company: "Owner, The Clothing Warehouse Ltd",
    rating: "⭐⭐⭐⭐⭐",
    text: {
      en: "I have nothing but praise for Omnix Network, who revamped my static website into a cutting-edge platform for selling my clothes. They are easy to communicate with and extremely well-priced. A happy collaboration.",
      bn: "ওমনিক্স নেটওয়ার্কের জন্য আমার কেবল প্রশংসাই রয়েছে, যারা আমার স্ট্যাটিক ওয়েবসাইটকে পোশাক বিক্রির জন্য একটি যুগোপযোগী ই-কমার্স প্ল্যাটফর্মে রূপান্তর করেছে।"
    }
  }
];

let activeTestimonialIdx = 0;

// Language Engine Switch Function
function setLanguage(lang) {
  if (!translations[lang]) return;
  currentLang = lang;
  localStorage.setItem("omnix_lang", lang);
  
  // Highlight active buttons
  document.querySelectorAll("[id^='lang-']").forEach(btn => {
    btn.classList.remove("lang-active");
    btn.classList.add("text-slate-550");
  });

  const activeBtnDesktop = document.getElementById(`lang-${lang}`);
  if (activeBtnDesktop) {
    activeBtnDesktop.classList.add("lang-active");
    activeBtnDesktop.classList.remove("text-slate-550");
  }

  const activeBtnMobile = document.getElementById(`lang-mobile-${lang}`);
  if (activeBtnMobile) {
    activeBtnMobile.classList.add("lang-active");
    activeBtnMobile.classList.remove("text-slate-550");
  }

  // Update DOM translation attributes
  document.querySelectorAll("[data-translate]").forEach(element => {
    const key = element.getAttribute("data-translate");
    if (translations[lang][key]) {
      element.innerHTML = translations[lang][key];
    }
  });

  renderTestimonial();

  if (document.getElementById("blog-content-area")) {
    renderBlogDetails();
  }
  if (document.getElementById("work-content-area")) {
    renderWorkDetails();
  }
  if (document.getElementById("service-content-area")) {
    renderServiceDetails();
  }
  if (document.getElementById("package-content-area")) {
    renderPackageDetails();
  }
}

// Interactive Video Modal Controls
function openVideoModal() {
  const modal = document.getElementById("video-modal");
  const iframe = document.getElementById("modal-iframe");
  iframe.src = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"; 
  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

// Close Explainer Modal
function closeVideoModal() {
  const modal = document.getElementById("video-modal");
  const iframe = document.getElementById("modal-iframe");
  iframe.src = "";
  modal.classList.add("hidden");
  document.body.style.overflow = "";
}

// Testimonials Carousel Controls
function renderTestimonial() {
  const container = document.getElementById("testimonial-slides");
  const dotsContainer = document.getElementById("carousel-dots");
  if (!container || !dotsContainer) return;
  const t = testimonials[activeTestimonialIdx];

  container.style.opacity = "0";

  setTimeout(() => {
    container.innerHTML = `
      <div class="space-y-4">
        <div class="text-brand-accent text-sm">${t.rating}</div>
        <p class="text-slate-650 text-sm md:text-base italic leading-relaxed font-medium">
          "${t.text[currentLang]}"
        </p>
        <div class="flex items-center space-x-3 pt-2">
          <div class="w-10 h-10 rounded bg-[#f1f5f9] border border-slate-200 flex items-center justify-center font-bold text-slate-800 uppercase text-sm animate-pulse-soft">
            ${t.name.substring(0, 2)}
          </div>
          <div>
            <h4 class="text-xs font-bold text-slate-900">${t.name}</h4>
            <p class="text-[10px] text-slate-500 font-semibold">${t.company}</p>
          </div>
        </div>
      </div>
    `;

    dotsContainer.innerHTML = testimonials.map((_, i) => `
      <span class="w-2.5 h-2.5 rounded-full cursor-pointer transition-all ${i === activeTestimonialIdx ? 'bg-brand-accent w-6' : 'bg-slate-300'}" onclick="jumpToTestimonial(${i})"></span>
    `).join('');

    container.style.opacity = "1";
  }, 300);
}

function nextTestimonial() {
  activeTestimonialIdx = (activeTestimonialIdx + 1) % testimonials.length;
  renderTestimonial();
}

function prevTestimonial() {
  activeTestimonialIdx = (activeTestimonialIdx - 1 + testimonials.length) % testimonials.length;
  renderTestimonial();
}

function jumpToTestimonial(idx) {
  activeTestimonialIdx = idx;
  renderTestimonial();
}

// Portfolio Grid Filter
function filterPortfolio(category) {
  const filters = ["all", "seo", "ads", "web"];
  filters.forEach(cat => {
    const btn = document.getElementById(`filter-${cat}`);
    if (cat === category) {
      btn.className = "px-4 py-2 rounded-full text-xs font-bold bg-gradient-to-r from-brand-accent to-brand-cyan text-white shadow-md";
    } else {
      btn.className = "px-4 py-2 rounded-full text-xs font-bold bg-slate-100 border border-slate-200 text-slate-505 hover:text-slate-800 hover:border-slate-350 transition-colors";
    }
  });

  const items = document.querySelectorAll(".portfolio-item");
  items.forEach(item => {
    if (category === "all" || item.classList.contains(category)) {
      item.classList.remove("hidden");
    } else {
      item.classList.add("hidden");
    }
  });
}

// FAQ Accordion Toggler
function toggleFaq(id) {
  const ans = document.getElementById(`faq-ans-${id}`);
  const icon = document.getElementById(`faq-icon-${id}`);
  
  if (ans.classList.contains("hidden")) {
    ans.classList.remove("hidden");
    icon.style.transform = "rotate(180deg)";
  } else {
    ans.classList.add("hidden");
    icon.style.transform = "rotate(0deg)";
  }
}

// Inquiry Form WhatsApp submission builder
function submitEnquiryForm(event) {
  event.preventDefault();
  
  const name = document.getElementById("enquiry-name").value.trim();
  const email = document.getElementById("enquiry-email").value.trim();
  const service = document.getElementById("enquiry-service").value;
  const details = document.getElementById("enquiry-details").value.trim();

  const textMessage = `Hi Omnix Network, I want to make an enquiry:\n\n` +
                      `* Name: ${name}\n` +
                      `* Email: ${email}\n` +
                      `* Selected Service: ${service}\n` +
                      `* Project Details: "${details}"\n\n` +
                      `Best Regards!`;

  const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(textMessage)}`;
  window.open(waUrl, "_blank");
  
  document.getElementById("enquiry-form").reset();
}

// Feedback submission redirection to WhatsApp
function submitFeedbackForm(event) {
  event.preventDefault();
  
  const name = document.getElementById("feedback-name").value.trim();
  const company = document.getElementById("feedback-company").value.trim();
  const rating = document.getElementById("feedback-rating").value;
  const msg = document.getElementById("feedback-msg").value.trim();

  const textMessage = `Hi Omnix Network, I want to submit client feedback:\n\n` +
                      `* Name: ${name}\n` +
                      `* Company/Role: ${company}\n` +
                      `* Rating: ${rating}\n` +
                      `* Feedback: "${msg}"\n\n` +
                      `Best Regards!`;

  const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(textMessage)}`;
  window.open(waUrl, "_blank");
  
  testimonials.push({
    name: name,
    company: company,
    rating: rating,
    text: { en: msg, bn: msg }
  });

  activeTestimonialIdx = testimonials.length - 1;
  renderTestimonial();

  document.getElementById("feedback-form").reset();
}

// Scroll Reveal & Intersection Observer Engine
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("revealed");
      
      const counters = entry.target.querySelectorAll(".counter-val");
      if (counters.length > 0) {
        animateCounters(counters);
      }
      
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

function animateCounters(counters) {
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute("data-target"));
    const duration = 1000; 
    const stepTime = Math.abs(Math.floor(duration / target));
    let current = 0;
    
    const timer = setInterval(() => {
      current += 2;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      
      if (currentLang === "bn") {
        counter.innerText = toBengaliNumerals(current);
      } else {
        counter.innerText = current;
      }
    }, Math.max(stepTime, 15));
  });
}

// Magnetic Hover Micro-Interactions for navigation items
const hoverItems = document.querySelectorAll('.hover-magnetic');
hoverItems.forEach(item => {
  item.addEventListener('mousemove', (e) => {
    const rect = item.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    item.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  });
  
  item.addEventListener('mouseleave', () => {
    item.style.transform = 'translate(0px, 0px)';
  });
});

// Desktop Cursor Trails Tracker
const follower = document.getElementById("cursor-follower");

if (follower && window.innerWidth > 768) {
  follower.style.display = "block";
  
  document.addEventListener("mousemove", (e) => {
    follower.style.left = e.clientX + "px";
    follower.style.top = e.clientY + "px";
  });

  const hoverSelectors = "a, button, select, input, [onclick], .portfolio-item, .rs-card";
  document.querySelectorAll(hoverSelectors).forEach(el => {
    el.addEventListener("mouseenter", () => follower.classList.add("hovering"));
    el.addEventListener("mouseleave", () => follower.classList.remove("hovering"));
  });
}

// Mobile Menu toggles
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
}

document.querySelectorAll("#mobile-menu a").forEach(link => {
  link.addEventListener("click", () => {
    if (mobileMenu) {
      mobileMenu.classList.add("hidden");
    }
  });
});

// Page Initialization On Loaded
window.addEventListener("DOMContentLoaded", () => {
  setLanguage(currentLang);
  if (document.getElementById("testimonial-slides")) {
    renderTestimonial();
  }
  
  document.querySelectorAll(".reveal-item").forEach(item => {
    revealObserver.observe(item);
  });

  // Initialize Hero Slider if present
  if (document.querySelector(".hero-slide")) {
    showHeroSlide(0);
    resetHeroSlideTimer();
  }
});

// Hero Section Slider logic
let currentHeroSlideIdx = 0;
let heroSlideInterval;
const HERO_SLIDE_DURATION = 6000;

function showHeroSlide(index) {
  const slides = document.querySelectorAll(".hero-slide");
  const dots = document.querySelectorAll(".hero-dot");
  if (slides.length === 0) return;
  
  if (index >= slides.length) index = 0;
  if (index < 0) index = slides.length - 1;
  currentHeroSlideIdx = index;
  
  slides.forEach((slide, idx) => {
    if (idx === index) {
      slide.classList.add("active-slide", "opacity-100", "translate-x-0");
      slide.classList.remove("opacity-0", "translate-x-8", "pointer-events-none");
      slide.style.position = "relative";
      slide.style.pointerEvents = "auto";
    } else {
      slide.classList.remove("active-slide", "opacity-100", "translate-x-0");
      slide.classList.add("opacity-0", "translate-x-8", "pointer-events-none");
      slide.style.position = "absolute";
      slide.style.top = "0";
      slide.style.left = "0";
      slide.style.right = "0";
      slide.style.pointerEvents = "none";
    }
  });
  
  dots.forEach((dot, idx) => {
    if (idx === index) {
      dot.classList.add("bg-brand-accent", "w-8");
      dot.classList.remove("bg-slate-300", "w-2");
    } else {
      dot.classList.remove("bg-brand-accent", "w-8");
      dot.classList.add("bg-slate-300", "w-2");
    }
  });
}

function goToHeroSlide(index) {
  showHeroSlide(index);
  resetHeroSlideTimer();
}

function resetHeroSlideTimer() {
  clearInterval(heroSlideInterval);
  heroSlideInterval = setInterval(() => {
    showHeroSlide(currentHeroSlideIdx + 1);
  }, HERO_SLIDE_DURATION);
}

// Blog Posts Data
const blogsData = {
  1: {
    date: "August 24, 2026",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop",
    author: "Riazul Islam",
    readTime: "5 min read",
    title: {
      en: "10 Digital Marketing Tips to Grow Your Footwear Business",
      bn: "আপনার ফুটওয়্যার ব্যবসা বড় করতে ১০টি ডিজিটাল মার্কেটিং টিপস"
    },
    excerpt: {
      en: "To grow a footwear business, it is necessary to have a strong presence on social media, carry out continuous search optimization, and engage directly with customers.",
      bn: "একটি জুতো বা ফুটওয়্যার ব্যবসা বড় করতে সোশ্যাল মিডিয়ায় শক্তিশালী উপস্থিতি, ধারাবাহিক সার্চ অপ্টিমাইজেশন এবং সরাসরি কাস্টমারদের সাথে যুক্ত থাকা অত্যন্ত জরুরি।"
    },
    content: {
      en: `
        <p class="mb-6 text-slate-600 leading-relaxed text-sm">To grow a footwear business in today's competitive environment, digital marketing is no longer optional—it is a critical necessity. Having a strong presence on social media, carrying out continuous search engine optimization, and engaging directly with customers form the foundation of sustainable growth.</p>
        <h3 class="text-lg font-bold font-display text-brand-darkText mb-3">1. Build a Visually Stunning Social Media Catalog</h3>
        <p class="mb-6 text-slate-650 leading-relaxed text-sm">Footwear is a highly visual product. Leverage platforms like Instagram and Pinterest to display high-quality product photography and short-form video reels of customers wearing your products in daily life.</p>
        <h3 class="text-lg font-bold font-display text-brand-darkText mb-3">2. Invest heavily in Local SEO</h3>
        <p class="mb-6 text-slate-650 leading-relaxed text-sm">Optimize your Google Business profile so that local searchers looking for shoe stores or footwear brands find you instantly. Target keywords specific to your location.</p>
        <h3 class="text-lg font-bold font-display text-brand-darkText mb-3">3. Leverage Influencer Marketing</h3>
        <p class="mb-6 text-slate-650 leading-relaxed text-sm">Partner with micro-influencers and fashion bloggers who align with your brand values to show off your footwear collections in real-world styling scenarios.</p>
      `,
      bn: `
        <p class="mb-6 text-slate-650 leading-relaxed text-sm">আজকের প্রতিযোগিতামূলক বাজারে একটি ফুটওয়্যার বা জুতোর ব্যবসা সফল করতে ডিজিটাল মার্কেটিং এখন আর ঐচ্ছিক বিষয় নয়—এটি একটি অত্যন্ত প্রয়োজনীয় দিক। সোশ্যাল মিডিয়ায় শক্তিশালী উপস্থিতি, ধারাবাহিক সার্চ অপ্টিমাইজেশন এবং সরাসরি ক্রেতাদের সাথে যোগাযোগের মাধ্যমেই এই ব্যবসাকে দীর্ঘস্থায়ীভাবে এগিয়ে নিয়ে যাওয়া সম্ভব।</p>
        <h3 class="text-lg font-bold font-display text-brand-darkText mb-3">১. আকর্ষণীয় সোশ্যাল মিডিয়া ক্যাটালগ তৈরি</h3>
        <p class="mb-6 text-slate-650 leading-relaxed text-sm">জুতো একটি অত্যন্ত ভিজ্যুয়াল বা দৃশ্যমান প্রোডাক্ট। ইনস্টাগ্রাম এবং পিন্টারেস্টের মতো প্ল্যাটফর্ম ব্যবহার করে উন্নতমানের প্রোডাক্ট ফটোগ্রাফি এবং গ্রাহকদের ব্যবহারের রিল ভিডিও প্রচার করুন।</p>
        <h3 class="text-lg font-bold font-display text-brand-darkText mb-3">২. লোকাল এসইও (Local SEO) তে গুরুত্ব দেওয়া</h3>
        <p class="mb-6 text-slate-650 leading-relaxed text-sm">আপনার গুগল বিজনেস প্রোফাইলটি এমনভাবে অপ্টিমাইজ করুন যাতে স্থানীয়ভাবে কেউ জুতোর দোকান বা ব্র্যান্ড খুঁজলে সবার আগে আপনার ব্র্যান্ডটি দেখতে পায়।</p>
        <h3 class="text-lg font-bold font-display text-brand-darkText mb-3">৩. ইনফ্লুয়েন্সার মার্কেটিং</h3>
        <p class="mb-6 text-slate-650 leading-relaxed text-sm">আপনার ব্র্যান্ডের সাথে মানানসই এমন ফ্যাশন blogger বা মাইক্রো-ইনফ্লুয়েন্সারদের সাথে পার্টনারশিপ করে আপনার জুতো বিভিন্ন স্টাইলিংয়ের মাধ্যমে তুলে ধরুন।</p>
      `
    }
  },
  2: {
    date: "August 18, 2026",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800&auto=format&fit=crop",
    author: "Mahmud Hasan",
    readTime: "7 min read",
    title: {
      en: "Performance Marketing in Bangladesh: Complete Guide 2026",
      bn: "বাংলাদেশে পারফরম্যান্স মার্কেটিং: সম্পূর্ণ গাইড ২০২৬"
    },
    excerpt: {
      en: "Performance marketing works on one rule: you pay for outcomes, not attention. It could be a click, a completed sale, or an app install.",
      bn: "পারফরম্যান্স মার্কেটিং একটি নিয়মে কাজ করে: আপনি প্রচারের জন্য নয়, অর্জিত ফলাফলের জন্য পেমেন্ট করবেন। এটি হতে পারে একটি ক্লিক, সফল বিক্রি, কিংবা অ্যাপ ডাউনলোড।"
    },
    content: {
      en: `
        <p class="mb-6 text-slate-650 leading-relaxed text-sm">Performance marketing works on one primary rule: you pay only for concrete business outcomes, not just passive attention. It could be a click, a completed lead form, a product sale, or a mobile app install. In 2026, Bangladeshi brands are aggressively transitioning marketing budgets from traditional media to high-yield digital ad campaigns.</p>
        <h3 class="text-lg font-bold font-display text-brand-darkText mb-3">Why is Performance Marketing Booming in Bangladesh?</h3>
        <p class="mb-6 text-slate-650 leading-relaxed text-sm">With the massive rise of digital payments (bKash, Nagad, Visa/Mastercard) and high smartphone penetration, e-commerce and local service businesses can now directly connect advertising spend to cash receipts.</p>
        <h3 class="text-lg font-bold font-display text-brand-darkText mb-3">Key Metrics to Track</h3>
        <p class="mb-6 text-slate-650 leading-relaxed text-sm">Successful performance campaigns rely on absolute measurement. Keep close eyes on Cost Per Acquisition (CPA), Customer Acquisition Cost (CAC), Return on Ad Spend (ROAS), and Lead Conversion Rate.</p>
      `,
      bn: `
        <p class="mb-6 text-slate-650 leading-relaxed text-sm">পারফরম্যান্স মার্কেটিং মূলত একটি মূল নিয়মের ওপর ভিত্তি করে কাজ করে: আপনি প্রচারের জন্য নয়, বরং নির্দিষ্ট ব্যবসায়িক ফলাফলের ওপর ভিত্তি করে পেমেন্ট করবেন। যেমন ক্লিক, লিড ফর্ম পূরণ, প্রোডাক্ট ক্রয় অথবা অ্যাপ ডাউনলোড। ২০২৬ সালে, বাংলাদেশের ব্র্যান্ডগুলো তাদের বাজেট ট্র্যাডিশনাল মিডিয়া থেকে সরিয়ে ডিজিটাল ক্যাম্পেইনের দিকে নিয়ে যাচ্ছে।</p>
        <h3 class="text-lg font-bold font-display text-brand-darkText mb-3">বাংলাদেশে পারফরম্যান্স মার্কেটিং কেন জনপ্রিয় হচ্ছে?</h3>
        <p class="mb-6 text-slate-650 leading-relaxed text-sm">ডিজিটাল পেমেন্ট (বিকাশ, রকেট, নগদ, কার্ড) ও স্মার্টফোন ব্যবহারকারীর সংখ্যা বৃদ্ধির ফলে, ই-কমার্স ও লোকাল সার্ভিস ব্যবসাগুলো খুব সহজেই বিজ্ঞাপনের খরচ সরাসরি রেভিনিউয়ের সাথে পরিমাপ করতে পারছে।</p>
        <h3 class="text-lg font-bold font-display text-brand-darkText mb-3">গুরুত্বপূর্ণ মেট্রিক্স যা ট্র্যাক করতে হবে</h3>
        <p class="mb-6 text-slate-650 leading-relaxed text-sm">সফল পারফরম্যান্স ক্যাম্পেইন নিখুঁত পরিমাপের ওপর নির্ভর করে। আপনার কস্ট পার অ্যাকুইজিশন (CPA), কাস্টমার অ্যাকুইজিশন কস্ট (CAC), রিটার্ন অন অ্যাড স্পেন্ড (ROAS) এবং লিড কনভার্সন রেট সবসময় নিরীক্ষণ করুন।</p>
      `
    }
  },
  3: {
    date: "July 30, 2026",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop",
    author: "Zakir Chowdhury",
    readTime: "6 min read",
    title: {
      en: "How Meta Ads Help Businesses Generate More Leads and Sales",
      bn: "মেটা বিজ্ঞাপন কীভাবে ব্যবসার লিড ও সেলস বৃদ্ধি করতে সাহায্য করে"
    },
    excerpt: {
      en: "Using Meta Ads for business growth in Bangladesh allows companies to convert social media attention into trackable revenue.",
      bn: "বাংলাদেশে ব্যবসার প্রসারে মেটা (ফেসবুক/ইনস্টাগ্রাম) বিজ্ঞাপন ব্যবহারের মাধ্যমে সামাজিক মাধ্যমের মনোযোগকে সরাসরি ট্র্যাকযোগ্য বিক্রিতে রূপান্তর করা যায়।"
    },
    content: {
      en: `
        <p class="mb-6 text-slate-650 leading-relaxed text-sm">Meta Ads continue to be the single most cost-effective traffic engine for local consumer brands in Bangladesh. By harnessing Meta's machine learning and granular targeting systems, businesses can discover buying audiences with unparalleled efficiency.</p>
        <h3 class="text-lg font-bold font-display text-brand-darkText mb-3">1. Precision Audience Targeting</h3>
        <p class="mb-6 text-slate-650 leading-relaxed text-sm">Meta's algorithms collect vast amounts of interest data, allowing you to slice audience profiles by demographic, behaviors, interests, and past interactions with your site.</p>
        <h3 class="text-lg font-bold font-display text-brand-darkText mb-3">2. Retargeting Warm Audiences</h3>
        <p class="mb-6 text-slate-650 leading-relaxed text-sm">Don't pitch to cold strangers repeatedly. Build custom audiences of people who visited your site or added items to cart, and serve them custom dynamic product ads to close the sale.</p>
      `,
      bn: `
        <p class="mb-6 text-slate-650 leading-relaxed text-sm">বাংলাদেশের লোকাল ও কনজিউমার ব্র্যান্ডগুলোর জন্য মেটা বিজ্ঞাপন (ফেসবুক ও ইনস্টাগ্রাম) এখনও সবচেয়ে সাশ্রয়ী কাস্টমার আনার মাধ্যম। মেটার মেশিন লার্নিং ও নিখুঁত টার্গেটিং ব্যবহার করে খুব সহজেই ক্রেতা খুঁজে নেওয়া সম্ভব।</p>
        <h3 class="text-lg font-bold font-display text-brand-darkText mb-3">১. সঠিক অডিয়েন্স টার্গেটিং</h3>
        <p class="mb-6 text-slate-650 leading-relaxed text-sm">মেটার অ্যালগরিদম বিপুল পরিমাণ ব্যবহারকারীর ডেটা সংগ্রহ করে, যার ফলে আপনি বয়স, অবস্থান, আগ্রহ ও আচরণের ওপর ভিত্তি করে সঠিক ক্রেতা বেছে নিতে পারবেন।</p>
        <h3 class="text-lg font-bold font-display text-brand-darkText mb-3">২. রিটার্গেটিং বা রিমার্কেটিং</h3>
        <p class="mb-6 text-slate-650 leading-relaxed text-sm">যারা ইতিমধ্যে আপনার ওয়েবসাইট ভিজিট করেছে বা মেসেজ করেছে, তাদের জন্য আলাদা রি-টার্গেটিং বিজ্ঞাপন তৈরি করুন। এটি কনভার্সন অনেক গুণ বাড়িয়ে দেয়।</p>
      `
    }
  }
};

// Blog Details rendering
function renderBlogDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const blogId = urlParams.get("id");
  if (!blogId || !blogsData[blogId]) {
    document.getElementById("blog-content-area").innerHTML = `<p class="text-center py-20 text-slate-500 font-bold">Blog Post Not Found</p>`;
    return;
  }
  
  const blog = blogsData[blogId];
  document.title = `${blog.title[currentLang]} | Omnix Network`;
  
  const titleEl = document.getElementById("blog-detail-title");
  const dateEl = document.getElementById("blog-detail-date");
  const authorEl = document.getElementById("blog-detail-author");
  const readTimeEl = document.getElementById("blog-detail-read-time");
  const imageEl = document.getElementById("blog-detail-image");
  const contentEl = document.getElementById("blog-detail-content");
  
  if (titleEl) titleEl.innerText = blog.title[currentLang];
  if (dateEl) dateEl.innerText = blog.date;
  if (authorEl) authorEl.innerText = blog.author;
  if (readTimeEl) readTimeEl.innerText = blog.readTime;
  if (imageEl) {
    imageEl.src = blog.image;
    imageEl.alt = blog.title[currentLang];
  }
  if (contentEl) {
    contentEl.innerHTML = blog.content[currentLang];
  }
}

// Works Case Studies Data
const worksData = {
  1: {
    title: { en: "Bonzer Grooming Case Study", bn: "বনজার গ্রুমিং কেস স্টাডি" },
    tag: "WEB / SEO / Media Buying",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800&auto=format&fit=crop",
    client: "Bonzer Grooming Ltd",
    duration: "6 Months",
    metrics: { en: "+140% Orders & 3x Organic Revenue", bn: "+১৪০% অর্ডার ও ৩ গুণ অর্গানিক রেভিনিউ" },
    details: {
      en: `
        <p class="mb-6 text-slate-650 leading-relaxed text-sm">Bonzer Grooming came to us with a static website that wasn't converting traffic into orders. We rebuilt their entire e-commerce infrastructure on Shopify, focusing heavily on page performance, usability, and modern UI transitions.</p>
        <h3 class="text-lg font-bold font-display text-brand-darkText mb-3">1. Custom Shopify Setup</h3>
        <p class="mb-6 text-slate-650 leading-relaxed text-sm">We optimized store load speed, decreasing Largest Contentful Paint (LCP) time down to 1.4 seconds. The interface is optimized to offer a fast and seamless purchasing funnel.</p>
        <h3 class="text-lg font-bold font-display text-brand-darkText mb-3">2. SEO Keyword Strategy</h3>
        <p class="mb-6 text-slate-650 leading-relaxed text-sm">Targeted high-volume buyer intents like "premium grooming sets". Within 4 months, Bonzer ranked on the first page of Google search results in target geographic regions.</p>
      `,
      bn: `
        <p class="mb-6 text-slate-650 leading-relaxed text-sm">বনজার গ্রুমিং একটি সাধারণ স্ট্যাটিক ওয়েবসাইট নিয়ে আমাদের কাছে আসে যা থেকে তেমন কোনো ভালো বিক্রি হচ্ছিল না। আমরা তাদের পুরো ই-কমার্স সিস্টেমটি শপিফাইয়ের মাধ্যমে নতুন করে তৈরি করি এবং ইউজার এক্সপেরিয়েন্স ও স্পিড অপ্টিমাইজ করি।</p>
        <h3 class="text-lg font-bold font-display text-brand-darkText mb-3">১. কাস্টম শপিফাই সেটআপ</h3>
        <p class="mb-6 text-slate-650 leading-relaxed text-sm">আমরা পেজ লোড স্পিড অপ্টিমাইজ করেছি, লার্জেস্ট কনটেন্টফুল পেইন্ট (LCP) স্পিড কমিয়ে ১.৪ সেকেন্ডে এনেছি। সাইটের ইন্টারফেস কাস্টমারদের দ্রুত কেনাকাটার জন্য উপযোগী করা হয়েছে।</p>
        <h3 class="text-lg font-bold font-display text-brand-darkText mb-3">২. এসইও কিওয়ার্ড প্ল্যানিং</h3>
        <p class="mb-6 text-slate-650 leading-relaxed text-sm">আমরা মূলত "প্রিমিয়াম গ্রুমিং কিটস" সম্পর্কিত কিওয়ার্ড টার্গেট করে গুগলে র‍্যাঙ্ক করাই। যার ফলে তাদের অর্নারিক সেলস ও ট্রাফিক বহুগুণ বৃদ্ধি পায়।</p>
      `
    }
  },
  2: {
    title: { en: "Paiker Imports Lead Generation", bn: "পাইকার ইম্পোর্টস লিড জেনারেশন" },
    tag: "Media Buying",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop",
    client: "Paiker Imports",
    duration: "3 Months",
    metrics: { en: "+340% ROI on Social Campaigns", bn: "+৩৪০% আরওআই সোশ্যাল ক্যাম্পেইনে" },
    details: {
      en: `
        <p class="mb-6 text-slate-650 leading-relaxed text-sm">Paiker Imports wanted to drive bulk sales for home furnishing materials. We engineered a target SMM funnel on Facebook and Instagram and paired it with automated WhatsApp leads routing.</p>
        <h3 class="text-lg font-bold font-display text-brand-darkText mb-3">1. Targeted Facebook & Instagram Ads</h3>
        <p class="mb-6 text-slate-650 leading-relaxed text-sm">By using Lookalike audiences built from past purchaser profiles, we ran dynamic product catalog ads highlighting premium rugs and curtains, drawing bulk wholesale buyers.</p>
      `,
      bn: `
        <p class="mb-6 text-slate-650 leading-relaxed text-sm">পাইকার ইম্পোর্টস পাইকারি হোম ফার্নিশিং সামগ্রীর বিক্রির গতি বাড়াতে চেয়েছিল। আমরা ফেসবুক ও ইনস্টাগ্রামে নিখুঁত টার্গেটেড বিজ্ঞাপন পরিচালনা শুরু করি এবং লিড সরাসরি তাদের হোয়াটসঅ্যাপ নাম্বারে পাঠানোর ব্যবস্থা করি।</p>
        <h3 class="text-lg font-bold font-display text-brand-darkText mb-3">১. ফেসবুক ও ইনস্টাগ্রাম বিজ্ঞাপন</h3>
        <p class="mb-6 text-slate-650 leading-relaxed text-sm">পূর্বে কেনাকাটা করা কাস্টমারদের লুকঅ্যালাইক অডিয়েন্স তৈরি করে আমরা ডাইনামিক প্রোডাক্ট ক্যাটালগ বিজ্ঞাপন দেখাই, যা প্রচুর পরিমাণে পাইকারি অর্ডার নিশ্চিত করে।</p>
      `
    }
  },
  3: {
    title: { en: "Maven Autos CRM Automation", bn: "মাভেন অটোস সিআরএম অটোমেশন" },
    tag: "Web Development",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop",
    client: "Maven Autos",
    duration: "4 Months",
    metrics: { en: "15m Impressions & Automated CRM Pipeline", bn: "১৫ মিলিয়ন ইম্প্রেশন ও অটোমেটেড সিআরএম ফানেল" },
    details: {
      en: `
        <p class="mb-6 text-slate-650 leading-relaxed text-sm">Maven Autos needed a central portal to list vehicles and handle customer leads dynamically. We designed a lightning-fast custom web catalog integrated directly with an automated CRM pipeline.</p>
        <h3 class="text-lg font-bold font-display text-brand-darkText mb-3">1. CRM Integration</h3>
        <p class="mb-6 text-slate-650 leading-relaxed text-sm">Every vehicle listing page has a direct scheduling form. Users can click to talk directly with sales representatives, matching user profiles with active agent availability in real time.</p>
      `,
      bn: `
        <p class="mb-6 text-slate-650 leading-relaxed text-sm">মাভেন অটোসের জন্য গাড়ি লিস্টিং ও ক্রেতাদের লিড ট্র্যাক করার জন্য একটি কেন্দ্রীয় প্ল্যাটফর্মের প্রয়োজন ছিল। আমরা তাদের জন্য একটি ফাস্ট কাস্টম পোর্টাল তৈরি করি যা সরাসরি সিআরএমের সাথে যুক্ত।</p>
        <h3 class="text-lg font-bold font-display text-brand-darkText mb-3">১. সিআরএম অটোমেশন</h3>
        <p class="mb-6 text-slate-650 leading-relaxed text-sm">গাড়ির লিস্টিং পেজে সরাসরি বুকিং ও হোয়াটসঅ্যাপ চ্যাটের ব্যবস্থা রয়েছে, যা সেলস প্রতিনিধিদের গ্রাহকদের ইনকোয়ারির সাথে দ্রুত যুক্ত করে দেয়।</p>
      `
    }
  }
};

// Services Data
const servicesData = {
  s1: {
    title: { en: "360° Digital Marketing", bn: "৩৬০° ডিজিটাল মার্কেটিং" },
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800&auto=format&fit=crop",
    desc: { en: "Deliver complete marketing solutions combining SEO, SMM, and web content.", bn: "এসইও, সোশ্যাল মিডিয়া মার্কেটিং এবং ওয়েব কনটেন্ট সংমিশ্রণে পূর্ণাঙ্গ মার্কেটিং সেবা।" },
    benefits: {
      en: "<li>Integrated marketing channels</li><li>Holistic brand positioning</li><li>Weekly performance reports</li><li>Dedicated Campaign Manager</li>",
      bn: "<li>সমন্বিত মার্কেটিং চ্যানেলসমূহ</li><li>সামগ্রিক ব্র্যান্ড পজিশনিং</li><li>সাপ্তাহিক পারফরম্যান্স রিপোর্ট</li><li>ডেডিকেটেড ক্যাম্পেইন ম্যানেজার</li>"
    }
  },
  s2: {
    title: { en: "Professional SEO Services", bn: "প্রফেশনাল এসইও (SEO) সার্ভিস" },
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop",
    desc: { en: "Grow your search visibility and get organic, high-intent traffic.", bn: "সার্চ ইঞ্জিনে আপনার উপস্থিতি বাড়ান এবং অর্গানিক ও সক্রিয় কাস্টমার আকর্ষণ করুন।" },
    benefits: {
      en: "<li>Keyword research & mapping</li><li>On-page & technical speed audits</li><li>Premium link building</li><li>Google Analytics setup</li>",
      bn: "<li>কিওয়ার্ড রিসার্চ ও প্ল্যানিং</li><li>অন-পেজ ও টেকনিক্যাল স্পিড অপ্টিমাইজেশন</li><li>প্রিমিয়াম লিঙ্ক বিল্ডিং</li><li>গুগল সেটআপ</li>"
    }
  },
  s3: {
    title: { en: "Social Media Marketing", bn: "সোশ্যাল মিডিয়া মার্কেটিং" },
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop",
    desc: { en: "Manage Facebook, Instagram, and TikTok ads contextually to drive sales.", bn: "ফেসবুক, ইনস্টাগ্রাম এবং টিকটক অ্যাডস সুনিপুণভাবে পরিচালনা করে বিক্রি বাড়ান।" },
    benefits: {
      en: "<li>Content calendar planning</li><li>Creative graphic & video ads</li><li>Granular behavioral targeting</li><li>A/B testing ad formats</li>",
      bn: "<li>কনটেন্ট ক্যালেন্ডার প্ল্যানিং</li><li>সৃজনশীল গ্রাফিক্স ও ভিডিও বিজ্ঞাপন</li><li>নিখুঁত বিহেভিওরাল টার্গেটিং</li><li>এ/বি টেস্টিং অ্যাড ফরম্যাট</li>"
    }
  },
  s4: {
    title: { en: "Content Development", bn: "কনটেন্ট ডেভেলপমেন্ট" },
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop",
    desc: { en: "Scale conversion with copywriting and rich media visual graphics.", bn: "কপিরাইটিং এবং রিচ মিডিয়া ভিজ্যুয়াল গ্রাফিক্সের সাহায্যে কনভার্সন রেট বাড়ান।" },
    benefits: {
      en: "<li>SEO blog copywriting</li><li>Engaging SMM copy</li><li>Infographics design</li><li>Brand identity guidelines</li>",
      bn: "<li>এসইও ফ্রেন্ডলি ব্লগ রাইটিং</li><li>আকর্ষণীয় সোশ্যাল মিডিয়া কপি</li><li>ইনফোগ্রাফিক্স ডিজাইন</li><li>ব্র্যান্ড আইডেন্টিটি গাইডলাইনস</li>"
    }
  },
  s5: {
    title: { en: "Website Development", bn: "ওয়েবসাইট ডেভেলপমেন্ট" },
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800&auto=format&fit=crop",
    desc: { en: "Build secure, mobile-responsive, and fast-loading web apps.", bn: "নিরাপদ, সম্পূর্ণ মোবাইল রেসপন্সিভ এবং ফাস্ট লোডিং ওয়েবসাইট তৈরি করুন।" },
    benefits: {
      en: "<li>Modern responsive layouts</li><li>Shopify & Custom CRM setup</li><li>Fast LCP performance</li><li>SEO integration</li>",
      bn: "<li>আধুনিক রেসপন্সিভ লেআউট</li><li>শপিফাই ও কাস্টম সিআরএম সেটআপ</li><li>ফাস্ট পারফরম্যান্স ও স্পিড</li><li>এসইও ইন্টিগ্রেশন</li>"
    }
  },
  s6: {
    title: { en: "Mobile App Development", bn: "মোবাইল অ্যাপ ডেভেলপমেন্ট" },
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop",
    desc: { en: "Create native and cross-platform apps for iOS and Android.", bn: "আইওএস (iOS) এবং অ্যান্ড্রয়েড (Android) এর জন্য নেটিভ ও ক্রস প্ল্যাটফর্ম অ্যাপ তৈরি।" },
    benefits: {
      en: "<li>Flutter cross-platform apps</li><li>Clean UI/UX flow</li><li>App Store and Play Store deploy</li><li>Push notification integration</li>",
      bn: "<li>ফ্লাটার ক্রস প্ল্যাটফর্ম অ্যাপস</li><li>চমৎকার ইউআই/ইউএক্স ফ্লো</li><li>অ্যাপ স্টোর এবং প্লে স্টোরে প্রকাশ</li><li>পুশ নোটিফিকেশন ইন্টিগ্রেশন</li>"
    }
  }
};

// Packages Data
const packagesData = {
  smm: {
    title: { en: "Social Media Marketing Packages", bn: "সোশ্যাল মিডিয়া মার্কেটিং প্যাকেজ" },
    type: "Social Media",
    desc: { en: "Affordable and scalable packages covering design, targeting, and weekly reports.", bn: "ডিজাইন, টার্গেটিং এবং সাপ্তাহিক পারফরম্যান্স রিপোর্ট সম্বলিত সাশ্রয়ী প্যাকেজ।" },
    features: {
      en: "<li>12 - 20 Creative Posts/Month</li><li>Targeted Facebook & Instagram Ads</li><li>Audience Profiling</li><li>Comment & Message Response setup</li><li>Weekly Performance Analytics</li>",
      bn: "<li>১২ - ২০টি ক্রিয়েটিভ পোস্ট/মাস</li><li>টার্গেটেড ফেসবুক ও ইনস্টাগ্রাম বিজ্ঞাপন</li><li>অডিয়েন্স প্রোফাইলিং</li><li>কমেন্ট ও মেসেজ রেসপন্স সেটআপ</li><li>সাপ্তাহিক পারফরম্যান্স অ্যানালিটিক্স</li>"
    }
  },
  seo: {
    title: { en: "Professional SEO Packages", bn: "প্রফেশনাল এসইও (SEO) প্যাকেজ" },
    type: "Search Visibility",
    desc: { en: "Predefined SEO strategies to outrank competitors and scale leads.", bn: "প্রতিযোগীদের পেছনে ফেলে অর্গানিক লিড বাড়ানোর জন্য প্রফেশনাল এসইও প্যাকেজ।" },
    features: {
      en: "<li>Full Site Technical Audit</li><li>Keyword Research & Goal Mapping</li><li>On-Page Content Optimization</li><li>Authority Link Building</li><li>Monthly Ranking Reports</li>",
      bn: "<li>সম্পূর্ণ সাইটের টেকনিক্যাল অডিট</li><li>কিওয়ার্ড রিসার্চ ও গোল ম্যাপিং</li><li>অন-পেজ কনটেন্ট অপ্টিমাইজেশন</li><li>অথোরিটি লিঙ্ক বিল্ডিং</li><li>মাসিক র‍্যাংকিং রিপোর্ট</li>"
    }
  }
};

// Case study details rendering
function renderWorkDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const workId = urlParams.get("id");
  if (!workId || !worksData[workId]) {
    document.getElementById("work-content-area").innerHTML = `<p class="text-center py-20 text-slate-500 font-bold">Case Study Not Found</p>`;
    return;
  }
  
  const work = worksData[workId];
  document.title = `${work.title[currentLang]} | Omnix Network`;
  
  const titleEl = document.getElementById("work-detail-title");
  const clientEl = document.getElementById("work-detail-client");
  const durationEl = document.getElementById("work-detail-duration");
  const metricsEl = document.getElementById("work-detail-metrics");
  const imageEl = document.getElementById("work-detail-image");
  const contentEl = document.getElementById("work-detail-content");
  
  if (titleEl) titleEl.innerText = work.title[currentLang];
  if (clientEl) clientEl.innerText = work.client;
  if (durationEl) durationEl.innerText = work.duration;
  if (metricsEl) metricsEl.innerText = work.metrics[currentLang];
  if (imageEl) {
    imageEl.src = work.image;
    imageEl.alt = work.title[currentLang];
  }
  if (contentEl) {
    contentEl.innerHTML = work.details[currentLang];
  }

  // Bind WhatsApp Lead Button dynamically
  const waBtn = document.getElementById("work-wa-btn");
  if (waBtn) {
    const textMessage = `Hi Omnix Network, I read your case study on "${work.title.en}" and am interested in seeing similar results for my business.`;
    waBtn.href = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(textMessage)}`;
  }
}

// Service details rendering
function renderServiceDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const serviceId = urlParams.get("id");
  if (!serviceId || !servicesData[serviceId]) {
    document.getElementById("service-content-area").innerHTML = `<p class="text-center py-20 text-slate-500 font-bold">Service Details Not Found</p>`;
    return;
  }
  
  const service = servicesData[serviceId];
  document.title = `${service.title[currentLang]} | Omnix Network`;
  
  const titleEl = document.getElementById("service-detail-title");
  const descEl = document.getElementById("service-detail-desc");
  const imageEl = document.getElementById("service-detail-image");
  const benefitsEl = document.getElementById("service-detail-benefits");
  
  if (titleEl) titleEl.innerText = service.title[currentLang];
  if (descEl) descEl.innerText = service.desc[currentLang];
  if (imageEl) {
    imageEl.src = service.image;
    imageEl.alt = service.title[currentLang];
  }
  if (benefitsEl) {
    benefitsEl.innerHTML = service.benefits[currentLang];
  }

  // Bind WhatsApp Lead Button dynamically
  const waBtn = document.getElementById("service-wa-btn");
  if (waBtn) {
    const textMessage = `Hi Omnix Network, I want to book a consultation for your "${service.title.en}" service. Please let me know how to proceed.`;
    waBtn.href = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(textMessage)}`;
  }
}

// Package details rendering
function renderPackageDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const packageId = urlParams.get("id");
  if (!packageId || !packagesData[packageId]) {
    document.getElementById("package-content-area").innerHTML = `<p class="text-center py-20 text-slate-500 font-bold">Package Details Not Found</p>`;
    return;
  }
  
  const pkg = packagesData[packageId];
  document.title = `${pkg.title[currentLang]} | Omnix Network`;
  
  const titleEl = document.getElementById("package-detail-title");
  const typeEl = document.getElementById("package-detail-type");
  const descEl = document.getElementById("package-detail-desc");
  const featuresEl = document.getElementById("package-detail-features");
  
  if (titleEl) titleEl.innerText = pkg.title[currentLang];
  if (typeEl) typeEl.innerText = pkg.type;
  if (descEl) descEl.innerText = pkg.desc[currentLang];
  if (featuresEl) {
    featuresEl.innerHTML = pkg.features[currentLang];
  }

  // Bind WhatsApp Lead Button dynamically
  const waBtn = document.getElementById("package-wa-btn");
  if (waBtn) {
    const textMessage = `Hi Omnix Network, I am interested in ordering your "${pkg.title.en}" packages. Please share pricing and timelines.`;
    waBtn.href = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(textMessage)}`;
  }
}

// Enquiry Popup Modal HTML Markup
const modalHtml = `
<div id="enquiry-modal" class="fixed inset-0 z-[9999] hidden items-center justify-center p-4">
  <!-- Backdrop -->
  <div id="enquiry-modal-backdrop" class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 opacity-0"></div>
  
  <!-- Content Card -->
  <div id="enquiry-modal-card" class="relative bg-white w-full max-w-lg rounded-2xl border border-slate-200 shadow-2xl p-6 md:p-8 transform scale-95 opacity-0 transition-all duration-300 z-10 max-h-[90vh] overflow-y-auto">
    <!-- Close Button -->
    <button id="enquiry-modal-close" class="absolute top-4 right-4 text-slate-400 hover:text-slate-650 transition-colors w-8 h-8 rounded-full flex items-center justify-center bg-slate-50 hover:bg-slate-100">
      <i class="fas fa-times text-sm"></i>
    </button>
    
    <div class="space-y-4 text-left">
      <div class="flex items-center space-x-2 text-brand-accent text-xs font-bold uppercase tracking-wider">
        <i class="fas fa-paper-plane"></i>
        <span data-translate="popup-badge">Quick Consultation</span>
      </div>
      <h3 class="text-2xl font-bold font-display text-slate-900 leading-tight" data-translate="popup-title">Start Your Project</h3>
      <p class="text-slate-550 text-xs leading-relaxed" data-translate="popup-desc">
        Let us know what you need and our campaign planners will respond within 2 hours.
      </p>
      
      <!-- Lead Form -->
      <form id="enquiry-popup-form" class="space-y-4 pt-2">
        <div>
          <label class="block text-[10px] font-bold uppercase text-slate-400 mb-1" data-translate="popup-form-name">Your Name</label>
          <input type="text" id="eq-name" required class="w-full px-3.5 py-2.5 rounded-lg border border-slate-250 text-xs focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none bg-slate-50/50" placeholder="e.g. Riazul Islam" />
        </div>
        <div>
          <label class="block text-[10px] font-bold uppercase text-slate-400 mb-1" data-translate="popup-form-phone">Phone Number</label>
          <input type="tel" id="eq-phone" required class="w-full px-3.5 py-2.5 rounded-lg border border-slate-250 text-xs focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none bg-slate-50/50" placeholder="e.g. 017xxxxxxxx" />
        </div>
        <div>
          <label class="block text-[10px] font-bold uppercase text-slate-400 mb-1" data-translate="popup-form-service">Select Service</label>
          <select id="eq-service" class="w-full px-3.5 py-2.5 rounded-lg border border-slate-250 text-xs focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none bg-slate-50/50">
            <option value="General inquiry">General Inquiry</option>
            <option value="360 Digital Marketing">360° Digital Marketing</option>
            <option value="Search Engine Optimization (SEO)">Search Engine Optimization (SEO)</option>
            <option value="Social Media Marketing (SMM)">Social Media Marketing (SMM)</option>
            <option value="Website Development">Website Development</option>
            <option value="Mobile App Development">Mobile App Development</option>
          </select>
        </div>
        <div>
          <label class="block text-[10px] font-bold uppercase text-slate-400 mb-1" data-translate="popup-form-message">Brief Details</label>
          <textarea id="eq-msg" rows="3" class="w-full px-3.5 py-2.5 rounded-lg border border-slate-250 text-xs focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent outline-none bg-slate-50/50" placeholder="Let us know your goals..."></textarea>
        </div>
        
        <button type="submit" class="w-full py-3 bg-brand-darkText hover:bg-brand-accent text-white font-bold rounded-lg text-xs transition-colors duration-300 flex items-center justify-center gap-2 shadow-md uppercase tracking-wider">
          <span data-translate="popup-form-submit">Submit Inquiry via WhatsApp</span>
          <i class="fab fa-whatsapp text-sm text-green-400 animate-pulse"></i>
        </button>
      </form>
    </div>
  </div>
</div>
`;

function initEnquiryPopup() {
  if (!document.getElementById("enquiry-modal")) {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = modalHtml;
    document.body.appendChild(wrapper.firstElementChild);
  }
  
  const modal = document.getElementById("enquiry-modal");
  const backdrop = document.getElementById("enquiry-modal-backdrop");
  const card = document.getElementById("enquiry-modal-card");
  const closeBtn = document.getElementById("enquiry-modal-close");
  const form = document.getElementById("enquiry-popup-form");
  
  function showModal() {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    setTimeout(() => {
      backdrop.classList.remove("opacity-0");
      backdrop.classList.add("opacity-100");
      card.classList.remove("scale-95", "opacity-0");
      card.classList.add("scale-100", "opacity-100");
    }, 10);
  }
  
  function hideModal() {
    backdrop.classList.remove("opacity-100");
    backdrop.classList.add("opacity-0");
    card.classList.remove("scale-100", "opacity-100");
    card.classList.add("scale-95", "opacity-0");
    setTimeout(() => {
      modal.classList.remove("flex");
      modal.classList.add("hidden");
    }, 300);
  }
  
  if (closeBtn) closeBtn.addEventListener("click", hideModal);
  if (backdrop) backdrop.addEventListener("click", hideModal);
  
  // Intercept Enquiry Link Clicks (nav-cta triggers, hero triggers, etc.)
  document.querySelectorAll('a[href="#contact"], a[href="#calculator-cta"]').forEach(el => {
    if (!window.location.pathname.endsWith("contact.html")) {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        showModal();
      });
    }
  });

  // Specifically intercept the nav CTA buttons (Make An Enquiry)
  document.querySelectorAll('[data-translate="nav-cta"]').forEach(span => {
    const link = span.closest('a');
    if (link && !window.location.pathname.endsWith("contact.html")) {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        showModal();
      });
    }
  });

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("eq-name").value;
      const phone = document.getElementById("eq-phone").value;
      const service = document.getElementById("eq-service").value;
      const msg = document.getElementById("eq-msg").value;
      
      const whatsappText = `Hi Omnix Network,\n\nI want to make an enquiry.\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Service:* ${service}\n*Details:* ${msg}`;
      const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(whatsappText)}`;
      
      hideModal();
      window.open(waUrl, "_blank");
    });
  }
}

// Global Cleanup for Why Us
function removeWhyUsNavigation() {
  document.querySelectorAll('[data-translate="nav-why"]').forEach(el => el.remove());
}

// Floating WhatsApp button HTML
const whatsappFloatingHtml = `
<a href="https://wa.me/${WHATSAPP_PHONE}" target="_blank" id="wa-floating-btn" class="fixed bottom-6 right-6 z-[9999] w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-95 group" aria-label="Chat on WhatsApp">
  <i class="fab fa-whatsapp text-3xl"></i>
  <span class="absolute right-16 bg-slate-900 text-white text-[10px] font-bold px-2.5 py-1 rounded shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
    Chat on WhatsApp
  </span>
</a>
`;

function injectFloatingWhatsapp() {
  if (!document.getElementById("wa-floating-btn")) {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = whatsappFloatingHtml;
    document.body.appendChild(wrapper.firstElementChild);
  }
}

// Intercept services dropdown link clicks to point to service-details.html
function interceptServicesDropdown() {
  document.querySelectorAll('a[href^="services.html#s"]').forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const href = link.getAttribute("href");
      const id = href.split("#")[1];
      window.location.href = `service-details.html?id=${id}`;
    });
  });
}

// Register on load
window.addEventListener("DOMContentLoaded", () => {
  initEnquiryPopup();
  removeWhyUsNavigation();
  injectFloatingWhatsapp();
  interceptServicesDropdown();
});


