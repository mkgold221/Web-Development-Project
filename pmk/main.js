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

// Theme Toggle Functionality
const themeToggle = document.getElementById("theme-toggle")
const body = document.body

// Check for saved theme preference or default to 'dark'
const currentTheme = localStorage.getItem("theme") || "dark"
body.setAttribute("data-theme", currentTheme)

// Update particles color based on theme
function updateParticlesColor() {
  const theme = body.getAttribute("data-theme")
  const particleColor = theme === "light" ? "#2563eb" : "#64ffda"

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
})

// Typing Effect
const typingText = document.getElementById("typing")
const words = ["Web Developer", "Python Programmer", "Problem Solver", "Tech Enthusiast", "Data Analyst"]
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

// Particles.js Configuration
function initParticles() {
  const theme = body.getAttribute("data-theme")
  const particleColor = theme === "light" ? "#2563eb" : "#64ffda"

  // Check if particlesJS is defined before using it
  if (typeof particlesJS !== "undefined") {
    particlesJS("particles-js", {
      particles: {
        number: {
          value: 80,
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
          value: 0.5,
          random: false,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false,
          },
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: false,
            speed: 40,
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
          speed: 2,
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

// Scroll Animation
const fadeElements = document.querySelectorAll(".fade-in")

function checkScroll() {
  fadeElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top
    const windowHeight = window.innerHeight

    if (elementTop < windowHeight - 100) {
      element.style.opacity = "1"
      element.style.transform = "translateY(0)"
    }
  })
}

// Initial check
checkScroll()

// Check on scroll
window.addEventListener("scroll", checkScroll)

// Set current year in footer
document.getElementById("current-year").textContent = new Date().getFullYear()

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
      })
    }
  })
})

// Back to top button
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
}

// Contact Form
const form = document.querySelector(".contact-form")
const successMessage = document.getElementById("success-message")

if (form && successMessage) {
  form.addEventListener("submit", (event) => {
    event.preventDefault()

    // Simulate a successful form submission
    setTimeout(() => {
      successMessage.style.display = "block"
      form.reset()
    }, 500)
  })
}

// Certificate Modal
function openModal(card) {
  const modal = document.getElementById("modal")
  const img = card.querySelector("img").src
  const modalImg = document.getElementById("modal-img")
  modalImg.src = img
  modal.classList.add("show")
}

function closeModal() {
  document.getElementById("modal").classList.remove("show")
}

// Close modal with Escape key
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal()
  }
})

// Initialize theme on page load
document.addEventListener("DOMContentLoaded", () => {
  updateParticlesColor()
})
