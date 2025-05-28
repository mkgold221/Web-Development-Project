// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Shopping Cart Functionality
let cart = [];
let cartCount = 0;

const cartCountElement = document.querySelector('.cart-count');
const addToCartButtons = document.querySelectorAll('.add-to-cart');

// Add to cart functionality
addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const productCard = e.target.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = productCard.querySelector('.price').textContent;
        const productImage = productCard.querySelector('img').src;
        
        const product = {
            name: productName,
            price: productPrice,
            image: productImage,
            id: Date.now()
        };
        
        cart.push(product);
        cartCount++;
        cartCountElement.textContent = cartCount;
        
        // Show success message
        showNotification(`${productName} added to cart!`, 'success');
        
        // Add animation to cart icon
        cartCountElement.parentElement.style.transform = 'scale(1.2)';
        setTimeout(() => {
            cartCountElement.parentElement.style.transform = 'scale(1)';
        }, 200);
    });
});

// Wishlist functionality
const wishlistButtons = document.querySelectorAll('.wishlist-btn');
let wishlist = [];

wishlistButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const productCard = e.target.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        const heartIcon = e.target.closest('button').querySelector('i');
        
        if (heartIcon.classList.contains('fas')) {
            // Remove from wishlist
            heartIcon.classList.remove('fas');
            heartIcon.classList.add('far');
            wishlist = wishlist.filter(item => item.name !== productName);
            showNotification(`${productName} removed from wishlist`, 'info');
        } else {
            // Add to wishlist
            heartIcon.classList.remove('far');
            heartIcon.classList.add('fas');
            wishlist.push({ name: productName });
            showNotification(`${productName} added to wishlist!`, 'success');
        }
    });
});

// Product filtering by category
const categoryItems = document.querySelectorAll('.category-item');
const productCards = document.querySelectorAll('.product-card');

categoryItems.forEach(item => {
    item.addEventListener('click', () => {
        const filter = item.dataset.filter;
        
        // Remove active class from all categories
        categoryItems.forEach(cat => cat.classList.remove('active'));
        // Add active class to clicked category
        item.classList.add('active');
        
        // Filter products
        productCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.5s ease';
            } else {
                card.style.display = 'none';
            }
        });
        
        showNotification(`Showing ${filter} products`, 'info');
    });
});

// Search functionality
const searchInput = document.getElementById('search');

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    productCards.forEach(card => {
        const productName = card.querySelector('h3').textContent.toLowerCase();
        const productDescription = card.querySelector('p').textContent.toLowerCase();
        
        if (productName.includes(searchTerm) || productDescription.includes(searchTerm)) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.5s ease';
        } else {
            card.style.display = 'none';
        }
    });
});

// Newsletter form submission
const newsletterForm = document.getElementById('newsletterForm');

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    
    // Simulate API call
    setTimeout(() => {
        showNotification('Thank you for subscribing to our newsletter!', 'success');
        e.target.reset();
    }, 1000);
});

// Contact form submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    
    // Simulate API call
    setTimeout(() => {
        showNotification(`Thank you ${name}! We'll get back to you soon.`, 'success');
        e.target.reset();
    }, 1000);
});

// Smooth scrolling for navigation links
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

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.product-card, .service-card, .testimonial-card, .category-item').forEach(el => {
    observer.observe(el);
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(248, 244, 240, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'linear-gradient(135deg, #f8f4f0 0%, #f0e6e0 100%)';
        header.style.backdropFilter = 'none';
    }
});

// Quick view functionality
const quickViewButtons = document.querySelectorAll('.quick-view-btn');

quickViewButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const productCard = e.target.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = productCard.querySelector('.price').textContent;
        const productImage = productCard.querySelector('img').src;
        const productDescription = productCard.querySelector('p').textContent;
        
        // Create modal (simplified version)
        showProductModal({
            name: productName,
            price: productPrice,
            image: productImage,
            description: productDescription
        });
    });
});

// Product modal function
function showProductModal(product) {
    const modal = document.createElement('div');
    modal.className = 'product-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <div class="modal-body">
                <img src="${product.image}" alt="${product.name}">
                <div class="modal-info">
                    <h2>${product.name}</h2>
                    <p>${product.description}</p>
                    <div class="modal-price">${product.price}</div>
                    <div class="modal-actions">
                        <button class="btn btn-primary">Add to Cart</button>
                        <button class="btn btn-secondary">Add to Wishlist</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    modal.querySelector('.close-modal').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '500',
        zIndex: '10000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        maxWidth: '300px'
    });
    
    // Set background color based on type
    switch(type) {
        case 'success':
            notification.style.background = '#10b981';
            break;
        case 'error':
            notification.style.background = '#ef4444';
            break;
        case 'info':
            notification.style.background = '#3b82f6';
            break;
        default:
            notification.style.background = '#6b7280';
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Image lazy loading
const images = document.querySelectorAll('img');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.src; // Trigger loading
            img.style.opacity = '1';
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => {
    imageObserver.observe(img);
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Add loading animation to page elements
    const elements = document.querySelectorAll('.hero-content, .about-text, .section-title');
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('fade-in-up');
        }, index * 200);
    });
    
    // Initialize cart count
    cartCountElement.textContent = cartCount;
    
    console.log('Figmastyle Fashion Website Loaded Successfully!');
});