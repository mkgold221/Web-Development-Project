// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS (Animate on Scroll) if available
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease",
      once: true,
      offset: 100,
    })
  }

  /**************************************
   * COMMON ELEMENTS & FUNCTIONALITY
   **************************************/

  // DOM Elements
  const hamburger = document.querySelector(".hamburger")
  const navMenu = document.querySelector(".nav-menu")
  const themeToggle = document.querySelector(".theme-toggle")
  const backToTopBtn = document.getElementById("back-to-top")
  const newsletterForm = document.querySelector(".newsletter-form")

  // Mobile Menu Toggle
  if (hamburger) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active")
      navMenu.classList.toggle("active")
    })
  }

  // Close mobile menu when clicking on a nav link
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      if (hamburger) {
        hamburger.classList.remove("active")
        navMenu.classList.remove("active")
      }
    })
  })

  // Theme Toggle (Light/Dark Mode)
  if (themeToggle) {
    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      document.body.classList = savedTheme
    } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.body.classList = "dark-mode"
    } else {
      document.body.classList = "light-mode"
    }

    // Toggle theme on click
    themeToggle.addEventListener("click", () => {
      if (document.body.classList.contains("light-mode")) {
        document.body.classList.replace("light-mode", "dark-mode")
        localStorage.setItem("theme", "dark-mode")
      } else {
        document.body.classList.replace("dark-mode", "light-mode")
        localStorage.setItem("theme", "light-mode")
      }
    })
  }

  // Back to Top Button
  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add("visible")
      } else {
        backToTopBtn.classList.remove("visible")
      }
    })

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }

  // Form Validation
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const emailInput = newsletterForm.querySelector('input[type="email"]')
      const email = emailInput.value.trim()

      if (!isValidEmail(email)) {
        alert("Please enter a valid email address.")
        emailInput.focus()
        return
      }

      // Simulate form submission
      alert("Thank you for subscribing to our newsletter!")
      newsletterForm.reset()
    })
  }

  // Email validation helper
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Search form validation
  const searchForm = document.querySelector(".search-form")
  if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const location = document.getElementById("location").value.trim()

      if (location === "") {
        alert("Please enter a location to search.")
        document.getElementById("location").focus()
        return
      }

      // Redirect to listings page (in a real application)
      window.location.href = "listings.html"
    })
  }

  // Initialize any modals
  const modalTriggers = document.querySelectorAll("[data-modal]")
  const modals = document.querySelectorAll(".modal")
  const modalCloseButtons = document.querySelectorAll(".modal-close")

  if (modalTriggers.length > 0) {
    modalTriggers.forEach((trigger) => {
      trigger.addEventListener("click", () => {
        const modalId = trigger.getAttribute("data-modal")
        const modal = document.getElementById(modalId)
        if (modal) {
          modal.classList.add("active")
          document.body.style.overflow = "hidden"
        }
      })
    })

    modalCloseButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const modal = button.closest(".modal")
        modal.classList.remove("active")
        document.body.style.overflow = ""
      })
    })

    modals.forEach((modal) => {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          modal.classList.remove("active")
          document.body.style.overflow = ""
        }
      })
    })
  }

  /**************************************
   * HOME PAGE FUNCTIONALITY
   **************************************/

  // Testimonial Slider
  const testimonialSlides = document.querySelectorAll(".testimonial-slide")
  const testimonialDots = document.querySelectorAll(".dot")
  const prevBtn = document.querySelector(".prev-btn")
  const nextBtn = document.querySelector(".next-btn")

  if (testimonialSlides.length > 0) {
    let currentSlide = 0

    // Show the current slide and update dots
    function showSlide(index) {
      testimonialSlides.forEach((slide) => slide.classList.remove("active"))
      testimonialDots.forEach((dot) => dot.classList.remove("active"))

      testimonialSlides[index].classList.add("active")
      testimonialDots[index].classList.add("active")
      currentSlide = index
    }

    // Next slide
    function nextSlide() {
      let nextIndex = currentSlide + 1
      if (nextIndex >= testimonialSlides.length) {
        nextIndex = 0
      }
      showSlide(nextIndex)
    }

    // Previous slide
    function prevSlide() {
      let prevIndex = currentSlide - 1
      if (prevIndex < 0) {
        prevIndex = testimonialSlides.length - 1
      }
      showSlide(prevIndex)
    }

    // Event listeners for controls
    if (nextBtn) nextBtn.addEventListener("click", nextSlide)
    if (prevBtn) prevBtn.addEventListener("click", prevSlide)

    // Click on dots to navigate
    testimonialDots.forEach((dot, index) => {
      dot.addEventListener("click", () => showSlide(index))
    })

    // Auto slide every 5 seconds
    setInterval(nextSlide, 5000)
  }

  /**************************************
   * LISTINGS PAGE FUNCTIONALITY
   **************************************/

  // DOM Elements for Listings Page
  const filterToggleBtn = document.getElementById("filter-toggle")
  const filterContent = document.querySelector(".filter-content")
  const filterForm = document.getElementById("filter-form")
  const sortBySelect = document.getElementById("sort-by")
  const gridViewBtn = document.querySelector(".grid-view")
  const listViewBtn = document.querySelector(".list-view")
  const propertyGrid = document.querySelector(".property-grid")

  // Toggle filters on mobile
  if (filterToggleBtn && filterContent) {
    filterToggleBtn.addEventListener("click", () => {
      filterContent.classList.toggle("active")

      if (filterContent.classList.contains("active")) {
        filterToggleBtn.innerHTML = '<i class="fas fa-times"></i> Close'
      } else {
        filterToggleBtn.innerHTML = '<i class="fas fa-filter"></i> Filters'
      }
    })
  }

  // Filter form submission
  if (filterForm) {
    filterForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get filter values
      const location = document.getElementById("filter-location").value.trim()
      const propertyType = document.getElementById("filter-type").value
      const status = document.getElementById("filter-status").value
      const minPrice = document.getElementById("filter-price-min").value
      const maxPrice = document.getElementById("filter-price-max").value
      const beds = document.getElementById("filter-beds").value
      const baths = document.getElementById("filter-baths").value
      const features = Array.from(document.querySelectorAll('input[name="features"]:checked')).map(
        (input) => input.value,
      )

      // In a real application, you would send these filters to the server or filter client-side
      console.log("Filtering properties with:", {
        location,
        propertyType,
        status,
        minPrice,
        maxPrice,
        beds,
        baths,
        features,
      })

      // For demo purposes, just show an alert
      alert("Filters applied! In a real application, this would filter the properties.")

      // On mobile, close the filter panel after applying
      if (window.innerWidth < 992) {
        filterContent.classList.remove("active")
        filterToggleBtn.innerHTML = '<i class="fas fa-filter"></i> Filters'
      }
    })

    // Reset button functionality
    const resetButton = filterForm.querySelector('button[type="reset"]')
    if (resetButton) {
      resetButton.addEventListener("click", () => {
        setTimeout(() => {
          // In a real application, you would reset the filters and reload properties
          alert("Filters reset! In a real application, this would reset the property listing.")
        }, 100)
      })
    }
  }

  // Sort properties
  if (sortBySelect) {
    sortBySelect.addEventListener("change", () => {
      const sortValue = sortBySelect.value

      // In a real application, you would sort the properties based on the selected value
      console.log("Sorting properties by:", sortValue)

      // For demo purposes, just show an alert
      alert(`Properties sorted by ${sortValue}! In a real application, this would reorder the properties.`)
    })
  }

  // View toggle (grid/list)
  if (gridViewBtn && listViewBtn && propertyGrid) {
    gridViewBtn.addEventListener("click", () => {
      propertyGrid.classList.remove("list-view")
      gridViewBtn.classList.add("active")
      listViewBtn.classList.remove("active")
    })

    listViewBtn.addEventListener("click", () => {
      propertyGrid.classList.add("list-view")
      listViewBtn.classList.add("active")
      gridViewBtn.classList.remove("active")
    })
  }

  // Add list view styles dynamically
  if (propertyGrid) {
    const style = document.createElement("style")
    style.textContent = `
            .property-grid.list-view {
                grid-template-columns: 1fr;
            }
            
            .property-grid.list-view .property-card {
                display: grid;
                grid-template-columns: 300px 1fr;
                gap: 0;
            }
            
            .property-grid.list-view .property-image {
                height: 100%;
            }
            
            @media (max-width: 768px) {
                .property-grid.list-view .property-card {
                    grid-template-columns: 1fr;
                }
                
                .property-grid.list-view .property-image {
                    height: 250px;
                }
            }
        `
    document.head.appendChild(style)
  }

  // Pagination functionality
  const paginationLinks = document.querySelectorAll(".pagination .page-link")
  if (paginationLinks.length > 0) {
    paginationLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault()

        // Remove active class from all links
        paginationLinks.forEach((l) => l.classList.remove("active"))

        // Add active class to clicked link
        link.classList.add("active")

        // In a real application, you would load the corresponding page of properties
        if (!link.classList.contains("next")) {
          alert(
            `Navigating to page ${link.textContent}! In a real application, this would load page ${link.textContent} of properties.`,
          )
        } else {
          alert("Navigating to next page! In a real application, this would load the next page of properties.")
        }
      })
    })
  }

  /**************************************
   * PROPERTY DETAILS PAGE FUNCTIONALITY
   **************************************/

  // DOM Elements for Property Details Page
  const mainGalleryImage = document.getElementById("main-gallery-image")
  const thumbnails = document.querySelectorAll(".thumbnail")
  const galleryPrevBtn = document.querySelector(".gallery-nav.prev")
  const galleryNextBtn = document.querySelector(".gallery-nav.next")
  const fullscreenBtn = document.querySelector(".fullscreen-btn")
  const lightbox = document.getElementById("gallery-lightbox")
  const lightboxImage = document.getElementById("lightbox-image")
  const lightboxCaption = document.getElementById("lightbox-caption")
  const lightboxCloseBtn = document.querySelector(".lightbox-close")
  const lightboxPrevBtn = document.querySelector(".lightbox-nav.prev")
  const lightboxNextBtn = document.querySelector(".lightbox-nav.next")
  const tabButtons = document.querySelectorAll(".tab-btn")
  const tabPanes = document.querySelectorAll(".tab-pane")
  const calculateMortgageBtn = document.getElementById("calculate-mortgage")
  const mortgageResults = document.getElementById("mortgage-results")
  const scheduleViewingForm = document.getElementById("schedule-viewing-form")
  const readMoreBtn = document.getElementById("read-more-btn")

  // Read More functionality for property description
  if (readMoreBtn) {
    const propertyDescription = document.querySelector(".property-description")
    const paragraphs = propertyDescription ? propertyDescription.querySelectorAll("p") : []

    // Initially hide paragraphs after the first one
    if (paragraphs.length > 1) {
      for (let i = 1; i < paragraphs.length; i++) {
        paragraphs[i].style.display = "none"
      }

      readMoreBtn.addEventListener("click", () => {
        for (let i = 1; i < paragraphs.length; i++) {
          if (paragraphs[i].style.display === "none") {
            paragraphs[i].style.display = "block"
            readMoreBtn.innerHTML = 'Read Less <i class="fas fa-chevron-up"></i>'
          } else {
            paragraphs[i].style.display = "none"
            readMoreBtn.innerHTML = 'Read More <i class="fas fa-chevron-down"></i>'
          }
        }
      })
    } else {
      readMoreBtn.style.display = "none"
    }
  }

  // Gallery functionality
  if (thumbnails.length > 0 && mainGalleryImage) {
    let currentImageIndex = 0
    const galleryImages = Array.from(thumbnails).map((thumb) => ({
      src: thumb.querySelector("img").src,
      alt: thumb.querySelector("img").alt,
    }))

    // Update main image when clicking on a thumbnail
    thumbnails.forEach((thumbnail, index) => {
      thumbnail.addEventListener("click", () => {
        mainGalleryImage.src = thumbnail.querySelector("img").src
        mainGalleryImage.alt = thumbnail.querySelector("img").alt
        currentImageIndex = index

        // Update active thumbnail
        thumbnails.forEach((t) => t.classList.remove("active"))
        thumbnail.classList.add("active")
      })
    })

    // Previous image
    if (galleryPrevBtn) {
      galleryPrevBtn.addEventListener("click", () => {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length
        mainGalleryImage.src = galleryImages[currentImageIndex].src
        mainGalleryImage.alt = galleryImages[currentImageIndex].alt

        // Update active thumbnail
        thumbnails.forEach((t) => t.classList.remove("active"))
        thumbnails[currentImageIndex].classList.add("active")
      })
    }

    // Next image
    if (galleryNextBtn) {
      galleryNextBtn.addEventListener("click", () => {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length
        mainGalleryImage.src = galleryImages[currentImageIndex].src
        mainGalleryImage.alt = galleryImages[currentImageIndex].alt

        // Update active thumbnail
        thumbnails.forEach((t) => t.classList.remove("active"))
        thumbnails[currentImageIndex].classList.add("active")
      })
    }

    // Fullscreen/Lightbox functionality
    if (fullscreenBtn && lightbox) {
      fullscreenBtn.addEventListener("click", () => {
        lightboxImage.src = mainGalleryImage.src
        lightboxImage.alt = mainGalleryImage.alt
        lightboxCaption.textContent = mainGalleryImage.alt
        lightbox.classList.add("active")
        document.body.style.overflow = "hidden"
      })

      // Close lightbox
      if (lightboxCloseBtn) {
        lightboxCloseBtn.addEventListener("click", () => {
          lightbox.classList.remove("active")
          document.body.style.overflow = ""
        })
      }

      // Click outside to close
      lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
          lightbox.classList.remove("active")
          document.body.style.overflow = ""
        }
      })

      // Previous image in lightbox
      if (lightboxPrevBtn) {
        lightboxPrevBtn.addEventListener("click", () => {
          currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length
          lightboxImage.src = galleryImages[currentImageIndex].src
          lightboxImage.alt = galleryImages[currentImageIndex].alt
          lightboxCaption.textContent = galleryImages[currentImageIndex].alt

          // Update active thumbnail
          thumbnails.forEach((t) => t.classList.remove("active"))
          thumbnails[currentImageIndex].classList.add("active")
        })
      }

      // Next image in lightbox
      if (lightboxNextBtn) {
        lightboxNextBtn.addEventListener("click", () => {
          currentImageIndex = (currentImageIndex + 1) % galleryImages.length
          lightboxImage.src = galleryImages[currentImageIndex].src
          lightboxImage.alt = galleryImages[currentImageIndex].alt
          lightboxCaption.textContent = galleryImages[currentImageIndex].alt

          // Update active thumbnail
          thumbnails.forEach((t) => t.classList.remove("active"))
          thumbnails[currentImageIndex].classList.add("active")
        })
      }

      // Keyboard navigation for lightbox
      document.addEventListener("keydown", (e) => {
        if (!lightbox.classList.contains("active")) return

        if (e.key === "Escape") {
          lightbox.classList.remove("active")
          document.body.style.overflow = ""
        } else if (e.key === "ArrowLeft") {
          lightboxPrevBtn.click()
        } else if (e.key === "ArrowRight") {
          lightboxNextBtn.click()
        }
      })
    }
  }

  // Tabs functionality
  if (tabButtons.length > 0 && tabPanes.length > 0) {
    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const tabId = button.getAttribute("data-tab")

        // Remove active class from all buttons and panes
        tabButtons.forEach((btn) => btn.classList.remove("active"))
        tabPanes.forEach((pane) => pane.classList.remove("active"))

        // Add active class to current button and pane
        button.classList.add("active")
        document.getElementById(`${tabId}-tab`).classList.add("active")
      })
    })
  }

  // Mortgage calculator
  if (calculateMortgageBtn && mortgageResults) {
    calculateMortgageBtn.addEventListener("click", () => {
      const homePrice = Number.parseFloat(document.getElementById("home-price").value)
      const downPaymentPercent = Number.parseFloat(document.getElementById("down-payment").value)
      const loanTerm = Number.parseInt(document.getElementById("loan-term").value)
      const interestRate = Number.parseFloat(document.getElementById("interest-rate").value)

      if (isNaN(homePrice) || isNaN(downPaymentPercent) || isNaN(loanTerm) || isNaN(interestRate)) {
        alert("Please enter valid numbers for all fields.")
        return
      }

      // Calculate mortgage
      const downPayment = homePrice * (downPaymentPercent / 100)
      const loanAmount = homePrice - downPayment
      const monthlyInterest = interestRate / 100 / 12
      const numberOfPayments = loanTerm * 12

      let monthlyPayment
      if (interestRate === 0) {
        monthlyPayment = loanAmount / numberOfPayments
      } else {
        monthlyPayment =
          (loanAmount * (monthlyInterest * Math.pow(1 + monthlyInterest, numberOfPayments))) /
          (Math.pow(1 + monthlyInterest, numberOfPayments) - 1)
      }

      const totalInterest = monthlyPayment * numberOfPayments - loanAmount

      // Update results
      document.getElementById("monthly-payment").textContent = `$${monthlyPayment.toFixed(2)}`
      document.getElementById("loan-amount").textContent = `$${loanAmount.toFixed(2)}`
      document.getElementById("total-interest").textContent = `$${totalInterest.toFixed(2)}`

      // Show results
      mortgageResults.style.display = "block"
    })
  }

  // Form validation for inquiry form
  const inquiryForm = document.getElementById("property-inquiry-form")
  if (inquiryForm) {
    inquiryForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const name = document.getElementById("name").value.trim()
      const email = document.getElementById("email").value.trim()
      const message = document.getElementById("message").value.trim()

      if (name === "") {
        alert("Please enter your name.")
        document.getElementById("name").focus()
        return
      }

      if (!isValidEmail(email)) {
        alert("Please enter a valid email address.")
        document.getElementById("email").focus()
        return
      }

      if (message === "") {
        alert("Please enter a message.")
        document.getElementById("message").focus()
        return
      }

      // Simulate form submission
      alert("Thank you for your inquiry! Our agent will contact you soon.")
      inquiryForm.reset()
    })
  }

  // Schedule viewing form
  if (scheduleViewingForm) {
    scheduleViewingForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const name = document.getElementById("viewing-name").value.trim()
      const email = document.getElementById("viewing-email").value.trim()
      const phone = document.getElementById("viewing-phone").value.trim()
      const date = document.getElementById("viewing-date").value
      const time = document.getElementById("viewing-time").value

      if (name === "" || email === "" || phone === "" || date === "" || time === "") {
        alert("Please fill in all required fields.")
        return
      }

      if (!isValidEmail(email)) {
        alert("Please enter a valid email address.")
        return
      }

      // Simulate form submission
      alert("Thank you! Your viewing has been scheduled. Our agent will confirm shortly.")

      // Close modal
      const modal = document.getElementById("inquiry-modal")
      if (modal) {
        modal.classList.remove("active")
        document.body.style.overflow = ""
      }

      scheduleViewingForm.reset()
    })
  }

  // Add "Schedule a Viewing" button functionality
  const propertyInquiryForm = document.getElementById("property-inquiry-form")
  if (propertyInquiryForm) {
    const scheduleViewingBtn = document.createElement("button")
    scheduleViewingBtn.type = "button"
    scheduleViewingBtn.className = "btn btn-outline btn-block"
    scheduleViewingBtn.style.marginTop = "10px"
    scheduleViewingBtn.innerHTML = '<i class="fas fa-calendar-alt"></i> Schedule a Viewing'
    scheduleViewingBtn.setAttribute("data-modal", "inquiry-modal")

    propertyInquiryForm.parentNode.insertBefore(scheduleViewingBtn, propertyInquiryForm.nextSibling)

    scheduleViewingBtn.addEventListener("click", () => {
      const modal = document.getElementById("inquiry-modal")
      if (modal) {
        modal.classList.add("active")
        document.body.style.overflow = "hidden"
      }
    })
  }

  // Share buttons functionality
  const shareButtons = document.querySelectorAll(".share-btn")
  if (shareButtons.length > 0) {
    shareButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault()

        const url = encodeURIComponent(window.location.href)
        const title = encodeURIComponent(document.title)

        let shareUrl
        if (button.classList.contains("facebook")) {
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`
        } else if (button.classList.contains("twitter")) {
          shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`
        } else if (button.classList.contains("pinterest")) {
          const img = mainGalleryImage ? encodeURIComponent(mainGalleryImage.src) : ""
          shareUrl = `https://pinterest.com/pin/create/button/?url=${url}&media=${img}&description=${title}`
        } else if (button.classList.contains("linkedin")) {
          shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`
        } else if (button.classList.contains("email")) {
          shareUrl = `mailto:?subject=${title}&body=Check out this property: ${url}`
        }

        if (shareUrl) {
          window.open(shareUrl, "_blank", "width=600,height=400")
        }
      })
    })
  }
})
