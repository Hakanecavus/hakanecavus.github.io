document.addEventListener('DOMContentLoaded', () => {
    initProjects();
    initProjectFilter();
    initModal();
    initMobileNav();
});

let currentProject = null;
let currentImageIndex = 0;

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
                Seçilen kategoride henüz proje bulunmuyor.
            </div>
        `;
        return;
    }

    projectsContainer.innerHTML = projects.map(project => {
        const hasImages = project.images && project.images.length > 0;
        const coverStyle = hasImages 
            ? `background-image: url('${project.images[0]}'); background-size: cover; background-position: center;`
            : `background: ${project.gradient || 'linear-gradient(135deg, #e6fffa, #ebf8ff)'};`;

        const badgeText = hasImages ? `📷 ${project.images.length} Görsel` : '🔍 Detaylar';

        return `
            <article class="sewood-card" data-id="${project.id}" data-category="${project.category}" onclick="openProjectModal('${project.id}')">
                <div class="card-cover" style="${coverStyle}">
                    ${!hasImages ? `<div class="cover-icon-wrapper"><span class="cover-icon">${project.icon || '🚀'}</span></div>` : ''}
                    <div class="card-tag-badge">${project.tag}</div>
                </div>
                <div class="card-body">
                    <div class="card-header">
                        <h3>${project.title}</h3>
                        <span class="card-visual-pill">${badgeText}</span>
                    </div>
                    <p class="card-desc">${project.summary}</p>
                    <div class="card-tech-stack">
                        ${project.tech.slice(0, 4).map(t => `<span>${t}</span>`).join('')}
                        ${project.tech.length > 4 ? `<span class="more-tech">+${project.tech.length - 4}</span>` : ''}
                    </div>
                    <div class="card-action">
                        <span>Detayları İncele</span>
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

    if (titleEl) titleEl.textContent = project.title;
    if (tagEl) tagEl.textContent = project.tag;
    if (descEl) descEl.textContent = project.description;

    if (featuresEl) {
        featuresEl.innerHTML = project.features.map(f => `
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
            linksHtml += `<a href="${project.links.github}" target="_blank" class="btn btn-outline-dark">GitHub Repository</a>`;
        }
        if (project.links && project.links.demo) {
            linksHtml += `<a href="${project.links.demo}" target="_blank" class="btn btn-green-fill">Canlı Demo</a>`;
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
        galleryContainer.innerHTML = `
            <div class="gallery-placeholder" style="background: ${currentProject.gradient || '#f8fafc'}">
                <div class="placeholder-icon-large">${currentProject.icon || '🚀'}</div>
                <h4>${currentProject.title}</h4>
                <p>Proje detayları ve teknik mimari yukarıda özetlenmiştir.</p>
            </div>
        `;
        return;
    }

    galleryContainer.innerHTML = `
        <div class="carousel-container">
            <div class="carousel-slide">
                <img src="${images[currentImageIndex]}" alt="${currentProject.title} ${currentImageIndex + 1}" class="carousel-img" onclick="openFullscreenImage('${images[currentImageIndex]}')">
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
