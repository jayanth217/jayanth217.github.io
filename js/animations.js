// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Scroll to section with smooth animation
  const scrollToSection = (sectionId) => {
    const section = document.querySelector(sectionId)
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: "smooth",
      })
    }
  }

  // Add click event listeners to all links with hash
  const links = document.querySelectorAll('a[href^="#"]')
  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const href = this.getAttribute("href")
      scrollToSection(href)
    })
  })

  // Animate elements when they come into view
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(".animate-on-scroll")

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (elementPosition < windowHeight - 100) {
        const animation = element.dataset.animation || "fadeIn"
        element.style.animation = `${animation} 1s forwards`
      }
    })
  }

  // Initial check on page load
  animateOnScroll()

  // Check on scroll
  window.addEventListener("scroll", animateOnScroll)

  // Parallax effect for background elements
  const parallaxElements = document.querySelectorAll(".parallax")

  const parallaxEffect = () => {
    parallaxElements.forEach((element) => {
      const speed = element.dataset.speed || 0.5
      const yPos = -(window.scrollY * speed)
      element.style.transform = `translateY(${yPos}px)`
    })
  }

  // Initial check on page load
  parallaxEffect()

  // Check on scroll
  window.addEventListener("scroll", parallaxEffect)

  // Animate counter numbers
  const animateCounters = () => {
    const counters = document.querySelectorAll(".counter")

    counters.forEach((counter) => {
      const target = Number.parseInt(counter.dataset.target)
      const count = Number.parseInt(counter.innerText)
      const increment = target / 100

      if (count < target) {
        counter.innerText = Math.ceil(count + increment)
        setTimeout(animateCounters, 10)
      } else {
        counter.innerText = target
      }
    })
  }

  // Animate elements on hover
  const hoverElements = document.querySelectorAll(".hover-animate")

  hoverElements.forEach((element) => {
    element.addEventListener("mouseenter", function () {
      const animation = this.dataset.hoverAnimation || "pulse"
      this.style.animation = `${animation} 1s infinite`
    })

    element.addEventListener("mouseleave", function () {
      this.style.animation = ""
    })
  })

  // Add active class to nav links on scroll
  const sections = document.querySelectorAll("section")
  const navLinks = document.querySelectorAll(".nav-link")

  const highlightNavOnScroll = () => {
    let current = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100
      const sectionHeight = section.clientHeight

      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active")
      }
    })
  }

  // Check on scroll
  window.addEventListener("scroll", highlightNavOnScroll)

  // Back to top button
  const backToTopButton = document.querySelector(".back-to-top")

  if (backToTopButton) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTopButton.classList.add("show")
      } else {
        backToTopButton.classList.remove("show")
      }
    })

    backToTopButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }

  // Preloader animation
  const preloader = document.querySelector(".preloader")

  if (preloader) {
    window.addEventListener("load", () => {
      preloader.classList.add("fade-out")
      setTimeout(() => {
        preloader.style.display = "none"
      }, 1000)
    })
  }
})
