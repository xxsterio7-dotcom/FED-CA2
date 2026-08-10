 function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}
var carousel = new bootstrap.Carousel(document.getElementById('mvYearCarousel'), {
    interval: 4000,
    wrap: true,
    ride: 'carousel'
  });
 
  var instrumentCarouselEl = document.getElementById('mvInstrumentCarousel');
  var instrumentCarousel = new bootstrap.Carousel(instrumentCarouselEl, {
    interval: 7000,
    wrap: true,
    ride: 'carousel'
  });
 
  // Evolution-of-Sound buttons jump the instrument carousel to that slide
  var evolutionItems = document.querySelectorAll('.mv-evolution-item');
 
  evolutionItems.forEach(function(item) {
    item.addEventListener('click', function() {
      var index = parseInt(item.getAttribute('data-instrument-slide'), 10);
      instrumentCarousel.to(index);
    });
  });
 
  // Keep the clicked/current instrument highlighted as the carousel advances
  instrumentCarouselEl.addEventListener('slide.bs.carousel', function(e) {
    evolutionItems.forEach(function(item) {
      item.classList.remove('active');
    });
    evolutionItems[e.to].classList.add('active');
  });
 
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

 var touchStartX = 0;
  var touchEndX = 0;
  var carouselEl = document.getElementById('mvYearCarousel');
 
  // Array of objects: each swipe direction paired with its action
  var swipes = [
    { check: function(d) { return d > 50; }, action: function() { carousel.next(); } },
    { check: function(d) { return d < -50; }, action: function() { carousel.prev(); } }
  ];
 
  carouselEl.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
  });
 
  carouselEl.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    var diff = touchStartX - touchEndX;
 
    for (var i = 0; i < swipes.length; i++) {
      if (swipes[i].check(diff)) swipes[i].action();
    }
  });
