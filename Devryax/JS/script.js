
  // Simple animation on scroll implementation
        document.addEventListener('DOMContentLoaded', function() {
            const wowElements = document.querySelectorAll('.wow');
            
            function checkVisibility() {
                wowElements.forEach(element => {
                    const position = element.getBoundingClientRect();
                    
                    // If element is in viewport
                    if(position.top < window.innerHeight && position.bottom >= 0) {
                        element.style.visibility = 'visible';
                        
                        // Add animation classes based on data-wow-delay
                        const delay = element.getAttribute('data-wow-delay') || '0s';
                        element.style.animationDelay = delay;
                        
                        if(element.classList.contains('zoomIn')) {
                            element.style.animation = `zoomIn 0.6s ${delay} both`;
                        } else if(element.classList.contains('fadeInLeft')) {
                            element.style.animation = `fadeInLeft 0.6s ${delay} both`;
                        } else if(element.classList.contains('fadeInRight')) {
                            element.style.animation = `fadeInRight 0.6s ${delay} both`;
                        } else if(element.classList.contains('fadeInUp')) {
                            element.style.animation = `fadeInUp 0.6s ${delay} both`;
                        }
                    }
                });
            }
            
            // Check visibility on load and scroll
            checkVisibility();
            window.addEventListener('scroll', checkVisibility);
            
            // Define keyframes for animations
            const style = document.createElement('style');
            style.textContent = `
                @keyframes zoomIn {
                    from { opacity: 0; transform: scale3d(0.3, 0.3, 0.3); }
                    to { opacity: 1; }
                }
                
                @keyframes fadeInLeft {
                    from { opacity: 0; transform: translate3d(-50px, 0, 0); }
                    to { opacity: 1; transform: translate3d(0, 0, 0); }
                }
                
                @keyframes fadeInRight {
                    from { opacity: 0; transform: translate3d(50px, 0, 0); }
                    to { opacity: 1; transform: translate3d(0, 0, 0); }
                }
                
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translate3d(0, 50px, 0); }
                    to { opacity: 1; transform: translate3d(0, 0, 0); }
                }
            `;
            document.head.appendChild(style);
        });

document.addEventListener('DOMContentLoaded', function () {
  const progressBars = document.querySelectorAll('.progress-bar');

  // ✅ Animate progress bars when visible
  const animateProgressBars = () => {
    progressBars.forEach(bar => {
      const skillLevel = bar.getAttribute('data-skill');
      const rect = bar.getBoundingClientRect();
      const isInViewport = rect.top <= window.innerHeight && rect.bottom >= 0;

      if (isInViewport && !bar.classList.contains('animated')) {
        bar.style.width = skillLevel + '%';
        bar.classList.add('animated');

        // Add % label
        const percentage = document.createElement('span');
        percentage.className = 'skill-percentage';
        percentage.textContent = skillLevel + '%';
        percentage.style.cssText = `
          position: absolute;
          right: -40px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 12px;
          font-weight: 600;
          color: var(--color-primary);
          opacity: 0;
          transition: opacity 0.3s ease 0.5s;
        `;
        bar.parentElement.style.position = 'relative';
        bar.parentElement.appendChild(percentage);

        setTimeout(() => {
          percentage.style.opacity = '1';
        }, 800);
      }
    });
  };

  // ✅ Use Intersection Observer for better performance
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const bars = entry.target.querySelectorAll('.progress-bar');
            bars.forEach(bar => {
              const skillLevel = bar.getAttribute('data-skill');
              bar.style.width = skillLevel + '%';
              bar.classList.add('animated');
            });
            observer.unobserve(entry.target); // Stop observing once animated
          }
        });
      },
      { threshold: 0.3 }
    );

    document.querySelectorAll('.tech-category').forEach(cat => observer.observe(cat));
  } else {
    // Fallback
    animateProgressBars();
    window.addEventListener('scroll', animateProgressBars);
  }

  // ✅ Hover effects
  document.querySelectorAll('.tech-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.transform = 'translateX(8px)';
      const icon = item.querySelector('.tech-icon');
      if (icon) icon.style.transform = 'scale(1.15) rotate(5deg)';
    });

    item.addEventListener('mouseleave', () => {
      item.style.transform = 'translateX(0)';
      const icon = item.querySelector('.tech-icon');
      if (icon) icon.style.transform = 'scale(1) rotate(0)';
    });
  });

  // ✅ Gradient color logic
  progressBars.forEach(bar => {
    const skillLevel = parseInt(bar.getAttribute('data-skill'));
    let gradient;
    if (skillLevel >= 90) gradient = 'linear-gradient(135deg, #00E0FF, #0061FF)';
    else if (skillLevel >= 80) gradient = 'linear-gradient(135deg, #8B5CF6, #0061FF)';
    else if (skillLevel >= 70) gradient = 'linear-gradient(135deg, #0061FF, #8B5CF6)';
    else gradient = 'linear-gradient(135deg, #8C92A4, #4A4F5C)';
    bar.style.background = gradient;
  });

  // ✅ Smooth category entrance animations
  const techCategories = document.querySelectorAll('.tech-category');
  techCategories.forEach((category, index) => {
    category.style.opacity = '0';
    category.style.transform = 'translateY(30px)';
    setTimeout(() => {
      category.style.transition = 'all 0.6s ease-out';
      category.style.opacity = '1';
      category.style.transform = 'translateY(0)';
    }, index * 200);
  });

  console.log('%c🚀 Tech Stack Loaded Successfully!', 'color: #0061FF; font-size: 16px; font-weight: bold;');
});


// Simple animation trigger on scroll
        document.addEventListener('DOMContentLoaded', function() {
            const serviceCards = document.querySelectorAll('.service-card');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animationPlayState = 'running';
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            
            serviceCards.forEach(card => {
                card.style.animationPlayState = 'paused';
                observer.observe(card);
            });
        });

document.addEventListener('DOMContentLoaded', function() {
            const faqTabs = document.querySelectorAll('.faq-tab');
            const faqCategories = document.querySelectorAll('.faq-category');
            const allFaqItems = document.querySelectorAll('.faq-item');
            
            // Tab switching functionality
            faqTabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    const category = tab.getAttribute('data-category');
                    
                    // Update active tab
                    faqTabs.forEach(t => t.classList.remove('active'));
                    tab.classList.add('active');
                    
                    // Show selected category, hide others
                    faqCategories.forEach(cat => {
                        if (cat.id === `${category}-faqs`) {
                            cat.classList.add('active');
                        } else {
                            cat.classList.remove('active');
                        }
                    });
                });
            });
            
            // Initialize animation on scroll
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animationPlayState = 'running';
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            
            allFaqItems.forEach(item => {
                item.style.animationPlayState = 'paused';
                observer.observe(item);
                
                // Add click event for each FAQ item
                const question = item.querySelector('.faq-question');
                question.addEventListener('click', () => {
                    // Close all other FAQ items in the same category
                    const parentCategory = item.closest('.faq-category');
                    const siblingItems = parentCategory.querySelectorAll('.faq-item');
                    
                    siblingItems.forEach(otherItem => {
                        if (otherItem !== item && otherItem.classList.contains('active')) {
                            otherItem.classList.remove('active');
                        }
                    });
                    
                    // Toggle current FAQ item
                    item.classList.toggle('active');
                });
            });
        });

 document.addEventListener('DOMContentLoaded', function() {
            const track = document.querySelector('.testimonials-track');
            const cards = document.querySelectorAll('.testimonial-card');
            const dots = document.querySelectorAll('.dot');
            const prevBtn = document.querySelector('.prev-btn');
            const nextBtn = document.querySelector('.next-btn');
            
            let currentIndex = 0;
            const cardCount = cards.length;
            
            // Set initial card widths based on screen size
            function setCardWidth() {
                const containerWidth = document.querySelector('.testimonials-container').offsetWidth;
                let cardsPerView = 1;
                
                if (window.innerWidth >= 1024) {
                    cardsPerView = 3;
                } else if (window.innerWidth >= 768) {
                    cardsPerView = 2;
                }
                
                const cardWidth = containerWidth / cardsPerView;
                cards.forEach(card => {
                    card.style.minWidth = `${cardWidth - 30}px`;
                });
                
                updateTrackPosition();
            }
            
            function updateTrackPosition() {
                const containerWidth = document.querySelector('.testimonials-container').offsetWidth;
                let cardsPerView = 1;
                
                if (window.innerWidth >= 1024) {
                    cardsPerView = 3;
                } else if (window.innerWidth >= 768) {
                    cardsPerView = 2;
                }
                
                const maxIndex = cardCount - cardsPerView;
                if (currentIndex > maxIndex) {
                    currentIndex = maxIndex;
                }
                
                const cardWidth = containerWidth / cardsPerView;
                const translateX = -currentIndex * cardWidth;
                track.style.transform = `translateX(${translateX}px)`;
                
                // Update dots
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === currentIndex);
                });
            }
            
            function nextTestimonial() {
                const containerWidth = document.querySelector('.testimonials-container').offsetWidth;
                let cardsPerView = 1;
                
                if (window.innerWidth >= 1024) {
                    cardsPerView = 3;
                } else if (window.innerWidth >= 768) {
                    cardsPerView = 2;
                }
                
                const maxIndex = cardCount - cardsPerView;
                if (currentIndex < maxIndex) {
                    currentIndex++;
                } else {
                    currentIndex = 0;
                }
                updateTrackPosition();
            }
            
            function prevTestimonial() {
                if (currentIndex > 0) {
                    currentIndex--;
                } else {
                    const containerWidth = document.querySelector('.testimonials-container').offsetWidth;
                    let cardsPerView = 1;
                    
                    if (window.innerWidth >= 1024) {
                        cardsPerView = 3;
                    } else if (window.innerWidth >= 768) {
                        cardsPerView = 2;
                    }
                    
                    currentIndex = cardCount - cardsPerView;
                }
                updateTrackPosition();
            }
            
            // Event listeners
            nextBtn.addEventListener('click', nextTestimonial);
            prevBtn.addEventListener('click', prevTestimonial);
            
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    currentIndex = index;
                    updateTrackPosition();
                });
            });
            
            // Initialize
            setCardWidth();
            window.addEventListener('resize', setCardWidth);
            
            // Auto-rotate testimonials
            setInterval(nextTestimonial, 5000);
        });

document.addEventListener('DOMContentLoaded', function() {
            const actionButton = document.querySelector('.action-btn');
            
            actionButton.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px)';
            });
            
            actionButton.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
// === Theme Toggle ===
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

// Check for saved theme in localStorage
const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
  body.setAttribute("data-theme", savedTheme);
  updateToggleUI(savedTheme);
} else {
  // Set default (light)
  body.setAttribute("data-theme", "light");
}

// Toggle on click
themeToggle.addEventListener("click", (e) => {
  e.preventDefault();
  let currentTheme = body.getAttribute("data-theme");
  let newTheme = currentTheme === "light" ? "dark" : "light";

  body.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateToggleUI(newTheme);
});

// Function to update text and icon based on theme
function updateToggleUI(theme) {
  const sunIcon = document.querySelector(".toggle-sun i");
  const moonIcon = document.querySelector(".toggle-moon i");
  const toggleTexts = document.querySelectorAll(".toggle-text");

  if (theme === "dark") {
    sunIcon.style.opacity = "0.4";
    moonIcon.style.opacity = "1";
    toggleTexts[0].style.display = "none";
    toggleTexts[1].style.display = "inline";
  } else {
    sunIcon.style.opacity = "1";
    moonIcon.style.opacity = "0.4";
    toggleTexts[0].style.display = "inline";
    toggleTexts[1].style.display = "none";
  }
}

// Header Navigation with Hamburger Menu
class HeaderNavigation {
    constructor() {
        this.hamburger = document.getElementById('hamburger');
        this.navbar = document.getElementById('navbar');
        this.navOverlay = document.getElementById('navOverlay');
        this.dropdowns = document.querySelectorAll('.dropdown');
        this.themeToggle = document.getElementById('themeToggle');
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.handleResize();
    }
    
    bindEvents() {
        // Hamburger menu toggle
        this.hamburger.addEventListener('click', () => this.toggleMenu());
        
        // Overlay click to close menu
        this.navOverlay.addEventListener('click', () => this.closeMenu());
        
        // Dropdown functionality
        this.dropdowns.forEach(dropdown => {
            const link = dropdown.querySelector('a');
            link.addEventListener('click', (e) => this.handleDropdownClick(e, dropdown));
        });
        
        // Close menu when clicking on regular links
        document.querySelectorAll('.nav-links a:not(.dropdown > a)').forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });
        
        // Close dropdowns when clicking outside
        document.addEventListener('click', (e) => this.handleOutsideClick(e));
        
        // Handle window resize
        window.addEventListener('resize', () => this.handleResize());
        
        // Handle escape key
        document.addEventListener('keydown', (e) => this.handleKeydown(e));
    }
    
    toggleMenu() {
        const isActive = this.navbar.classList.contains('active');
        
        if (isActive) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }
    
    openMenu() {
        this.navbar.classList.add('active');
        this.navOverlay.classList.add('active');
        this.hamburger.classList.add('active');
        document.body.classList.add('menu-open');
        
        // Add animation delay for menu items
        this.animateMenuItems();
    }
    
    closeMenu() {
        this.navbar.classList.remove('active');
        this.navOverlay.classList.remove('active');
        this.hamburger.classList.remove('active');
        document.body.classList.remove('menu-open');
        
        // Close all dropdowns when menu closes
        this.closeAllDropdowns();
    }
    
    handleDropdownClick(e, dropdown) {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            e.stopPropagation();
            
            // Close other dropdowns
            this.dropdowns.forEach(otherDropdown => {
                if (otherDropdown !== dropdown && otherDropdown.classList.contains('active')) {
                    otherDropdown.classList.remove('active');
                }
            });
            
            // Toggle current dropdown
            dropdown.classList.toggle('active');
        }
    }
    
    handleOutsideClick(e) {
        // Close dropdowns when clicking outside on mobile
        if (window.innerWidth <= 768 && !e.target.closest('.dropdown')) {
            this.closeAllDropdowns();
        }
        
        // Close menu when clicking outside on mobile
        if (window.innerWidth <= 768 && 
            !e.target.closest('.navbar') && 
            !e.target.closest('.hamburger') &&
            this.navbar.classList.contains('active')) {
            this.closeMenu();
        }
    }
    
    handleResize() {
        // Close menu when resizing to desktop
        if (window.innerWidth > 768 && this.navbar.classList.contains('active')) {
            this.closeMenu();
        }
        
        // Close all dropdowns on resize
        if (window.innerWidth > 768) {
            this.closeAllDropdowns();
        }
    }
    
    handleKeydown(e) {
        // Close menu on escape key
        if (e.key === 'Escape' && this.navbar.classList.contains('active')) {
            this.closeMenu();
        }
    }
    
    closeAllDropdowns() {
        this.dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
    
    animateMenuItems() {
        const menuItems = document.querySelectorAll('.nav-links li');
        menuItems.forEach((item, index) => {
            item.style.animationDelay = `${0.1 + (index * 0.05)}s`;
        });
    }
}

// Theme Toggle Functionality
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.currentTheme = localStorage.getItem('theme') || 'light';
        
        this.init();
    }
    
    init() {
        this.setTheme(this.currentTheme);
        this.bindEvents();
    }
    
    bindEvents() {
        this.themeToggle.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleTheme();
        });
    }
    
    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(this.currentTheme);
    }
    
    setTheme(theme) {
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Update toggle text
        const toggleTexts = document.querySelectorAll('.toggle-text');
        toggleTexts.forEach(text => {
            text.textContent = theme === 'light' ? 'Light' : 'Dark';
        });
        
        // Add theme change animation
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        
        // Remove transition after animation completes
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HeaderNavigation();
    new ThemeManager();
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Handle page load animations
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

class TestimonialsCarousel {
    constructor() {
        this.track = document.querySelector('.testimonials-track');
        this.cards = document.querySelectorAll('.testimonial-card');
        this.prevBtn = document.querySelector('.prev-btn');
        this.nextBtn = document.querySelector('.next-btn');
        this.dots = document.querySelectorAll('.dot');
        this.currentIndex = 0;
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.updateCarousel();
        this.startAutoPlay();
    }
    
    bindEvents() {
        // Navigation buttons
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Dot indicators
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeydown(e));
        
        // Touch/swipe support for mobile
        this.track.addEventListener('touchstart', (e) => this.handleTouchStart(e));
        this.track.addEventListener('touchmove', (e) => this.handleTouchMove(e));
        this.track.addEventListener('touchend', (e) => this.handleTouchEnd(e));
        
        // Pause autoplay on hover
        this.track.addEventListener('mouseenter', () => this.pauseAutoPlay());
        this.track.addEventListener('mouseleave', () => this.resumeAutoPlay());
        
        // Handle window resize
        window.addEventListener('resize', () => this.handleResize());
    }
    
    getCardsPerView() {
        const containerWidth = this.track.parentElement.offsetWidth;
        const cardWidth = this.cards[0].offsetWidth + 30; // card width + gap
        
        if (containerWidth >= 1200) return 3; // Desktop
        if (containerWidth >= 768) return 2;  // Tablet
        return 1; // Mobile
    }
    
    updateCarousel() {
        const cardsPerView = this.getCardsPerView();
        const translateX = -this.currentIndex * (100 / cardsPerView);
        
        this.track.style.transform = `translateX(${translateX}%)`;
        
        // Update active dot
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
        
        // Update button states
        this.prevBtn.disabled = this.currentIndex === 0;
        this.nextBtn.disabled = this.currentIndex >= this.cards.length - cardsPerView;
        
        // Add/remove disabled styles
        this.prevBtn.style.opacity = this.prevBtn.disabled ? '0.5' : '1';
        this.nextBtn.style.opacity = this.nextBtn.disabled ? '0.5' : '1';
    }
    
    nextSlide() {
        const cardsPerView = this.getCardsPerView();
        const maxIndex = this.cards.length - cardsPerView;
        
        if (this.currentIndex < maxIndex) {
            this.currentIndex++;
            this.updateCarousel();
        } else {
            // Loop back to start
            this.currentIndex = 0;
            this.updateCarousel();
        }
    }
    
    prevSlide() {
        const cardsPerView = this.getCardsPerView();
        
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateCarousel();
        } else {
            // Loop to end
            this.currentIndex = this.cards.length - cardsPerView;
            this.updateCarousel();
        }
    }
    
    goToSlide(index) {
        const cardsPerView = this.getCardsPerView();
        const maxIndex = this.cards.length - cardsPerView;
        
        if (index >= 0 && index <= maxIndex) {
            this.currentIndex = index;
            this.updateCarousel();
        }
    }
    
    handleKeydown(e) {
        if (e.key === 'ArrowLeft') {
            this.prevSlide();
        } else if (e.key === 'ArrowRight') {
            this.nextSlide();
        }
    }
    
    // Touch/swipe functionality
    handleTouchStart(e) {
        this.touchStartX = e.touches[0].clientX;
        this.isDragging = true;
        this.startX = this.touchStartX;
        this.startTime = new Date().getTime();
    }
    
    handleTouchMove(e) {
        if (!this.isDragging) return;
        
        this.touchMoveX = e.touches[0].clientX;
        const diff = this.touchMoveX - this.touchStartX;
        
        // Prevent vertical scrolling when horizontal swiping
        if (Math.abs(diff) > 10) {
            e.preventDefault();
        }
    }
    
    handleTouchEnd(e) {
        if (!this.isDragging) return;
        
        this.isDragging = false;
        const endX = e.changedTouches[0].clientX;
        const diff = endX - this.startX;
        const elapsed = new Date().getTime() - this.startTime;
        
        // Minimum swipe distance and maximum time for swipe
        const minSwipeDistance = 50;
        const maxSwipeTime = 300;
        
        if (Math.abs(diff) > minSwipeDistance && elapsed < maxSwipeTime) {
            if (diff > 0) {
                // Swipe right - go previous
                this.prevSlide();
            } else {
                // Swipe left - go next
                this.nextSlide();
            }
        }
    }
    
    // Autoplay functionality
    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 5000); // Change slide every 5 seconds
    }
    
    pauseAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
    
    resumeAutoPlay() {
        if (!this.autoPlayInterval) {
            this.startAutoPlay();
        }
    }
    
    handleResize() {
        // Reset to first slide on resize and recalculate
        this.currentIndex = 0;
        this.updateCarousel();
    }
    
    // Public method to manually go to specific slide
    goTo(index) {
        this.goToSlide(index);
    }
    
    // Public method to get current slide index
    getCurrentSlide() {
        return this.currentIndex;
    }
    
    // Cleanup method
    destroy() {
        this.pauseAutoPlay();
        // Remove event listeners if needed
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const testimonialsCarousel = new TestimonialsCarousel();
    
    // Make it globally available if needed
    window.testimonialsCarousel = testimonialsCarousel;
});

// Alternative initialization for multiple carousels (if you have more than one)
class TestimonialsManager {
    constructor() {
        this.carousels = [];
        this.init();
    }
    
    init() {
        const testimonialSections = document.querySelectorAll('.testimonials-section');
        
        testimonialSections.forEach((section, index) => {
            const carousel = new TestimonialsCarousel(section);
            this.carousels.push(carousel);
        });
    }
}

function showPopup() {
    // Show the popup
    document.getElementById('popupOverlay').classList.add('active');
    
    // For demo purposes, prevent form submission
    // Remove this line in production to allow actual form submission
    return false;
}

function closePopup() {
    document.getElementById('popupOverlay').classList.remove('active');
}

// Close popup when clicking outside the content
document.getElementById('popupOverlay').addEventListener('click', function(e) {
    if (e.target === this) {
        closePopup();
    }
});