// === SAFE JAVASCRIPT INITIALIZATION (Optimized Version) ===
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded - initializing immediately');

    // Make sure the page is visible instantly
    document.body.style.opacity = '1';
    document.body.style.visibility = 'visible';

    // Initialize everything right away (no delay)
    safeInitialize();
});

function safeInitialize() {
    initHeaderNavigation();
    initThemeToggle();
    initScrollAnimations();
    initProgressBars();
    initCounterAnimations();
    initFAQ();
    initServices();
    safeInitTestimonials();
    initAnimations();
    initStatsCounter(); // Add this for hero stats
}

// === SAFE HEADER NAVIGATION ===
function initHeaderNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navbar = document.getElementById('navbar');
    const navOverlay = document.getElementById('navOverlay');

    if (!hamburger || !navbar || !navOverlay) return;

    hamburger.addEventListener('click', function () {
        navbar.classList.toggle('active');
        navOverlay.classList.toggle('active');
        hamburger.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    navOverlay.addEventListener('click', function () {
        navbar.classList.remove('active');
        navOverlay.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.classList.remove('menu-open');
    });

    // Handle dropdowns on mobile
    const dropdowns = document.querySelectorAll('.dropdown > a');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const parent = this.parentElement;
                parent.classList.toggle('active');
            }
        });
    });
}

function initThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;

  if (!themeToggle) return;

  // Load saved theme instantly
  const savedTheme = localStorage.getItem('theme') || 'light';
  body.setAttribute('data-theme', savedTheme);
  updateThemeUI(savedTheme);

  themeToggle.addEventListener('click', function (e) {
    e.preventDefault();
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeUI(newTheme);
  });

  function updateThemeUI(theme) {
    const texts = document.querySelectorAll('.toggle-text');
    const sunIcon = document.querySelector('.toggle-sun');
    const moonIcon = document.querySelector('.toggle-moon');

    // Ensure labels are correct/static
    if (texts[0]) texts[0].textContent = 'Light';
    if (texts[1]) texts[1].textContent = 'Dark';

    // Add an "active" class to show which mode is currently active
    if (texts[0]) texts[0].classList.toggle('active', theme === 'light');
    if (texts[1]) texts[1].classList.toggle('active', theme === 'dark');

    // Optionally toggle icon active states
    if (sunIcon) sunIcon.classList.toggle('active', theme === 'light');
    if (moonIcon) moonIcon.classList.toggle('active', theme === 'dark');

    // Update aria label for accessibility
    themeToggle.setAttribute('aria-pressed', theme === 'dark');
    themeToggle.setAttribute('aria-label', `Theme: ${theme}`);
  }
}


// === SAFE SCROLL ANIMATIONS ===
function initScrollAnimations() {
    const wowElements = document.querySelectorAll('.wow');
    if (wowElements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                element.style.visibility = 'visible';
                element.style.opacity = '1';
                
                const delay = element.getAttribute('data-wow-delay') || '0s';
                
                if (element.classList.contains('zoomIn')) {
                    element.style.animation = `zoomIn 0.8s ${delay} both`;
                } else if (element.classList.contains('fadeInLeft')) {
                    element.style.animation = `fadeInLeft 0.8s ${delay} both`;
                } else if (element.classList.contains('fadeInRight')) {
                    element.style.animation = `fadeInRight 0.8s ${delay} both`;
                } else if (element.classList.contains('fadeInUp')) {
                    element.style.animation = `fadeInUp 0.8s ${delay} both`;
                }

                element.classList.add('animated');
                observer.unobserve(element);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    wowElements.forEach(el => {
        el.style.visibility = 'hidden';
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// === SAFE PROGRESS BARS ===
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    if (progressBars.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const skillLevel = bar.getAttribute('data-skill');
                if (skillLevel) {
                    // Add slight delay for visual effect
                    setTimeout(() => {
                        bar.style.width = skillLevel + '%';
                        bar.style.transition = 'width 1.5s ease-in-out';
                    }, 300);
                }
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.3 });

    progressBars.forEach(bar => {
        bar.style.width = '0%';
        observer.observe(bar);
    });
}

// === SAFE COUNTER ANIMATIONS ===
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    if (counters.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counter.textContent = '0';
        observer.observe(counter);
    });
}

function animateCounter(counter) {
    const target = +counter.getAttribute('data-target');
    let current = 0;
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16);
    
    // Add suffix based on context
    let suffix = '';
    const parentText = counter.parentElement.querySelector('.stat-label').textContent;
    if (parentText.includes('Projects') || parentText.includes('Countries')) {
        suffix = '+';
    } else if (parentText.includes('Satisfaction')) {
        suffix = '%';
    }

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            counter.textContent = target + suffix;
            clearInterval(timer);
        } else {
            counter.textContent = Math.floor(current) + suffix;
        }
    }, 16);
}

// === HERO STATS COUNTER ===
function initStatsCounter() {
    const stats = document.querySelectorAll('.hero .stat-number');
    if (stats.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                stats.forEach(stat => {
                    const target = +stat.getAttribute('data-target');
                    let current = 0;
                    const duration = 1500;
                    const increment = target / (duration / 16);

                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            stat.textContent = target;
                            clearInterval(timer);
                        } else {
                            stat.textContent = Math.floor(current);
                        }
                    }, 16);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    // Observe the stats container
    const statsContainer = document.querySelector('.hero .stats');
    if (statsContainer) {
        observer.observe(statsContainer);
    }
}

// === SAFE FAQ ===
function initFAQ() {
    const faqTabs = document.querySelectorAll('.faq-tab');
    const faqItems = document.querySelectorAll('.faq-item');

    if (faqTabs.length === 0 && faqItems.length === 0) return;

    // FAQ Tabs
    faqTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const category = this.getAttribute('data-category');

            // Update active tab
            faqTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // Show corresponding FAQ category
            document.querySelectorAll('.faq-category').forEach(cat => {
                cat.classList.remove('active');
            });

            const targetCategory = document.getElementById(`${category}-faqs`);
            if (targetCategory) {
                targetCategory.classList.add('active');
            }
        });
    });

    // FAQ Items
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', function () {
                // Close other open items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
            });
        }
    });
}

// === SAFE SERVICES ===
function initServices() {
    console.log('Services initialized');
    // Add any service-specific animations here
}

// === SAFE TESTIMONIALS ===
function safeInitTestimonials() {
    // Your testimonial carousel logic can go here
    console.log('Testimonials initialized');
}

// === GLOBALLY SAFE ANIMATIONS ===
function initAnimations() {
    // Animate the globe points
    const points = document.querySelectorAll('.point');
    points.forEach((point, index) => {
        point.style.animation = `pulse 2s infinite ${index * 0.3}s`;
    });

    // Add hover effects to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// === ENSURE ALL ELEMENTS ARE PROPERLY INITIALIZED ===
window.addEventListener('load', function() {
    // Re-initialize animations after page load
    setTimeout(() => {
        initScrollAnimations();
        initProgressBars();
    }, 100);
});

// Handle window resize
window.addEventListener('resize', function() {
    // Reinitialize mobile menu if needed
    if (window.innerWidth > 768) {
        const navbar = document.getElementById('navbar');
        const navOverlay = document.getElementById('navOverlay');
        const hamburger = document.getElementById('hamburger');
        
        if (navbar && navOverlay && hamburger) {
            navbar.classList.remove('active');
            navOverlay.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    }
});