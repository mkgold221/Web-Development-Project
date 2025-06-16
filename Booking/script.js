// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
    // Variables
    const loader = document.querySelector(".loader-container")
    const darkModeToggle = document.getElementById("dark-mode-toggle")
    const header = document.getElementById("header")
    const hamburger = document.querySelector(".hamburger")
    const navLinks = document.querySelector(".nav-links")
    const navItems = document.querySelectorAll(".nav-links a")
    const menuTabs = document.querySelectorAll(".menu-tab")
    const menuCategories = document.querySelectorAll(".menu-category")
    const carouselSlides = document.querySelectorAll(".carousel-slide")
    const prevBtn = document.querySelector(".carousel-btn.prev")
    const nextBtn = document.querySelector(".carousel-btn.next")
    const dotsContainer = document.querySelector(".carousel-dots")
    const galleryItems = document.querySelectorAll(".gallery-item")
    const lightbox = document.querySelector(".lightbox")
    const lightboxContent = document.querySelector(".lightbox-content")
    const lightboxCaption = document.querySelector(".lightbox-caption")
    const lightboxClose = document.querySelector(".lightbox-close")
    const bookingForm = document.getElementById("booking-form")
    const bookingConfirmation = document.getElementById("booking-confirmation")
    const newReservationBtn = document.getElementById("new-reservation")
    const contactForm = document.getElementById("contact-form")
  
    // Initialize
    let currentSlide = 0
    let slideInterval
    let isDarkMode = localStorage.getItem("darkMode") === "enabled"
  
    // Loading Animation
    window.addEventListener("load", () => {
      setTimeout(() => {
        loader.classList.add("hidden")
      }, 1500)
    })
  
    // Dark Mode Toggle
    if (isDarkMode) {
      document.body.classList.add("dark-mode")
    }
  
    darkModeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode")
      isDarkMode = document.body.classList.contains("dark-mode")
      localStorage.setItem("darkMode", isDarkMode ? "enabled" : "disabled")
    })
  
    // Sticky Header
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        header.classList.add("scrolled")
      } else {
        header.classList.remove("scrolled")
      }
    })
  
    // Mobile Menu Toggle
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active")
      navLinks.classList.toggle("active")
    })
  
    // Close mobile menu when clicking on a nav item
    navItems.forEach((item) => {
      item.addEventListener("click", () => {
        hamburger.classList.remove("active")
        navLinks.classList.remove("active")
      })
    })
  
    // Active Navigation Link
    function setActiveNavLink() {
      const sections = document.querySelectorAll("section")
      const scrollPosition = window.scrollY + 200
  
      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.offsetHeight
        const sectionId = section.getAttribute("id")
  
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          navItems.forEach((item) => {
            item.classList.remove("active")
            if (item.getAttribute("href") === `#${sectionId}`) {
              item.classList.add("active")
            }
          })
        }
      })
    }
  
    window.addEventListener("scroll", setActiveNavLink)
  
    // Menu Tabs
    menuTabs.forEach((tab) => {
      tab.addEventListener("click", function () {
        // Remove active class from all tabs
        menuTabs.forEach((tab) => tab.classList.remove("active"))
  
        // Add active class to clicked tab
        this.classList.add("active")
  
        // Get category from data attribute
        const category = this.dataset.category
  
        // Hide all menu categories
        menuCategories.forEach((cat) => cat.classList.remove("active"))
  
        // Show selected category
        document.getElementById(category).classList.add("active")
      })
    })
  
    // Carousel Functionality
    function showSlide(n) {
      carouselSlides.forEach((slide) => slide.classList.remove("active"))
  
      currentSlide = (n + carouselSlides.length) % carouselSlides.length
      carouselSlides[currentSlide].classList.add("active")
  
      // Update dots
      updateDots()
    }
  
    function nextSlide() {
      showSlide(currentSlide + 1)
    }
  
    function prevSlide() {
      showSlide(currentSlide - 1)
    }
  
    // Create dots for carousel
    function createDots() {
      for (let i = 0; i < carouselSlides.length; i++) {
        const dot = document.createElement("div")
        dot.classList.add("carousel-dot")
        if (i === 0) dot.classList.add("active")
  
        dot.addEventListener("click", () => {
          showSlide(i)
        })
  
        dotsContainer.appendChild(dot)
      }
    }
  
    function updateDots() {
      const dots = document.querySelectorAll(".carousel-dot")
      dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentSlide)
      })
    }
  
    // Initialize carousel
    if (carouselSlides.length > 0) {
      createDots()
  
      // Auto slide
      function startSlideInterval() {
        slideInterval = setInterval(nextSlide, 5000)
      }
  
      function stopSlideInterval() {
        clearInterval(slideInterval)
      }
  
      startSlideInterval()
  
      // Event listeners for carousel controls
      prevBtn.addEventListener("click", () => {
        prevSlide()
        stopSlideInterval()
        startSlideInterval()
      })
  
      nextBtn.addEventListener("click", () => {
        nextSlide()
        stopSlideInterval()
        startSlideInterval()
      })
  
      // Pause autoplay on hover
      const carouselContainer = document.querySelector(".carousel-container")
      carouselContainer.addEventListener("mouseenter", stopSlideInterval)
      carouselContainer.addEventListener("mouseleave", startSlideInterval)
    }
  
    // Gallery Lightbox
    galleryItems.forEach((item, index) => {
      item.addEventListener("click", () => {
        const img = item.querySelector("img")
        const src = img.getAttribute("src")
        const alt = img.getAttribute("alt")
  
        lightboxContent.setAttribute("src", src)
        lightboxCaption.textContent = alt
        lightbox.classList.add("active")
      })
    })
  
    lightboxClose.addEventListener("click", () => {
      lightbox.classList.remove("active")
    })
  
    // Close lightbox when clicking outside the image
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove("active")
      }
    })
  
    // Form Validation
    function validateForm(form) {
      let isValid = true
      const inputs = form.querySelectorAll("input[required], select[required], textarea[required]")
  
      inputs.forEach((input) => {
        const formGroup = input.parentElement
        const errorMessage = formGroup.querySelector(".error-message")
  
        // Reset error state
        formGroup.classList.remove("error")
  
        // Check if empty
        if (!input.value.trim()) {
          formGroup.classList.add("error")
          if (errorMessage) errorMessage.textContent = "This field is required"
          isValid = false
          return
        }
  
        // Email validation
        if (input.type === "email") {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          if (!emailRegex.test(input.value)) {
            formGroup.classList.add("error")
            if (errorMessage) errorMessage.textContent = "Please enter a valid email address"
            isValid = false
          }
        }
  
        // Phone validation
        if (input.id === "phone") {
          const phoneRegex = /^\d{10,}$/
          if (!phoneRegex.test(input.value.replace(/\D/g, ""))) {
            formGroup.classList.add("error")
            if (errorMessage) errorMessage.textContent = "Please enter a valid phone number"
            isValid = false
          }
        }
      })
  
      return isValid
    }
  
    // Booking Form Submission
    if (bookingForm) {
      bookingForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        if (validateForm(bookingForm)) {
          // Show confirmation message with animation
          bookingForm.style.display = "none"
          bookingConfirmation.classList.add("active")
  
          // Reset form
          bookingForm.reset()
        }
      })
    }
  
    // New Reservation Button
    if (newReservationBtn) {
      newReservationBtn.addEventListener("click", () => {
        bookingConfirmation.classList.remove("active")
        bookingForm.style.display = "flex"
      })
    }
  
    // Contact Form Submission
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        if (validateForm(contactForm)) {
          // Show success message
          const formContainer = contactForm.parentElement
          const successMessage = document.createElement("div")
          successMessage.classList.add("booking-confirmation", "active")
          successMessage.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <h3>Message Sent!</h3>
            <p>Thank you for contacting us. We'll get back to you shortly.</p>
          `
  
          formContainer.innerHTML = ""
          formContainer.appendChild(successMessage)
        }
      })
    }
  
    // Newsletter Form
    const newsletterForm = document.querySelector(".newsletter-form")
    if (newsletterForm) {
      newsletterForm.addEventListener("submit", function (e) {
        e.preventDefault()
  
        const input = this.querySelector("input")
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  
        if (emailRegex.test(input.value)) {
          // Show success message
          const formContainer = newsletterForm.parentElement
          const successMessage = document.createElement("div")
          successMessage.innerHTML = `
            <i class="fas fa-check-circle" style="color: var(--success-color); font-size: 1.5rem;"></i>
            <p>Thank you for subscribing to our newsletter!</p>
          `
  
          formContainer.innerHTML = ""
          formContainer.appendChild(successMessage)
        } else {
          // Show error
          input.style.borderColor = "var(--error-color)"
          setTimeout(() => {
            input.style.borderColor = ""
          }, 3000)
        }
      })
    }
  
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
  
        const targetId = this.getAttribute("href")
        if (targetId === "#") return
  
        const targetElement = document.querySelector(targetId)
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: "smooth",
          })
        }
      })
    })
  
    // Animate elements on scroll
    function animateOnScroll() {
      const elements = document.querySelectorAll(".fade-in")
  
      elements.forEach((element) => {
        const elementPosition = element.getBoundingClientRect().top
        const windowHeight = window.innerHeight
  
        if (elementPosition < windowHeight - 100) {
          element.style.opacity = "1"
          element.style.transform = "translateY(0)"
        }
      })
    }
  
    // Initialize animations
    window.addEventListener("scroll", animateOnScroll)
    animateOnScroll() // Run once on load
  })
  
