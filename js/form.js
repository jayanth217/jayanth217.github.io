// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Get the contact form element
  const contactForm = document.getElementById("contact-form")

  // Get the notification element
  const notification = document.getElementById("notification")
  const notificationMessage = document.querySelector(".notification-message")
  const notificationIcon = document.querySelector(".notification-icon i")
  const notificationClose = document.querySelector(".notification-close")

  // Function to show notification
  function showNotification(message, isSuccess = true) {
    notificationMessage.textContent = message

    if (isSuccess) {
      notification.classList.remove("error")
      notificationIcon.className = "fas fa-check-circle"
    } else {
      notification.classList.add("error")
      notificationIcon.className = "fas fa-times-circle"
    }

    notification.classList.add("show")

    // Hide notification after 5 seconds
    setTimeout(() => {
      hideNotification()
    }, 5000)
  }

  // Function to hide notification
  function hideNotification() {
    notification.classList.remove("show")
  }

  // Add click event listener to notification close button
  notificationClose.addEventListener("click", hideNotification)

  // Form input animation
  const formInputs = document.querySelectorAll(".form-group input, .form-group textarea")

  formInputs.forEach((input) => {
    // Add focus event listener
    input.addEventListener("focus", function () {
      const label = this.previousElementSibling
      if (label && label.tagName === "LABEL") {
        label.style.top = "-20px"
        label.style.fontSize = "0.8rem"
        label.style.color = "var(--primary-color)"
      }
    })

    // Add blur event listener
    input.addEventListener("blur", function () {
      const label = this.previousElementSibling
      if (label && label.tagName === "LABEL" && this.value === "") {
        label.style.top = ""
        label.style.fontSize = ""
        label.style.color = ""
      }
    })

    // Check if input already has value on page load
    if (input.value !== "") {
      const label = input.previousElementSibling
      if (label && label.tagName === "LABEL") {
        label.style.top = "-20px"
        label.style.fontSize = "0.8rem"
        label.style.color = "var(--primary-color)"
      }
    }
  })

  // Handle form submission
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      // Show loading state
      const submitButton = contactForm.querySelector('button[type="submit"]')
      const originalText = submitButton.textContent
      submitButton.textContent = "Sending..."
      submitButton.disabled = true

      // Show notification that form is being processed
      showNotification("📤 Sending your message...")

      // Reset button state after a short delay (FormSubmit will handle the actual submission)
      setTimeout(() => {
        submitButton.textContent = originalText
        submitButton.disabled = false
      }, 2000)
    })
  }
})
