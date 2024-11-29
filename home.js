const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
});

const slides = document.querySelectorAll('.slide');
let currentIndex = 0;

function showNextSlide() {
  slides[currentIndex].classList.remove('active');
  currentIndex = (currentIndex + 1) % slides.length;
  slides[currentIndex].classList.add('active');
}

// Auto-play every 3 seconds
setInterval(showNextSlide, 3000);

const seasons = document.querySelectorAll(".season");
const seasonButtons = document.querySelectorAll(".filter-button");

seasonButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.season;
    seasons.forEach((season) => {
      season.style.display = season.id === target || target === "all" ? "block" : "none";
    });
  });
});


// Select all elements with the "slide-in" class
const slideInElements = document.querySelectorAll('.slide-in');

// Create an IntersectionObserver
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Add the "visible" class when the element enters the viewport
      entry.target.classList.add('visible');
      // Stop observing the element after it has been animated
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 }); // Trigger when 10% of the element is visible

// Observe each slide-in element
slideInElements.forEach(element => {
  observer.observe(element);
});


const destSlides = document.querySelectorAll('.dest-slide');
const destIndicators = document.querySelectorAll('.dest-indicator');
const destLeftBtn = document.querySelector('.dest-left-btn');
const destRightBtn = document.querySelector('.dest-right-btn');
let destCurrentSlide = 0;

const updateDestSlider = () => {
  // Update slides
  destSlides.forEach((slide, index) => {
    slide.classList.toggle('dest-active', index === destCurrentSlide);
    slide.style.transform = `translateX(-${destCurrentSlide * 100}%)`;
  });

  // Update indicators
  destIndicators.forEach((indicator, index) => {
    indicator.classList.toggle('dest-active', index === destCurrentSlide);
  });
};

const nextDestSlide = () => {
  destCurrentSlide = (destCurrentSlide + 1) % destSlides.length;
  updateDestSlider();
};

const prevDestSlide = () => {
  destCurrentSlide = (destCurrentSlide - 1 + destSlides.length) % destSlides.length;
  updateDestSlider();
};

destRightBtn.addEventListener('click', nextDestSlide);
destLeftBtn.addEventListener('click', prevDestSlide);

destIndicators.forEach((indicator, index) => {
  indicator.addEventListener('click', () => {
    destCurrentSlide = index;
    updateDestSlider();
  });
});

// Auto-play
setInterval(nextDestSlide, 3000);
