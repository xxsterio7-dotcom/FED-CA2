
      instrCards.forEach(function(card) {
        if (family === 'all' || card.getAttribute('data-family') === family) {
          card.classList.remove('mv-hidden');
        } else {
          card.classList.add('mv-hidden');
        }
      });
    });
  });

  // Interactive #2: click a card to open it in the lightbox
  function openLightbox(img, name, tag, bio) {
    document.getElementById('lightbox-img').src = img;
    document.getElementById('lightbox-img').alt = name;
    document.getElementById('lightbox-name').textContent = name;
    document.getElementById('lightbox-era').textContent = tag;
    document.getElementById('lightbox-bio').textContent = bio;
    document.getElementById('lightbox').classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox(event) {
    if (!event || event.target === document.getElementById('lightbox') || event.target.classList.contains('mv-lightbox-close')) {
      document.getElementById('lightbox').classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeLightbox();
  });

  // Interactive #3: expand a fact card to reveal more detail
  var factCards = document.querySelectorAll('.mv-fact-card');

  factCards.forEach(function(card) {
    card.addEventListener('click', function() {
      card.classList.toggle('mv-expanded');
    });
  });

