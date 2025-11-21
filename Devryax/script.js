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

// AI Chat Functionality
document.addEventListener('DOMContentLoaded', function() {
    const chatToggle = document.getElementById('chatToggle');
    const chatContainer = document.getElementById('chatContainer');
    const chatClose = document.getElementById('chatClose');
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const chatSend = document.getElementById('chatSend');

    console.log('AI Chat Elements:', { chatToggle, chatContainer, chatClose, chatMessages, chatInput, chatSend });

    // Toggle chat window
    if (chatToggle) {
        chatToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            console.log('Chat toggle clicked');
            chatContainer.classList.toggle('open');
        });
    }

    // Close chat window
    if (chatClose) {
        chatClose.addEventListener('click', (e) => {
            e.stopPropagation();
            console.log('Chat close clicked');
            chatContainer.classList.remove('open');
        });
    }

    // Auto-resize textarea
    if (chatInput) {
        chatInput.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    }

    // Send message function
    function sendMessage() {
        const message = chatInput.value.trim();
        console.log('Sending message:', message);
        if (!message) return;
        
        // Add user message
        addMessage(message, 'user');
        chatInput.value = '';
        chatInput.style.height = 'auto';
        
        // Show typing indicator
        showTypingIndicator();
        
        // Process message and get AI response
        setTimeout(() => {
            removeTypingIndicator();
            const response = getAIResponse(message);
            addMessage(response, 'bot');
        }, 1000 + Math.random() * 1000);
    }

    // Add message to chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        // Check if the text contains HTML links and handle accordingly
        if (text.includes('<a href')) {
            contentDiv.innerHTML = text;
            
            // Add click event listeners to links to open in new tab
            const links = contentDiv.querySelectorAll('a');
            links.forEach(link => {
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer');
            });
        } else {
            // Convert line breaks to HTML for better formatting
            const formattedText = text.replace(/\n/g, '<br>');
            contentDiv.innerHTML = formattedText;
        }
        
        messageDiv.appendChild(contentDiv);
        chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Show typing indicator
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.id = 'typingIndicator';
        
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('div');
            dot.className = 'typing-dot';
            typingDiv.appendChild(dot);
        }
        
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Remove typing indicator
    function removeTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    // Event listeners for chat
    if (chatSend) {
        chatSend.addEventListener('click', sendMessage);
    }

    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }

    // Close chat when clicking outside
    document.addEventListener('click', (e) => {
        if (chatContainer && chatContainer.classList.contains('open')) {
            if (!chatContainer.contains(e.target) && !chatToggle.contains(e.target)) {
                chatContainer.classList.remove('open');
            }
        }
    });

    // Prevent chat container click from closing the chat
    if (chatContainer) {
        chatContainer.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
});

// AI Response Logic
function getAIResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Greetings
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
        return "Hello! I'm Websifyapp's AI assistant. We build stunning websites and powerful mobile applications for local businesses and international enterprises. How can I help you today?";
    }
    
    // Services
    if (lowerMessage.includes('service') || lowerMessage.includes('what do you do') || lowerMessage.includes('offer')) {
        return "We offer comprehensive digital solutions including:\n• Web Development\n• Mobile App Development\n• UI/UX Design\n• Maintenance & Hosting\n• Branding Solutions\n• Digital Marketing\n\nWe've completed 1500+ projects across 40 countries with 98% client satisfaction!";
    }
    
    // Pricing - Updated to direct to pricing page
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('how much') || lowerMessage.includes('pricing') || lowerMessage.includes('rate') || lowerMessage.includes('charges')) {
        return "For detailed pricing information, please check our comprehensive pricing page where you can see all our packages and services:\n\n📊 <a href='pricing.html' style='color: var(--color-primary); text-decoration: underline;'>View Our Pricing Page</a>\n\nYou'll find:\n• Website Packages (Basic, Business, E-commerce)\n• App Development Packages\n• Maintenance Plans\n• Custom Quote Options\n\nAll prices are negotiable and we offer custom quotes based on your specific needs!";
    }
    
    // Portfolio
    if (lowerMessage.includes('portfolio') || lowerMessage.includes('work') || lowerMessage.includes('projects') || lowerMessage.includes('examples')) {
        return "We've built amazing projects like Bluesky Social Media App, FitJourney fitness app, ShopSphere e-commerce, and many more! Visit our portfolio page to see our work across web and mobile platforms.";
    }
    
    // Contact
    if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('phone') || lowerMessage.includes('reach')) {
        return "Get in touch with us:\n📧 Websifyapp@gmail.com\n📞 +2349044410020\n📍 Lagos, West Africa\n💬 WhatsApp: +2349044410020\n\nWe're available 24/7 to discuss your project!";
    }
    
    // Website development
    if (lowerMessage.includes('website') || lowerMessage.includes('web development') || lowerMessage.includes('site')) {
        return "We create responsive, modern websites using React.js, Node.js, and modern technologies. Our process includes planning, design, development, and testing to ensure exceptional user experiences.";
    }
    
    // App development
    if (lowerMessage.includes('app') || lowerMessage.includes('mobile') || lowerMessage.includes('application')) {
        return "We develop both native (iOS Swift, Android Kotlin) and cross-platform (React Native, Flutter) mobile applications. Our apps are performance-optimized and user-focused.";
    }
    
    // Timeline
    if (lowerMessage.includes('how long') || lowerMessage.includes('timeline') || lowerMessage.includes('duration') || lowerMessage.includes('time')) {
        return "Project timelines:\n• Basic websites: 2-4 days\n• Business websites: 6-12 days\n• Mobile apps: 5-10 days to several weeks\n• E-commerce: 1-2 weeks\n\nWe provide exact timelines after understanding your requirements.";
    }
    
    // About company
    if (lowerMessage.includes('about') || lowerMessage.includes('company') || lowerMessage.includes('websifyapp')) {
        return "Websifyapp is an award-winning web design company with 7+ years of excellence. We have offices in Lagos & Abuja and serve clients across West Africa and internationally. Our mission is to transform ideas into digital reality.";
    }
    
    // Process
    if (lowerMessage.includes('process') || lowerMessage.includes('how it works') || lowerMessage.includes('steps') || lowerMessage.includes('workflow')) {
        return "Our 4-step creative process:\n1. Planning & Research\n2. Design & Prototyping\n3. Development\n4. Testing & Launch\n\nWe keep you involved throughout the entire process!";
    }
    
    // Support & Maintenance
    if (lowerMessage.includes('support') || lowerMessage.includes('maintenance') || lowerMessage.includes('hosting')) {
        return "We offer comprehensive maintenance plans. For detailed pricing and features of our maintenance packages, please check our <a href='pricing.html#maintenance' style='color: var(--color-primary); text-decoration: underline;'>Maintenance Plans section</a> on the pricing page.";
    }
    
    // Budget questions
    if (lowerMessage.includes('budget') || lowerMessage.includes('affordable') || lowerMessage.includes('cheap') || lowerMessage.includes('expensive')) {
        return "We work with various budget ranges and offer flexible payment options. For specific pricing tailored to your needs, please visit our <a href='pricing.html' style='color: var(--color-primary); text-decoration: underline;'>Pricing Page</a> or request a custom quote!";
    }
    
    // Package details
    if (lowerMessage.includes('package') || lowerMessage.includes('plan') || lowerMessage.includes('basic') || lowerMessage.includes('premium') || lowerMessage.includes('enterprise')) {
        return "We offer various packages for websites, apps, and maintenance. You can see all the details, features, and pricing on our <a href='pricing.html' style='color: var(--color-primary); text-decoration: underline;'>Pricing Page</a>.";
    }
    
    // Payment questions
    if (lowerMessage.includes('payment') || lowerMessage.includes('pay') || lowerMessage.includes('installment') || lowerMessage.includes('finance')) {
        return "We accept various payment methods and can discuss flexible payment plans. For pricing details and payment options, please check our <a href='pricing.html' style='color: var(--color-primary); text-decoration: underline;'>Pricing Page</a>.";
    }
    
    // Location
    if (lowerMessage.includes('where') || lowerMessage.includes('location') || lowerMessage.includes('lagos') || lowerMessage.includes('abuja')) {
        return "We're based in Lagos, West Africa with services extending across Nigeria and international clients. We work remotely with clients worldwide!";
    }
    
    // Experience
    if (lowerMessage.includes('experience') || lowerMessage.includes('years') || lowerMessage.includes('how long been')) {
        return "With 7+ years of excellence, we've completed 1500+ projects across 40 countries. We're recognized as award-winning web designers in West Africa!";
    }
    
    // Default response
    const defaultResponses = [
        "I'd be happy to help with that! Could you provide more details about your project requirements?",
        "That's an interesting question! Our team specializes in custom solutions - let me connect you with our experts for detailed discussion.",
        "I understand you're looking for information about that. We create tailored digital solutions for businesses of all sizes.",
        "Great question! For specific project requirements, I recommend scheduling a free consultation with our experts.",
        "I'd love to help you with that! We have extensive experience in web and mobile development across various industries."
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}