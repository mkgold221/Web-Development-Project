// ShopEase - Comprehensive JavaScript for all pages
document.addEventListener("DOMContentLoaded", () => {
  // Initialize core functionality
  initApp()
})

// State
let cart = []
let wishlist = []
let allProducts = []
let filteredProducts = []
let categories = []
let currentPage = 1
const productsPerPage = 12
let totalPages = 1
let currentFilters = {
  search: "",
  categories: [],
  minPrice: 0,
  maxPrice: 2000,
  rating: 0,
  sort: "default",
}
let currentProduct = null

// API Configuration
const API_BASE_URL = "https://dummyjson.com"
const TOTAL_PRODUCTS = 1000 // DummyJSON has 100 products max

// Initialize the application
function initApp() {
  // Load data from localStorage
  loadTheme()
  loadCart()
  loadWishlist()

  // Update UI
  updateCartCount()
  updateWishlistCount()

  // Set up event listeners
  setupEventListeners()

  // Set active navigation link
  setActiveNavLink()

  // Initialize page-specific functionality
  initPageSpecificFunctions()
}

// Load theme from localStorage
function loadTheme() {
  const savedTheme = localStorage.getItem("theme")
  const body = document.body
  const themeToggle = document.getElementById("theme-toggle")

  if (savedTheme === "dark") {
    body.classList.remove("light-mode")
    body.classList.add("dark-mode")
    if (themeToggle) {
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>'
    }
  } else {
    body.classList.remove("dark-mode")
    body.classList.add("light-mode")
    if (themeToggle) {
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>'
    }
  }
}

// Toggle theme
function toggleTheme() {
  const body = document.body
  const isDarkMode = body.classList.contains("dark-mode")
  const themeToggle = document.getElementById("theme-toggle")

  if (isDarkMode) {
    body.classList.remove("dark-mode")
    body.classList.add("light-mode")
    if (themeToggle) {
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>'
    }
    localStorage.setItem("theme", "light")
  } else {
    body.classList.remove("light-mode")
    body.classList.add("dark-mode")
    if (themeToggle) {
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>'
    }
    localStorage.setItem("theme", "dark")
  }
}

// Load cart from localStorage
function loadCart() {
  const savedCart = localStorage.getItem("cart")
  if (savedCart) {
    cart = JSON.parse(savedCart)
  }
}

// Save cart to localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart))
}

// Update cart count
function updateCartCount() {
  const cartCount = document.getElementById("cart-count")
  if (cartCount) {
    const count = cart.reduce((total, item) => total + item.quantity, 0)
    cartCount.textContent = count
  }
}

// Load wishlist from localStorage
function loadWishlist() {
  const savedWishlist = localStorage.getItem("wishlist")
  if (savedWishlist) {
    wishlist = JSON.parse(savedWishlist)
  }
}

// Save wishlist to localStorage
function saveWishlist() {
  localStorage.setItem("wishlist", JSON.stringify(wishlist))
}

// Update wishlist count
function updateWishlistCount() {
  const wishlistCount = document.getElementById("wishlist-count")
  if (wishlistCount) {
    wishlistCount.textContent = wishlist.length
  }
}

// Add product to cart
async function addToCart(productId, quantity = 1) {
  try {
    // Fetch product details if not already in cart
    let product = cart.find((item) => item.id === productId)

    if (!product) {
      const response = await fetch(`${API_BASE_URL}/products/${productId}`)
      if (!response.ok) throw new Error("Failed to fetch product")
      const productData = await response.json()

      product = {
        id: productData.id,
        title: productData.title,
        price: productData.price,
        image: productData.thumbnail,
        quantity: 0,
      }
    }

    // Check if product is already in cart
    const existingItem = cart.find((item) => item.id === productId)

    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      product.quantity = quantity
      cart.push(product)
    }

    // Save cart to localStorage
    saveCart()

    // Update cart count
    updateCartCount()

    // Show toast
    showToast(`${product.title} added to cart`, "success")

    // Render cart if modal is open
    const cartModal = document.getElementById("cart-modal")
    if (cartModal && cartModal.style.display === "block") {
      renderCart()
    }
  } catch (error) {
    console.error("Error adding to cart:", error)
    showToast("Error adding product to cart", "error")
  }
}

// Toggle product in wishlist
async function toggleWishlist(productId) {
  try {
    // Check if product is already in wishlist
    const existingItemIndex = wishlist.findIndex((item) => item.id === productId)

    if (existingItemIndex !== -1) {
      // Get product title before removing
      const productTitle = wishlist[existingItemIndex].title

      // Remove from wishlist
      wishlist.splice(existingItemIndex, 1)
      showToast(`${productTitle} removed from wishlist`, "info")
    } else {
      // Fetch product details
      const response = await fetch(`${API_BASE_URL}/products/${productId}`)
      if (!response.ok) throw new Error("Failed to fetch product")
      const product = await response.json()

      // Add to wishlist
      wishlist.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.thumbnail,
      })
      showToast(`${product.title} added to wishlist`, "success")
    }

    // Save wishlist to localStorage
    saveWishlist()

    // Update wishlist count
    updateWishlistCount()

    // Update UI
    updateWishlistButtons(productId)

    // Render wishlist if modal is open
    const wishlistModal = document.getElementById("wishlist-modal")
    if (wishlistModal && wishlistModal.style.display === "block") {
      renderWishlist()
    }
  } catch (error) {
    console.error("Error toggling wishlist:", error)
    showToast("Error updating wishlist", "error")
  }
}

// Update wishlist buttons for a specific product
function updateWishlistButtons(productId) {
  const isInWishlist = wishlist.some((item) => item.id === productId)

  // Update product cards
  document.querySelectorAll(`.add-to-wishlist-btn[data-id="${productId}"]`).forEach((btn) => {
    btn.classList.toggle("active", isInWishlist)
    btn.querySelector("i").className = isInWishlist ? "fas fa-heart" : "far fa-heart"
  })

  // Update modal button if open
  if (currentProduct && currentProduct.id === productId) {
    const modalAddToWishlist = document.getElementById("modal-add-to-wishlist")
    if (modalAddToWishlist) {
      modalAddToWishlist.classList.toggle("active", isInWishlist)
      modalAddToWishlist.innerHTML = isInWishlist
        ? '<i class="fas fa-heart"></i> Remove from Wishlist'
        : '<i class="far fa-heart"></i> Add to Wishlist'
    }
  }
}

// Render cart items
function renderCart() {
  const cartItems = document.getElementById("cart-items")
  const cartTotalPrice = document.getElementById("cart-total-price")
  const checkoutBtn = document.getElementById("checkout-btn")

  if (!cartItems || !cartTotalPrice || !checkoutBtn) return

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="empty-cart">
        <i class="fas fa-shopping-cart"></i>
        <p>Your cart is empty</p>
        <button id="start-shopping" class="start-shopping-btn">Start Shopping</button>
      </div>
    `

    const startShoppingBtn = document.getElementById("start-shopping")
    if (startShoppingBtn) {
      startShoppingBtn.addEventListener("click", () => {
        const cartModal = document.getElementById("cart-modal")
        if (cartModal) {
          cartModal.style.display = "none"
          document.body.style.overflow = "auto"
        }
      })
    }

    checkoutBtn.disabled = true
    return
  }

  cartItems.innerHTML = ""
  let total = 0

  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity
    total += itemTotal

    const cartItem = document.createElement("div")
    cartItem.className = "cart-item"
    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.title}" class="cart-item-image">
      <div class="cart-item-details">
        <h3 class="cart-item-title">${item.title}</h3>
        <p class="cart-item-price">$${item.price} × ${item.quantity} = $${itemTotal.toFixed(2)}</p>
        <div class="cart-item-actions">
          <div class="cart-item-quantity">
            <button class="cart-quantity-btn decrease" data-id="${item.id}">-</button>
            <span>${item.quantity}</span>
            <button class="cart-quantity-btn increase" data-id="${item.id}">+</button>
          </div>
          <button class="cart-item-remove" data-id="${item.id}">Remove</button>
        </div>
      </div>
    `

    cartItems.appendChild(cartItem)
  })

  // Update total
  cartTotalPrice.textContent = `$${total.toFixed(2)}`

  // Enable checkout button
  checkoutBtn.disabled = false

  // Add event listeners to cart item buttons
  document.querySelectorAll(".cart-quantity-btn.decrease").forEach((btn) => {
    btn.addEventListener("click", () => {
      updateCartItemQuantity(Number.parseInt(btn.dataset.id), -1)
    })
  })

  document.querySelectorAll(".cart-quantity-btn.increase").forEach((btn) => {
    btn.addEventListener("click", () => {
      updateCartItemQuantity(Number.parseInt(btn.dataset.id), 1)
    })
  })

  document.querySelectorAll(".cart-item-remove").forEach((btn) => {
    btn.addEventListener("click", () => {
      removeFromCart(Number.parseInt(btn.dataset.id))
    })
  })
}

// Update cart item quantity
function updateCartItemQuantity(productId, change) {
  const item = cart.find((item) => item.id === productId)
  if (!item) return

  item.quantity += change

  if (item.quantity <= 0) {
    removeFromCart(productId)
  } else {
    saveCart()
    updateCartCount()
    renderCart()
  }
}

// Remove item from cart
function removeFromCart(productId) {
  const product = cart.find((p) => p.id === productId)
  const productName = product ? product.title : "Product"

  cart = cart.filter((item) => item.id !== productId)
  saveCart()
  updateCartCount()
  renderCart()

  showToast(`${productName} removed from cart`, "info")
}

// Clear cart
function clearCart() {
  cart = []
  saveCart()
  updateCartCount()
  renderCart()
  showToast("Cart has been cleared", "info")
}

// Render wishlist items
function renderWishlist() {
  const wishlistItems = document.getElementById("wishlist-items")
  if (!wishlistItems) return

  if (wishlist.length === 0) {
    wishlistItems.innerHTML = `
      <div class="empty-wishlist">
        <i class="fas fa-heart"></i>
        <p>Your wishlist is empty</p>
        <button id="start-wishlist-shopping" class="start-shopping-btn">Start Shopping</button>
      </div>
    `

    const startWishlistShoppingBtn = document.getElementById("start-wishlist-shopping")
    if (startWishlistShoppingBtn) {
      startWishlistShoppingBtn.addEventListener("click", () => {
        const wishlistModal = document.getElementById("wishlist-modal")
        if (wishlistModal) {
          wishlistModal.style.display = "none"
          document.body.style.overflow = "auto"
        }
      })
    }

    return
  }

  wishlistItems.innerHTML = ""

  wishlist.forEach((item) => {
    const wishlistItem = document.createElement("div")
    wishlistItem.className = "wishlist-item"
    wishlistItem.innerHTML = `
      <img src="${item.image}" alt="${item.title}" class="wishlist-item-image">
      <div class="wishlist-item-details">
        <h3 class="wishlist-item-title">${item.title}</h3>
        <p class="wishlist-item-price">$${item.price}</p>
        <div class="wishlist-item-actions">
          <button class="add-to-cart-btn small" data-id="${item.id}">
            <i class="fas fa-shopping-cart"></i> Add to Cart
          </button>
          <button class="wishlist-item-remove" data-id="${item.id}">Remove</button>
        </div>
      </div>
    `

    wishlistItems.appendChild(wishlistItem)
  })

  // Add event listeners to wishlist item buttons
  document.querySelectorAll(".wishlist-item .add-to-cart-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      addToCart(Number.parseInt(btn.dataset.id), 1)
    })
  })

  document.querySelectorAll(".wishlist-item-remove").forEach((btn) => {
    btn.addEventListener("click", () => {
      toggleWishlist(Number.parseInt(btn.dataset.id))
    })
  })
}

// Clear wishlist
function clearWishlist() {
  wishlist = []
  saveWishlist()
  updateWishlistCount()
  renderWishlist()
  showToast("Wishlist has been cleared", "info")
}

// Show toast message
function showToast(message, type = "info") {
  const toastContainer = document.getElementById("toast-container")
  if (!toastContainer) return

  const toast = document.createElement("div")
  toast.className = `toast ${type}`

  let icon
  switch (type) {
    case "success":
      icon = '<i class="fas fa-check-circle"></i>'
      break
    case "error":
      icon = '<i class="fas fa-exclamation-circle"></i>'
      break
    default:
      icon = '<i class="fas fa-info-circle"></i>'
  }

  toast.innerHTML = `
    ${icon}
    <span>${message}</span>
  `

  toastContainer.appendChild(toast)

  // Animate the toast
  setTimeout(() => {
    toast.style.opacity = "1"
    toast.style.transform = "translateY(0)"
  }, 10)

  // Remove the toast after 3 seconds
  setTimeout(() => {
    toast.style.opacity = "0"
    toast.style.transform = "translateY(20px)"

    setTimeout(() => {
      toast.remove()
    }, 300)
  }, 3000)
}

// Set up event listeners
function setupEventListeners() {
  // Theme toggle
  const themeToggle = document.getElementById("theme-toggle")
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme)
  }

  // Mobile menu toggle
  const menuToggle = document.getElementById("menu-toggle")
  const filters = document.getElementById("filters")
  const closeFilters = document.getElementById("close-filters")

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active")
      if (filters) {
        filters.classList.toggle("active")
      }

      // Toggle main nav visibility on mobile
      const mainNav = document.querySelector(".main-nav")
      if (mainNav) {
        mainNav.style.display = mainNav.style.display === "flex" ? "none" : "flex"
      }

      document.body.style.overflow = menuToggle.classList.contains("active") ? "hidden" : "auto"
    })
  }

  if (closeFilters && filters) {
    closeFilters.addEventListener("click", () => {
      filters.classList.remove("active")
      if (menuToggle) {
        menuToggle.classList.remove("active")
      }
      document.body.style.overflow = "auto"
    })
  }

  // Cart modal
  const cartBtn = document.getElementById("cart-btn")
  const cartModal = document.getElementById("cart-modal")
  const clearCartBtn = document.getElementById("clear-cart")
  const checkoutBtn = document.getElementById("checkout-btn")

  if (cartBtn && cartModal) {
    cartBtn.addEventListener("click", () => {
      renderCart()
      cartModal.style.display = "block"
      document.body.style.overflow = "hidden"
    })
  }

  if (clearCartBtn) {
    clearCartBtn.addEventListener("click", clearCart)
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      showToast("Checkout functionality would be implemented here", "info")
    })
  }

  // Wishlist modal
  const wishlistBtn = document.getElementById("wishlist-btn")
  const wishlistModal = document.getElementById("wishlist-modal")
  const clearWishlistBtn = document.getElementById("clear-wishlist")

  if (wishlistBtn && wishlistModal) {
    wishlistBtn.addEventListener("click", () => {
      renderWishlist()
      wishlistModal.style.display = "block"
      document.body.style.overflow = "hidden"
    })
  }

  if (clearWishlistBtn) {
    clearWishlistBtn.addEventListener("click", clearWishlist)
  }

  // Close modals
  const closeModalBtns = document.querySelectorAll(".close-modal")
  closeModalBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const modals = [
        document.getElementById("product-modal"),
        document.getElementById("cart-modal"),
        document.getElementById("wishlist-modal"),
      ]

      modals.forEach((modal) => {
        if (modal) {
          modal.style.display = "none"
        }
      })

      document.body.style.overflow = "auto"
    })
  })

  // Close modals when clicking outside
  window.addEventListener("click", (e) => {
    const modals = [
      { el: document.getElementById("product-modal"), id: "product-modal" },
      { el: document.getElementById("cart-modal"), id: "cart-modal" },
      { el: document.getElementById("wishlist-modal"), id: "wishlist-modal" },
    ]

    modals.forEach((modal) => {
      if (modal.el && e.target.id === modal.id) {
        modal.el.style.display = "none"
        document.body.style.overflow = "auto"
      }
    })
  })

  // Newsletter form
  const newsletterForm = document.getElementById("newsletter-form")
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const email = newsletterForm.querySelector("input").value
      showToast(`Thank you for subscribing with ${email}!`, "success")
      newsletterForm.reset()
    })
  }

  // Navigation links
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      // This will be overridden by the actual navigation, but helps with visual feedback
      document.querySelectorAll(".nav-link").forEach((l) => l.classList.remove("active"))
      e.target.classList.add("active")
    })
  })
}

// Set active navigation link based on current page
function setActiveNavLink() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html"

  document.querySelectorAll(".nav-link").forEach((link) => {
    const href = link.getAttribute("href")
    if (href === currentPage) {
      link.classList.add("active")
    } else {
      link.classList.remove("active")
    }
  })
}

// Generate star rating HTML
function generateStarRating(rating) {
  const fullStars = Math.floor(rating)
  const halfStar = rating - fullStars >= 0.5
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0)

  let starsHTML = ""

  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    starsHTML += '<i class="fas fa-star"></i>'
  }

  // Add half star if needed
  if (halfStar) {
    starsHTML += '<i class="fas fa-star-half-alt"></i>'
  }

  // Add empty stars
  for (let i = 0; i < emptyStars; i++) {
    starsHTML += '<i class="far fa-star"></i>'
  }

  return starsHTML
}

// Initialize page-specific functions
function initPageSpecificFunctions() {
  // Detect current page
  const currentPage = window.location.pathname.split("/").pop() || "index.html"

  // Home page specific functions
  if (currentPage === "home.html") {
    initHomePage()
  }

  // About page specific functions
  if (currentPage === "about.html") {
    initAboutPage()
  }

  // Contact page specific functions
  if (currentPage === "contact.html") {
    initContactPage()
  }

  // Products page specific functions (index.html)
  if (currentPage === "index.html" || currentPage === "") {
    initProductsPage()
  }
}

// Home page initialization
function initHomePage() {
  // Fetch featured products
  fetchFeaturedProducts()

  // Handle home newsletter form submission
  const homeNewsletterForm = document.getElementById("home-newsletter-form")
  if (homeNewsletterForm) {
    homeNewsletterForm.addEventListener("submit", function (e) {
      e.preventDefault()
      const email = this.querySelector('input[type="email"]').value
      showToast(`Thank you for subscribing with ${email}!`, "success")
      this.reset()
    })
  }

  // Initialize testimonials slider
  initTestimonialsSlider()
}

// About page initialization
function initAboutPage() {
  // Initialize testimonials slider
  initTestimonialsSlider()
}

// Contact page initialization
function initContactPage() {
  // Handle contact form submission
  const contactForm = document.getElementById("contact-form")
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const subject = document.getElementById("subject").value
      const message = document.getElementById("message").value

      // In a real implementation, you would send this data to a server
      console.log("Form submitted:", { name, email, subject, message })

      showToast("Your message has been sent successfully!", "success")
      this.reset()
    })
  }

  // Handle contact newsletter form submission
  const contactNewsletterForm = document.getElementById("contact-newsletter-form")
  if (contactNewsletterForm) {
    contactNewsletterForm.addEventListener("submit", function (e) {
      e.preventDefault()
      const email = this.querySelector('input[type="email"]').value
      showToast(`Thank you for subscribing with ${email}!`, "success")
      this.reset()
    })
  }

  // Initialize FAQ accordion
  initFaqAccordion()
}

// Products page initialization (index.html)
function initProductsPage() {
  try {
    // Initialize products page
    fetchCategories()
    fetchAllProducts()
    
    // Set up product-specific event listeners
    setupProductPageEventListeners()
  } catch (error) {
    console.error("Error initializing products page:", error)
    showToast("Error loading products. Please try again.", "error")
  }
}

// Set up product page event listeners
function setupProductPageEventListeners() {
  // Search
  const searchInput = document.getElementById("search-input")
  if (searchInput) {
    searchInput.addEventListener(
      "input",
      debounce(() => {
        currentFilters.search = searchInput.value
        applyFilters()
      }, 300)
    )
  }

  // Sort
  const sortSelect = document.getElementById("sort-select")
  if (sortSelect) {
    sortSelect.addEventListener("change", () => {
      currentFilters.sort = sortSelect.value
      applyFilters()
    })
  }

  // Price filter
  const applyPriceBtn = document.getElementById("apply-price")
  const minPriceInput = document.getElementById("min-price")
  const maxPriceInput = document.getElementById("max-price")
  
  if (applyPriceBtn && minPriceInput && maxPriceInput) {
    applyPriceBtn.addEventListener("click", () => {
      const minPrice = Number.parseInt(minPriceInput.value) || 0
      const maxPrice = Number.parseInt(maxPriceInput.value) || 2000

      if (minPrice > maxPrice) {
        showToast("Minimum price cannot be greater than maximum price", "error")
        return
      }

      currentFilters.minPrice = minPrice
      currentFilters.maxPrice = maxPrice
      applyFilters()
    })
  }

  // Rating filter
  const ratingCheckboxes = document.querySelectorAll(".rating-checkbox")
  if (ratingCheckboxes.length > 0) {
    ratingCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        // Uncheck other rating checkboxes
        ratingCheckboxes.forEach((cb) => {
          if (cb !== checkbox) cb.checked = false
        })

        currentFilters.rating = checkbox.checked ? Number.parseInt(checkbox.value) : 0
        applyFilters()
      })
    })
  }

  // Clear filters
  const clearFiltersBtn = document.getElementById("clear-filters")
  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener("click", resetFilters)
  }

  // Pagination
  const prevPageBtn = document.getElementById("prev-page")
  const nextPageBtn = document.getElementById("next-page")
  
  if (prevPageBtn) {
    prevPageBtn.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--
        const currentPageSpan = document.querySelector(".current-page")
        if (currentPageSpan) {
          currentPageSpan.textContent = currentPage
        }
        updatePaginationButtons()
        renderProducts()
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
    })
  }
  
  if (nextPageBtn) {
    nextPageBtn.addEventListener("click", () => {
      if (currentPage < totalPages) {
        currentPage++
        const currentPageSpan = document.querySelector(".current-page")
        if (currentPageSpan) {
          currentPageSpan.textContent = currentPage
        }
        updatePaginationButtons()
        renderProducts()
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
    })
  }

  // Product modal
  const decreaseQuantity = document.getElementById("decrease-quantity")
  const increaseQuantity = document.getElementById("increase-quantity")
  const productQuantity = document.getElementById("product-quantity")
  const modalAddToCart = document.getElementById("modal-add-to-cart")
  const modalAddToWishlist = document.getElementById("modal-add-to-wishlist")
  
  if (decreaseQuantity && productQuantity) {
    decreaseQuantity.addEventListener("click", () => {
      const currentValue = Number.parseInt(productQuantity.value)
      if (currentValue > 1) {
        productQuantity.value = currentValue - 1
      }
    })
  }
  
  if (increaseQuantity && productQuantity) {
    increaseQuantity.addEventListener("click", () => {
      const currentValue = Number.parseInt(productQuantity.value)
      const maxStock = currentProduct ? currentProduct.stock : 10
      if (currentValue < maxStock) {
        productQuantity.value = currentValue + 1
      }
    })
  }
  
  if (modalAddToCart) {
    modalAddToCart.addEventListener("click", () => {
      if (currentProduct) {
        const quantity = Number.parseInt(productQuantity.value)
        addToCart(currentProduct.id, quantity)
      }
    })
  }
  
  if (modalAddToWishlist) {
    modalAddToWishlist.addEventListener("click", () => {
      if (currentProduct) {
        toggleWishlist(currentProduct.id)
      }
    })
  }
}

// Fetch all categories
async function fetchCategories() {
  try {
    const categoriesList = document.getElementById("categories-list")
    if (!categoriesList) return

    const response = await fetch(`${API_BASE_URL}/products/categories`)
    if (!response.ok) throw new Error("Failed to fetch categories")

    categories = await response.json()
    renderCategories()
  } catch (error) {
    console.error("Error fetching categories:", error)
    showToast("Error loading categories", "error")
  }
}

// Render categories in the sidebar
function renderCategories() {
  const categoriesList = document.getElementById("categories-list")
  if (!categoriesList) return

  categoriesList.innerHTML = ""

  categories.forEach((category) => {
    const categoryItem = document.createElement("label")
    categoryItem.className = "category-item"

    const isChecked = currentFilters.categories.includes(category)

    categoryItem.innerHTML = `
      <input type="checkbox" class="category-checkbox" value="${category}" ${isChecked ? "checked" : ""}>
      <span>${formatCategoryName(category)}</span>
    `

    categoriesList.appendChild(categoryItem)
  })

  // Add event listeners to category checkboxes
  document.querySelectorAll(".category-checkbox").forEach((checkbox) => {
    checkbox.addEventListener("change", handleCategoryChange)
  })
}

// Format category name for display
function formatCategoryName(category) {
  return category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

// Fetch all products with pagination
async function fetchAllProducts() {
  try {
    const productsGrid = document.getElementById("products-grid")
    if (!productsGrid) return

    // For demo purposes, we'll fetch 100 products (DummyJSON limit)
    // In a real app, you'd implement proper pagination to fetch 1000+ products
    const response = await fetch(`${API_BASE_URL}/products?limit=${TOTAL_PRODUCTS}`)
    if (!response.ok) throw new Error("Failed to fetch products")

    const data = await response.json()
    allProducts = data.products

    // Calculate total pages
    totalPages = Math.ceil(allProducts.length / productsPerPage)
    const totalPagesSpan = document.getElementById("total-pages")
    if (totalPagesSpan) {
      totalPagesSpan.textContent = totalPages
    }

    // Apply filters to show products
    applyFilters()
  } catch (error) {
    console.error("Error fetching products:", error)
    showToast("Error loading products", "error")
    throw error
  }
}

// Apply filters and sort to products
function applyFilters() {
  // Filter products
  filteredProducts = allProducts.filter((product) => {
    // Search filter
    const matchesSearch =
      currentFilters.search === "" ||
      product.title.toLowerCase().includes(currentFilters.search.toLowerCase()) ||
      product.description.toLowerCase().includes(currentFilters.search.toLowerCase())

    // Category filter
    const matchesCategory =
      currentFilters.categories.length === 0 || currentFilters.categories.includes(product.category)

    // Price filter
    const matchesPrice = product.price >= currentFilters.minPrice && product.price <= currentFilters.maxPrice

    // Rating filter
    const matchesRating = currentFilters.rating === 0 || product.rating >= currentFilters.rating

    return matchesSearch && matchesCategory && matchesPrice && matchesRating
  })

  // Sort products
  switch (currentFilters.sort) {
    case "price-low":
      filteredProducts.sort((a, b) => a.price - b.price)
      break
    case "price-high":
      filteredProducts.sort((a, b) => b.price - a.price)
      break
    case "rating":
      filteredProducts.sort((a, b) => b.rating - a.rating)
      break
    default:
      // Default sort (by id)
      filteredProducts.sort((a, b) => a.id - b.id)
  }

  // Reset to first page when filters change
  currentPage = 1
  const currentPageSpan = document.querySelector(".current-page")
  if (currentPageSpan) {
    currentPageSpan.textContent = currentPage
  }

  // Update total pages
  totalPages = Math.ceil(filteredProducts.length / productsPerPage)
  const totalPagesSpan = document.getElementById("total-pages")
  if (totalPagesSpan) {
    totalPagesSpan.textContent = totalPages || 1
  }

  // Update pagination buttons
  updatePaginationButtons()

  // Render products
  renderProducts()
}

// Render products for the current page
function renderProducts() {
  const productsGrid = document.getElementById("products-grid")
  if (!productsGrid) return

  productsGrid.innerHTML = ""

  // Calculate start and end indices for current page
  const startIndex = (currentPage - 1) * productsPerPage
  const endIndex = Math.min(startIndex + productsPerPage, filteredProducts.length)

  // If no products match the filters
  if (filteredProducts.length === 0) {
    productsGrid.innerHTML = `
      <div class="no-products">
        <i class="fas fa-search"></i>
        <p>No products found matching your criteria.</p>
        <button id="reset-filters" class="reset-filters-btn">Reset Filters</button>
      </div>
    `

    const resetFiltersBtn = document.getElementById("reset-filters")
    if (resetFiltersBtn) {
      resetFiltersBtn.addEventListener("click", resetFilters)
    }
    return
  }

  // Render products for current page
  for (let i = startIndex; i < endIndex; i++) {
    const product = filteredProducts[i]
    const productCard = createProductCard(product)
    productsGrid.appendChild(productCard)
  }
}

// Create a product card element
function createProductCard(product) {
  const productCard = document.createElement("div")
  productCard.className = "product-card"

  // Calculate discount percentage
  const discountPercentage = product.discountPercentage
  const originalPrice = Math.round(product.price / (1 - discountPercentage / 100))

  // Check if product is in wishlist
  const isInWishlist = wishlist.some((item) => item.id === product.id)

  productCard.innerHTML = `
    <img src="${product.thumbnail}" alt="${product.title}" class="product-image">
    <div class="product-info">
      <h3 class="product-title">${product.title}</h3>
      <div class="product-price">
        $${product.price}
        ${
          discountPercentage > 0
            ? `<span class="original-price">$${originalPrice}</span>
              <span class="discount">-${Math.round(discountPercentage)}%</span>`
            : ""
        }
      </div>
      <div class="product-rating">
        <div class="stars">
          ${generateStarRating(product.rating)}
        </div>
        <span class="rating-count">(${product.rating.toFixed(1)})</span>
      </div>
      <div class="product-actions">
        <button class="add-to-cart-btn" data-id="${product.id}">
          <i class="fas fa-shopping-cart"></i> Add to Cart
        </button>
        <button class="add-to-wishlist-btn ${isInWishlist ? "active" : ""}" data-id="${product.id}">
          <i class="${isInWishlist ? "fas" : "far"} fa-heart"></i>
        </button>
      </div>
    </div>
  `

  // Add event listeners
  productCard.querySelector(".add-to-cart-btn").addEventListener("click", (e) => {
    e.stopPropagation()
    addToCart(product.id, 1)
  })

  productCard.querySelector(".add-to-wishlist-btn").addEventListener("click", (e) => {
    e.stopPropagation()
    toggleWishlist(product.id)
  })

  // Open product modal when clicking on the card
  productCard.addEventListener("click", () => {
    openProductModal(product.id)
  })

  return productCard
}

// Open product modal
function openProductModal(productId) {
  const product = allProducts.find((p) => p.id === productId)
  if (!product) return

  const productModal = document.getElementById("product-modal")
  if (!productModal) return

  currentProduct = product

  // Set modal content
  const modalMainImage = document.getElementById("modal-main-image")
  const modalProductTitle = document.getElementById("modal-product-title")
  const modalProductRating = document.getElementById("modal-product-rating")
  const modalProductPrice = document.getElementById("modal-product-price")
  const modalProductDiscount = document.getElementById("modal-product-discount")
  const modalProductDescription = document.getElementById("modal-product-description")
  const modalProductBrand = document.getElementById("modal-product-brand")
  const modalProductCategory = document.getElementById("modal-product-category")
  const modalProductStock = document.getElementById("modal-product-stock")
  const productQuantity = document.getElementById("product-quantity")
  const modalAddToWishlist = document.getElementById("modal-add-to-wishlist")
  const modalThumbnails = document.getElementById("modal-thumbnails")

  if (modalMainImage) modalMainImage.src = product.thumbnail
  if (modalProductTitle) modalProductTitle.textContent = product.title
  if (modalProductRating) {
    modalProductRating.innerHTML = `
      <div class="stars">
        ${generateStarRating(product.rating)}
      </div>
      <span class="rating-count">(${product.rating.toFixed(1)})</span>
    `
  }

  // Calculate discount
  const discountPercentage = product.discountPercentage
  const originalPrice = Math.round(product.price / (1 - discountPercentage / 100))

  if (modalProductPrice) modalProductPrice.textContent = `$${product.price}`

  if (modalProductDiscount) {
    if (discountPercentage > 0) {
      modalProductDiscount.innerHTML = `
        <span class="original-price">$${originalPrice}</span>
        <span class="discount">-${Math.round(discountPercentage)}%</span>
      `
    } else {
      modalProductDiscount.innerHTML = ""
    }
  }

  if (modalProductDescription) modalProductDescription.textContent = product.description
  if (modalProductBrand) modalProductBrand.textContent = product.brand
  if (modalProductCategory) modalProductCategory.textContent = formatCategoryName(product.category)
  if (modalProductStock) modalProductStock.textContent = product.stock > 0 ? `${product.stock} in stock` : "Out of stock"

  // Reset quantity
  if (productQuantity) productQuantity.value = 1

  // Update wishlist button
  const isInWishlist = wishlist.some((item) => item.id === product.id)
  if (modalAddToWishlist) {
    modalAddToWishlist.classList.toggle("active", isInWishlist)
    modalAddToWishlist.innerHTML = isInWishlist
      ? '<i class="fas fa-heart"></i> Remove from Wishlist'
      : '<i class="far fa-heart"></i> Add to Wishlist'
  }

  // Add thumbnails
  if (modalThumbnails) {
    modalThumbnails.innerHTML = ""
    if (product.images && product.images.length > 0) {
      product.images.forEach((image, index) => {
        const thumbnail = document.createElement("img")
        thumbnail.src = image
        thumbnail.alt = `${product.title} - Image ${index + 1}`
        thumbnail.className = "thumbnail"
        if (index === 0) thumbnail.classList.add("active")

        thumbnail.addEventListener("click", () => {
          if (modalMainImage) modalMainImage.src = image
          document.querySelectorAll(".thumbnail").forEach((thumb) => thumb.classList.remove("active"))
          thumbnail.classList.add("active")
        })

        modalThumbnails.appendChild(thumbnail)
      })
    }
  }

  // Show modal
  productModal.style.display = "block"
  document.body.style.overflow = "hidden"
}

// Update pagination buttons
function updatePaginationButtons() {
  const prevPageBtn = document.getElementById("prev-page")
  const nextPageBtn = document.getElementById("next-page")
  
  if (prevPageBtn) {
    prevPageBtn.disabled = currentPage === 1
  }
  
  if (nextPageBtn) {
    nextPageBtn.disabled = currentPage === totalPages || totalPages === 0
  }
}

// Handle category checkbox change
function handleCategoryChange(e) {
  const category = e.target.value
  const isChecked = e.target.checked

  if (isChecked) {
    currentFilters.categories.push(category)
  } else {
    currentFilters.categories = currentFilters.categories.filter((c) => c !== category)
  }

  applyFilters()
}

// Reset all filters
function resetFilters() {
  currentFilters = {
    search: "",
    categories: [],
    minPrice: 0,
    maxPrice: 2000,
    rating: 0,
    sort: "default",
  }

  // Reset UI elements
  const searchInput = document.getElementById("search-input")
  const minPriceInput = document.getElementById("min-price")
  const maxPriceInput = document.getElementById("max-price")
  const sortSelect = document.getElementById("sort-select")
  
  if (searchInput) searchInput.value = ""
  if (minPriceInput) minPriceInput.value = 0
  if (maxPriceInput) maxPriceInput.value = 2000
  if (sortSelect) sortSelect.value = "default"

  // Uncheck all category checkboxes
  document.querySelectorAll(".category-checkbox").forEach((checkbox) => {
    checkbox.checked = false
  })

  // Uncheck all rating checkboxes
  document.querySelectorAll(".rating-checkbox").forEach((checkbox) => {
    checkbox.checked = false
  })

  applyFilters()
  showToast("Filters have been reset", "info")
}

// Fetch featured products from API
async function fetchFeaturedProducts() {
  try {
    const featuredProductsSlider = document.getElementById("featured-products-slider")
    if (!featuredProductsSlider) return

    const response = await fetch(`${API_BASE_URL}/products?limit=4`)
    if (!response.ok) throw new Error("Failed to fetch featured products")

    const data = await response.json()
    renderFeaturedProducts(data.products)
  } catch (error) {
    console.error("Error fetching featured products:", error)
    showToast("Error loading featured products", "error")
  }
}

// Render featured products
function renderFeaturedProducts(products) {
  const productsSlider = document.getElementById("featured-products-slider")
  if (!productsSlider) return

  productsSlider.innerHTML = ""

  products.forEach((product) => {
    // Calculate discount percentage
    const discountPercentage = product.discountPercentage
    const originalPrice = Math.round(product.price / (1 - discountPercentage / 100))

    // Check if product is in wishlist
    const isInWishlist = wishlist.some((item) => item.id === product.id)

    const productCard = document.createElement("div")
    productCard.className = "product-card"

    productCard.innerHTML = `
      <img src="${product.thumbnail}" alt="${product.title}" class="product-image">
      <div class="product-info">
        <h3 class="product-title">${product.title}</h3>
        <div class="product-price">
          $${product.price}
          ${
            discountPercentage > 0
              ? `<span class="original-price">$${originalPrice}</span>
              <span class="discount">-${Math.round(discountPercentage)}%</span>`
              : ""
          }
        </div>
        <div class="product-rating">
          <div class="stars">
            ${generateStarRating(product.rating)}
          </div>
          <span class="rating-count">(${product.rating.toFixed(1)})</span>
        </div>
        <div class="product-actions">
          <button class="add-to-cart-btn" data-id="${product.id}">
            <i class="fas fa-shopping-cart"></i> Add to Cart
          </button>
          <button class="add-to-wishlist-btn ${isInWishlist ? "active" : ""}" data-id="${product.id}">
            <i class="${isInWishlist ? "fas" : "far"} fa-heart"></i>
          </button>
        </div>
      </div>
    `

    productsSlider.appendChild(productCard)
  })

  // Add event listeners to buttons
  document.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation() // Prevent opening product modal if implemented
      const productId = Number.parseInt(btn.dataset.id)
      addToCart(productId, 1)
    })
  })

  document.querySelectorAll(".add-to-wishlist-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation() // Prevent opening product modal if implemented
      const productId = Number.parseInt(btn.dataset.id)
      toggleWishlist(productId)
    })
  })
}

// Initialize testimonials slider
function initTestimonialsSlider() {
  // In a real implementation, this would initialize a carousel
  // For this demo, we'll just add a simple hover effect
  const testimonialCards = document.querySelectorAll(".testimonial-card")
  if (testimonialCards.length === 0) return

  testimonialCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      testimonialCards.forEach((c) => (c.style.opacity = "0.7"))
      card.style.opacity = "1"
    })

    card.addEventListener("mouseleave", () => {
      testimonialCards.forEach((c) => (c.style.opacity = "1"))
    })
  })
}

// Initialize FAQ accordion
function initFaqAccordion() {
  const faqQuestions = document.querySelectorAll(".faq-question")
  if (faqQuestions.length === 0) return

  faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
      const faqItem = question.parentElement
      const isActive = faqItem.classList.contains("active")

      // Close all FAQ items
      document.querySelectorAll(".faq-item").forEach((item) => {
        item.classList.remove("active")
      })

      // Toggle the clicked FAQ item
      if (!isActive) {
        faqItem.classList.add("active")
      }

      // Update the toggle icon
      document.querySelectorAll(".faq-toggle").forEach((toggle) => {
        toggle.innerHTML = '<i class="fas fa-plus"></i>'
      })

      if (!isActive) {
        question.querySelector(".faq-toggle").innerHTML = '<i class="fas fa-minus"></i>'
      }
    })
  })
}

// Debounce function for search input
function debounce(func, delay) {
  let timeout
  return function () {
    const args = arguments
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(this, args), delay)
  }
}

