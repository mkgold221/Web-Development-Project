/**
 * Pricing Page JavaScript
 * Handles: Tab Navigation & Currency Conversion
 * Form Submission: Handled by form-submit-handler.js
 */

document.addEventListener("DOMContentLoaded", () => {
  console.log("[Pricing] Page initialized")

  initPricingTabs()
  initCurrencyConverter()

  // Initialize with default currency
  updateBudgetOptions("NGN")
})

// =========================
// 1️⃣ Tabs Functionality
// =========================
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

// =========================
// 2️⃣ Currency Converter
// =========================
const exchangeRates = {
  NGN: {
    symbol: "₦",
    rates: {
      "Basic Website": 350000,
      "Business Website": 500000,
      "E-commerce Website": 800000,
      "Basic Mobile App": 500000,
      "Business App": 1200000,
      "Enterprise App": 2500000,
      "Basic Maintenance": 50000,
      "Professional Maintenance": 100000,
      "Enterprise Maintenance": 200000,
    },
    budgetOptions: ["₦100,000 - ₦500,000", "₦500,000 - ₦1,000,000", "₦1,000,000+"],
    budgetValues: ["100-500", "500-1000", "1000+"],
  },
  USD: {
    symbol: "$",
    rates: {
      "Basic Website": 700,
      "Business Website": 1000,
      "E-commerce Website": 1600,
      "Basic Mobile App": 1000,
      "Business App": 2400,
      "Enterprise App": 5000,
      "Basic Maintenance": 100,
      "Professional Maintenance": 200,
      "Enterprise Maintenance": 400,
    },
    budgetOptions: ["$200 - $1,000", "$1,000 - $2,000", "$2,000+"],
    budgetValues: ["200-1000", "1000-2000", "2000+"],
  },
  EUR: {
    symbol: "€",
    rates: {
      "Basic Website": 650,
      "Business Website": 930,
      "E-commerce Website": 1480,
      "Basic Mobile App": 930,
      "Business App": 2230,
      "Enterprise App": 4650,
      "Basic Maintenance": 93,
      "Professional Maintenance": 186,
      "Enterprise Maintenance": 372,
    },
    budgetOptions: ["€180 - €900", "€900 - €1,800", "€1,800+"],
    budgetValues: ["180-900", "900-1800", "1800+"],
  },
  GBP: {
    symbol: "£",
    rates: {
      "Basic Website": 550,
      "Business Website": 790,
      "E-commerce Website": 1260,
      "Basic Mobile App": 790,
      "Business App": 1900,
      "Enterprise App": 3950,
      "Basic Maintenance": 79,
      "Professional Maintenance": 158,
      "Enterprise Maintenance": 316,
    },
    budgetOptions: ["£150 - £750", "£750 - £1,500", "£1,500+"],
    budgetValues: ["150-750", "750-1500", "1500+"],
  },
  CAD: {
    symbol: "CA$",
    rates: {
      "Basic Website": 950,
      "Business Website": 1360,
      "E-commerce Website": 2170,
      "Basic Mobile App": 1360,
      "Business App": 3260,
      "Enterprise App": 6800,
      "Basic Maintenance": 136,
      "Professional Maintenance": 272,
      "Enterprise Maintenance": 544,
    },
    budgetOptions: ["CA$250 - CA$1,250", "CA$1,250 - CA$2,500", "CA$2,500+"],
    budgetValues: ["250-1250", "1250-2500", "2500+"],
  },
  AUD: {
    symbol: "AU$",
    rates: {
      "Basic Website": 1050,
      "Business Website": 1500,
      "E-commerce Website": 2400,
      "Basic Mobile App": 1500,
      "Business App": 3600,
      "Enterprise App": 7500,
      "Basic Maintenance": 150,
      "Professional Maintenance": 300,
      "Enterprise Maintenance": 600,
    },
    budgetOptions: ["AU$280 - AU$1,400", "AU$1,400 - AU$2,800", "AU$2,800+"],
    budgetValues: ["280-1400", "1400-2800", "2800+"],
  },
}

function initCurrencyConverter() {
  const currencySelect = document.getElementById("currency-select")
  if (!currencySelect) return

  currencySelect.addEventListener("change", function () {
    const selectedCurrency = this.value
    updatePrices(selectedCurrency)
    updateBudgetOptions(selectedCurrency)
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

function formatPrice(price, currency) {
  if (currency === "NGN") return price.toLocaleString("en-NG")
  return price.toLocaleString()
}
