// Firebase configuration and imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-analytics.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    onAuthStateChanged, 
    signOut,
    sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAtkeORbZvpeW5H7gaBy9XenaWrvFa5TeM",
    authDomain: "auth-form-acf8e.firebaseapp.com",
    projectId: "auth-form-acf8e",
    storageBucket: "auth-form-acf8e.firebasestorage.app",
    messagingSenderId: "983054309129",
    appId: "1:983054309129:web:24d582a29875d5bd6d65d8",
    measurementId: "G-R85XQ5JJLR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const loginGate = document.getElementById('loginGate');
    const mainWebsite = document.getElementById('mainWebsite');
    const userEmailDisplay = document.getElementById('userEmailDisplay');
    const logoutBtn = document.getElementById('logoutBtn');

    // Auth form elements
    const loginTab = document.getElementById('login-tab');
    const signupTab = document.getElementById('signup-tab');
    const forgotTab = document.getElementById('forgot-tab');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const forgotForm = document.getElementById('forgot-form');

    // Form elements
    const loginFormElement = document.getElementById('loginForm');
    const signupFormElement = document.getElementById('signupForm');
    const forgotFormElement = document.getElementById('forgotForm');

    // Message elements
    const loginMessage = document.getElementById('loginMessage');
    const signupMessage = document.getElementById('signupMessage');
    const forgotMessage = document.getElementById('forgotMessage');

    // Links
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');
    const backToLoginLink = document.getElementById('backToLoginLink');

    // Contact form
    const contactForm = document.getElementById('contactForm');
    const contactFormMessage = document.getElementById('contactFormMessage');

    // Tab switching functionality
    if (loginTab) loginTab.addEventListener('click', () => showForm('login'));
    if (signupTab) signupTab.addEventListener('click', () => showForm('signup'));
    if (forgotTab) forgotTab.addEventListener('click', () => showForm('forgot'));
    
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', (e) => {
            e.preventDefault();
            showForm('forgot');
        });
    }
    
    if (backToLoginLink) {
        backToLoginLink.addEventListener('click', (e) => {
            e.preventDefault();
            showForm('login');
        });
    }

    function showForm(formType) {
        // Reset all tabs and forms
        document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
        document.querySelectorAll('.form-container').forEach(form => form.classList.add('hidden'));
        
        // Show selected form
        switch(formType) {
            case 'login':
                if (loginTab) loginTab.classList.add('active');
                if (loginForm) loginForm.classList.remove('hidden');
                break;
            case 'signup':
                if (signupTab) signupTab.classList.add('active');
                if (signupForm) signupForm.classList.remove('hidden');
                break;
            case 'forgot':
                if (forgotTab) forgotTab.classList.add('active');
                if (forgotForm) forgotForm.classList.remove('hidden');
                break;
        }
        
        clearMessages();
    }

    function clearMessages() {
        if (loginMessage) loginMessage.classList.add('hidden');
        if (signupMessage) signupMessage.classList.add('hidden');
        if (forgotMessage) forgotMessage.classList.add('hidden');
    }

    function showMessage(element, message, type) {
        if (element) {
            element.textContent = message;
            element.classList.remove('hidden', 'error', 'success');
            element.classList.add(type);
        }
    }

    // Authentication form handlers
    if (signupFormElement) {
        signupFormElement.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('signupEmail')?.value;
            const password = document.getElementById('signupPassword')?.value;
            const confirmPassword = document.getElementById('confirmPassword')?.value;
            
            // Validation
            if (password !== confirmPassword) {
                showMessage(signupMessage, "Passwords don't match", 'error');
                return;
            }
            
            if (password.length < 6) {
                showMessage(signupMessage, "Password should be at least 6 characters", 'error');
                return;
            }
            
            try {
                await createUserWithEmailAndPassword(auth, email, password);
                showMessage(signupMessage, "Account created successfully! Redirecting...", 'success');
                signupFormElement.reset();
            } catch (error) {
                let errorMessage = error.message;
                if (error.code === 'auth/email-already-in-use') {
                    errorMessage = "This email is already registered. Please try logging in.";
                } else if (error.code === 'auth/weak-password') {
                    errorMessage = "Password should be at least 6 characters.";
                } else if (error.code === 'auth/invalid-email') {
                    errorMessage = "Please enter a valid email address.";
                }
                showMessage(signupMessage, errorMessage, 'error');
            }
        });
    }

    if (loginFormElement) {
        loginFormElement.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail')?.value;
            const password = document.getElementById('loginPassword')?.value;
            
            try {
                await signInWithEmailAndPassword(auth, email, password);
                showMessage(loginMessage, "Login successful! Redirecting...", 'success');
                loginFormElement.reset();
            } catch (error) {
                let errorMessage = error.message;
                if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                    errorMessage = "Invalid email or password.";
                } else if (error.code === 'auth/too-many-requests') {
                    errorMessage = "Too many failed attempts. Please try again later.";
                } else if (error.code === 'auth/invalid-email') {
                    errorMessage = "Please enter a valid email address.";
                } else if (error.code === 'auth/invalid-credential') {
                    errorMessage = "Invalid email or password.";
                }
                showMessage(loginMessage, errorMessage, 'error');
            }
        });
    }

    if (forgotFormElement) {
        forgotFormElement.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('forgotEmail')?.value;
            
            try {
                await sendPasswordResetEmail(auth, email);
                showMessage(forgotMessage, "Password reset email sent! Check your inbox.", 'success');
                forgotFormElement.reset();
            } catch (error) {
                let errorMessage = error.message;
                if (error.code === 'auth/user-not-found') {
                    errorMessage = "No account found with this email address.";
                } else if (error.code === 'auth/invalid-email') {
                    errorMessage = "Please enter a valid email address.";
                }
                showMessage(forgotMessage, errorMessage, 'error');
            }
        });
    }

    // Logout functionality
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            try {
                await signOut(auth);
            } catch (error) {
                console.error("Error signing out: ", error);
            }
        });
    }

    // Auth state observer
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in - show main website
            if (loginGate) loginGate.classList.add('hidden');
            if (mainWebsite) mainWebsite.classList.remove('hidden');
            if (userEmailDisplay) userEmailDisplay.textContent = user.email;
        } else {
            // User is signed out - show login gate
            if (loginGate) loginGate.classList.remove('hidden');
            if (mainWebsite) mainWebsite.classList.add('hidden');
            showForm('login'); // Default to login form
        }
    });

    // Contact form handler
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simulate form submission
            showMessage(contactFormMessage, "Thank you for your message! We'll get back to you within 24 hours.", 'success');
            contactForm.reset();
            
            // Hide message after 5 seconds
            setTimeout(() => {
                if (contactFormMessage) contactFormMessage.classList.add('hidden');
            }, 5000);
        });
    }

    // Smooth scrolling for navigation links
    document.addEventListener('click', (e) => {
        if (e.target.matches('a[href^="#"]')) {
            e.preventDefault();
            const target = document.querySelector(e.target.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });

    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Add fade-in animation to login gate
    if (loginGate) {
        loginGate.style.opacity = '0';
        loginGate.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            loginGate.style.transition = 'all 0.6s ease';
            loginGate.style.opacity = '1';
            loginGate.style.transform = 'translateY(0)';
        }, 100);
    }

    // Intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll('.service-card, .portfolio-item, .stat-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});