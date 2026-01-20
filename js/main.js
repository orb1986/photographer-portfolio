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

// Initialize gallery when DOM is loaded
let gallery;
document.addEventListener('DOMContentLoaded', () => {
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
