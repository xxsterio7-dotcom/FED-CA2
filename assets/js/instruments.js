

document.addEventListener('DOMContentLoaded', function () {

  
    const instrCards = document.querySelectorAll('#mvInstrGrid .mv-instr-card');
    const filterButtons = document.querySelectorAll('.mv-family-filter-btn');

    filterButtons.forEach(function (button) {

        button.addEventListener('click', function () {

            const family = button.getAttribute('data-family');

            
            filterButtons.forEach(function (btn) {
                btn.classList.remove('active');
            });

            
            button.classList.add('active');

            
            instrCards.forEach(function (card) {

                if (
                    family === 'all' ||
                    card.getAttribute('data-family') === family
                ) {
                    card.classList.remove('mv-hidden');
                } else {
                    card.classList.add('mv-hidden');
                }

            });

        });

    });


   

    const factCards = document.querySelectorAll('.mv-fact-card');

    factCards.forEach(function (card) {

        card.addEventListener('click', function () {

            card.classList.toggle('mv-expanded');

        });

    });

});



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

    const lightbox = document.getElementById('lightbox');

    // If there is no event, close it
    if (!event) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        return;
    }

  
    if (
        event.target === lightbox ||
        event.target.classList.contains('mv-lightbox-close')
    ) {

        lightbox.classList.remove('active');

        document.body.style.overflow = '';
    }

}



document.addEventListener('keydown', function (event) {

    if (event.key === 'Escape') {
        closeLightbox();
    }

});
