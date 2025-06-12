// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Matrix Background Animation
  const canvas = document.getElementById("matrix-canvas")
  const ctx = canvas.getContext("2d")

  // Set canvas dimensions
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  // Characters to be used in the matrix rain
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>?/{}[]!@#$%^&*()_+"
  const charArray = chars.split("")

  const fontSize = 14
  const columns = canvas.width / fontSize

  // Array to store the y position of each drop
  const drops = []
  for (let i = 0; i < columns; i++) {
    drops[i] = 1
  }

  // Draw the matrix rain
  function drawMatrixRain() {
    // Set a semi-transparent black background to create trail effect
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Set the color and font of the characters
    ctx.fillStyle = "#0f0"
    ctx.font = `${fontSize}px monospace`

    // Loop through each drop
    for (let i = 0; i < drops.length; i++) {
      // Choose a random character
      const text = charArray[Math.floor(Math.random() * charArray.length)]

      // Draw the character
      ctx.fillText(text, i * fontSize, drops[i] * fontSize)

      // If the drop has reached the bottom or randomly, reset it to the top
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0
      }

      // Move the drop down
      drops[i]++
    }
  }

  // Set interval to animate the matrix rain
  setInterval(drawMatrixRain, 50)

  // Resize canvas when window is resized
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Reset drops array
    for (let i = 0; i < columns; i++) {
      drops[i] = 1
    }
  })

  // Custom Cursor
  const cursor = document.querySelector(".cursor")
  const cursorFollower = document.querySelector(".cursor-follower")

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px"
    cursor.style.top = e.clientY + "px"

    setTimeout(() => {
      cursorFollower.style.left = e.clientX + "px"
      cursorFollower.style.top = e.clientY + "px"
    }, 100)
  })

  document.addEventListener("mousedown", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(0.8)"
    cursorFollower.style.transform = "translate(-50%, -50%) scale(0.5)"
  })

  document.addEventListener("mouseup", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(1)"
    cursorFollower.style.transform = "translate(-50%, -50%) scale(1)"
  })

  // Add hover effect to links and buttons
  const links = document.querySelectorAll("a, button, .project-card, .close-modal")
  links.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1.5)"
      cursorFollower.style.transform = "translate(-50%, -50%) scale(0)"
    })

    link.addEventListener("mouseleave", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1)"
      cursorFollower.style.transform = "translate(-50%, -50%) scale(1)"
    })
  })

  // Mobile Menu Toggle
  const menuBtn = document.querySelector(".menu-btn")
  const navLinks = document.querySelector(".nav-links")
  let menuOpen = false

  menuBtn.addEventListener("click", () => {
    if (!menuOpen) {
      menuBtn.classList.add("open")
      navLinks.classList.add("active")
      menuOpen = true
    } else {
      menuBtn.classList.remove("open")
      navLinks.classList.remove("active")
      menuOpen = false
    }
  })

  // Close mobile menu when clicking on a nav link
  const navItems = document.querySelectorAll(".nav-link")
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      if (menuOpen) {
        menuBtn.classList.remove("open")
        navLinks.classList.remove("active")
        menuOpen = false
      }
    })
  })

  // Typewriter effect
  const typewriterText = document.getElementById("typewriter-text")
  const phrases = [
    "Software Engineer",
    "Problem Solver",
    "Java Developer",
    "Python Enthusiast",
    "Computer Science Student",
  ]
  let phraseIndex = 0
  let charIndex = 0
  let isDeleting = false
  let typingSpeed = 100

  function typeWriter() {
    const currentPhrase = phrases[phraseIndex]

    if (isDeleting) {
      // Remove a character
      typewriterText.textContent = currentPhrase.substring(0, charIndex - 1)
      charIndex--
      typingSpeed = 50
    } else {
      // Add a character
      typewriterText.textContent = currentPhrase.substring(0, charIndex + 1)
      charIndex++
      typingSpeed = 100
    }

    // If word is complete, start deleting after a pause
    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true
      typingSpeed = 1000 // Pause before deleting
    }

    // If deletion is complete, move to next word
    if (isDeleting && charIndex === 0) {
      isDeleting = false
      phraseIndex = (phraseIndex + 1) % phrases.length
      typingSpeed = 500 // Pause before typing next word
    }

    setTimeout(typeWriter, typingSpeed)
  }

  // Start the typewriter effect
  setTimeout(typeWriter, 1000)

  // Scroll Reveal Animation
  const revealSections = document.querySelectorAll(".reveal-section")

  function revealOnScroll() {
    revealSections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (sectionTop < windowHeight - 150) {
        section.classList.add("active")
      }
    })
  }

  // Initial check on page load
  revealOnScroll()

  // Check on scroll
  window.addEventListener("scroll", revealOnScroll)

  // Animate skill bars when they come into view
  const skillBars = document.querySelectorAll(".skill-progress")

  function animateSkillBars() {
    skillBars.forEach((bar) => {
      const barTop = bar.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (barTop < windowHeight - 50) {
        const progress = bar.getAttribute("data-progress")
        bar.style.width = progress + "%"
      }
    })
  }

  // Initial check on page load
  animateSkillBars()

  // Check on scroll
  window.addEventListener("scroll", animateSkillBars)

  // Project Modal
  const projectCards = document.querySelectorAll(".project-card")
  const modals = document.querySelectorAll(".modal")
  const closeButtons = document.querySelectorAll(".close-modal")

  projectCards.forEach((card) => {
    card.addEventListener("click", function () {
      const projectId = this.getAttribute("data-project")
      const modal = document.getElementById(projectId + "-modal")

      if (modal) {
        modal.style.display = "block"
        document.body.style.overflow = "hidden"
      }
    })
  })

  closeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const modal = this.closest(".modal")
      modal.style.display = "none"
      document.body.style.overflow = "auto"
    })
  })

  // Close modal when clicking outside of modal content
  modals.forEach((modal) => {
    modal.addEventListener("click", function (e) {
      if (e.target === this) {
        this.style.display = "none"
        document.body.style.overflow = "auto"
      }
    })
  })

  // Close modal with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      modals.forEach((modal) => {
        if (modal.style.display === "block") {
          modal.style.display = "none"
          document.body.style.overflow = "auto"
        }
      })
    }
  })

  // Image Carousel Functionality
  function initializeCarousels() {
    const carousels = document.querySelectorAll(".modal-image-carousel")

    carousels.forEach((carousel) => {
      const images = carousel.querySelectorAll(".carousel-image")
      const indicators = carousel.querySelectorAll(".indicator")
      const prevBtn = carousel.querySelector(".prev-btn")
      const nextBtn = carousel.querySelector(".next-btn")
      let currentSlide = 0

      // Only show navigation if there are multiple images
      if (images.length <= 1) {
        prevBtn.style.display = "none"
        nextBtn.style.display = "none"
        carousel.querySelector(".carousel-indicators").style.display = "none"
        return
      }

      function showSlide(index) {
        // Hide all images
        images.forEach((img) => img.classList.remove("active"))
        indicators.forEach((indicator) => indicator.classList.remove("active"))

        // Show current image
        images[index].classList.add("active")
        indicators[index].classList.add("active")

        currentSlide = index
      }

      function nextSlide() {
        const next = (currentSlide + 1) % images.length
        showSlide(next)
      }

      function prevSlide() {
        const prev = (currentSlide - 1 + images.length) % images.length
        showSlide(prev)
      }

      // Event listeners
      nextBtn.addEventListener("click", nextSlide)
      prevBtn.addEventListener("click", prevSlide)

      // Indicator clicks
      indicators.forEach((indicator, index) => {
        indicator.addEventListener("click", () => showSlide(index))
      })

      // Keyboard navigation
      document.addEventListener("keydown", (e) => {
        // Only work if modal is open
        const modal = carousel.closest(".modal")
        if (modal && modal.style.display === "block") {
          if (e.key === "ArrowLeft") {
            e.preventDefault()
            prevSlide()
          } else if (e.key === "ArrowRight") {
            e.preventDefault()
            nextSlide()
          }
        }
      })

      // Auto-slide (optional - uncomment to enable)
      // setInterval(nextSlide, 5000);
    })
  }

  // Initialize carousels when modals are opened
  projectCards.forEach((card) => {
    card.addEventListener("click", function () {
      const projectId = this.getAttribute("data-project")
      const modal = document.getElementById(projectId + "-modal")

      if (modal) {
        modal.style.display = "block"
        document.body.style.overflow = "hidden"

        // Initialize carousel for this modal
        setTimeout(() => {
          initializeCarousels()
        }, 100)
      }
    })
  })
})
