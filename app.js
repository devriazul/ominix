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
    "nav-stories": "Stories",
    "nav-faq": "FAQs",
    "nav-contact": "Contact",
    "nav-cta": "Make An Enquiry",

    // Hero
    "hero-badge": "Growth & ROI Engineered",
    "hero-title-1": "Scale Your Business with",
    "hero-title-2": "Next-Gen Digital Marketing",
    "hero-description": "Omnix Network helps modern businesses grow their digital presence, dominate organic search, run high-yield advertising campaigns, and convert audiences into loyal clients.",
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
    "footer-status": "Engineered with high performance systems"
  },
  bn: {
    // Navigation
    "nav-about": "সম্পর্কে",
    "nav-services": "সেবাসমূহ",
    "nav-packages": "প্যাকেজসমূহ",
    "nav-portfolio": "প্রজেক্টসমূহ",
    "nav-why": "কেন আমরা",
    "nav-stories": "ব্লগ ও গল্প",
    "nav-faq": "জিজ্ঞাসা",
    "nav-contact": "যোগাযোগ",
    "nav-cta": "অনুসন্ধান করুন",

    // Hero
    "hero-badge": "গ্রোথ এবং আরওআই গ্যারান্টিযুক্ত",
    "hero-title-1": "আপনার ব্যবসাকে বৃদ্ধি করুন",
    "hero-title-2": "আধুনিক ডিজিটাল মার্কেটিং দ্বারা",
    "hero-description": "ওমনিক্স নেটওয়ার্ক আধুনিক ব্যবসাগুলোকে তাদের ডিজিটাল উপস্থিতি বাড়াতে, অর্গানিক সার্চে আধিপত্য বিস্তার করতে, লাভজনক বিজ্ঞাপন চালাতে এবং শ্রোতাদের অনুগত গ্রাহকে রূপান্তর করতে সহায়তা করে।",
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
    "footer-status": "হাই-পারফরম্যান্স সিস্টেমের সাথে পরিচালিত"
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

if (window.innerWidth > 768) {
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

mobileMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

document.querySelectorAll("#mobile-menu a").forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
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
});
