// HEADER CHANGE ANCHOR(element) BORDER EFFECT
const sections = document.querySelectorAll(".section");
const navLinks = document.querySelectorAll(".nav a");

navLinks.forEach((a) => {
  a.addEventListener("click", () => {
    navLinks.forEach((aNotActive) =>
      aNotActive.parentElement.classList.remove("active")
    );

    a.parentElement.classList.add("active");

    if (mobileMenuIsActive) {
      navMenu.classList.remove("active");
      mobileMenuIsActive = false;
    }
  });
});

// WHEN SCROLL SECTION, CHANGE AMCHOR(element) BORDER
window.addEventListener(
  "scroll",
  _.debounce(() => {
    let currentSection = "#home";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (pageYOffset + 100 >= sectionTop) {
        currentSection = "#" + section.getAttribute("id");
      }
    });

    navLinks.forEach((a) => {
      a.parentElement.classList.remove("active");
      if (currentSection == a.getAttribute("href")) {
        a.parentElement.classList.add("active");
      }
    });
  }, 150)
);

// CHANGE HEADER STYLE AFTER SCROLL HOME SECTION
const header = document.querySelector(".header");
const secondSection = document.querySelector("#about-us");
const logoImage = document.querySelector(".header .logo img");

window.addEventListener(
  "scroll",
  _.throttle(() => {
    if (pageYOffset >= secondSection.offsetTop - header.clientHeight) {
      header.classList.remove("scroll");
      logoImage.setAttribute("src", "./images/icon/logo-minima-black.svg");
    } else {
      header.classList.add("scroll");
      logoImage.setAttribute("src", "./images/icon/logo-minima-white.svg");
    }
  }, 250)
);

// SMOOTH SCROLL JS
const allScrollElements = document.querySelectorAll(
  ".nav a, .header a.btn.contact, .about-us a"
);
const container = document.querySelector("html");

allScrollElements.forEach((linkElement) => {
  linkElement.addEventListener("click", (e) => {
    e.preventDefault();
    let sectionId = linkElement.getAttribute("href");
    let section = document.querySelector(sectionId);
    let sectionTopHeight = section.offsetTop;

    container.scrollTo({
      top: sectionTopHeight,
      behavior: "smooth",
    });
  });
});
const logo = document.querySelector(".header .logo");
logo.addEventListener("click", (e) => {
  e.preventDefault();
  container.scrollTo({ top: 0, behavior: "smooth" });
});

// INPUT FOCUS EFFECT
const formContact = document.querySelectorAll(".contact-text form input");
formContact.forEach((input) => {
  input.addEventListener("focus", function labelEffect(event) {
    let input = event.target;
    let label = input.previousElementSibling;
    label.classList.add("active");
  });

  input.addEventListener("focusout", function labelEffect(event) {
    let input = event.target;
    let label = input.previousElementSibling;
    label.classList.remove("active");
  });
});

// SCROLL REVEAL JS
const scrollReveal = ScrollReveal({
  origin: "left",
  distance: "30px",
  duration: 1000,
});

scrollReveal.reveal(
  `
    #home .hero-text, #home .hero-image,
    #services .service-text, #services .service-image,
    #contact .contact-text, #contact .contact-image
    `,
  { interval: 100 }
);

scrollReveal.reveal(
  `
    #about-us .about-text, #about-us .about-image
    `,
  { interval: 100, origin: "right" }
);

scrollReveal.reveal(
  `
    #testimonial,
    #our-team,
    #success-story .story-image
    `,
  { interval: 100, origin: "bottom" }
);

// Testimonials Slider / Carousel
const swiper = new Swiper(".swiper-container", {
  allowTouchMove: true,
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    1200: {
      allowTouchMove: false,
    },
  },
});

// Count up Script (used in story section)
// thanks to https://stackoverflow.com/questions/50245161/simple-javascript-counter-without-using-jquery-or-other-frameworks
function countUpAnimation(el, time) {
  let start;
  const final = parseInt(el.textContent, 10);
  const duration = time; // duration in ms
  const step = (ts) => {
    if (!start) {
      start = ts;
    }

    // get the time passed as a fraction of total duration
    let progress = (ts - start) / duration;

    el.textContent = Math.floor(progress * final); // set the text
    if (progress < 1) {
      //if we're not 100% complete, request another animation frame
      requestAnimationFrame(step);
    }

    if (el.textContent > final) {
      el.textContent = final;
    }
  };

  requestAnimationFrame(step);
}

// active count up animation after reveal section story text
const storyNumbers = document.querySelectorAll(".milestones div h1");

scrollReveal.reveal(`#success-story .story-text`, {
  interval: 100,
  origin: "bottom",
  beforeReveal: () => {
    storyNumbers.forEach((numberElement) =>
      countUpAnimation(numberElement, 2500)
    );
  },
});

// Mobile menu
const menuButton = document.querySelector(".icon-menu");
const navMenu = document.querySelector(".nav");
let mobileMenuIsActive = false;

menuButton.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  mobileMenuIsActive = !mobileMenuIsActive;
});
