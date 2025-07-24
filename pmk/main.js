// Mobile Navigation
const hamburger = document.querySelector(".hamburger")
const navLinks = document.querySelector(".nav-links")
const navItems = document.querySelectorAll(".nav-links li a")

// Toggle mobile menu
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navLinks.classList.toggle("active")

  // Prevent body scroll when menu is open
  document.body.style.overflow = navLinks.classList.contains("active") ? "hidden" : "auto"
})

// Close menu when clicking on nav links
navItems.forEach((item) => {
  item.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navLinks.classList.remove("active")
    document.body.style.overflow = "auto"
  })
})

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
    hamburger.classList.remove("active")
    navLinks.classList.remove("active")
    document.body.style.overflow = "auto"
  }
})

// Enhanced Theme Toggle Functionality
const themeToggle = document.getElementById("theme-toggle")
const body = document.body

// Set default theme to dark
const currentTheme = localStorage.getItem("theme") || "dark"
body.setAttribute("data-theme", currentTheme)

// Update particles color based on theme
function updateParticlesColor() {
  const theme = body.getAttribute("data-theme")
  const particleColor = theme === "light" ? "#8b5cf6" : "#64ffda"

  // Update particles if they exist
  if (window.pJSDom && window.pJSDom[0]) {
    window.pJSDom[0].pJS.particles.color.value = particleColor
    window.pJSDom[0].pJS.particles.line_linked.color = particleColor
    window.pJSDom[0].pJS.fn.particlesRefresh()
  }
}

themeToggle.addEventListener("click", () => {
  const currentTheme = body.getAttribute("data-theme")
  const newTheme = currentTheme === "dark" ? "light" : "dark"

  body.setAttribute("data-theme", newTheme)
  localStorage.setItem("theme", newTheme)

  // Update particles color
  updateParticlesColor()

  // Add transition effect
  body.style.transition = "all 0.3s ease"
  setTimeout(() => {
    body.style.transition = ""
  }, 300)
})

// Enhanced Typing Effect
const typingText = document.getElementById("typing")
const words = ["Data Analyst", "Frontend Developer","Tech Content Creator", "Python Programmer", "Problem Solver", "Tech Enthusiast"]
let wordIndex = 0
let charIndex = 0
let isDeleting = false

function type() {
  const currentWord = words[wordIndex]
  const currentChar = currentWord.substring(0, charIndex)
  typingText.textContent = currentChar

  if (!isDeleting && charIndex < currentWord.length) {
    // Typing
    charIndex++
    setTimeout(type, 100)
  } else if (isDeleting && charIndex > 0) {
    // Deleting
    charIndex--
    setTimeout(type, 50)
  } else {
    // Change word
    isDeleting = !isDeleting
    if (!isDeleting) {
      wordIndex = (wordIndex + 1) % words.length
    }
    setTimeout(type, 1000)
  }
}

// Initialize typing effect
setTimeout(type, 1000)

// Enhanced Particles.js Configuration
function initParticles() {
  const theme = body.getAttribute("data-theme")
  const particleColor = theme === "light" ? "#8b5cf6" : "#64ffda"

  // Check if particlesJS is defined before using it
  if (window.particlesJS) {
    window.particlesJS("particles-js", {
      particles: {
        number: {
          value: 100,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: particleColor,
        },
        shape: {
          type: "circle",
          stroke: {
            width: 0,
            color: "#000000",
          },
          polygon: {
            nb_sides: 5,
          },
        },
        opacity: {
          value: 0.6,
          random: false,
          anim: {
            enable: true,
            speed: 1,
            opacity_min: 0.1,
            sync: false,
          },
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: true,
            speed: 2,
            size_min: 0.1,
            sync: false,
          },
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: particleColor,
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 3,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200,
          },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "grab",
          },
          onclick: {
            enable: true,
            mode: "push",
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 1,
            },
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
          push: {
            particles_nb: 4,
          },
          remove: {
            particles_nb: 2,
          },
        },
      },
      retina_detect: true,
    })
  } else {
    console.warn("particlesJS is not defined. Make sure particles.js is included in your HTML.")
  }
}

// Initialize particles
initParticles()

// Enhanced Scroll Animation
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"

      // Add stagger effect for multiple elements
      if (entry.target.classList.contains("skill-item-animate")) {
        const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100
        entry.target.style.animationDelay = `${delay}ms`
      }
    }
  })
}, observerOptions)

// Observe all animated elements
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(
    ".fade-in, .slide-in-left, .slide-in-right, .skill-item-animate, .project-animate, .testimonial-animate, .certificate-animate, .contact-animate, .form-animate",
  )
  animatedElements.forEach((el) => observer.observe(el))
})

// Enhanced Scroll Effects
let lastScrollTop = 0
const header = document.querySelector("header")

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop

  // Header hide/show on scroll
  if (scrollTop > lastScrollTop && scrollTop > 100) {
    header.style.transform = "translateY(-100%)"
  } else {
    header.style.transform = "translateY(0)"
  }
  lastScrollTop = scrollTop
})

// Set current year in footer
document.getElementById("current-year").textContent = new Date().getFullYear()

// Enhanced smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const headerHeight = document.querySelector("header").offsetHeight
      const targetPosition = target.offsetTop - headerHeight

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }
  })
})

// Enhanced Back to top button
const backToTop = document.querySelector(".custom-back-to-top")
if (backToTop) {
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTop.style.opacity = "1"
      backToTop.style.visibility = "visible"
    } else {
      backToTop.style.opacity = "0"
      backToTop.style.visibility = "hidden"
    }
  })

  backToTop.addEventListener("click", (e) => {
    e.preventDefault()
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })
}

// Enhanced Contact Form with Success Popup
const form = document.querySelector(".contact-form")
const successMessage = document.getElementById("success-message")
const successPopup = document.getElementById("success-popup")
const successSound = document.getElementById("success-sound")

if (form && successMessage) {
  form.addEventListener("submit", (event) => {
    event.preventDefault()

    // Add loading state
    const submitBtn = form.querySelector(".submit-btn")
    const originalText = submitBtn.textContent
    submitBtn.textContent = "Sending..."
    submitBtn.disabled = true

    // Simulate form submission
    setTimeout(() => {
      // Show success popup
      showSuccessPopup()

      // Play success sound
      if (successSound) {
        successSound.play().catch((e) => console.log("Audio play failed:", e))
      }

      // Reset form
      form.reset()

      // Reset button
      submitBtn.textContent = originalText
      submitBtn.disabled = false

      // Hide old success message
      successMessage.style.display = "none"
    }, 1000)
  })
}

// Success Popup Functions
function showSuccessPopup() {
  if (successPopup) {
    successPopup.classList.add("show")
    document.body.style.overflow = "hidden"

    // Auto close after 8 seconds
    setTimeout(() => {
      closeSuccessPopup()
    }, 8000)
  }
}

function closeSuccessPopup() {
  if (successPopup) {
    successPopup.classList.remove("show")
    document.body.style.overflow = "auto"
  }
}

function sendAnotherMessage() {
  closeSuccessPopup()
  // Scroll to contact form
  const contactSection = document.getElementById("contact")
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: "smooth" })
  }
}

// Close popup when clicking outside
if (successPopup) {
  successPopup.addEventListener("click", (e) => {
    if (e.target === successPopup) {
      closeSuccessPopup()
    }
  })
}

// Close popup with Escape key
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && successPopup && successPopup.classList.contains("show")) {
    closeSuccessPopup()
  }
})

// Certificate Modal
function openModal(card) {
  const modal = document.getElementById("modal")
  const img = card.querySelector("img").src
  const modalImg = document.getElementById("modal-img")
  modalImg.src = img
  modal.classList.add("show")
  document.body.style.overflow = "hidden"
}

function closeModal() {
  const modal = document.getElementById("modal")
  modal.classList.remove("show")
  document.body.style.overflow = "auto"
}

// Close modal with Escape key
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal()
  }
})

// Enhanced loading animations
window.addEventListener("load", () => {
  // Remove loading class if exists
  document.body.classList.remove("loading")

  // Initialize theme and particles
  updateParticlesColor()

  // Trigger initial animations
  const heroContent = document.querySelector(".hero-content")
  if (heroContent) {
    heroContent.style.animation = "fadeInUp 1s ease forwards"
  }
})

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Apply debounce to scroll events
const debouncedScrollHandler = debounce(() => {
  // Scroll-based animations can go here
}, 10)

window.addEventListener("scroll", debouncedScrollHandler)

// Add loading states for images
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll("img")
  images.forEach((img) => {
    img.addEventListener("load", () => {
      img.style.opacity = "1"
    })

    img.addEventListener("error", () => {
      img.style.opacity = "0.5"
    })
  })
})

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Set initial theme
  const savedTheme = localStorage.getItem("theme") || "dark"
  document.body.setAttribute("data-theme", savedTheme)

  // Initialize particles after a short delay
  setTimeout(() => {
    initParticles()
    updateParticlesColor()
  }, 100)

  // Add smooth reveal animations
  const revealElements = document.querySelectorAll(".fade-in")
  revealElements.forEach((el, index) => {
    el.style.animationDelay = `${index * 0.1}s`
  })
})


  document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default form submission

    const form = e.target;
    const formData = new FormData(form);

    fetch("https://formsubmit.co/ajax/idowumalik32@gmail.com", {
      method: "POST",
      headers: {
        'Accept': 'application/json'
      },
      body: formData
    })
    .then(response => {
      if (response.ok) {
        // Show success message
        document.getElementById('success-message').style.display = 'block';
        form.reset(); // Clear form
      } else {
        alert("There was a problem submitting the form.");
      }
    })
    .catch(error => {
      console.error("Form submission error:", error);
      alert("An error occurred. Please try again.");
    });
  });

