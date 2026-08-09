const navLinks = document.querySelectorAll(".navbar__link");

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        const dropdown = link.nextElementSibling;

        document.querySelectorAll(".navbar__dropdown").forEach(menu => {
            if(menu !== dropdown){
                menu.classList.remove("show");
            }
        });

        dropdown.classList.toggle("show");
    });
});

document.addEventListener("click", (e) => {
    if(!e.target.closest(".navbar__item")){
        document.querySelectorAll(".navbar__dropdown").forEach(menu => {
            menu.classList.remove("show");
        });
    }
});


const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

if(navToggle && navMenu){

    navToggle.addEventListener("click", () => {
        const isOpen = navMenu.classList.toggle("open");
        navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

}


const backToTop = document.getElementById("backToTop");

if(backToTop){
    backToTop.addEventListener("click", () => {
        window.scrollTo({ top:0, behavior:"smooth" });
    });
}

const footer = document.querySelector(".footer");

if(footer){

    const footerObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                footer.classList.add("footer--show");
            }
        });
    }, { threshold:.2 });

    footerObserver.observe(footer);

}

const footerLogo = document.querySelector(".footer__logo");

if(footerLogo){

    footerLogo.addEventListener("mouseenter", () => {
        footerLogo.style.transform = "rotate(-5deg) scale(1.05)";
    });

    footerLogo.addEventListener("mouseleave", () => {
        footerLogo.style.transform = "rotate(0deg) scale(1)";
    });

}


const albumDetails = {

    "Abbey Road": {
        blurb:"The Beatles' final studio recording together, famous for its continuous second-side medley and the iconic zebra-crossing cover.",
        tracklist:["Come Together","Something","Maxwell's Silver Hammer","Oh! Darling","Here Comes the Sun","Because","You Never Give Me Your Money","Golden Slumbers","The End"]
    },

    "The Dark Side of the Moon": {
        blurb:"A concept album exploring conflict, time and mental health, built around seamless transitions and pioneering studio effects.",
        tracklist:["Speak to Me","Breathe","Time","The Great Gig in the Sky","Money","Us and Them","Brain Damage","Eclipse"]
    },

    "Rumours": {
        blurb:"Written amid the band's own breakups, this record turned personal turmoil into some of the most enduring pop-rock songs ever recorded.",
        tracklist:["Second Hand News","Dreams","Never Going Back Again","Don't Stop","Go Your Own Way","The Chain","You Make Loving Fun"]
    },

    "Thriller": {
        blurb:"The best-selling album of all time, blending pop, funk and rock into a run of singles that redefined the music video format.",
        tracklist:["Wanna Be Startin' Somethin'","Billie Jean","Thriller","Beat It","Human Nature","P.Y.T. (Pretty Young Thing)"]
    },

    "Nevermind": {
        blurb:"The record that pushed grunge into the mainstream, pairing raw guitar energy with unexpectedly polished pop songwriting.",
        tracklist:["Smells Like Teen Spirit","In Bloom","Come as You Are","Lithium","Polly","Territorial Pissings"]
    },

    "Back to Black": {
        blurb:"A soul and Motown-inspired record built on heartbreak, delivered in one of the most distinctive voices of its generation.",
        tracklist:["Rehab","You Know I'm No Good","Me & Mr Jones","Back to Black","Love Is a Losing Game","Tears Dry on Their Own"]
    },

    "Random Access Memories": {
        blurb:"A love letter to live instrumentation and 70s/80s studio craft, made by two robots obsessed with disco and orchestration.",
        tracklist:["Give Life Back to Music","Instant Crush","Lose Yourself to Dance","Get Lucky","Doin' It Right"]
    },

    "good kid, m.A.A.d city": {
        blurb:"A cinematic coming-of-age concept album set in Compton, told as a single night unravelling into a wider reflection on the city.",
        tracklist:["Sherane a.k.a Master Splinter's Daughter","Bitch, Don't Kill My Vibe","Backseat Freestyle","Swimming Pools (Drank)","m.A.A.d city","Compton"]
    },

    "21": {
        blurb:"A breakup album that became a global phenomenon, powered by a voice built for both quiet ballads and full-throated choruses.",
        tracklist:["Rolling in the Deep","Rumour Has It","Turning Tables","Don't You Remember","Set Fire to the Rain","Someone Like You"]
    },

    "Discovery": {
        blurb:"A shift from underground house into shimmering, sample-heavy disco-pop that would go on to influence a generation of producers.",
        tracklist:["One More Time","Aerodynamic","Digital Love","Harder, Better, Faster, Stronger","Something About Us"]
    },
    "After Hours":{
        blurb:"A dark and atmospheric blend of R&B, pop and 80s-inspired synths, exploring heartbreak, loneliness and excess.",
        tracklist:["Blinding Light","Save Your Tears","After Hours","In Your Eyes","Heartless","Faith","Too Late"]
    },
    "SOS":{
        blurb:"A genre-blending R&B album exploring love, heartbreak, self-discovery and complicated relationships.",
        tracklist:["Kill Bill","Snooze","Nobody Gets Me","Shirt","I Hate You","Good Days","Blind"]
    },
    "Freudian":{
        blurb:"A soulful R&B album exploring love, relationships, vulnerability and the complexities of growing up.",
        tracklist:["Get You","Best Part","Japanese Denim","We Find Love","Blessed","Hold Me Down","Freudian"]
    }

};


const albumsGrid = document.getElementById("albumsGrid");
const albumCards = Array.from(document.querySelectorAll(".album-card"));
const albumsEmpty = document.getElementById("albumsEmpty");
const searchInput = document.getElementById("albumsSearch");
const genreButtons = document.querySelectorAll(".albums-genre");
const decadeSelect = document.getElementById("decadeSelect");
const sortSelect = document.getElementById("sortSelect");
const picksToggle = document.getElementById("picksToggle");
const picksCount = document.getElementById("picksCount");

const trackRows = Array.from(document.querySelectorAll("#tracksTable tbody tr"));

let activeGenre = "all";
let activeDecade = "all";
let showPicksOnly = false;
const favorites = new Set();

function matchesSearch(text, query){
    return text.toLowerCase().includes(query);
}

function applyAlbumFilters(){

    const query = searchInput.value.trim().toLowerCase();
    let visibleCount = 0;

    albumCards.forEach(card => {

        const title = card.dataset.title;
        const artist = card.dataset.artist;
        const genre = card.dataset.genre;
        const decade = card.dataset.decade;

        const genreMatch = activeGenre === "all" || genre === activeGenre;
        const decadeMatch = activeDecade === "all" || decade === activeDecade;
        const searchMatch = !query || matchesSearch(title, query) || matchesSearch(artist, query);
        const picksMatch = !showPicksOnly || favorites.has(title);

        const visible = genreMatch && decadeMatch && searchMatch && picksMatch;

        card.classList.toggle("hide", !visible);

        if(visible) visibleCount++;

    });

    albumsEmpty.hidden = visibleCount !== 0;

    trackRows.forEach(row => {
        const title = row.dataset.title.toLowerCase();
        const artist = row.dataset.artist.toLowerCase();
        const match = !query || title.includes(query) || artist.includes(query);
        row.classList.toggle("hide", !match);
    });

}

function applySort(){

    const value = sortSelect.value;
    const cards = Array.from(albumsGrid.querySelectorAll(".album-card"));

    cards.sort((a, b) => {

        if(value === "newest"){
            return Number(b.dataset.year) - Number(a.dataset.year);
        }

        if(value === "oldest"){
            return Number(a.dataset.year) - Number(b.dataset.year);
        }

        if(value === "az"){
            return a.dataset.title.localeCompare(b.dataset.title);
        }

    
        return Number(a.querySelector(".album-card__rank").textContent) -
               Number(b.querySelector(".album-card__rank").textContent);

    });

    cards.forEach(card => albumsGrid.appendChild(card));

}

searchInput.addEventListener("input", applyAlbumFilters);

genreButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        genreButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        activeGenre = btn.dataset.genre;
        applyAlbumFilters();
    });
});

decadeSelect.addEventListener("change", () => {
    activeDecade = decadeSelect.value;
    applyAlbumFilters();
});

sortSelect.addEventListener("change", applySort);


albumCards.forEach(card => {

    const favBtn = card.querySelector(".album-card__fav");

    favBtn.addEventListener("click", (e) => {
        e.stopPropagation();

        const title = card.dataset.title;

        if(favorites.has(title)){
            favorites.delete(title);
            favBtn.classList.remove("active");
        }else{
            favorites.add(title);
            favBtn.classList.add("active");
        }

        picksCount.textContent = favorites.size;

        if(showPicksOnly) applyAlbumFilters();

    });

});

picksToggle.addEventListener("click", () => {
    showPicksOnly = !showPicksOnly;
    picksToggle.classList.toggle("active", showPicksOnly);
    applyAlbumFilters();
});



const albumModal = document.getElementById("albumModal");
const albumModalClose = document.getElementById("albumModalClose");
const modalCover = document.getElementById("modalCover");
const modalInitials = document.getElementById("modalInitials");
const modalGenre = document.getElementById("modalGenre");
const modalTitle = document.getElementById("modalTitle");
const modalArtist = document.getElementById("modalArtist");
const modalBlurb = document.getElementById("modalBlurb");
const modalAccordionBtn = document.getElementById("modalAccordionBtn");
const modalTracklist = document.getElementById("modalTracklist");

function openAlbumModal(card){

    const title = card.dataset.title;
    const artist = card.dataset.artist;
    const year = card.dataset.year;
    const genreLabel = card.querySelector(".album-card__tag") ? card.querySelector(".album-card__tag").textContent : "";
    
    const cardImg = card.querySelector("img");
    
    const initialsEl = card.querySelector(".album-card__initials");
    const initials = initialsEl ? initialsEl.textContent : "";
    
    const coverEl = card.querySelector(".album-card__cover");
    const hue = coverEl ? coverEl.dataset.hue : "";

    const details = albumDetails[title] || { blurb:"", tracklist:[] };

    let modalImg = modalCover.querySelector("img");
    if (!modalImg) {
        modalImg = document.createElement("img");
        modalCover.appendChild(modalImg);
    }

    if (cardImg && cardImg.src) {
        modalImg.src = cardImg.src;
        modalImg.alt = cardImg.alt || title;
        modalImg.style.display = "block";
        if (modalInitials) modalInitials.style.display = "none";
    } else {
        modalImg.style.display = "none";
        modalImg.src = "";
        if (modalInitials) {
            modalInitials.style.display = "block";
            modalInitials.textContent = initials;
        }
    }

    if (hue) modalCover.dataset.hue = hue;
    modalGenre.textContent = genreLabel;
    modalTitle.textContent = title;
    modalArtist.textContent = `${artist} · ${year}`;
    modalBlurb.textContent = details.blurb;

    modalTracklist.innerHTML = "";
    details.tracklist.forEach(track => {
        const li = document.createElement("li");
        li.textContent = track;
        modalTracklist.appendChild(li);
    });

    modalTracklist.classList.remove("open");
    modalAccordionBtn.classList.remove("open");
    modalAccordionBtn.setAttribute("aria-expanded", "false");

    albumModal.classList.add("show");

}

albumCards.forEach(card => {
    card.querySelector(".album-card__view").addEventListener("click", () => openAlbumModal(card));
});

function closeAlbumModal(){
    albumModal.classList.remove("show");
}

albumModalClose.addEventListener("click", closeAlbumModal);

albumModal.addEventListener("click", (e) => {
    if(e.target === albumModal) closeAlbumModal();
});

document.addEventListener("keydown", (e) => {
    if(e.key === "Escape" && albumModal.classList.contains("show")){
        closeAlbumModal();
    }
});

modalAccordionBtn.addEventListener("click", () => {
    const isOpen = modalTracklist.classList.toggle("open");
    modalAccordionBtn.classList.toggle("open", isOpen);
    modalAccordionBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
});


const tracksTableBody = document.querySelector("#tracksTable tbody");
const sortableHeaders = document.querySelectorAll("#tracksTable th[data-sort]");

let currentSortKey = null;
let currentSortAsc = true;

sortableHeaders.forEach(header => {

    header.addEventListener("click", () => {

        const key = header.dataset.sort;

        if(currentSortKey === key){
            currentSortAsc = !currentSortAsc;
        }else{
            currentSortKey = key;
            currentSortAsc = true;
        }

        sortableHeaders.forEach(h => {
            h.querySelector("i").className = "fa-solid fa-sort";
        });

        header.querySelector("i").className = currentSortAsc
            ? "fa-solid fa-sort-up"
            : "fa-solid fa-sort-down";

        const rows = Array.from(tracksTableBody.querySelectorAll("tr"));

        rows.sort((a, b) => {

            let valA = a.dataset[key];
            let valB = b.dataset[key];

            if(key === "year"){
                valA = Number(valA);
                valB = Number(valB);
                return currentSortAsc ? valA - valB : valB - valA;
            }

            return currentSortAsc
                ? valA.localeCompare(valB)
                : valB.localeCompare(valA);

        });

        rows.forEach(row => tracksTableBody.appendChild(row));

    });

});


applyAlbumFilters();

const featuredLinks = document.querySelectorAll(".featured__link");

featuredLinks.forEach(link => {

    link.addEventListener("click", (e) => {
        e.preventDefault();

        const card = link.closest(".featured__card");
        const targetTitle = card ? card.dataset.album : null;
        const targetCard = albumCards.find(c => c.dataset.title === targetTitle);

        if(targetCard){
            openAlbumModal(targetCard);
        }else{
            console.warn(`Featured Record: no album card found matching "${targetTitle}". Check that data-album on the .featured__card matches a data-title on an .album-card exactly.`);
        }

    });

});
