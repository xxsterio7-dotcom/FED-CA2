document.addEventListener("DOMContentLoaded", function () {
    initScrollObserver();
    initAudioPlayers();
});

//scroll
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

//audio
function initAudioPlayers() {
    var heroAudio = document.getElementById("heroAudioTrack");
    var heroPlayBtn = document.getElementById("heroPlayBtn");
    var heroVinyl = document.getElementById("heroVinyl");

    var audioButton = document.getElementById("audioButton");
    var myAudioTrack = document.getElementById("myAudioTrack");

    if (heroVinyl) {
        heroVinyl.style.animationPlayState = "paused";
    }

    function pauseHeroTrack() {
        if (heroAudio) {
            heroAudio.pause();
        }
        if (heroPlayBtn) {
            heroPlayBtn.innerHTML = "▶ Listen Now";
        }
        if (heroVinyl) {
            heroVinyl.style.animationPlayState = "paused";
        }
    }

    function pauseBottomTrack() {
        if (myAudioTrack) {
            myAudioTrack.pause();
        }
        if (audioButton) {
            audioButton.textContent = "▶ Play Sound";
        }
    }

    //audio
    if (heroPlayBtn && heroAudio) {
        heroPlayBtn.addEventListener("click", function () {
            if (heroAudio.paused) {
                pauseBottomTrack();
                heroAudio.play().then(function () {
                    heroPlayBtn.innerHTML = "⏸ Pause Track";
                    if (heroVinyl) {
                        heroVinyl.style.animationPlayState = "running";
                    }
                }).catch(function (err) {
                    console.error("Hero track error:", err);
                });
            } else {
                pauseHeroTrack();
            }
        });

        heroAudio.addEventListener("ended", pauseHeroTrack);
    }

    //audio
    if (audioButton && myAudioTrack) {
        audioButton.addEventListener("click", function (e) {
            e.preventDefault();

            if (myAudioTrack.paused) {
                pauseHeroTrack();
                myAudioTrack.play().then(function () {
                    audioButton.textContent = "⏸ Pause Sound";
                }).catch(function (err) {
                    console.error("Audio sample error:", err);
                    alert("Couldn't play this track — check the audio file path.");
                });
            } else {
                pauseBottomTrack();
            }
        });

        myAudioTrack.addEventListener("ended", pauseBottomTrack);
    }
}


function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}