// Currency conversion data
const exchangeRates = {
    'NGN': 1,
    'USD': 0.0012,
    'EUR': 0.0011,
    'GBP': 0.00094,
    'CAD': 0.0016,
    'AUD': 0.0018
};

const currencySymbols = {
    'NGN': '₦',
    'USD': '$',
    'EUR': '€',
    'GBP': '£',
    'CAD': 'CA$',
    'AUD': 'AU$'
};

const currencyNames = {
    'NGN': 'Naira (NGN)',
    'USD': 'US Dollar (USD)',
    'EUR': 'Euro (EUR)',
    'GBP': 'British Pound (GBP)',
    'CAD': 'Canadian Dollar (CAD)',
    'AUD': 'Australian Dollar (AUD)'
};

const originalPrices = {
    'basic-website': 350000,
    'business-website': 500000,
    'ecommerce-website': 800000,
    'basic-app': 500000,
    'business-app': 1200000,
    'enterprise-app': 2500000,
    'basic-maintenance': 50000,
    'pro-maintenance': 100000,
    'enterprise-maintenance': 200000
};

// Tab functionality
document.addEventListener('DOMContentLoaded', function() {
    // Tab switching
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('current'));
            tabPanels.forEach(panel => panel.classList.remove('current'));
            button.classList.add('current');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('current');
        });
    });

    // Currency conversion
    const currencySelect = document.getElementById('currency-select');
    currencySelect.addEventListener('change', function() {
        updatePrices(this.value);
        updateHiddenCurrency(this.value);
    });
    updatePrices(currencySelect.value);
    updateHiddenCurrency(currencySelect.value);
    
    // Initialize custom quote form
    initCustomQuoteForm();
    
    // Close popup functionality
    initPopupClose();
});

function updatePrices(currency) {
    const rate = exchangeRates[currency];
    const symbol = currencySymbols[currency];
    
    for (const [key, originalPrice] of Object.entries(originalPrices)) {
        const convertedPrice = Math.round(originalPrice * rate);
        const formattedPrice = new Intl.NumberFormat('en-US').format(convertedPrice);
        
        const amountElement = document.getElementById(`amount-${key}`);
        if (amountElement) amountElement.textContent = formattedPrice;
        
        const currencyElement = document.getElementById(`currency-${key}`);
        if (currencyElement) currencyElement.textContent = symbol;
    }
    
    updateBudgetOptions(currency, rate, symbol);
}

function updateBudgetOptions(currency, rate, symbol) {
    const budgetSelect = document.querySelector('#custom select[name="budget"]');
    if (budgetSelect) {
        const options = budgetSelect.querySelectorAll('option');
        options.forEach(option => {
            if (option.value === '100-500') {
                const min = Math.round(100000 * rate);
                const max = Math.round(500000 * rate);
                const displayText = `${symbol}${new Intl.NumberFormat('en-US').format(min)} - ${symbol}${new Intl.NumberFormat('en-US').format(max)}`;
                option.textContent = displayText;
            } else if (option.value === '500-1000') {
                const min = Math.round(500000 * rate);
                const max = Math.round(1000000 * rate);
                const displayText = `${symbol}${new Intl.NumberFormat('en-US').format(min)} - ${symbol}${new Intl.NumberFormat('en-US').format(max)}`;
                option.textContent = displayText;
            } else if (option.value === '1000+') {
                const min = Math.round(1000000 * rate);
                const displayText = `${symbol}${new Intl.NumberFormat('en-US').format(min)}+`;
                option.textContent = displayText;
            }
        });
    }
}

function updateHiddenCurrency(currency) {
    const hiddenCurrency = document.getElementById('hiddenCurrency');
    if (hiddenCurrency) {
        hiddenCurrency.value = currencyNames[currency];
    }
}

// AJAX CUSTOM QUOTE FORM WITH FORMSUBMIT
function initCustomQuoteForm() {
    const quoteForm = document.getElementById('customQuoteForm');
    const submitBtn = document.getElementById('submitQuoteBtn');

    if (!quoteForm) return;

    quoteForm.addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent default form submission
        
        // Get form values for the popup message
        const name = quoteForm.querySelector('input[name="name"]').value.trim();
        const email = quoteForm.querySelector('input[name="email"]').value.trim();
        const projectType = quoteForm.querySelector('input[name="projectType"]').value.trim();
        const description = quoteForm.querySelector('textarea[name="description"]').value.trim();
        const budgetSelect = quoteForm.querySelector('select[name="budget"]');
        const budgetValue = budgetSelect.value;
        const currencyValue = document.getElementById('hiddenCurrency').value;
        
        // Get selected budget text
        const budgetText = budgetSelect.options[budgetSelect.selectedIndex].textContent;

        // Validation
        if (!name || !email || !projectType || !description || !budgetValue) {
            showPopup('error', 'Please fill in all required fields!');
            return;
        }

        // Show loading state
        submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;

        try {
            // Prepare form data for AJAX submission
            const formData = {
                name: name,
                email: email,
                projectType: projectType,
                description: description,
                budget: budgetText,
                currency: currencyValue,
                _subject: `New Custom Quote Request: ${projectType}`,
                _captcha: 'false',
                _template: 'table'
            };

            console.log('Sending form data via AJAX...');

            // Send using FormSubmit.co AJAX endpoint
            const response = await fetch('https://formsubmit.co/ajax/websifyapp@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (result.success) {
                // Show success popup
                showPopup('success', 'Quote Request Sent!', 
                    `Thank you ${name}! We've received your ${projectType} project details and will get back to you within 24 hours.`);
                
                // Reset form
                quoteForm.reset();
                
                console.log('Form submitted successfully via AJAX');
            } else {
                throw new Error('Form submission failed');
            }
            
        } catch (error) {
            console.error('AJAX submission error:', error);
            showPopup('error', 'Submission Failed', 
                'Sorry, we encountered an error. Please try again or email us directly at websifyapp@gmail.com');
        } finally {
            // Reset button state
            submitBtn.innerHTML = 'Send Message';
            submitBtn.disabled = false;
        }
    });
}

function initPopupClose() {
    const popupOverlay = document.getElementById('quotePopupOverlay');
    const popupCloseBtn = document.getElementById('quotePopupCloseBtn');

    if (popupCloseBtn) {
        popupCloseBtn.addEventListener('click', function() {
            popupOverlay.classList.remove('active');
        });
    }
    
    if (popupOverlay) {
        popupOverlay.addEventListener('click', function(event) {
            if (event.target === this) {
                popupOverlay.classList.remove('active');
            }
        });
    }
    
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const popupOverlay = document.getElementById('quotePopupOverlay');
            if (popupOverlay) popupOverlay.classList.remove('active');
        }
    });
}

function showPopup(type, title, message) {
    const popupIcon = document.getElementById('quotePopupIcon');
    const popupTitle = document.getElementById('quotePopupTitle');
    const popupMessage = document.getElementById('quotePopupMessage');
    const popupOverlay = document.getElementById('quotePopupOverlay');

    if (popupIcon && popupTitle && popupMessage && popupOverlay) {
        if (type === 'success') {
            popupIcon.innerHTML = '<i class="fas fa-check-circle"></i>';
            popupIcon.className = 'quote-popup-icon';
        } else if (type === 'error') {
            popupIcon.innerHTML = '<i class="fas fa-exclamation-circle"></i>';
            popupIcon.className = 'quote-popup-icon error';
        }
        
        popupTitle.textContent = title;
        popupMessage.textContent = message;
        
        popupOverlay.classList.add('active');
    }
}