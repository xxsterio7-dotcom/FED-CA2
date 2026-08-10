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

/*World Map*/

const festivals = {
    tomorrowland: {
        image: "../assets/images/concert/tomorrowland2.jpg",
        year: "2005",
        name: "Tomorrowland",
        location: "Boom, Belgium",
        genre: "Electronic Dance Music (EDM)",
        date: "July",
        artists: "Martin Garrix, Dimitri Vegas & Like Mike, Armin van Buuren",
        trailer: "../assets/video/tomorrowland.mp4",
        website: "https://www.tomorrowland.com"
    },

    coachella: {
        image: "../assets/images/concert/coachella2.jpg",
        year: "1999",
        name: "Coachella",
        location: "California, USA",
        genre: "Pop, Rock, Hip-Hop",
        date: "April",
        artists: "Lady Gaga, Travis Scott, BLACKPINK",
        trailer: "../assets/video/coachella.mp4",
        website: "https://www.coachella.com"
    },

    ultra: {
        image: "../assets/images/concert/ultra2.jpg",
        year: "1999",
        name: "Ultra Music Festival",
        location: "Miami, USA",
        genre: "Electronic Dance Music",
        date: "March",
        artists: "Hardwell, Tiesto, David Guetta",
        trailer: "../assets/video/ultra.mp4",
        website: "https://ultramusicfestival.com"
    },

    woodstock: {
        image: "../assets/images/concert/woodstock2.png",
        year: "1969",
        name: "Woodstock",
        location: "New York, USA",
        genre: "Rock",
        date: "August 1969",
        artists: "Jimi Hendrix, Santana, Janis Joplin",
        trailer: "../assets/video/woodstock.mp4",
        website: "https://woodstock.com/"
    }
};


document.addEventListener("DOMContentLoaded", () => {

    const markers = document.querySelectorAll(".map__marker");

    const record = document.getElementById("record");

    const image = document.getElementById("recordImage");

    const year = document.getElementById("recordYear");

    const name = document.getElementById("recordName");

    const festivalLocation = document.getElementById("recordLocation");

    const genre = document.getElementById("recordGenre");

    const date = document.getElementById("recordDate");

    const artists = document.getElementById("recordArtists");

    const trailer = document.getElementById("recordTrailer");

    const videoSource = document.getElementById("recordVideoSource");

    const website = document.getElementById("recordWebsite");

    function loadFestival(id) {

        const fest = festivals[id];

        if (!fest) return;

        image.src = fest.image;
        image.alt = fest.name;

        year.textContent = fest.year;
        name.textContent = fest.name;

        festivalLocation.textContent = fest.location;
        genre.textContent = fest.genre;
        date.textContent = fest.date;
        artists.textContent = fest.artists;

        videoSource.src = fest.trailer;

console.log("Festival:", fest.name);
console.log("Video:", fest.trailer);
console.log("Video URL:", videoSource.src);
        trailer.load();
        website.href = fest.website;

        record.classList.remove("show");

        setTimeout(() => {
            record.classList.add("show");
        }, 100);
    }

markers.forEach(marker => {

    marker.addEventListener("click", () => {

        const isSameMarkerActive = marker.classList.contains("active");

        if (isSameMarkerActive) {
            // Clicked the same marker again → collapse the card
            marker.classList.remove("active");
            record.classList.remove("show");
            return;
        }

        markers.forEach(m => m.classList.remove("active"));
        marker.classList.add("active");

        loadFestival(marker.dataset.festival);

        record.classList.remove("show");

        setTimeout(() => {
            record.classList.add("show");

            record.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }, 100);

    });

});

});
/*Footer*/

const backToTop=document.getElementById("backToTop");

if(backToTop){

    backToTop.addEventListener("click",()=>{

        window.scrollTo({

            top:0,
            behavior:"smooth"

        });

    });

}



const footer=document.querySelector(".footer");

if(footer){

    const observer=new IntersectionObserver(entries=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                footer.classList.add("footer--show");

            }

        });

    },{

        threshold:.2

    });

    observer.observe(footer);

}


const logo=document.querySelector(".footer__logo");

if(logo){

    logo.addEventListener("mouseenter",()=>{

        logo.style.transform="rotate(-5deg) scale(1.05)";

    });

    logo.addEventListener("mouseleave",()=>{

        logo.style.transform="rotate(0deg) scale(1)";

    });

}

const year=document.getElementById("currentYear");

if(year){

    year.textContent=new Date().getFullYear();

}
