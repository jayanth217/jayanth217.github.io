// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: "smooth",
        })
      }
    })
  })

  // Add active class to current navigation link
  const currentPage = window.location.pathname.split("/").pop()
  const navLinks = document.querySelectorAll(".nav-link")

  navLinks.forEach((link) => {
    const linkHref = link.getAttribute("href").split("/").pop()
    if (currentPage === linkHref || (currentPage === "" && linkHref === "index.html")) {
      link.classList.add("active")
    }
  })

  // Add animation to section cards on scroll
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate")
        }
      })
    },
    { threshold: 0.1 },
  )

  document.querySelectorAll(".content-card").forEach((card) => {
    observer.observe(card)
    // Add animation class for CSS transitions
    card.classList.add("fade-in")
  })

  // Create animated background elements
  createBackgroundElements()
})

// Function to create animated background elements
function createBackgroundElements() {
  const backgroundAnimation = document.querySelector(".background-animation")
  const numElements = 20

  for (let i = 0; i < numElements; i++) {
    const element = document.createElement("div")
    element.classList.add("bg-element")

    // Random properties
    const size = Math.random() * 50 + 10
    const posX = Math.random() * 100
    const posY = Math.random() * 100
    const duration = Math.random() * 20 + 10
    const delay = Math.random() * 5

    // Apply styles
    element.style.width = `${size}px`
    element.style.height = `${size}px`
    element.style.left = `${posX}%`
    element.style.top = `${posY}%`
    element.style.animationDuration = `${duration}s`
    element.style.animationDelay = `${delay}s`
    element.style.opacity = Math.random() * 0.3
    element.style.backgroundColor = "#6c63ff"
    element.style.borderRadius = "50%"
    element.style.position = "absolute"
    element.style.filter = "blur(8px)"
    element.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`

    backgroundAnimation.appendChild(element)
  }
}

// Add floating animation
const style = document.createElement("style")
style.textContent = `
@keyframes float {
    0% {
        transform: translateY(0) translateX(0);
    }
    50% {
        transform: translateY(-20px) translateX(10px);
    }
    100% {
        transform: translateY(0) translateX(0);
    }
}

.fade-in {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
}

.fade-in.animate {
    opacity: 1;
    transform: translateY(0);
}
`
document.head.appendChild(style)
