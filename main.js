document.addEventListener('DOMContentLoaded', () => {
    initProjects();
    initProjectFilter();
    initModal();
    initMobileNav();
    initLanguageSwitcher();
});

let currentProject = null;
let currentImageIndex = 0;
let currentLang = localStorage.getItem('portfolio_lang') || 'tr';

const TRANSLATIONS = {
    tr: {
        nav_about: "Hakkımda",
        nav_skills: "Teknolojiler",
        nav_projects: "Projeler",
        nav_experience: "Deneyim",
        nav_contact: "İletişim",
        nav_cv: "CV 📄",

        hero_talk_badge: "HAYDİ İLETİŞİME GEÇELİM..",
        hero_subtitle: "TECHNICAL IT LEADER / SENIOR FULL-STACK ENGINEER",
        hero_btn_projects: "Projelerimi Gör ↘",
        hero_btn_cv: "CV (PDF) 📄",
        hero_btn_contact: "İletişime Geç ✉",
        hero_strip_exp: "6+ Yıl Deneyim",

        about_tag: "// 01. ABOUT ME",
        about_title: "Mühendislik & Ürün Yönetimi",
        about_subtitle: "Teknoloji, iş stratejisi ve kullanıcı deneyiminin kesiştiği noktada ölçeklenebilir çözümler üretiyorum.",
        about_bio_title: "Hakan Emre Çavuş Kimdir?",
        about_bio_p1: "Technical IT Lead ve Senior Full-Stack Engineer olarak 6 yılı aşkın süredir üretim, finans ve kurumsal teknoloji alanlarında yüksek performanslı sistemler inşa ediyorum.",
        about_bio_p2: ".NET Core, C#, Java / Spring Boot, Angular, React.js ve SAP Business One entegrasyonlarıyla fabrika otomasyonundan SaaS ürünlerine kadar geniş bir yelpazede yazılımlar tasarladım.",
        about_cv_title: "Hakan Emre Çavuş — Özgeçmiş (CV)",
        about_cv_desc: "Detaylı kariyer ve teknik uzmanlık özetim için PDF CV'mi indirebilirsiniz.",
        about_cv_btn: "CV (PDF) 📄",
        about_focus_title: "Odaklandığım Uzmanlık Alanları",
        about_pill_rest: "REST API Entegrasyonu",
        about_pill_rfid: "RFID Envanter Otomasyonu",
        skills_tag: "// 02. TECH STACK",
        skills_title: "Kullandığım Teknolojiler",
        skills_subtitle: "Güvenilir, yüksek performanslı ve modern araçlar ekosistemi.",
        skills_cat_backend: "Backend & Kurumsal",
        skills_cat_frontend: "Frontend & Mobil",
        skills_cat_erp: "ERP & Entegrasyon & Veri",
        skills_cat_smart: "Smart Manufacturing & AI",
        skills_pill_rfid: "RFID Otomasyonu",
        skills_pill_llm: "LLM / AI Ajanları",

        projects_tag: "// 03. SELECTED WORK",
        projects_title: "Seçilmiş Projeler",
        projects_subtitle: "Kurumsal ERP portalından AI destekli analiz araçlarına kadar geliştirdiğim projeler. Detay ve görseller için kartlara tıklayın.",
        filter_all: "Tümü",
        filter_enterprise: "Enterprise & ERP",
        filter_saas: "SaaS",
        filter_ai: "Yapay Zekâ (AI)",
        filter_mobile: "Mobil",
        projects_empty: "Seçilen kategoride henüz proje bulunmuyor.",
        card_view_details: "Detayları İncele",
        badge_details: "🔍 Detaylar",
        badge_images: "Görsel",

        exp_tag: "// 04. EXPERIENCE",
        exp_title: "Deneyim & Kariyer",
        exp_subtitle: "Kurumsal liderlik ve yazılım mühendisliği yolculuğum.",
        exp1_role: "Technical IT Leader",
        exp1_company: "EplePlast Packaging · İzmir",
        exp1_date: "07/2025 — Present",
        exp1_desc: "Smart Manufacturing ve kaynak optimizasyonu odaklı dijital dönüşüm yol haritasını yönettim. Üretim hatlarıyla entegre kurumsal uygulamalar geliştirerek %99.9 uptime sağladım; otomasyon ve sistem konsolidasyonu ile yazılım maliyetlerini %70 azalttım. RFID tabanlı envanter otomasyonu ile stok doğruluğunu %98'e çıkardım.",
        exp2_role: "Senior Full-Stack Developer",
        exp2_company: "BilgeAdam Technology · Outsource – Garanti BBVA Technology",
        exp2_date: "04/2024 — 07/2025",
        exp2_desc: "7.000+ aktif kullanıcıyı destekleyen User Management System geliştirdim. Java Spring Boot servislerini güvenlik standartlarına uygun şekilde optimize ettim ve C# / Entity Framework Core optimizasyonları ile Asset Management modülünün response sürelerini %70 iyileştirdim.",
        exp3_role: "Full-Stack Developer",
        exp3_company: "Eropa · SAP Business One Solutions · İzmir",
        exp3_date: "08/2022 — 10/2023",
        exp3_desc: "Ekip verimliliğini %35 artıran task management platformu geliştirdim. Flutter ile gerçek zamanlı üretim verisi toplayan mobil SAP araçları geliştirdim ve optimize API mimarisiyle veri işleme sürelerini %50 azalttım.",
        exp4_role: "Software Developer",
        exp4_company: "Erze Packaging · İzmir",
        exp4_date: "08/2020 — 08/2022",
        exp4_desc: "SAP REST API kullanan ERZE_SAP entegrasyon katmanını geliştirdim. Yüksek hacimli üretim süreçlerini özel .NET çözümleriyle otomatikleştirdim ve sistem optimizasyonu ile SAP lisans maliyetlerinde yıllık %50 düşüş sağladım.",

        contact_tag: "// 05. CONTACT ME",
        contact_title: "Benimle<br>İletişime Geçin.",
        contact_desc: "Yazılım geliştirme, kurumsal sistemler, SaaS ürünleri veya iş birliği fırsatları için doğrudan bana ulaşabilirsiniz.",
        contact_email_btn: "E-posta Gönder ✉",
        contact_cv_btn: "CV (PDF) 📄",

        footer_rights: "© 2026 Hakan Emre Çavuş",
        footer_degree: "B.Sc. Computer Engineering · İzmir University of Economics · MÜDEK / Washington Accord",

        modal_about_title: "Proje Hakkında",
        modal_features_title: "Öne Çıkan Özellikler & Çözümler",
        modal_tech_title: "Kullanılan Teknolojiler & Araçlar",
        modal_placeholder_desc: "Proje detayları ve teknik mimari yukarıda özetlenmiştir.",
        modal_close_label: "Pop-up Kapat",
        modal_live_demo: "Canlı Demo",
        modal_github: "GitHub Repository"
    },
    en: {
        nav_about: "About",
        nav_skills: "Tech Stack",
        nav_projects: "Projects",
        nav_experience: "Experience",
        nav_contact: "Contact",
        nav_cv: "Resume 📄",

        hero_talk_badge: "LET'S GET IN TOUCH..",
        hero_subtitle: "TECHNICAL IT LEADER / SENIOR FULL-STACK ENGINEER",
        hero_btn_projects: "View Projects ↘",
        hero_btn_cv: "Resume (PDF) 📄",
        hero_btn_contact: "Get in Touch ✉",
        hero_strip_exp: "6+ Years Experience",

        about_tag: "// 01. ABOUT ME",
        about_title: "Engineering & Product Leadership",
        about_subtitle: "Building scalable solutions at the intersection of technology, business strategy, and user experience.",
        about_bio_title: "Who is Hakan Emre Çavuş?",
        about_bio_p1: "As a Technical IT Lead & Senior Full-Stack Engineer with over 6 years of experience, I build high-performance software systems across manufacturing, fintech, and enterprise technology.",
        about_bio_p2: "I architect solutions ranging from smart manufacturing automation to cloud SaaS products using .NET Core, C#, Java / Spring Boot, Angular, React.js, and SAP Business One integrations.",
        about_cv_title: "Hakan Emre Çavuş — Resume",
        about_cv_desc: "Download my PDF Resume for a comprehensive summary of my career history and technical expertise.",
        about_cv_btn: "Resume (PDF) 📄",
        about_focus_title: "Core Engineering Specializations",
        about_pill_rest: "REST API Integration",
        about_pill_rfid: "RFID Inventory Automation",

        skills_tag: "// 02. TECH STACK",
        skills_title: "Technologies & Ecosystem",
        skills_subtitle: "A robust, high-performance ecosystem of modern engineering tools.",
        skills_cat_backend: "Backend & Enterprise",
        skills_cat_frontend: "Frontend & Mobile",
        skills_cat_erp: "ERP & Integration & Data",
        skills_cat_smart: "Smart Manufacturing & AI",
        skills_pill_rfid: "RFID Automation",
        skills_pill_llm: "LLM / AI Agents",

        projects_tag: "// 03. SELECTED WORK",
        projects_title: "Featured Projects",
        projects_subtitle: "Selected engineering projects ranging from enterprise ERP portals to AI-driven analytical platforms. Click cards for details.",
        filter_all: "All",
        filter_enterprise: "Enterprise & ERP",
        filter_saas: "SaaS",
        filter_ai: "Artificial Intelligence (AI)",
        filter_mobile: "Mobile",
        projects_empty: "No projects found in the selected category.",
        card_view_details: "View Details",
        badge_details: "🔍 Details",
        badge_images: "Images",

        exp_tag: "// 04. EXPERIENCE",
        exp_title: "Experience & Career",
        exp_subtitle: "My journey in engineering leadership and software development.",
        exp1_role: "Technical IT Leader",
        exp1_company: "EplePlast Packaging · Izmir",
        exp1_date: "07/2025 — Present",
        exp1_desc: "Spearheaded the digital transformation roadmap focused on Smart Manufacturing and resource optimization. Architected shop-floor integrated enterprise applications achieving 99.9% uptime; reduced software licensing costs by 70% via consolidation. Elevated inventory accuracy to 98% by deploying RFID-based asset automation.",
        exp2_role: "Senior Full-Stack Developer",
        exp2_company: "BilgeAdam Technology · Outsource – Garanti BBVA Technology",
        exp2_date: "04/2024 — 07/2025",
        exp2_desc: "Engineered an enterprise User Management System supporting 7,000+ active enterprise users. Optimized Java Spring Boot microservices in compliance with banking security standards and reduced API response latencies by 70% in the Asset Management module through C# / Entity Framework Core tuning.",
        exp3_role: "Full-Stack Developer",
        exp3_company: "Eropa · SAP Business One Solutions · Izmir",
        exp3_date: "08/2022 — 10/2023",
        exp3_desc: "Built a collaborative task management platform boosting team efficiency by 35%. Developed real-time shop-floor mobile SAP applications with Flutter, cutting data processing latency by 50% via optimized API architecture.",
        exp4_role: "Software Developer",
        exp4_company: "Erze Packaging · Izmir",
        exp4_date: "08/2020 — 08/2022",
        exp4_desc: "Developed the ERZE_SAP integration layer powered by SAP REST API. Automated high-volume manufacturing workflows using custom .NET applications, driving a 50% reduction in annual SAP licensing overhead.",

        contact_tag: "// 05. CONTACT ME",
        contact_title: "Get in Touch<br>With Me.",
        contact_desc: "Feel free to reach out directly for software engineering leadership, enterprise solutions, SaaS products, or collaboration opportunities.",
        contact_email_btn: "Send Email ✉",
        contact_cv_btn: "Resume (PDF) 📄",

        footer_rights: "© 2026 Hakan Emre Çavuş",
        footer_degree: "B.Sc. Computer Engineering · Izmir University of Economics · MÜDEK / Washington Accord",

        modal_about_title: "About Project",
        modal_features_title: "Key Features & Solutions",
        modal_tech_title: "Technologies & Tools Used",
        modal_placeholder_desc: "Project details and technical architecture are summarized above.",
        modal_close_label: "Close Pop-up",
        modal_live_demo: "Live Demo",
        modal_github: "GitHub Repository"
    }
};

function initLanguageSwitcher() {
    setLanguage(currentLang);

    const toggleBtns = document.querySelectorAll('#lang-switch-btn');
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const nextLang = currentLang === 'tr' ? 'en' : 'tr';
            setLanguage(nextLang);
        });
    });
}

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('portfolio_lang', lang);
    document.documentElement.lang = lang;

    // Update active state on language toggle buttons
    const toggleBtns = document.querySelectorAll('#lang-switch-btn');
    toggleBtns.forEach(btn => {
        const trOpt = btn.querySelector('.lang-tr');
        const enOpt = btn.querySelector('.lang-en');
        if (trOpt && enOpt) {
            if (lang === 'tr') {
                trOpt.classList.add('active');
                enOpt.classList.remove('active');
            } else {
                enOpt.classList.add('active');
                trOpt.classList.remove('active');
            }
        }
    });

    // Update all elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key] !== undefined) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = TRANSLATIONS[lang][key];
            } else {
                el.innerHTML = TRANSLATIONS[lang][key];
            }
        }
    });

    // Re-render project cards according to active category filter
    const activeFilterBtn = document.querySelector('.filter-btn.active');
    const activeCategory = activeFilterBtn ? activeFilterBtn.getAttribute('data-filter') : 'all';
    if (activeCategory === 'all') {
        renderProjects(PROJECTS_DATA);
    } else {
        renderProjects(PROJECTS_DATA.filter(p => p.category === activeCategory));
    }

    // Re-render modal if open
    const modal = document.getElementById('project-modal');
    if (modal && modal.classList.contains('active') && currentProject) {
        openProjectModal(currentProject.id);
    }
}

function initProjects() {
    const projectsContainer = document.getElementById('projects-grid');
    if (!projectsContainer) return;
    renderProjects(PROJECTS_DATA);
}

function renderProjects(projects) {
    const projectsContainer = document.getElementById('projects-grid');
    if (!projectsContainer) return;

    if (projects.length === 0) {
        projectsContainer.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 50px 20px; color: var(--text-muted); background: #ffffff; border-radius: 20px; border: 1px solid var(--border-light);">
                ${TRANSLATIONS[currentLang].projects_empty}
            </div>
        `;
        return;
    }

    projectsContainer.innerHTML = projects.map(project => {
        const hasImages = project.images && project.images.length > 0;
        const coverStyle = hasImages 
            ? `background-image: url('${project.images[0]}'); background-size: cover; background-position: center;`
            : `background: ${project.gradient || 'linear-gradient(135deg, #e6fffa, #ebf8ff)'};`;

        const title = typeof project.title === 'object' ? (project.title[currentLang] || project.title.tr) : project.title;
        const tag = typeof project.tag === 'object' ? (project.tag[currentLang] || project.tag.tr) : project.tag;
        const summary = typeof project.summary === 'object' ? (project.summary[currentLang] || project.summary.tr) : project.summary;

        const badgeText = hasImages 
            ? `📷 ${project.images.length} ${TRANSLATIONS[currentLang].badge_images}` 
            : `${TRANSLATIONS[currentLang].badge_details}`;

        return `
            <article class="sewood-card" data-id="${project.id}" data-category="${project.category}" onclick="openProjectModal('${project.id}')">
                <div class="card-cover" style="${coverStyle}">
                    ${!hasImages ? `<div class="cover-icon-wrapper"><span class="cover-icon">${project.icon || '🚀'}</span></div>` : ''}
                    <div class="card-tag-badge">${tag}</div>
                </div>
                <div class="card-body">
                    <div class="card-header">
                        <h3>${title}</h3>
                        <span class="card-visual-pill">${badgeText}</span>
                    </div>
                    <p class="card-desc">${summary}</p>
                    <div class="card-tech-stack">
                        ${project.tech.slice(0, 4).map(t => `<span>${t}</span>`).join('')}
                        ${project.tech.length > 4 ? `<span class="more-tech">+${project.tech.length - 4}</span>` : ''}
                    </div>
                    <div class="card-action">
                        <span>${TRANSLATIONS[currentLang].card_view_details}</span>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="7" y1="17" x2="17" y2="7"></line>
                            <polyline points="7 7 17 7 17 17"></polyline>
                        </svg>
                    </div>
                </div>
            </article>
        `;
    }).join('');
}

function initProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.getAttribute('data-filter');
            if (category === 'all') {
                renderProjects(PROJECTS_DATA);
            } else {
                const filtered = PROJECTS_DATA.filter(p => p.category === category);
                renderProjects(filtered);
            }
        });
    });
}

function initModal() {
    const modal = document.getElementById('project-modal');
    const closeBtn = document.getElementById('modal-close');
    const overlay = document.getElementById('modal-overlay');

    if (!modal) return;

    if (closeBtn) closeBtn.addEventListener('click', closeProjectModal);
    if (overlay) overlay.addEventListener('click', closeProjectModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeProjectModal();
        }
    });
}

window.openProjectModal = function(projectId) {
    const project = PROJECTS_DATA.find(p => p.id === projectId);
    if (!project) return;

    currentProject = project;
    currentImageIndex = 0;

    const modal = document.getElementById('project-modal');
    const titleEl = document.getElementById('modal-title');
    const tagEl = document.getElementById('modal-tag');
    const descEl = document.getElementById('modal-desc');
    const featuresEl = document.getElementById('modal-features');
    const techEl = document.getElementById('modal-tech');
    const linksEl = document.getElementById('modal-links');

    const title = typeof project.title === 'object' ? (project.title[currentLang] || project.title.tr) : project.title;
    const tag = typeof project.tag === 'object' ? (project.tag[currentLang] || project.tag.tr) : project.tag;
    const description = typeof project.description === 'object' ? (project.description[currentLang] || project.description.tr) : project.description;
    const features = typeof project.features === 'object' ? (project.features[currentLang] || project.features.tr) : project.features;

    if (titleEl) titleEl.textContent = title;
    if (tagEl) tagEl.textContent = tag;
    if (descEl) descEl.textContent = description;

    if (featuresEl) {
        featuresEl.innerHTML = features.map(f => `
            <li>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${project.accentColor || '#10b981'}" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>${f}</span>
            </li>
        `).join('');
    }

    if (techEl) {
        techEl.innerHTML = project.tech.map(t => `<span class="skill-pill">${t}</span>`).join('');
    }

    if (linksEl) {
        let linksHtml = '';
        if (project.links && project.links.github) {
            linksHtml += `<a href="${project.links.github}" target="_blank" class="btn btn-outline-dark">${TRANSLATIONS[currentLang].modal_github}</a>`;
        }
        if (project.links && project.links.demo) {
            linksHtml += `<a href="${project.links.demo}" target="_blank" class="btn btn-green-fill">${TRANSLATIONS[currentLang].modal_live_demo}</a>`;
        }
        linksEl.innerHTML = linksHtml;
    }

    renderModalGallery();

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
};

function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function renderModalGallery() {
    const galleryContainer = document.getElementById('modal-gallery-wrapper');
    if (!galleryContainer || !currentProject) return;

    const images = currentProject.images || [];

    if (images.length === 0) {
        const title = typeof currentProject.title === 'object' ? (currentProject.title[currentLang] || currentProject.title.tr) : currentProject.title;
        galleryContainer.innerHTML = `
            <div class="gallery-placeholder" style="background: ${currentProject.gradient || '#f8fafc'}">
                <div class="placeholder-icon-large">${currentProject.icon || '🚀'}</div>
                <h4>${title}</h4>
                <p>${TRANSLATIONS[currentLang].modal_placeholder_desc}</p>
            </div>
        `;
        return;
    }

    const title = typeof currentProject.title === 'object' ? (currentProject.title[currentLang] || currentProject.title.tr) : currentProject.title;
    galleryContainer.innerHTML = `
        <div class="carousel-container">
            <div class="carousel-slide">
                <img src="${images[currentImageIndex]}" alt="${title} ${currentImageIndex + 1}" class="carousel-img" onclick="openFullscreenImage('${images[currentImageIndex]}')">
            </div>

            ${images.length > 1 ? `
                <button class="carousel-btn prev" onclick="changeSlide(-1)">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </button>
                <button class="carousel-btn next" onclick="changeSlide(1)">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </button>
                <div class="carousel-dots">
                    ${images.map((_, idx) => `
                        <span class="dot ${idx === currentImageIndex ? 'active' : ''}" onclick="goToSlide(${idx})"></span>
                    `).join('')}
                </div>
                <div class="carousel-counter">${currentImageIndex + 1} / ${images.length}</div>
            ` : ''}
        </div>
    `;
}

window.changeSlide = function(direction) {
    if (!currentProject || !currentProject.images.length) return;
    const total = currentProject.images.length;
    currentImageIndex = (currentImageIndex + direction + total) % total;
    renderModalGallery();
};

window.goToSlide = function(index) {
    if (!currentProject || !currentProject.images.length) return;
    currentImageIndex = index;
    renderModalGallery();
};

window.openFullscreenImage = function(imgSrc) {
    window.open(imgSrc, '_blank');
};

function initMobileNav() {
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (!toggleBtn || !navLinks) return;

    toggleBtn.addEventListener('click', () => {
        toggleBtn.classList.toggle('open');
        navLinks.classList.toggle('active');
    });

    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            toggleBtn.classList.remove('open');
            navLinks.classList.remove('active');
        });
    });
}
