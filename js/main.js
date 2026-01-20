// Theme Manager
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.themeIcon = document.querySelector('.theme-icon');
        this.currentTheme = this.getPreferredTheme();
        this.init();
    }

    init() {
        // Apply saved theme or default to system preference
        this.applyTheme(this.currentTheme);
        this.setupEventListeners();
    }

    getPreferredTheme() {
        // Check if user has a saved preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme;
        }

        // Default to system preference
        return 'system';
    }

    getSystemTheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    applyTheme(theme) {
        this.currentTheme = theme;
        localStorage.setItem('theme', theme);

        if (theme === 'system') {
            const systemTheme = this.getSystemTheme();
            document.documentElement.setAttribute('data-theme', systemTheme);
            this.updateIcon();
        } else {
            document.documentElement.setAttribute('data-theme', theme);
            this.updateIcon();
        }
    }

    updateIcon() {
        if (!this.themeIcon) return;

        if (this.currentTheme === 'system') {
            this.themeIcon.textContent = '💫'; // System icon
        } else if (this.currentTheme === 'dark') {
            this.themeIcon.textContent = '☀️'; // Sun for switching to light
        } else {
            this.themeIcon.textContent = '🌙'; // Moon for switching to dark
        }
    }

    cycleTheme() {
        // Cycle through: light -> dark -> system
        if (this.currentTheme === 'light') {
            this.applyTheme('dark');
        } else if (this.currentTheme === 'dark') {
            this.applyTheme('system');
        } else {
            this.applyTheme('light');
        }
    }

    setupEventListeners() {
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.cycleTheme());
        }

        // Listen for system theme changes when in system mode
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (this.currentTheme === 'system') {
                this.applyTheme('system');
            }
        });
    }
}

// Language Manager
class LanguageManager {
    constructor() {
        this.langToggle = document.getElementById('langToggle');
        this.langText = document.querySelector('.lang-text');
        this.translations = null;
        this.currentLang = this.getPreferredLanguage();
        this.init();
    }

    async init() {
        await this.loadTranslations();
        this.applyLanguage(this.currentLang);
        this.setupEventListeners();
    }

    async loadTranslations() {
        try {
            const response = await fetch('data/translations.json');
            this.translations = await response.json();
        } catch (error) {
            console.error('Error loading translations:', error);
            this.translations = null;
        }
    }

    getPreferredLanguage() {
        const savedLang = localStorage.getItem('language');
        if (savedLang) {
            return savedLang;
        }
        return 'hr'; // Default to Croatian
    }

    applyLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('language', lang);
        document.documentElement.setAttribute('lang', lang);

        this.updateButtonText();
        this.translatePage();
    }

    updateButtonText() {
        if (!this.langText) return;
        this.langText.textContent = this.currentLang === 'en' ? 'HR' : 'EN';
    }

    translatePage() {
        if (!this.translations || !this.translations[this.currentLang]) return;

        const t = this.translations[this.currentLang];

        // Update navigation
        this.updateText('[data-i18n="nav.home"]', t.nav.home);
        this.updateText('[data-i18n="nav.about"]', t.nav.about);
        this.updateText('[data-i18n="nav.work"]', t.nav.work);
        this.updateText('[data-i18n="nav.contact"]', t.nav.contact);

        // Update home page
        this.updateHTML('[data-i18n="home.heroTitle"]', t.home.heroTitle);
        this.updateText('[data-i18n="home.heroSubtitle"]', t.home.heroSubtitle);
        this.updateText('[data-i18n="home.ctaButton"]', t.home.ctaButton);
        this.updateText('[data-i18n="home.featuredWork"]', t.home.featuredWork);
        this.updateText('[data-i18n="home.aboutTitle"]', t.home.aboutTitle);
        this.updateText('[data-i18n="home.aboutText"]', t.home.aboutText);
        this.updateHTML('[data-i18n="home.learnMore"]', t.home.learnMore);

        // Update about page
        this.updateText('[data-i18n="about.pageTitle"]', t.about.pageTitle);
        this.updateText('[data-i18n="about.subtitle"]', t.about.subtitle);
        this.updateText('[data-i18n="about.bio"]', t.about.bio);
        this.updateText('[data-i18n="about.servicesTitle"]', t.about.servicesTitle);
        this.updateText('[data-i18n="about.portraitsTitle"]', t.about.portraitsTitle);
        this.updateText('[data-i18n="about.portraitsDesc"]', t.about.portraitsDesc);
        this.updateText('[data-i18n="about.landscapesTitle"]', t.about.landscapesTitle);
        this.updateText('[data-i18n="about.landscapesDesc"]', t.about.landscapesDesc);
        this.updateText('[data-i18n="about.eventsTitle"]', t.about.eventsTitle);
        this.updateText('[data-i18n="about.eventsDesc"]', t.about.eventsDesc);
        this.updateText('[data-i18n="about.commercialTitle"]', t.about.commercialTitle);
        this.updateText('[data-i18n="about.commercialDesc"]', t.about.commercialDesc);
        this.updateText('[data-i18n="about.achievementsTitle"]', t.about.achievementsTitle);
        this.updateText('[data-i18n="about.achievement1"]', t.about.achievement1);
        this.updateText('[data-i18n="about.achievement2"]', t.about.achievement2);
        this.updateText('[data-i18n="about.achievement3"]', t.about.achievement3);

        // Update work page
        this.updateText('[data-i18n="work.pageTitle"]', t.work.pageTitle);
        this.updateText('[data-i18n="work.subtitle"]', t.work.subtitle);
        this.updateText('[data-i18n="work.filterAll"]', t.work.filterAll);
        this.updateText('[data-i18n="work.filterPortraits"]', t.work.filterPortraits);
        this.updateText('[data-i18n="work.filterLandscapes"]', t.work.filterLandscapes);
        this.updateText('[data-i18n="work.filterEvents"]', t.work.filterEvents);
        this.updateText('[data-i18n="work.filterCommercial"]', t.work.filterCommercial);

        // Update contact page
        this.updateText('[data-i18n="contact.pageTitle"]', t.contact.pageTitle);
        this.updateText('[data-i18n="contact.subtitle"]', t.contact.subtitle);
        this.updateText('[data-i18n="contact.intro"]', t.contact.intro);
        this.updateText('[data-i18n="contact.emailLabel"]', t.contact.emailLabel);
        this.updateText('[data-i18n="contact.phoneLabel"]', t.contact.phoneLabel);
        this.updateText('[data-i18n="contact.locationLabel"]', t.contact.locationLabel);
        this.updateText('[data-i18n="contact.socialsLabel"]', t.contact.socialsLabel);
        this.updateAttr('[data-i18n="contact.formName"]', 'placeholder', t.contact.formName);
        this.updateAttr('[data-i18n="contact.formEmail"]', 'placeholder', t.contact.formEmail);
        this.updateAttr('[data-i18n="contact.formMessage"]', 'placeholder', t.contact.formMessage);
        this.updateText('[data-i18n="contact.formSubmit"]', t.contact.formSubmit);

        // Update footer
        this.updateText('[data-i18n="footer.copyright"]', t.footer.copyright);
        this.updateText('[data-i18n="footer.instagram"]', t.footer.instagram);
        this.updateText('[data-i18n="footer.facebook"]', t.footer.facebook);
        this.updateText('[data-i18n="footer.contact"]', t.footer.contact);
    }

    updateText(selector, text) {
        const element = document.querySelector(selector);
        if (element && text) {
            element.textContent = text;
        }
    }

    updateHTML(selector, html) {
        const element = document.querySelector(selector);
        if (element && html) {
            element.innerHTML = html;
        }
    }

    updateAttr(selector, attr, value) {
        const element = document.querySelector(selector);
        if (element && value) {
            element.setAttribute(attr, value);
        }
    }

    toggleLanguage() {
        const newLang = this.currentLang === 'en' ? 'hr' : 'en';
        this.applyLanguage(newLang);
    }

    setupEventListeners() {
        if (this.langToggle) {
            this.langToggle.addEventListener('click', () => this.toggleLanguage());
        }
    }
}

// Photo Gallery Manager
class PhotoGallery {
    constructor() {
        this.photos = [];
        this.currentFilter = 'all';
        this.currentIndex = 0;
        this.filteredPhotos = [];
        this.init();
    }

    async init() {
        await this.loadPhotos();
        this.setupEventListeners();
        this.renderGalleries();
    }

    async loadPhotos() {
        try {
            const response = await fetch('data/photos.json');
            const data = await response.json();
            this.photos = data.photos;
            this.filteredPhotos = this.photos;
        } catch (error) {
            console.error('Error loading photos:', error);
            this.photos = [];
        }
    }

    setupEventListeners() {
        // Filter buttons
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleFilter(e.target.dataset.category);
                filterButtons.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
            });
        });

        // Lightbox controls
        const lightbox = document.getElementById('lightbox');
        const closeBtn = document.querySelector('.lightbox-close');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeLightbox());
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.navigateLightbox('prev'));
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.navigateLightbox('next'));
        }

        if (lightbox) {
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) {
                    this.closeLightbox();
                }
            });
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            const lightbox = document.getElementById('lightbox');
            if (lightbox && lightbox.classList.contains('active')) {
                if (e.key === 'Escape') this.closeLightbox();
                if (e.key === 'ArrowLeft') this.navigateLightbox('prev');
                if (e.key === 'ArrowRight') this.navigateLightbox('next');
            }
        });

        // Contact form
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
        }
    }

    handleFilter(category) {
        this.currentFilter = category;

        if (category === 'all') {
            this.filteredPhotos = this.photos;
        } else {
            this.filteredPhotos = this.photos.filter(photo => photo.category === category);
        }

        this.renderWorkGallery();
    }

    renderGalleries() {
        this.renderFeaturedGallery();
        this.renderWorkGallery();
    }

    renderFeaturedGallery() {
        const featuredGallery = document.getElementById('featuredGallery');
        if (!featuredGallery) return;

        const featuredPhotos = this.photos.filter(photo => photo.featured);

        featuredGallery.innerHTML = featuredPhotos.map(photo => `
            <div class="gallery-item" onclick="gallery.openLightbox(${photo.id})">
                <img src="${photo.image}" alt="${photo.title}" onerror="this.src='https://via.placeholder.com/600x450/e0e0e0/999?text=Sample+Photo'">
                <div class="gallery-overlay">
                    <h3>${photo.title}</h3>
                    <p>${photo.description}</p>
                </div>
            </div>
        `).join('');
    }

    renderWorkGallery() {
        const workGallery = document.getElementById('workGallery');
        if (!workGallery) return;

        if (this.filteredPhotos.length === 0) {
            workGallery.innerHTML = '<p style="text-align: center; grid-column: 1/-1; color: #666;">No photos found in this category.</p>';
            return;
        }

        workGallery.innerHTML = this.filteredPhotos.map(photo => `
            <div class="gallery-item" onclick="gallery.openLightbox(${photo.id})">
                <img src="${photo.image}" alt="${photo.title}" onerror="this.src='https://via.placeholder.com/600x450/e0e0e0/999?text=Sample+Photo'">
                <div class="gallery-overlay">
                    <h3>${photo.title}</h3>
                    <p>${photo.description}</p>
                </div>
            </div>
        `).join('');
    }

    openLightbox(photoId) {
        const photo = this.filteredPhotos.find(p => p.id === photoId);
        if (!photo) return;

        this.currentIndex = this.filteredPhotos.findIndex(p => p.id === photoId);

        const lightbox = document.getElementById('lightbox');
        const lightboxImage = document.getElementById('lightboxImage');
        const lightboxCaption = document.getElementById('lightboxCaption');

        if (lightbox && lightboxImage && lightboxCaption) {
            // Check if image exists, otherwise use placeholder
            const img = new Image();
            img.onload = () => {
                lightboxImage.src = photo.image;
            };
            img.onerror = () => {
                lightboxImage.src = 'https://via.placeholder.com/1200x900/e0e0e0/999?text=Sample+Photo';
            };
            img.src = photo.image;

            lightboxCaption.innerHTML = `<h3>${photo.title}</h3><p>${photo.description}</p>`;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    closeLightbox() {
        const lightbox = document.getElementById('lightbox');
        if (lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    navigateLightbox(direction) {
        if (direction === 'prev') {
            this.currentIndex = (this.currentIndex - 1 + this.filteredPhotos.length) % this.filteredPhotos.length;
        } else {
            this.currentIndex = (this.currentIndex + 1) % this.filteredPhotos.length;
        }

        const photo = this.filteredPhotos[this.currentIndex];
        const lightboxImage = document.getElementById('lightboxImage');
        const lightboxCaption = document.getElementById('lightboxCaption');

        if (lightboxImage && lightboxCaption && photo) {
            // Check if image exists, otherwise use placeholder
            const img = new Image();
            img.onload = () => {
                lightboxImage.src = photo.image;
            };
            img.onerror = () => {
                lightboxImage.src = 'https://via.placeholder.com/1200x900/e0e0e0/999?text=Sample+Photo';
            };
            img.src = photo.image;

            lightboxCaption.innerHTML = `<h3>${photo.title}</h3><p>${photo.description}</p>`;
        }
    }

    handleFormSubmit(e) {
        e.preventDefault();

        const formMessage = document.getElementById('formMessage');
        const form = e.target;

        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Simulate form submission
        formMessage.textContent = 'Thank you for your message! I will get back to you soon.';
        formMessage.className = 'form-message success';

        // Reset form
        form.reset();

        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);

        console.log('Form submitted:', data);
    }
}

// Initialize language, theme and gallery when DOM is loaded
let gallery;
let themeManager;
let languageManager;
document.addEventListener('DOMContentLoaded', () => {
    languageManager = new LanguageManager();
    themeManager = new ThemeManager();
    gallery = new PhotoGallery();
});

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
});

// Add active class to current page nav link
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
});
