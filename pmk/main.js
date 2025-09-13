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

  console.log("[v0] Theme switched to:", newTheme)
})

// Enhanced Typing Effect
const typingText = document.getElementById("typing")
const words = [
  "Data Analyst",
  "Frontend Developer",
  "Tech Content Creator",
  "Python Programmer",
  "Problem Solver",
  "Tech Enthusiast",
]
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

const form = document.querySelector(".contact-form")
const successMessage = document.getElementById("success-message")
const successPopup = document.getElementById("success-popup")
const successSound = document.getElementById("success-sound")

if (form && successMessage) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault()

    const submitBtn = form.querySelector(".submit-btn")
    const originalText = submitBtn.textContent
    submitBtn.textContent = "Sending..."
    submitBtn.disabled = true

    try {
      // Send form data to FormSubmit
      const formData = new FormData(form)
      await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      })

      // Show success popup
      showSuccessPopup()

      // Play success sound
      if (successSound) {
        successSound.play().catch((e) => console.log("Audio play failed:", e))
      }

      // Reset form
      form.reset()

      // Hide old success message
      successMessage.style.display = "none"
    } catch (error) {
      console.error("Form submission failed:", error)
      alert("Something went wrong. Please try again.")
    } finally {
      // Reset button
      submitBtn.textContent = originalText
      submitBtn.disabled = false
    }
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

// Project Modal Functions
function openProjectModal(projectCard) {
  const modal = document.getElementById("project-modal")
  const modalImage = document.getElementById("modal-project-image")
  const modalTitle = document.getElementById("modal-project-title")
  const modalIntro = document.getElementById("modal-project-intro")
  const modalLinks = document.getElementById("modal-project-links")
  const modalContent = document.getElementById("modal-project-content")
  const modalSkills = document.getElementById("modal-project-skills")

  // Get project data from the card - updated selectors for new structure
  const image = projectCard.querySelector(".project-header img").src
  const title = projectCard.querySelector(".project-content .project-title").textContent
  const intro = projectCard.querySelector(".project-content .project-intro").textContent
  const links = projectCard.querySelector(".project-overlay .project-links").innerHTML
  const details = projectCard.querySelector(".project-content .project-details").innerHTML
  const skills = projectCard.querySelector(".project-content .skills-used").innerHTML

  // Populate modal
  modalImage.src = image
  modalTitle.textContent = title
  modalIntro.textContent = intro
  modalLinks.innerHTML = links
  modalContent.innerHTML = details
  modalSkills.innerHTML = skills

  // Show modal
  modal.classList.add("show")
  document.body.style.overflow = "hidden"
}

function closeProjectModal() {
  const modal = document.getElementById("project-modal")
  modal.classList.remove("show")
  document.body.style.overflow = "auto"
}

// Add click listeners to project cards
document.addEventListener("DOMContentLoaded", () => {
  const projectCards = document.querySelectorAll(".project-card")
  projectCards.forEach((card) => {
    card.addEventListener("click", () => openProjectModal(card))
  })
})

// AI Chat Functions
let isChatOpen = false

function toggleAIChat() {
  const chatContainer = document.getElementById("ai-chat-container")
  isChatOpen = !isChatOpen

  if (isChatOpen) {
    chatContainer.classList.add("show")
  } else {
    chatContainer.classList.remove("show")
  }
}

function handleAIKeyPress(event) {
  if (event.key === "Enter") {
    sendAIMessage()
  }
}

function sendAIMessage() {
  const input = document.getElementById("ai-input")
  const message = input.value.trim()

  if (message) {
    addUserMessage(message)
    input.value = ""

    // Simulate AI response
    setTimeout(() => {
      const response = generateAIResponse(message)
      addAIMessage(response)
    }, 1000)
  }
}

function askQuickQuestion(question) {
  const input = document.getElementById("ai-input")
  input.value = question
  sendAIMessage()
}

function addUserMessage(message) {
  const messagesContainer = document.getElementById("ai-chat-messages")
  const messageDiv = document.createElement("div")
  messageDiv.className = "user-message"
  messageDiv.innerHTML = `
    <div class="user-avatar-small">
      <i class="fas fa-user"></i>
    </div>
    <div class="message-content">
      <p>${message}</p>
    </div>
  `
  messagesContainer.appendChild(messageDiv)
  messagesContainer.scrollTop = messagesContainer.scrollHeight
}

function addAIMessage(message) {
  const messagesContainer = document.getElementById("ai-chat-messages")
  const messageDiv = document.createElement("div")
  messageDiv.className = "ai-message"
  messageDiv.innerHTML = `
    <div class="ai-avatar-small">
      <i class="fas fa-robot"></i>
    </div>
    <div class="message-content">
      <p>${message}</p>
    </div>
  `
  messagesContainer.appendChild(messageDiv)
  messagesContainer.scrollTop = messagesContainer.scrollHeight
}

function generateAIResponse(userMessage) {
  const message = userMessage.toLowerCase()

  // Skills-related responses
  if (message.includes("skill") || message.includes("technology") || message.includes("tech")) {
    return "Idowu is a versatile professional with expertise in both Frontend Development and Data Analysis. His frontend skills include HTML5, CSS3, JavaScript ES6+, React.js, Bootstrap, and Tailwind CSS. For data analysis, he's proficient in Python, SQL, Excel, Power BI, Tableau, and specialized libraries like Pandas, NumPy, Matplotlib, and Seaborn. He also has experience with database management, statistical analysis, and creating interactive dashboards."
  }

  // Projects-related responses
  if (message.includes("project") || message.includes("work") || message.includes("portfolio")) {
    return "Idowu's portfolio showcases professional-grade solutions across multiple domains. His frontend projects include modern e-commerce platforms, interactive movie databases, restaurant booking systems, authentication systems, real estate websites, and online learning platforms. His data analysis projects feature comprehensive sales analysis, interactive dashboards, advanced SQL data cleaning, and machine learning applications. Each project demonstrates business problem-solving with measurable impact and technical excellence."
  }

  // Experience-related responses
  if (message.includes("experience") || message.includes("background") || message.includes("about")) {
    return "Idowu has over 2 years of professional experience in Web Development, Data Analysis, and Python programming. He holds a Computer Science degree and has completed certifications in Responsive Web Design and Data Analytics. His expertise spans from creating responsive web applications to uncovering meaningful insights from complex datasets. He's passionate about transforming ideas into digital reality and helping businesses make data-driven decisions."
  }

  // Contact-related responses
  if (
    message.includes("contact") ||
    message.includes("reach") ||
    message.includes("hire") ||
    message.includes("email")
  ) {
    return "You can contact Idowu at idowumalik32@gmail.com or call +44 0806 170 4510. He's based in Manchester, United Kingdom, and available for both remote and on-site opportunities. Connect with him on LinkedIn (malik-idowu), GitHub (mkgold221), Instagram (@codewithmalik3), Twitter (@GoldMk67), or TikTok (@code_with_malik). He's currently looking for new opportunities and exciting projects to work on!"
  }

  // Location-related responses
  if (message.includes("location") || message.includes("where") || message.includes("based")) {
    return "Idowu is currently based in Manchester, United Kingdom. He's available for both remote work opportunities and on-site positions. His location allows him to work across different time zones and collaborate with international teams effectively."
  }

  // Services-related responses
  if (message.includes("service") || message.includes("offer") || message.includes("do")) {
    return "Idowu offers comprehensive digital solutions including: Data Visualization & Analytics, Data Cleaning & Processing, Business Intelligence & Insights, Modern Web Development, Responsive Design & UI/UX, Custom Dashboard Creation, Statistical Analysis & Reporting, and Python Automation. He specializes in transforming complex data into actionable insights and creating beautiful, functional websites that drive business results."
  }

  // Portfolio quality responses
  if (
    message.includes("quality") ||
    message.includes("professional") ||
    message.includes("good") ||
    message.includes("expert")
  ) {
    return "Idowu's portfolio demonstrates professional-grade expertise through comprehensive project documentation, measurable business impact, technical excellence with 90+ Lighthouse scores, and real-world problem-solving. Each project includes detailed case studies showing business problems solved, technical implementation, and quantifiable results. His work spans multiple industries and technologies, showcasing versatility and deep technical knowledge that proves his capability to deliver high-quality solutions."
  }

  // Default response
  return "I'm here to help you learn more about Idowu's professional capabilities! You can ask me about his technical skills, portfolio projects, work experience, services offered, or how to get in touch with him. His portfolio demonstrates expertise in both frontend development and data analysis, with proven results and professional-grade solutions. What specific information would you like to know?"
}

// Close modals when clicking outside
document.addEventListener("click", (e) => {
  const projectModal = document.getElementById("project-modal")
  const aiChatContainer = document.getElementById("ai-chat-container")
  const aiChatToggle = document.querySelector(".ai-chat-toggle")

  // Close project modal when clicking outside
  if (e.target === projectModal) {
    closeProjectModal()
  }

  // Close AI chat when clicking outside
  if (isChatOpen && !aiChatContainer.contains(e.target) && !aiChatToggle.contains(e.target)) {
    toggleAIChat()
  }
})

// Close modals with Escape key
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeProjectModal()
    if (isChatOpen) {
      toggleAIChat()
    }
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
  body.setAttribute("data-theme", savedTheme)
  console.log("[v0] Initial theme set to:", savedTheme)

  // Initialize tab switching first
  setTimeout(() => {
    initTabSwitching()
    console.log("[v0] Tab switching initialized")
  }, 100)

  // Initialize particles after a short delay
  setTimeout(() => {
    initParticles()
    updateParticlesColor()
    console.log("[v0] Particles initialized")
  }, 200)

  // Add smooth reveal animations
  const revealElements = document.querySelectorAll(".fade-in")
  revealElements.forEach((el, index) => {
    el.style.animationDelay = `${index * 0.1}s`
  })

  const animatedElements = document.querySelectorAll(
    ".fade-in, .slide-in-left, .slide-in-right, .skill-item-animate, .project-animate, .testimonial-animate, .certificate-animate, .contact-animate, .form-animate",
  )
  animatedElements.forEach((el) => observer.observe(el))
})

// Tab switching functionality
function initTabSwitching() {
  const sections = document.querySelectorAll("section")
  sections.forEach((section) => {
    const tabButtons = section.querySelectorAll(".tab-btn")
    const tabContents = section.querySelectorAll(".tab-content")

    if (tabButtons.length > 0 && tabContents.length > 0) {
      // Set first tab as active
      tabButtons[0].classList.add("active")
      tabContents[0].classList.add("active")
      tabContents[0].style.display = "block"

      // Hide other tabs
      for (let i = 1; i < tabContents.length; i++) {
        tabContents[i].classList.remove("active")
        tabContents[i].style.display = "none"
      }
    }
  })

  const tabButtons = document.querySelectorAll(".tab-btn")

  tabButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault()
      const targetTab = button.getAttribute("data-tab")
      const section = button.closest("section")
      const sectionTabButtons = section.querySelectorAll(".tab-btn")
      const sectionTabContents = section.querySelectorAll(".tab-content")

      // Remove active class from all buttons in this section
      sectionTabButtons.forEach((btn) => {
        btn.classList.remove("active")
      })

      // Hide all tab contents in this section
      sectionTabContents.forEach((content) => {
        content.classList.remove("active", "slide-in-left", "slide-in-right")
        content.style.display = "none"
      })

      // Add active class to clicked button
      button.classList.add("active")

      // Show target tab content with animation
      const targetContent = document.getElementById(targetTab)
      if (targetContent) {
        targetContent.style.display = "block"

        // Add slide animation
        setTimeout(() => {
          targetContent.classList.add("active", "slide-in-left")
        }, 10)

        // Re-trigger animations for elements within the tab
        const animatedElements = targetContent.querySelectorAll(
          ".project-animate, .testimonial-animate, .certificate-animate",
        )
        animatedElements.forEach((el, index) => {
          el.style.animation = "none"
          el.offsetHeight // Trigger reflow
          el.style.animation = `fadeInUp 0.8s ease forwards`
          el.style.animationDelay = `${index * 0.1}s`
        })
      }
    })
  })
}

const enhancedObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"

        // Add stagger effect for multiple elements
        if (
          entry.target.classList.contains("skill-item-animate") ||
          entry.target.classList.contains("project-animate") ||
          entry.target.classList.contains("testimonial-animate") ||
          entry.target.classList.contains("certificate-animate")
        ) {
          const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100
          entry.target.style.animationDelay = `${delay}ms`
        }
      }
    })
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  },
)


// Add this to your main.js file
function adjustHeroPadding() {
  const header = document.querySelector('header');
  const hero = document.querySelector('.hero');
  
  if (header && hero) {
    const headerHeight = header.offsetHeight;
    if (window.innerWidth <= 768) {
      hero.style.paddingTop = `calc(${headerHeight}px + 2rem)`;
    } else {
      hero.style.paddingTop = '';
    }
  }
}

// Run on load and resize
window.addEventListener('load', adjustHeroPadding);
window.addEventListener('resize', adjustHeroPadding);

// Also call this in your DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function() {
  adjustHeroPadding();
  // ... your existing DOMContentLoaded code
});

