// ==========================================
// INTERACTIVE #1: FILTER INSTRUMENT CARDS
// ==========================================

document.addEventListener('DOMContentLoaded', function () {

    const instrCards = document.querySelectorAll('.mv-instr-card');
    const filterButtons = document.querySelectorAll('.mv-family-filter-btn');

    filterButtons.forEach(function (button) {

        button.addEventListener('click', function () {

            const family = button.getAttribute('data-family');

            // Remove active from all buttons
            filterButtons.forEach(function (btn) {
                btn.classList.remove('active');
            });

            // Add active to clicked button
            button.classList.add('active');

            // Filter cards
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


    // ==========================================
    // INTERACTIVE #3: EXPAND FACT CARDS
    // ==========================================

    const factCards = document.querySelectorAll('.mv-fact-card');

    factCards.forEach(function (card) {

        card.addEventListener('click', function () {

            card.classList.toggle('mv-expanded');

        });

    });

});


// ==========================================
// INTERACTIVE #2: LIGHTBOX
// These MUST be outside DOMContentLoaded
// because your HTML uses onclick="openLightbox(...)"
// ==========================================

function openLightbox(img, name, tag, bio) {

    document.getElementById('lightbox-img').src = img;

    document.getElementById('lightbox-img').alt = name;

    document.getElementById('lightbox-name').textContent = name;

    document.getElementById('lightbox-era').textContent = tag;

    document.getElementById('lightbox-bio').textContent = bio;

    document.getElementById('lightbox').classList.add('active');

    document.body.style.overflow = 'hidden';
}


// ==========================================
// CLOSE LIGHTBOX
// ==========================================

function closeLightbox(event) {

    const lightbox = document.getElementById('lightbox');

    // If there is no event, close it
    if (!event) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        return;
    }

    // Only close when clicking the dark background
    // or the X button
    if (
        event.target === lightbox ||
        event.target.classList.contains('mv-lightbox-close')
    ) {

        lightbox.classList.remove('active');

        document.body.style.overflow = '';
    }

}


// ==========================================
// CLOSE LIGHTBOX WITH ESCAPE
// ==========================================

document.addEventListener('keydown', function (event) {

    if (event.key === 'Escape') {
        closeLightbox();
    }

});
