const products = [
  {
    id: 1,
    title: "Wireless Bluetooth Earbuds",
    category: "headphones",
    brand: "sony",
    price: 129.99,
    originalPrice: 159.99,
    discount: 19,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    specs: {
      "Battery Life": "Up to 8 hours",
      Connectivity: "Bluetooth 5.0",
      "Water Resistance": "IPX4",
      "Charging Case": "Yes",
      Color: "Black",
    },
    reviews: [
      { author: "Alex Johnson", rating: 5, comment: "Great sound quality and comfortable fit!" },
      { author: "Sarah Miller", rating: 4, comment: "Good value for money. Battery life is decent." },
    ],
    related: [2, 3],
  },
  {
    id: 2,
    title: "Gaming Headset Pro",
    category: "headphones",
    brand: "razer",
    price: 89.99,
    originalPrice: 119.99,
    discount: 25,
    image:
      "https://images.unsplash.com/photo-1599669454699-248893623440?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    specs: {
      Type: "Over-ear",
      Connectivity: "Wired USB",
      Microphone: "Retractable",
      Compatibility: "PC, PS4, Xbox",
      Color: "Green",
    },
    reviews: [
      { author: "Mike Thompson", rating: 5, comment: "Perfect for gaming sessions. Comfortable for long hours." },
    ],
    related: [1, 4],
  },
  {
    id: 3,
    title: "Smartphone X Pro",
    category: "phones",
    brand: "apple",
    price: 999.99,
    originalPrice: 1099.99,
    discount: 9,
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    specs: {
      Screen: "6.7 inch OLED",
      Storage: "256GB",
      Camera: "Triple 12MP",
      Battery: "4000mAh",
      OS: "iOS 16",
    },
    reviews: [
      { author: "Jessica Lee", rating: 5, comment: "Amazing camera and battery life!" },
      { author: "David Wilson", rating: 4, comment: "Great phone but a bit expensive." },
    ],
    related: [4, 5],
  },
  {
    id: 4,
    title: "Gaming Laptop Elite",
    category: "laptops",
    brand: "msi",
    price: 1499.99,
    originalPrice: 1799.99,
    discount: 17,
    image:
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    specs: {
      Processor: "Intel i7-12700H",
      Graphics: "RTX 3060",
      RAM: "16GB DDR5",
      Storage: "1TB SSD",
      Display: "15.6 inch 144Hz",
    },
    reviews: [{ author: "Chris Brown", rating: 5, comment: "Handles all my games at high settings!" }],
    related: [2, 5],
  },
  {
    id: 5,
    title: "Next-Gen Console",
    category: "gaming",
    brand: "sony",
    price: 499.99,
    originalPrice: 549.99,
    discount: 9,
    image:
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    specs: {
      Storage: "825GB SSD",
      Resolution: "4K UHD",
      Controller: "DualSense",
      "Backward Compatibility": "Yes",
      Color: "White",
    },
    reviews: [{ author: "Emily Davis", rating: 5, comment: "Graphics are incredible and load times are super fast!" }],
    related: [4, 6],
  },
  {
    id: 6,
    title: "Wireless Mouse",
    category: "accessories",
    brand: "logitech",
    price: 49.99,
    originalPrice: 69.99,
    discount: 29,
    image:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    specs: {
      Connectivity: "Bluetooth & USB Receiver",
      DPI: "Up to 4000",
      Battery: "Up to 12 months",
      Buttons: "6 programmable",
      Color: "Black",
    },
    reviews: [{ author: "Robert Taylor", rating: 4, comment: "Comfortable and responsive. Good battery life." }],
    related: [7, 8],
  },
  {
    id: 7,
    title: "Mechanical Keyboard",
    category: "accessories",
    brand: "razer",
    price: 119.99,
    originalPrice: 149.99,
    discount: 20,
    image:
      "https://images.unsplash.com/photo-1541140532154-b024d705b90a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    specs: {
      "Switch Type": "Mechanical",
      Backlight: "RGB",
      Connectivity: "USB-C",
      Keycaps: "Double-shot PBT",
      Layout: "Tenkeyless",
    },
    reviews: [{ author: "Daniel White", rating: 5, comment: "Best keyboard I've ever used. Typing feels amazing!" }],
    related: [6, 8],
  },
  {
    id: 8,
    title: "Action Adventure Game",
    category: "games",
    brand: "sony",
    price: 59.99,
    originalPrice: 69.99,
    discount: 14,
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    specs: {
      Genre: "Action-Adventure",
      Platform: "PS5, PC, Xbox",
      Rating: "Mature",
      Multiplayer: "No",
      "Release Date": "2022",
    },
    reviews: [{ author: "Lisa Garcia", rating: 5, comment: "Incredible story and gameplay. A must-play!" }],
    related: [5, 7],
  },
  {
    id: 9,
    title: "iPhone 15 Pro Max",
    category: "phones",
    brand: "apple",
    price: 1199.99,
    originalPrice: 1299.99,
    discount: 8,
    image: "https://images.unsplash.com/photo-1695048138350-e13b0ec86998?auto=format&fit=crop&w=500&q=80",
    specs: {
      Display: "6.7-inch OLED",
      Storage: "256GB",
      Camera: "48MP Triple Camera",
      Battery: "4500mAh",
      "Release Year": "2023",
    },
    reviews: [{ author: "James Allen", rating: 5, comment: "Super fast and the camera is insane!" }],
    related: [12, 16],
  },
  {
    id: 10,
    title: "Sony WH-1000XM5",
    category: "headphones",
    brand: "sony",
    price: 349.99,
    originalPrice: 399.99,
    discount: 13,
    image: "https://images.unsplash.com/photo-1580894908361-967195033f6b?auto=format&fit=crop&w=500&q=80",
    specs: {
      Type: "Over-Ear",
      "Noise Cancellation": "Yes",
      "Battery Life": "30 Hours",
      Connectivity: "Bluetooth 5.2",
      Microphone: "Yes",
    },
    reviews: [{ author: "Derrick Cole", rating: 4, comment: "Amazing ANC and sound quality." }],
    related: [14, 18],
  },
  {
    id: 11,
    title: "Samsung Galaxy Book 4 Pro",
    category: "laptops",
    brand: "samsung",
    price: 1499.99,
    originalPrice: 1699.99,
    discount: 12,
    image: "https://images.unsplash.com/photo-1508873535684-277a3cbcc4e4?auto=format&fit=crop&w=500&q=80",
    specs: {
      Processor: "Intel Core i7",
      RAM: "16GB",
      Storage: "512GB SSD",
      Display: "15.6-inch AMOLED",
      Graphics: "Intel Iris Xe",
    },
    reviews: [{ author: "Sophia Wright", rating: 5, comment: "Excellent display and battery life!" }],
    related: [9, 17],
  },
  {
    id: 12,
    title: "PlayStation 5 Console",
    category: "gaming",
    brand: "sony",
    price: 499.99,
    originalPrice: 549.99,
    discount: 9,
    image: "https://images.unsplash.com/photo-1606813907291-1ba5d5c6572c?auto=format&fit=crop&w=500&q=80",
    specs: {
      Storage: "825GB SSD",
      Resolution: "4K 120fps",
      Controller: "DualSense Wireless",
      Connectivity: "WiFi 6",
      "Release Year": "2020",
    },
    reviews: [{ author: "Kevin Benson", rating: 5, comment: "Smooth gameplay and ultra-fast loading." }],
    related: [8, 19],
  },
  {
    id: 13,
    title: "MSI RTX 4070 Gaming PC",
    category: "pc-builds",
    brand: "msi",
    price: 1899.99,
    originalPrice: 2099.99,
    discount: 10,
    image: "https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?auto=format&fit=crop&w=500&q=80",
    specs: {
      CPU: "Intel Core i7-13700K",
      GPU: "NVIDIA RTX 4070",
      RAM: "32GB DDR5",
      Storage: "1TB NVMe SSD",
      Cooling: "Liquid Cooling",
    },
    reviews: [{ author: "Alex Carter", rating: 5, comment: "Runs every game at ultra settings." }],
    related: [10, 12],
  },
  {
    id: 14,
    title: "Logitech MX Master 3S Mouse",
    category: "accessories",
    brand: "logitech",
    price: 99.99,
    originalPrice: 129.99,
    discount: 23,
    image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=500&q=80",
    specs: {
      Type: "Wireless Mouse",
      "Battery Life": "70 Days",
      Connectivity: "Bluetooth / USB Receiver",
      Buttons: "7 Programmable Buttons",
      DPI: "200–8000",
    },
    reviews: [{ author: "Helen Kim", rating: 5, comment: "Perfect for productivity and editing!" }],
    related: [11, 13],
  },
  {
    id: 15,
    title: "Racing Simulator Elite",
    category: "games",
    brand: "razer",
    price: 49.99,
    originalPrice: 59.99,
    discount: 17,
    image: "https://images.unsplash.com/photo-1605902711622-cfb43c44367e?auto=format&fit=crop&w=500&q=80",
    specs: {
      Genre: "Racing",
      Platform: "PS5, Xbox, PC",
      Rating: "Everyone",
      Multiplayer: "Yes",
      "Release Date": "2023",
    },
    reviews: [{ author: "Mike Johnson", rating: 4, comment: "Realistic driving and great graphics!" }],
    related: [8, 12],
  },
]

// DOM Elements
const productsGrid = document.getElementById("products-grid")
const productModal = document.getElementById("product-modal")
const closeModal = document.getElementById("close-modal")
const categoryFilter = document.getElementById("category-filter")
const brandFilter = document.getElementById("brand-filter")
const priceFilter = document.getElementById("price-filter")
const priceValue = document.getElementById("price-value")
const sortOptions = document.getElementById("sort-options")
const searchBar = document.querySelector(".search-bar")

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  renderProducts(products)
  setupEventListeners()
})

// Render products to the grid
function renderProducts(productsToRender) {
  productsGrid.innerHTML = ""

  productsToRender.forEach((product) => {
    const productCard = document.createElement("div")
    productCard.className = "product-card"
    productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.title}" class="product-image">
                    <div class="product-info">
                        <h3 class="product-title">${product.title}</h3>
                        <div class="product-price">
                            <span class="current-price">$${product.price.toFixed(2)}</span>
                            <span class="original-price">$${product.originalPrice.toFixed(2)}</span>
                            <span class="discount">${product.discount}% OFF</span>
                        </div>
                        <p class="product-specs">${Object.entries(product.specs)[0][0]}: <span class="spec-highlight">${Object.entries(product.specs)[0][1]}</span></p>
                        <button class="add-to-cart" data-id="${product.id}">
                            <i class="fas fa-shopping-cart"></i> Add to Cart
                        </button>
                    </div>
                `

    productCard.addEventListener("click", (e) => {
      if (!e.target.classList.contains("add-to-cart")) {
        openProductModal(product.id)
      }
    })

    productsGrid.appendChild(productCard)
  })
}

// Setup event listeners for filters and search
function setupEventListeners() {
  // Price filter
  priceFilter.addEventListener("input", function () {
    priceValue.textContent = `$${this.value}`
    filterProducts()
  })

  // Category, brand, and sort filters
  categoryFilter.addEventListener("change", filterProducts)
  brandFilter.addEventListener("change", filterProducts)
  sortOptions.addEventListener("change", filterProducts)

  // Search bar
  searchBar.addEventListener("input", filterProducts)

  // Modal close
  closeModal.addEventListener("click", () => {
    productModal.style.display = "none"
  })

  // Close modal when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === productModal) {
      productModal.style.display = "none"
    }
  })
}

// Filter products based on selected criteria
function filterProducts() {
  const category = categoryFilter.value
  const brand = brandFilter.value
  const price = Number.parseInt(priceFilter.value)
  const sort = sortOptions.value
  const searchTerm = searchBar.value.toLowerCase()

  const filteredProducts = products.filter((product) => {
    // Category filter
    if (category !== "all" && product.category !== category) return false

    // Brand filter
    if (brand !== "all" && product.brand !== brand) return false

    // Price filter
    if (product.price > price) return false

    // Search filter
    if (searchTerm && !product.title.toLowerCase().includes(searchTerm)) return false

    return true
  })

  // Sort products
  switch (sort) {
    case "price-low":
      filteredProducts.sort((a, b) => a.price - b.price)
      break
    case "price-high":
      filteredProducts.sort((a, b) => b.price - a.price)
      break
    case "popular":
      filteredProducts.sort((a, b) => b.discount - a.discount)
      break
    case "newest":
    default:
      filteredProducts.sort((a, b) => b.id - a.id)
      break
  }

  renderProducts(filteredProducts)
}

// Open product modal with details
function openProductModal(productId) {
  const product = products.find((p) => p.id === productId)
  if (!product) return

  document.getElementById("modal-product-title").textContent = product.title
  document.getElementById("modal-product-image").src = product.image
  document.getElementById("modal-current-price").textContent = `$${product.price.toFixed(2)}`
  document.getElementById("modal-original-price").textContent = `$${product.originalPrice.toFixed(2)}`
  document.getElementById("modal-discount").textContent = `${product.discount}% OFF`

  // Set specifications table
  const specsTable = document.getElementById("specs-table")
  specsTable.innerHTML = ""
  for (const [key, value] of Object.entries(product.specs)) {
    const row = document.createElement("tr")
    row.innerHTML = `
                    <th>${key}</th>
                    <td>${value}</td>
                `
    specsTable.appendChild(row)
  }

  // Set reviews
  const reviewsContainer = document.getElementById("reviews-container")
  reviewsContainer.innerHTML = ""
  product.reviews.forEach((review) => {
    const reviewElement = document.createElement("div")
    reviewElement.className = "review"
    reviewElement.innerHTML = `
                    <div class="review-header">
                        <span class="review-author">${review.author}</span>
                        <span class="review-rating">${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}</span>
                    </div>
                    <p>${review.comment}</p>
                `
    reviewsContainer.appendChild(reviewElement)
  })

  // Set related products
  const relatedProductsContainer = document.getElementById("related-products")
  relatedProductsContainer.innerHTML = ""
  product.related.forEach((relatedId) => {
    const relatedProduct = products.find((p) => p.id === relatedId)
    if (relatedProduct) {
      const relatedElement = document.createElement("div")
      relatedElement.className = "product-card"
      relatedElement.innerHTML = `
                        <img src="${relatedProduct.image}" alt="${relatedProduct.title}" class="product-image">
                        <div class="product-info">
                            <h4 class="product-title">${relatedProduct.title}</h4>
                            <div class="product-price">
                                <span class="current-price">$${relatedProduct.price.toFixed(2)}</span>
                            </div>
                        </div>
                    `
      relatedElement.addEventListener("click", () => {
        openProductModal(relatedProduct.id)
      })
      relatedProductsContainer.appendChild(relatedElement)
    }
  })

  // Show modal
  productModal.style.display = "block"
}

function addToCart(product) {
  // Get current cart from localStorage or initialize empty array
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || []

  // Check if product already in cart
  const existingItemIndex = cartItems.findIndex((item) => item.id === product.id)

  if (existingItemIndex !== -1) {
    // Increase quantity if already in cart
    cartItems[existingItemIndex].quantity += 1
  } else {
    // Add new item to cart
    product.quantity = 1
    cartItems.push(product)
  }

  // Save updated cart to localStorage
  localStorage.setItem("cartItems", JSON.stringify(cartItems))

  // Show confirmation
  alert(`${product.title} added to cart!`)
}
