function initMoodSelector() {
    const moodButtons = document.querySelectorAll(".mood-button");
    const moodTitle = document.getElementById("moodTitle");
    const moodGenre = document.getElementById("moodGenre");
    const moodDescription = document.getElementById("moodDescription");

    if (!moodTitle || !moodGenre || !moodDescription) return;

    moodButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            const mood = button.dataset.mood;

            if (mood === "happy") {
                moodTitle.textContent = "Happy? ☀️";
                moodGenre.textContent = "Pop";
                moodDescription.textContent = "Positive energy, and vibes all around!";
            } else if (mood === "sad") {
                moodTitle.textContent = "Sad? 🌧️";
                moodGenre.textContent = "Emo";
                moodDescription.textContent = "Sad? Express your emotions in this genre!";
            } else if (mood === "energetic") {
                moodTitle.textContent = "Energetic? ⚡";
                moodGenre.textContent = "Rock";
                moodDescription.textContent = "Powerful guitar riffs & beautiful emotions!";
            } else if (mood === "relaxed") {
                moodTitle.textContent = "Relaxed? 🌙";
                moodGenre.textContent = "Lo-Fi";
                moodDescription.textContent = "Soft & mellow textures, relax dude!";
            } else if (mood === "angry") {
                moodTitle.textContent = "Angry? 🔥";
                moodGenre.textContent = "Heavy Metal";
                moodDescription.textContent = "Intense drums, powerful bass, MAKE IT ROCK!";
            } else if (mood === "nostalgic") {
                moodTitle.textContent = "Nostalgic? 📻";
                moodGenre.textContent = "Synthwave";
                moodDescription.textContent = "Retro synthesizers and cinematic music, enjoy!";
            } else if (mood === "focused") {
                moodTitle.textContent = "Focused? 🎧";
                moodGenre.textContent = "Ambient";
                moodDescription.textContent = "Atomospheric sounds, making you feel the vibes!";
            }

            const currentActive = document.querySelector(".mood-button.active");
            if (currentActive) {
                currentActive.classList.remove("active");
            }
            button.classList.add("active");
        });
    });
}

function initScrollObserver() {
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll(".scroll-animate").forEach(function (el) {
        observer.observe(el);
    });
}

function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' 
        });
    }


document.addEventListener("DOMContentLoaded", () => {
    initMoodSelector();
});

document.addEventListener("DOMContentLoaded", function() { initMoodSelector();  initScrollObserver(); });