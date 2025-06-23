// DreamScape Travel Website JavaScript

// Destinations Data
const destinations = [
    {
        id: 1,
        name: "Santorini",
        country: "Greece",
        category: "beaches",
        image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
        description: "Experience the magic of white-washed buildings perched on volcanic cliffs overlooking the azure Aegean Sea.",
        rating: 4.9,
        price: "$2,499",
        weather: "25°C",
        highlights: ["Sunset views", "Blue domed churches", "Wine tasting", "Volcanic beaches"],
        bestTime: "April - October"
    },
    {
        id: 2,
        name: "Kyoto",
        country: "Japan",
        category: "cities",
        image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        description: "Discover ancient temples, traditional gardens, and the timeless beauty of Japan's cultural heart.",
        rating: 4.8,
        price: "$1,899",
        weather: "18°C",
        highlights: ["Bamboo forests", "Golden temples", "Geisha districts", "Cherry blossoms"],
        bestTime: "March - May, September - November"
    },
    {
        id: 3,
        name: "Swiss Alps",
        country: "Switzerland",
        category: "mountains",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        description: "Adventure awaits in pristine alpine landscapes with snow-capped peaks and crystal-clear lakes.",
        rating: 4.9,
        price: "$3,299",
        weather: "12°C",
        highlights: ["Skiing", "Mountain railways", "Alpine lakes", "Hiking trails"],
        bestTime: "December - March, June - September"
    },
    {
        id: 4,
        name: "Maldives",
        country: "Maldives",
        category: "islands",
        image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        description: "Paradise found in overwater bungalows surrounded by turquoise lagoons and coral reefs.",
        rating: 4.9,
        price: "$4,599",
        weather: "28°C",
        highlights: ["Overwater villas", "Coral reefs", "Spa treatments", "Water sports"],
        bestTime: "November - April"
    },
    {
        id: 5,
        name: "Patagonia",
        country: "Chile/Argentina",
        category: "mountains",
        image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        description: "Explore the raw beauty of glaciers, granite peaks, and endless wilderness at the end of the world.",
        rating: 4.7,
        price: "$2,799",
        weather: "8°C",
        highlights: ["Glaciers", "Wildlife", "Trekking", "Dramatic landscapes"],
        bestTime: "October - April"
    },
    {
        id: 6,
        name: "New York City",
        country: "USA",
        category: "cities",
        image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        description: "The city that never sleeps offers endless possibilities from Broadway to world-class museums.",
        rating: 4.6,
        price: "$1,599",
        weather: "22°C",
        highlights: ["Broadway shows", "Museums", "Central Park", "Skyline views"],
        bestTime: "April - June, September - November"
    },
    {
        id: 7,
        name: "Bali",
        country: "Indonesia",
        category: "beaches",
        image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        description: "Tropical paradise with ancient temples, lush rice terraces, and pristine beaches.",
        rating: 4.8,
        price: "$1,299",
        weather: "30°C",
        highlights: ["Rice terraces", "Hindu temples", "Beach clubs", "Yoga retreats"],
        bestTime: "April - October"
    },
    {
        id: 8,
        name: "Iceland",
        country: "Iceland",
        category: "islands",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        description: "Land of fire and ice with dramatic waterfalls, geysers, and the Northern Lights.",
        rating: 4.7,
        price: "$2,199",
        weather: "5°C",
        highlights: ["Northern Lights", "Geysers", "Waterfalls", "Blue Lagoon"],
        bestTime: "June - August, September - March"
    }
];

// DOM Elements
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const themeToggle = document.getElementById('theme-toggle');
const musicToggle = document.getElementById('music-toggle');
const backToTop = document.getElementById('back-to-top');
const destinationsGrid = document.getElementById('destinations-grid');
const modal = document.getElementById('destination-modal');
const modalClose = document.getElementById('modal-close');
const modalBody = document.getElementById('modal-body');
const contactForm = document.getElementById('contact-form');
const toast = document.getElementById('toast');
const backgroundMusic = document.getElementById('background-music');

// State
let currentFilter = 'all';
let isMenuOpen = false;
let isMusicPlaying = false;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    loadTheme();
    renderDestinations();
    setupScrollAnimations();
    setupStatsCounter();
    setupNewsletterForm();
}

// Event Listeners
function setupEventListeners() {
    // Navigation
    navToggle.addEventListener('click', toggleMobileMenu);
    
    // Theme
    // Navigation
    navToggle.addEventListener('click', toggleMobileMenu);
    
    // Theme
    themeToggle.addEventListener('click', toggleTheme);
    
    // Music
    musicToggle.addEventListener('click', toggleMusic);
    
    // Scroll events
    window.addEventListener('scroll', handleScroll);
    
    // Back to top
    backToTop.addEventListener('click', scrollToTop);
    
    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => filterDestinations(btn.dataset.filter));
    });
    
    // Modal
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    // Contact form
    contactForm.addEventListener('submit', handleContactForm);
    
    // Form validation
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
    
    // Smooth scroll for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);
            if (isMenuOpen) toggleMobileMenu();
        });
    });
    
    // Footer links
    document.querySelectorAll('.footer-links a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);
}

// Navigation Functions
function toggleMobileMenu() {
    isMenuOpen = !isMenuOpen;
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
}

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offsetTop = element.offsetTop - 70;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Theme Functions
function loadTheme() {
    const savedTheme = localStorage.getItem('dreamscape-theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('dreamscape-theme', newTheme);
    updateThemeIcon(newTheme);
    
    showToast('Theme changed successfully!', 'success');
}

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Music Functions
function toggleMusic() {
    if (isMusicPlaying) {
        backgroundMusic.pause();
        musicToggle.classList.remove('active');
        showToast('Background music paused', 'success');
    } else {
        backgroundMusic.play().catch(() => {
            showToast('Unable to play background music', 'error');
        });
        musicToggle.classList.add('active');
        showToast('Background music playing', 'success');
    }
    isMusicPlaying = !isMusicPlaying;
}

// Scroll Functions
function handleScroll() {
    const scrollTop = window.pageYOffset;
    
    // Navbar background
    if (scrollTop > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Back to top button
    if (scrollTop > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
    
    // Update active navigation link
    updateActiveNavLink();
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Destinations Functions
function renderDestinations(filter = 'all') {
    const filteredDestinations = filter === 'all' 
        ? destinations 
        : destinations.filter(dest => dest.category === filter);
    
    destinationsGrid.innerHTML = '';
    
    filteredDestinations.forEach((destination, index) => {
        const card = createDestinationCard(destination, index);
        destinationsGrid.appendChild(card);
    });
    
    // Trigger scroll animations for new cards
    setTimeout(() => {
        setupScrollAnimations();
    }, 100);
}

function createDestinationCard(destination, index) {
    const card = document.createElement('div');
    card.className = 'destination-card animate-on-scroll';
    card.style.animationDelay = `${index * 0.1}s`;
    card.onclick = () => openModal(destination);
    
    card.innerHTML = `
        <div class="destination-image">
            <img src="${destination.image}" alt="${destination.name}" loading="lazy">
            <div class="destination-overlay"></div>
            <div class="destination-rating">
                <i class="fas fa-star"></i>
                ${destination.rating}
            </div>
            <div class="destination-weather">
                <i class="fas fa-thermometer-half"></i>
                ${destination.weather}
            </div>
        </div>
        <div class="destination-content">
            <div class="destination-header">
                <h3 class="destination-title">${destination.name}</h3>
                <span class="destination-price">${destination.price}</span>
            </div>
            <div class="destination-location">
                <i class="fas fa-map-marker-alt"></i>
                ${destination.country}
            </div>
            <p class="destination-description">${destination.description}</p>
            <div class="destination-tags">
                ${destination.highlights.slice(0, 3).map(highlight => 
                    `<span class="destination-tag">${highlight}</span>`
                ).join('')}
                ${destination.highlights.length > 3 ? 
                    `<span class="destination-tag">+${destination.highlights.length - 3} more</span>` : ''
                }
            </div>
        </div>
    `;
    
    return card;
}

function filterDestinations(filter) {
    currentFilter = filter;
    
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
    
    // Render filtered destinations
    renderDestinations(filter);
}

// Modal Functions
function openModal(destination) {
    modalBody.innerHTML = `
        <img src="${destination.image}" alt="${destination.name}" class="modal-image">
        <div class="modal-info">
            <div class="modal-header">
                <h2 class="modal-title">${destination.name}</h2>
                <span class="modal-price">${destination.price}</span>
            </div>
            <div class="modal-location">
                <i class="fas fa-map-marker-alt"></i>
                ${destination.country}
                <div style="margin-left: auto; display: flex; align-items: center; gap: 10px;">
                    <i class="fas fa-star" style="color: #FCD34D;"></i>
                    ${destination.rating}
                    <i class="fas fa-thermometer-half" style="color: #3B82F6; margin-left: 15px;"></i>
                    ${destination.weather}
                </div>
            </div>
            <p class="modal-description">${destination.description}</p>
            <div class="modal-details">
                <div class="modal-highlights">
                    <h3>Highlights</h3>
                    <ul>
                        ${destination.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
                    </ul>
                </div>
                <div class="modal-info-section">
                    <h3>Best Time to Visit</h3>
                    <p style="color: var(--text-secondary); margin-bottom: 20px;">${destination.bestTime}</p>
                    <h3>What's Included</h3>
                    <ul style="list-style: none; padding: 0;">
                        <li style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px; color: var(--text-secondary);">
                            <i class="fas fa-check" style="color: #10B981;"></i>
                            Accommodation
                        </li>
                        <li style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px; color: var(--text-secondary);">
                            <i class="fas fa-check" style="color: #10B981;"></i>
                            Transportation
                        </li>
                        <li style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px; color: var(--text-secondary);">
                            <i class="fas fa-check" style="color: #10B981;"></i>
                            Guided Tours
                        </li>
                        <li style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px; color: var(--text-secondary);">
                            <i class="fas fa-check" style="color: #10B981;"></i>
                            24/7 Support
                        </li>
                    </ul>
                </div>
            </div>
            <button class="modal-book-btn" onclick="bookDestination('${destination.name}')">
                Book This Destination
                <i class="fas fa-plane" style="margin-left: 8px;"></i>
            </button>
        </div>
    `;
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function bookDestination(destinationName) {
    showToast(`Booking request sent for ${destinationName}!`, 'success');
    closeModal();
    scrollToSection('contact');
}

// Form Functions
function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const message = formData.get('message').trim();
    
    // Validate form
    let isValid = true;
    
    if (!name) {
        showFieldError('name', 'Name is required');
        isValid = false;
    }
    
    if (!email) {
        showFieldError('email', 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showFieldError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    if (!message) {
        showFieldError('message', 'Message is required');
        isValid = false;
    }
    
    if (isValid) {
        // Simulate form submission
        const submitBtn = contactForm.querySelector('.form-submit');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showToast('Thank you for your message! We\'ll get back to you soon.', 'success');
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    clearFieldError(field.name);
    
    switch (field.name) {
        case 'name':
            if (!value) {
                showFieldError('name', 'Name is required');
            }
            break;
        case 'email':
            if (!value) {
                showFieldError('email', 'Email is required');
            } else if (!isValidEmail(value)) {
                showFieldError('email', 'Please enter a valid email address');
            }
            break;
        case 'message':
            if (!value) {
                showFieldError('message', 'Message is required');
            }
            break;
    }
}

function clearFieldError(fieldName) {
    const errorElement = document.getElementById(`${fieldName}-error`);
    if (errorElement) {
        errorElement.textContent = '';
    }
}

function showFieldError(fieldName, message) {
    const errorElement = document.getElementById(`${fieldName}-error`);
    if (errorElement) {
        errorElement.textContent = message;
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Newsletter Form
function setupNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('.newsletter-input').value.trim();
            
            if (!email) {
                showToast('Please enter your email address', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showToast('Please enter a valid email address', 'error');
                return;
            }
            
            showToast('Thank you for subscribing to our newsletter!', 'success');
            newsletterForm.reset();
        });
    }
}

// Animation Functions
function setupScrollAnimations() {
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
}

// Stats Counter
function setupStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                statNumbers.forEach(stat => {
                    animateCounter(stat);
                });
            }
        });
    }, { threshold: 0.5 });
    
    if (statNumbers.length > 0) {
        observer.observe(statNumbers[0].closest('.stats-grid'));
    }
}

function animateCounter(element) {
    const target = parseInt(element.dataset.target);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        if (target === 49) {
            element.textContent = (current / 10).toFixed(1);
        } else if (target >= 1000) {
            element.textContent = (current / 1000).toFixed(1) + 'K+';
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// Toast Notification
function showToast(message, type = 'success') {
    const toastIcon = toast.querySelector('.toast-icon');
    const toastMessage = toast.querySelector('.toast-message');
    
    toast.className = `toast ${type}`;
    toastIcon.className = `toast-icon fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`;
    toastMessage.textContent = message;
    
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

// Keyboard Navigation
function handleKeyboardNavigation(e) {
    // Close modal with Escape key
    if (e.key === 'Escape' && modal.classList.contains('show')) {
        closeModal();
    }
    
    // Toggle mobile menu with Enter/Space on nav toggle
    if ((e.key === 'Enter' || e.key === ' ') && e.target === navToggle) {
        e.preventDefault();
        toggleMobileMenu();
    }
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Service Worker Registration (PWA)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Performance optimizations
window.addEventListener('load', () => {
    // Lazy load images
    const images = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});
