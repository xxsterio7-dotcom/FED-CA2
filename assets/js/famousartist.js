  function openLightbox(img, name, era, bio, songs) {
    document.getElementById('lightbox-img').src = img;
    document.getElementById('lightbox-name').textContent = name;
    document.getElementById('lightbox-era').textContent = era;
    document.getElementById('lightbox-bio').textContent = bio;
    document.getElementById('lightbox-songs').textContent = songs;
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
