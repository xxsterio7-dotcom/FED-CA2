const benefitsCards = document.querySelectorAll(".benefitsCard");

benefitsCards.forEach(function(card) { //Loops through all 4 cards
    card.addEventListener("mouseenter", function() { //Flip when hover
        card.classList.add("flipped");
    });

    card.addEventListener("mouseleave", function() { //Remove flip effect when cursor leaves
        card.classList.remove("flipped");
    });
});


const yearBadge = document.getElementById('active-year');
const titleHeading = document.getElementById('active-title');
const descParagraph = document.getElementById('active-desc');
const textContainer = document.querySelector('.sticky-text');

const steps = document.querySelectorAll('.media-step');

const observerOptions = {
  root: null,
  rootMargin: '-40% 0px -40% 0px',
  threshold: 0
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      steps.forEach(s => s.classList.remove('active'));
      entry.target.classList.add('active');

      const newYear = entry.target.getAttribute('data-year');
      const newTitle = entry.target.getAttribute('data-title');
      const newDesc = entry.target.getAttribute('data-desc');

      if (yearBadge.textContent !== newYear) {
        textContainer.style.opacity = '0';
        
        setTimeout(() => {
          yearBadge.textContent = newYear;
          titleHeading.textContent = newTitle;
          descParagraph.textContent = newDesc;
          textContainer.style.opacity = '1';
        }, 200);
      }
    }
  });
}, observerOptions);

steps.forEach(step => observer.observe(step));
