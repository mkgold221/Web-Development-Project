/**
 * FormSubmit Handler - Dedicated Form Submission Module
 * Handles all form submissions to FormSubmit.co
 * Email: websifyapp@gmail.com
 */

class FormSubmitHandler {
  constructor() {
    this.formSelector = ".form-content"
    this.submitBtnSelector = 'button[type="submit"]'
    this.formSubmitEndpoint = "https://formsubmit.co/ajax/websifyapp@gmail.com"
    this.init()
  }

  /**
   * Initialize form submission handler
   */
  init() {
    document.addEventListener("DOMContentLoaded", () => {
      this.attachFormListener()
      console.log("[FormSubmit] Handler initialized successfully")
    })
  }

  /**
   * Attach submit listener to form
   */
  attachFormListener() {
    const form = document.querySelector(this.formSelector)
    if (!form) {
      console.warn("[FormSubmit] Form not found")
      return
    }

    form.addEventListener("submit", (e) => this.handleSubmit(e, form))
  }

  /**
   * Handle form submission
   */
  async handleSubmit(e, form) {
    e.preventDefault()

    const submitBtn = form.querySelector(this.submitBtnSelector)

    // Validate form
    if (!form.checkValidity()) {
      this.showNotification("Please fill in all required fields", "error")
      return
    }

    // Disable button and show loading state
    this.setButtonLoading(submitBtn, true)

    try {
      // Collect form data
      const formData = new FormData(form)

      // Add FormSubmit configuration
      formData.append("_subject", "🚀 New Quote Request - Websifyapp")
      formData.append("_template", "table")
      formData.append("_captcha", "false")
      formData.append("_autoresponse", "Thank you for your quote request! We'll get back to you within 24 hours.")

      // Send to FormSubmit
      const response = await fetch(this.formSubmitEndpoint, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })

      if (response.ok) {
        // Success
        this.showNotification("✅ Message sent successfully! We'll get back to you soon.", "success")
        form.reset()
        console.log("[FormSubmit] Form submitted successfully")
      } else {
        // Handle error response
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || "Failed to send message")
      }
    } catch (error) {
      console.error("[FormSubmit] Error:", error)
      this.showNotification("❌ Failed to send message. Please try again.", "error")
    } finally {
      // Re-enable button
      this.setButtonLoading(submitBtn, false)
    }
  }

  /**
   * Set button loading state
   */
  setButtonLoading(btn, isLoading) {
    if (!btn) return

    if (isLoading) {
      btn.disabled = true
      btn.dataset.originalText = btn.textContent
      btn.textContent = "Sending..."
      btn.style.opacity = "0.7"
    } else {
      btn.disabled = false
      btn.textContent = btn.dataset.originalText || "Send Message"
      btn.style.opacity = "1"
    }
  }

  /**
   * Show notification popup
   */
  showNotification(message, type = "success") {
    // Remove existing notification
    const existingNotification = document.querySelector(".form-notification")
    if (existingNotification) {
      existingNotification.remove()
    }

    // Create notification element
    const notification = document.createElement("div")
    notification.className = `form-notification form-notification-${type}`
    notification.textContent = message

    // Apply styles
    Object.assign(notification.style, {
      position: "fixed",
      top: "20px",
      right: "20px",
      padding: "16px 24px",
      borderRadius: "8px",
      fontSize: "14px",
      fontWeight: "500",
      fontFamily: "Poppins, sans-serif",
      zIndex: "9999",
      animation: "slideIn 0.3s ease-out",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
      maxWidth: "400px",
      wordWrap: "break-word",
    })

    // Set colors based on type
    if (type === "success") {
      notification.style.backgroundColor = "#10b981"
      notification.style.color = "#ffffff"
    } else if (type === "error") {
      notification.style.backgroundColor = "#ef4444"
      notification.style.color = "#ffffff"
    }

    document.body.appendChild(notification)

    // Auto-remove after 5 seconds
    setTimeout(() => {
      notification.style.animation = "slideOut 0.3s ease-out"
      setTimeout(() => notification.remove(), 300)
    }, 5000)
  }
}

// Initialize FormSubmit handler when script loads
const formSubmitHandler = new FormSubmitHandler()
