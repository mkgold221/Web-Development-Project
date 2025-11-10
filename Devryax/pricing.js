/**
 * Pricing Page JavaScript
 * Handles: Tab Navigation, Currency Conversion & Payment Integration
 * Form Submission: Handled by form-submit-handler.js
 */

document.addEventListener("DOMContentLoaded", () => {
  console.log("[Pricing] Page initialized")

  initPricingTabs()
  initCurrencyConverter()
  initPaymentHandlers()

  // Initialize with default currency
  updateBudgetOptions("NGN")
})

// 1️⃣ Tabs Functionality
function initPricingTabs() {
  const tabButtons = document.querySelectorAll(".tab-button")
  const tabPanels = document.querySelectorAll(".tab-panel")

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const tabId = this.getAttribute("data-tab")
      tabButtons.forEach((btn) => btn.classList.remove("current"))
      tabPanels.forEach((panel) => panel.classList.remove("current"))

      this.classList.add("current")
      const targetPanel = document.getElementById(tabId)
      if (targetPanel) targetPanel.classList.add("current")
    })
  })
}

// 2️⃣ Currency Converter
const exchangeRates = {
  NGN: {
    symbol: "₦",
    rates: {
      "Basic Website": 300000,
      "Business Website": 600000,
      "E-commerce Website": 950000,
      "Basic Mobile App": 700000,
      "Business App": 1500000,
      "Enterprise App": 3000000,
      "Basic Maintenance": 50000,
      "Professional Maintenance": 120000,
      "Enterprise Maintenance": 250000,
    },
    budgetOptions: ["₦100,000 - ₦600,000", "₦600,000 - ₦1,200,000", "₦1,200,000+"],
    budgetValues: ["100-600", "600-1200", "1200+"],
  },
  USD: {
    symbol: "$",
    rates: {
      "Basic Website": 699,
      "Business Website": 1299,
      "E-commerce Website": 1999,
      "Basic Mobile App": 1499,
      "Business App": 3299,
      "Enterprise App": 6599,
      "Basic Maintenance": 129,
      "Professional Maintenance": 259,
      "Enterprise Maintenance": 599,
    },
    budgetOptions: ["$300 - $1,200", "$1,200 - $2,500", "$2,500+"],
    budgetValues: ["300-1200", "1200-2500", "2500+"],
  },
  EUR: {
    symbol: "€",
    rates: {
      "Basic Website": 599,
      "Business Website": 1199,
      "E-commerce Website": 1799,
      "Basic Mobile App": 1399,
      "Business App": 2999,
      "Enterprise App": 6199,
      "Basic Maintenance": 199,
      "Professional Maintenance": 299,
      "Enterprise Maintenance": 499,
    },
    budgetOptions: ["€250 - €1,100", "€1,100 - €2,200", "€2,200+"],
    budgetValues: ["250-1100", "1100-2200", "2200+"],
  },
  GBP: {
    symbol: "£",
    rates: {
      "Basic Website": 499,
      "Business Website": 999,
      "E-commerce Website": 1599,
      "Basic Mobile App": 1199,
      "Business App": 2699,
      "Enterprise App": 5499,
      "Basic Maintenance": 199,
      "Professional Maintenance": 299,
      "Enterprise Maintenance": 499,
    },
    budgetOptions: ["£200 - £950", "£950 - £1,900", "£1,900+"],
    budgetValues: ["200-950", "950-1900", "1900+"],
  },
  CAD: {
    symbol: "CA$",
    rates: {
      "Basic Website": 899,
      "Business Website": 1599,
      "E-commerce Website": 2499,
      "Basic Mobile App": 1899,
      "Business App": 3899,
      "Enterprise App": 7899,
      "Basic Maintenance": 159,
      "Professional Maintenance": 399,
      "Enterprise Maintenance": 699,
    },
    budgetOptions: ["CA$250 - CA$1,500", "CA$1,500 - CA$3,000", "CA$3,000+"],
    budgetValues: ["250-1500", "1500-3000", "3000+"],
  },
  AUD: {
    symbol: "AU$",
    rates: {
      "Basic Website": 1699,
      "Business Website": 2499,
      "E-commerce Website": 3499,
      "Basic Mobile App": 2100,
      "Business App": 4299,
      "Enterprise App": 8699,
      "Basic Maintenance": 169,
      "Professional Maintenance": 329,
      "Enterprise Maintenance": 699,
    },
    budgetOptions: ["AU$300 - AU$1,600", "AU$1,600 - AU$3,200", "AU$3,200+"],
    budgetValues: ["300-1600", "1600-3200", "3200+"],
  },
};

function initCurrencyConverter() {
  const currencySelect = document.getElementById("currency-select")
  if (!currencySelect) return

  currencySelect.addEventListener("change", function () {
    const selectedCurrency = this.value
    updatePrices(selectedCurrency)
    updateBudgetOptions(selectedCurrency)
    updatePaymentButtons(selectedCurrency)
  })
}

function updatePrices(currency) {
  const currencyData = exchangeRates[currency]
  if (!currencyData) return

  const plans = [
    { name: "Basic Website", amountId: "amount-basic-website", currencyId: "currency-basic-website" },
    { name: "Business Website", amountId: "amount-business-website", currencyId: "currency-business-website" },
    { name: "E-commerce Website", amountId: "amount-ecommerce-website", currencyId: "currency-ecommerce-website" },
    { name: "Basic Mobile App", amountId: "amount-basic-app", currencyId: "currency-basic-app" },
    { name: "Business App", amountId: "amount-business-app", currencyId: "currency-business-app" },
    { name: "Enterprise App", amountId: "amount-enterprise-app", currencyId: "currency-enterprise-app" },
    { name: "Basic Maintenance", amountId: "amount-basic-maintenance", currencyId: "currency-basic-maintenance" },
    { name: "Professional Maintenance", amountId: "amount-pro-maintenance", currencyId: "currency-pro-maintenance" },
    {
      name: "Enterprise Maintenance",
      amountId: "amount-enterprise-maintenance",
      currencyId: "currency-enterprise-maintenance",
    },
  ]

  plans.forEach((plan) => {
    const amountElement = document.getElementById(plan.amountId)
    const currencyElement = document.getElementById(plan.currencyId)
    if (amountElement && currencyElement) {
      const price = currencyData.rates[plan.name]
      amountElement.textContent = formatPrice(price, currency)
      currencyElement.textContent = currencyData.symbol
    }
  })

  const hiddenCurrency = document.getElementById("hiddenCurrency")
  if (hiddenCurrency) hiddenCurrency.value = currency
}

function updateBudgetOptions(currency) {
  const currencyData = exchangeRates[currency]
  if (!currencyData) return

  const budgetSelect = document.getElementById("budgetSelect")
  if (!budgetSelect) return

  while (budgetSelect.options.length > 1) budgetSelect.remove(1)

  currencyData.budgetOptions.forEach((optionText, index) => {
    const option = document.createElement("option")
    option.value = currencyData.budgetValues[index]
    option.textContent = optionText
    budgetSelect.appendChild(option)
  })
}

// 3️⃣ Payment Integration
function initPaymentHandlers() {
  // Check if payment modal exists
  const paymentModal = document.getElementById('paymentModal');
  if (!paymentModal) {
    console.warn("[Payment] Payment modal not found - payment features disabled");
    return;
  }

  // Payment configuration
  const paymentConfig = {
    stripe: {
      publicKey: 'pk_test_your_stripe_public_key_here',
      successUrl: window.location.href + '?payment=success',
      cancelUrl: window.location.href + '?payment=canceled'
    },
    flutterwave: {
      publicKey: 'FLWPUBK_TEST_your_flutterwave_public_key_here',
      redirectUrl: window.location.href + '?payment=success'
    }
  };

  // Initialize Stripe if public key is set
  let stripe = null;
  if (paymentConfig.stripe.publicKey && paymentConfig.stripe.publicKey !== 'pk_test_your_stripe_public_key_here') {
    stripe = Stripe(paymentConfig.stripe.publicKey);
  }

  // Payment data
  let currentPaymentData = {
    plan: '',
    amount: 0,
    currency: 'NGN',
    recurring: false
  };

  // Payment modal elements
  const selectedPlanElement = document.getElementById('selectedPlan');
  const paymentAmountElement = document.getElementById('paymentAmount');
  const paymentCurrencyElement = document.getElementById('paymentCurrency');
  const closePaymentModalBtn = document.getElementById('closePaymentModal');
  const stripePaymentBtn = document.getElementById('stripePayment');
  const flutterwavePaymentBtn = document.getElementById('flutterwavePayment');

  // Payment buttons event listeners
  document.querySelectorAll('.payment-btn').forEach(button => {
    button.addEventListener('click', function() {
      const plan = this.getAttribute('data-plan');
      const amount = parseInt(this.getAttribute('data-amount'));
      const currency = this.getAttribute('data-currency');
      const recurring = this.getAttribute('data-recurring') === 'true';
      
      // Update current payment data
      currentPaymentData = {
        plan,
        amount,
        currency,
        recurring
      };
      
      // Update modal content
      if (selectedPlanElement) selectedPlanElement.textContent = plan;
      if (paymentAmountElement) paymentAmountElement.textContent = formatPrice(amount, currency);
      if (paymentCurrencyElement) paymentCurrencyElement.textContent = getCurrencySymbol(currency);
      
      // Show modal
      paymentModal.classList.add('active');
    });
  });

  // Close modal
  if (closePaymentModalBtn) {
    closePaymentModalBtn.addEventListener('click', () => {
      paymentModal.classList.remove('active');
    });
  }

  // Stripe payment
  if (stripePaymentBtn && stripe) {
    stripePaymentBtn.addEventListener('click', async () => {
      try {
        // Create a payment session on your server
        const response = await fetch('/create-checkout-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            plan: currentPaymentData.plan,
            amount: currentPaymentData.amount,
            currency: currentPaymentData.currency.toLowerCase(),
            recurring: currentPaymentData.recurring
          })
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const session = await response.json();

        // Redirect to Stripe Checkout
        const result = await stripe.redirectToCheckout({
          sessionId: session.id
        });

        if (result.error) {
          alert(result.error.message);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again or contact support.');
      }
    });
  } else if (stripePaymentBtn) {
    stripePaymentBtn.style.display = 'none'; // Hide Stripe button if not configured
  }

  // Flutterwave payment
  if (flutterwavePaymentBtn && typeof FlutterwaveCheckout !== 'undefined') {
    flutterwavePaymentBtn.addEventListener('click', () => {
      FlutterwaveCheckout({
        public_key: paymentConfig.flutterwave.publicKey,
        tx_ref: 'WS-' + Date.now(),
        amount: currentPaymentData.amount,
        currency: currentPaymentData.currency,
        payment_options: 'card, banktransfer, ussd',
        customer: {
          email: 'customer@example.com',
          name: 'Customer Name',
        },
        customizations: {
          title: 'Websifyapp',
          description: `Payment for ${currentPaymentData.plan}`,
          logo: 'logo.png',
        },
        callback: function(response) {
          if (response.status === 'successful') {
            alert('Payment successful! Transaction ID: ' + response.transaction_id);
            window.location.href = paymentConfig.flutterwave.redirectUrl;
          } else {
            alert('Payment failed. Please try again.');
          }
        },
        onclose: function() {
          console.log('Payment modal closed');
        }
      });
    });
  } else if (flutterwavePaymentBtn) {
    flutterwavePaymentBtn.style.display = 'none'; // Hide Flutterwave button if not configured
  }
}

// Update payment buttons when currency changes
function updatePaymentButtons(currency) {
  document.querySelectorAll('.payment-btn').forEach(button => {
    const plan = button.getAttribute('data-plan');
    const amount = getConvertedAmount(plan, currency);
    
    button.setAttribute('data-currency', currency);
    button.setAttribute('data-amount', amount);
  });
}

// Helper function to get converted amount
function getConvertedAmount(plan, currency) {
  return exchangeRates[currency]?.rates[plan] || exchangeRates.NGN.rates[plan];
}

// Helper function to get currency symbol
function getCurrencySymbol(currency) {
  const symbols = {
    'NGN': '₦',
    'USD': '$',
    'EUR': '€',
    'GBP': '£',
    'CAD': 'CA$',
    'AUD': 'AU$'
  };
  return symbols[currency] || currency;
}

// Format price for display
function formatPrice(price, currency) {
  if (currency === "NGN") {
    return price.toLocaleString("en-NG");
  }
  return price.toLocaleString();
}