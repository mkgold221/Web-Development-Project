// Global variables
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let products = [];

// Sample product data
const sampleProducts = [
    {
        id: 1,
        name: "Python Data Analysis Cheat Sheet",
        type: "cheatsheet",
        category: "data-analysis",
        price: 9.99,
        description: "Comprehensive Python cheat sheet covering Pandas, NumPy, and Matplotlib for data analysis.",
        level: "Beginner",
        icon: "fab fa-python",
        preview: `# Python Data Analysis Essentials
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# Load data
df = pd.read_csv('data.csv')

# Basic operations
df.head()
df.describe()
df.info()

# Data cleaning
df.dropna()
df.fillna(0)

# Grouping and aggregation
df.groupby('category').mean()`,
        dateAdded: new Date('2024-01-15')
    },
    {
        id: 2,
        name: "Complete JavaScript Course",
        type: "course",
        category: "web-development",
        price: 49.99,
        description: "Master modern JavaScript from basics to advanced concepts including ES6+, async/await, and DOM manipulation.",
        level: "Intermediate",
        icon: "fab fa-js-square",
        preview: `// Modern JavaScript Essentials
const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
};

// Destructuring and spread operator
const { name, age, ...rest } = user;
const newArray = [...oldArray, newItem];

// Arrow functions and array methods
const filtered = data.filter(item => item.active)
    .map(item => ({ ...item, processed: true }));`,
        dateAdded: new Date('2024-01-10')
    },
    {
        id: 3,
        name: "SQL Query Cheat Sheet",
        type: "cheatsheet",
        category: "data-analysis",
        price: 7.99,
        description: "Essential SQL commands and queries for database operations, joins, and data manipulation.",
        level: "Beginner",
        icon: "fas fa-database",
        preview: `-- SQL Query Essentials
SELECT column1, column2
FROM table_name
WHERE condition
ORDER BY column1 DESC;

-- Joins
SELECT a.*, b.name
FROM table_a a
INNER JOIN table_b b ON a.id = b.table_a_id;

-- Aggregations
SELECT category, COUNT(*), AVG(price)
FROM products
GROUP BY category
HAVING COUNT(*) > 5;

-- Window functions
SELECT name, salary,
    ROW_NUMBER() OVER (ORDER BY salary DESC) as rank
FROM employees;`,
        dateAdded: new Date('2024-01-20')
    },
    {
        id: 4,
        name: "Machine Learning with Python",
        type: "course",
        category: "machine-learning",
        price: 79.99,
        description: "Learn machine learning algorithms and implementation using Python, scikit-learn, and TensorFlow.",
        level: "Advanced",
        icon: "fas fa-robot",
        preview: `# Machine Learning Fundamentals
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# Prepare data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Train model
model = RandomForestClassifier(n_estimators=100)
model.fit(X_train, y_train)

# Make predictions
predictions = model.predict(X_test)
accuracy = accuracy_score(y_test, predictions)

print(f"Accuracy: {accuracy:.2f}")`,
        dateAdded: new Date('2024-01-05')
    },
    {
        id: 5,
        name: "Excel Formulas Cheat Sheet",
        type: "cheatsheet",
        category: "data-analysis",
        price: 5.99,
        description: "Master Excel formulas and functions for data analysis, including VLOOKUP, pivot tables, and advanced functions.",
        level: "Beginner",
        icon: "fas fa-file-excel",
        preview: `Excel Formula Examples:

// VLOOKUP
=VLOOKUP(A2,Sheet2!A:D,3,FALSE)

// INDEX MATCH (better than VLOOKUP)
=INDEX(C:C,MATCH(A2,B:B,0))

// SUMIFS (multiple criteria)
=SUMIFS(D:D,A:A,"Product A",B:B,">100")

// Array formulas
=SUM(IF(A:A="Criteria",B:B,0))

// Pivot table formulas
=GETPIVOTDATA("Sales",$A$3,"Product","Widget")`,
        dateAdded: new Date('2024-01-25')
    },
    {
        id: 6,
        name: "React Development Course",
        type: "course",
        category: "web-development",
        price: 59.99,
        description: "Build modern web applications with React, including hooks, context, and state management.",
        level: "Intermediate",
        icon: "fab fa-react",
        preview: `// React Hooks Example
import React, { useState, useEffect, useContext } from 'react';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        fetchUser()
            .then(userData => {
                setUser(userData);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error:', error);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div className={theme}>
            <h1>{user?.name}</h1>
            <p>{user?.email}</p>
        </div>
    );
};`,
        dateAdded: new Date('2024-01-12')
    },
    {
        id: 7,
        name: "CSS Grid & Flexbox Guide",
        type: "cheatsheet",
        category: "web-development",
        price: 8.99,
        description: "Complete guide to modern CSS layout with Grid and Flexbox, including responsive design patterns.",
        level: "Intermediate",
        icon: "fab fa-css3-alt",
        preview: `/* CSS Grid Layout */
.container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-gap: 1rem;
    grid-template-areas: 
        "header header header"
        "sidebar main main"
        "footer footer footer";
}

/* Flexbox Layout */
.flex-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
}

.flex-item {
    flex: 1 1 300px;
    min-width: 0;
}

/* Responsive Grid */
@media (max-width: 768px) {
    .container {
        grid-template-columns: 1fr;
        grid-template-areas: 
            "header"
            "main"
            "sidebar"
            "footer";
    }
}`,
        dateAdded: new Date('2024-01-18')
    },
    {
        id: 8,
        name: "Data Science with R",
        type: "course",
        category: "machine-learning",
        price: 69.99,
        description: "Learn data science and statistical analysis using R programming language and popular packages.",
        level: "Intermediate",
        icon: "fas fa-chart-line",
        preview: `# R Data Science Essentials
library(dplyr)
library(ggplot2)
library(tidyr)

# Data manipulation with dplyr
data %>%
    filter(category == "A") %>%
    group_by(region) %>%
    summarise(
        avg_sales = mean(sales),
        total_count = n()
    ) %>%
    arrange(desc(avg_sales))

# Data visualization with ggplot2
ggplot(data, aes(x = date, y = sales, color = category)) +
    geom_line() +
    facet_wrap(~region) +
    theme_minimal() +
    labs(title = "Sales Trends by Region",
         x = "Date", y = "Sales")

# Statistical modeling
model <- lm(sales ~ price + advertising + season, data = data)
summary(model)`,
        dateAdded: new Date('2024-01-08')
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Load theme
    loadTheme();
    
    // Initialize products
    products = [...sampleProducts];
    
    // Update cart count
    updateCartCount();
    
    // Set up event listeners
    setupEventListeners();
    
    // Initialize page-specific functionality
    initializePage();
    
    // Add fade-in animation to elements
    addFadeInAnimation();
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        if (savedTheme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }
}

function setupEventListeners() {
    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Mobile menu
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Cart functionality
    const cartBtn = document.getElementById('cartBtn');
    const cartClose = document.getElementById('cartClose');
    const cartOverlay = document.getElementById('cartOverlay');
    const cartSidebar = document.getElementById('cartSidebar');
    
    if (cartBtn) cartBtn.addEventListener('click', openCart);
    if (cartClose) cartClose.addEventListener('click', closeCart);
    if (cartOverlay) cartOverlay.addEventListener('click', closeCart);
    
    // Modal functionality
    const modalClose = document.getElementById('modalClose');
    const productModal = document.getElementById('productModal');
    
    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (productModal) {
        productModal.addEventListener('click', (e) => {
            if (e.target === productModal) closeModal();
        });
    }
    
    // Newsletter form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
    
    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
    
    // Checkout button
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', handleCheckout);
    }
    
    // Smooth scrolling for anchor links
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
}

function initializePage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    switch (currentPage) {
        case 'courses.html':
            initializeCoursesPage();
            break;
        case 'index.html':
        case '':
            initializeHomePage();
            break;
    }
}

function initializeHomePage() {
    // Add click handlers to category cards
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.btn')) {
                const category = card.dataset.category;
                window.location.href = `courses.html?category=${category}`;
            }
        });
    });
}

function initializeCoursesPage() {
    // Render products
    renderProducts();
    
    // Set up filters
    setupFilters();
    
    // Check for category parameter
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    if (category) {
        const categoryFilter = document.getElementById('categoryFilter');
        if (categoryFilter) {
            categoryFilter.value = category;
            filterProducts();
        }
    }
}

function renderProducts(productsToRender = products) {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;
    
    if (productsToRender.length === 0) {
        productsGrid.innerHTML = `
            <div class="no-products">
                <p>No products found matching your criteria.</p>
            </div>
        `;
        return;
    }
    
    productsGrid.innerHTML = productsToRender.map(product => `
        <div class="product-card" data-id="${product.id}">
            <div class="product-header">
                <div class="product-icon">
                    <i class="${product.icon}"></i>
                </div>
                <h3>${product.name}</h3>
            </div>
            <div class="product-body">
                <div class="product-meta">
                    <span class="product-tag type-${product.type}">${product.type}</span>
                    <span class="product-tag level-${product.level.toLowerCase()}">${product.level}</span>
                    <span class="product-tag category-${product.category}">${product.category.replace('-', ' ')}</span>
                </div>
                <p>${product.description}</p>
                <div class="product-price">$${product.price}</div>
                <div class="product-actions">
                    <button class="btn btn-outline" onclick="showProductDetails(${product.id})">
                        View Details
                    </button>
                    <button class="btn btn-primary" onclick="addToCart(${product.id})">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function setupFilters() {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const typeFilter = document.getElementById('typeFilter');
    const sortFilter = document.getElementById('sortFilter');
    
    if (searchInput) searchInput.addEventListener('input', filterProducts);
    if (categoryFilter) categoryFilter.addEventListener('change', filterProducts);
    if (typeFilter) typeFilter.addEventListener('change', filterProducts);
    if (sortFilter) sortFilter.addEventListener('change', filterProducts);
}

function filterProducts() {
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const categoryFilter = document.getElementById('categoryFilter')?.value || '';
    const typeFilter = document.getElementById('typeFilter')?.value || '';
    const sortFilter = document.getElementById('sortFilter')?.value || 'name';
    
    let filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) ||
                            product.description.toLowerCase().includes(searchTerm);
        const matchesCategory = !categoryFilter || product.category === categoryFilter;
        const matchesType = !typeFilter || product.type === typeFilter;
        
        return matchesSearch && matchesCategory && matchesType;
    });
    
    // Sort products
    filteredProducts.sort((a, b) => {
        switch (sortFilter) {
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            case 'newest':
                return new Date(b.dateAdded) - new Date(a.dateAdded);
            case 'name':
            default:
                return a.name.localeCompare(b.name);
        }
    });
    
    renderProducts(filteredProducts);
}

function showProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const modal = document.getElementById('productModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    if (!modal || !modalTitle || !modalBody) return;
    
    modalTitle.textContent = product.name;
    modalBody.innerHTML = `
        <div class="modal-product-info">
            <div class="modal-product-icon">
                <i class="${product.icon}"></i>
            </div>
            <h3>${product.name}</h3>
            <div class="product-meta">
                <span class="product-tag type-${product.type}">${product.type}</span>
                <span class="product-tag level-${product.level.toLowerCase()}">${product.level}</span>
                <span class="product-tag category-${product.category}">${product.category.replace('-', ' ')}</span>
            </div>
            <p>${product.description}</p>
            <div class="modal-product-price">$${product.price}</div>
        </div>
        
        <div class="modal-code-preview">
            <div class="code-header">
                <div class="code-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <span>Preview</span>
            </div>
            <pre><code class="language-${getLanguageFromProduct(product)}">${product.preview}</code></pre>
        </div>
        
        <div class="modal-actions">
            <button class="btn btn-primary btn-full" onclick="addToCart(${product.id}); closeModal();">
                Add to Cart - $${product.price}
            </button>
        </div>
    `;
    
    // Highlight code syntax
    if (window.Prism) {
        Prism.highlightAllUnder(modalBody);
    }
    
    modal.classList.add('active');
}

function getLanguageFromProduct(product) {
    if (product.name.toLowerCase().includes('python')) return 'python';
    if (product.name.toLowerCase().includes('javascript')) return 'javascript';
    if (product.name.toLowerCase().includes('sql')) return 'sql';
    if (product.name.toLowerCase().includes('css')) return 'css';
    if (product.name.toLowerCase().includes('react')) return 'jsx';
    if (product.name.toLowerCase().includes('excel')) return 'excel';
    return 'javascript';
}

function closeModal() {
    const modal = document.getElementById('productModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Check if product is already in cart
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        showNotification('Product already in cart!', 'warning');
        return;
    }
    
    cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        type: product.type
    });
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateCartItems();
    showNotification('Added to cart!', 'success');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateCartItems();
    showNotification('Removed from cart!', 'info');
}

function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

function updateCartItems() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (!cartItems || !cartTotal) return;
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="cart-empty">
                <i class="fas fa-shopping-cart" style="font-size: 3rem; color: var(--text-light); margin-bottom: 1rem;"></i>
                <p>Your cart is empty</p>
            </div>
        `;
        cartTotal.textContent = '0.00';
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>${item.type}</p>
            </div>
            <div class="cart-item-price">$${item.price}</div>
            <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `).join('');
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotal.textContent = total.toFixed(2);
}

function openCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    
    if (cartSidebar && cartOverlay) {
        cartSidebar.classList.add('open');
        cartOverlay.classList.add('active');
        updateCartItems();
    }
}

function closeCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    
    if (cartSidebar && cartOverlay) {
        cartSidebar.classList.remove('open');
        cartOverlay.classList.remove('active');
    }
}

function handleCheckout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'warning');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    showNotification(`Checkout complete! Total: $${total.toFixed(2)}`, 'success');
    
    // Clear cart
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateCartItems();
    closeCart();
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        if (newTheme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }
}

function handleNewsletterSubmit(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    
    if (email) {
        showNotification('Thank you for subscribing!', 'success');
        e.target.reset();
    }
}

function handleContactSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Simulate form submission
    showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
    e.target.reset();
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--bg-primary);
        color: var(--text-primary);
        padding: 1rem 1.5rem;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-lg);
        border-left: 4px solid ${getNotificationColor(type)};
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'check-circle';
        case 'warning': return 'exclamation-triangle';
        case 'error': return 'times-circle';
        default: return 'info-circle';
    }
}

function getNotificationColor(type) {
    switch (type) {
        case 'success': return '#10b981';
        case 'warning': return '#f59e0b';
        case 'error': return '#ef4444';
        default: return '#6366f1';
    }
}

function addFadeInAnimation() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate
    document.querySelectorAll('.feature-card, .category-card, .product-card, .team-member, .value-card').forEach(el => {
        observer.observe(el);
    });
}

// Utility functions
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

// Add debounced search
if (document.getElementById('searchInput')) {
    const debouncedFilter = debounce(filterProducts, 300);
    document.getElementById('searchInput').addEventListener('input', debouncedFilter);
}

// Handle page visibility change to pause/resume animations
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when page is not visible
        document.body.style.animationPlayState = 'paused';
    } else {
        // Resume animations when page becomes visible
        document.body.style.animationPlayState = 'running';
    }
});

// Service Worker registration for offline functionality (optional)
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