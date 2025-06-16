document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    
    window.addEventListener('load', () => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });

    // Sticky Header
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Back to Top Button
        const backToTop = document.querySelector('.back-to-top');
        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });

    // Back to Top Button
    const backToTop = document.querySelector('.back-to-top');
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navList.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navList.classList.remove('active');
        });
    });

    // Product Data
    const products = [
        {
            id: 1,
            title: "Wireless Headphones",
            price: 99.99,
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            description: "Premium wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and travelers."
        },
        {
            id: 2,
            title: "Smart Watch",
            price: 199.99,
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1399&q=80",
            description: "Feature-packed smartwatch with health monitoring, GPS, and water resistance up to 50 meters."
        },
        {
            id: 3,
            title: "Bluetooth Speaker",
            price: 79.99,
            image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1489&q=80",
            description: "Portable Bluetooth speaker with 20W output, deep bass, and 15-hour playtime. Perfect for outdoor adventures."
        },
        {
            id: 4,
            title: "Gaming Keyboard",
            price: 129.99,
            image: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            description: "Mechanical gaming keyboard with RGB lighting, anti-ghosting, and customizable macro keys."
        },
        {
            id: 5,
            title: "Wireless Mouse",
            price: 49.99,
            image: "https://images.unsplash.com/photo-1527814050087-3793815479db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80",
            description: "Ergonomic wireless mouse with precision tracking, 6 programmable buttons, and long battery life."
        },
        {
            id: 6,
            title: "Laptop Backpack",
            price: 59.99,
            image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
            description: "Durable laptop backpack with USB charging port, water-resistant material, and multiple compartments."
        }
    ];

    // Render Products
    const productsGrid = document.querySelector('.products-grid');
    
    function renderProducts() {
        productsGrid.innerHTML = '';
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.title}">
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.title}</h3>
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <div class="product-actions">
                        <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                        <button class="wishlist-btn"><i class="far fa-heart"></i></button>
                    </div>
                </div>
            `;
            productsGrid.appendChild(productCard);
        });
        
        // Initialize animations for product cards
        animateOnScroll();
    }
    
    renderProducts();

    // Cart Functionality
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.querySelector('.cart-count');
    
    function updateCartCount() {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    
    // Add to Cart
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            const product = products.find(p => p.id === productId);
            
            const existingItem = cart.find(item => item.id === productId);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    image: product.image,
                    quantity: 1
                });
            }
            
            updateCartCount();
            
            // Show feedback
            e.target.textContent = 'Added!';
            setTimeout(() => {
                e.target.textContent = 'Add to Cart';
            }, 2000);
        }
        
        // Wishlist button
        if (e.target.classList.contains('wishlist-btn') || e.target.closest('.wishlist-btn')) {
            const wishlistBtn = e.target.classList.contains('wishlist-btn') ? e.target : e.target.closest('.wishlist-btn');
            const icon = wishlistBtn.querySelector('i');
            
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas', 'text-danger');
            } else {
                icon.classList.remove('fas', 'text-danger');
                icon.classList.add('far');
            }
        }
    });

    // Product Modal
    const modal = document.querySelector('.modal');
    const closeModal = document.querySelector('.close-modal');
    const modalProductImage = document.querySelector('#modalProductImage');
    const modalProductTitle = document.querySelector('#modalProductTitle');
    const modalProductPrice = document.querySelector('#modalProductPrice');
    const modalProductDescription = document.querySelector('#modalProductDescription');
    const addToCartModal = document.querySelector('.add-to-cart-modal');
    
    // Open modal when clicking a product
    document.addEventListener('click', function(e) {
        const productCard = e.target.closest('.product-card');
        if (productCard) {
            const productId = parseInt(productCard.querySelector('.add-to-cart').getAttribute('data-id'));
            const product = products.find(p => p.id === productId);
            
            if (product) {
                modalProductImage.src = product.image;
                modalProductImage.alt = product.title;
                modalProductTitle.textContent = product.title;
                modalProductPrice.textContent = `$${product.price.toFixed(2)}`;
                modalProductDescription.textContent = product.description;
                addToCartModal.setAttribute('data-id', product.id);
                
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        }
    });
    
    // Close modal
    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Add to cart from modal
    addToCartModal.addEventListener('click', function() {
        const productId = parseInt(this.getAttribute('data-id'));
        const quantity = parseInt(document.querySelector('.quantity-input').value);
        const product = products.find(p => p.id === productId);
        
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                quantity: quantity
            });
        }
        
        updateCartCount();
        
        // Show feedback
        this.textContent = 'Added to Cart!';
        setTimeout(() => {
            this.textContent = 'Add to Cart';
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }, 1500);
    });
    
    // Quantity selector in modal
    const quantityInput = document.querySelector('.quantity-input');
    const minusBtn = document.querySelector('.quantity-btn.minus');
    const plusBtn = document.querySelector('.quantity-btn.plus');
    
    minusBtn.addEventListener('click', () => {
        let value = parseInt(quantityInput.value);
        if (value > 1) {
            quantityInput.value = value - 1;
        }
    });
    
    plusBtn.addEventListener('click', () => {
        let value = parseInt(quantityInput.value);
        quantityInput.value = value + 1;
    });
    
    quantityInput.addEventListener('change', () => {
        if (quantityInput.value < 1) {
            quantityInput.value = 1;
        }
    });

    // Testimonial Carousel
    const carouselInner = document.querySelector('.carousel-inner');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.carousel-control.prev');
    const nextBtn = document.querySelector('.carousel-control.next');
    let currentIndex = 0;
    
    function updateCarousel() {
        const offset = -currentIndex * 100;
        carouselInner.style.transform = `translateX(${offset}%)`;
    }
    
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : carouselItems.length - 1;
        updateCarousel();
    });
    
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex < carouselItems.length - 1) ? currentIndex + 1 : 0;
        updateCarousel();
    });
    
    // Auto-rotate carousel
    let carouselInterval = setInterval(() => {
        currentIndex = (currentIndex < carouselItems.length - 1) ? currentIndex + 1 : 0;
        updateCarousel();
    }, 5000);
    
    // Pause on hover
    const carousel = document.querySelector('.carousel');
    carousel.addEventListener('mouseenter', () => {
        clearInterval(carouselInterval);
    });
    
    carousel.addEventListener('mouseleave', () => {
        carouselInterval = setInterval(() => {
            currentIndex = (currentIndex < carouselItems.length - 1) ? currentIndex + 1 : 0;
            updateCarousel();
        }, 5000);
    });

    // Newsletter Form Validation
    const newsletterForm = document.querySelector('.newsletter-form');
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        
        if (!emailInput.value || !emailInput.value.includes('@')) {
            emailInput.style.borderColor = 'var(--danger-color)';
            setTimeout(() => {
                emailInput.style.borderColor = '#e5e7eb';
            }, 2000);
        } else {
            this.querySelector('button').textContent = 'Subscribed!';
            setTimeout(() => {
                this.querySelector('button').textContent = 'Subscribe';
                emailInput.value = '';
            }, 2000);
        }
    });

    // Scroll Animations
    function animateOnScroll() {
        const elements = document.querySelectorAll('.category-card, .product-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        elements.forEach(element => {
            observer.observe(element);
        });
    }
    
    // Initialize animations on load
    animateOnScroll();
});