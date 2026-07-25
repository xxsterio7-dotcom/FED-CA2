document.addEventListener("DOMContentLoaded", () => {

    // fade sections in as they scroll into view
    const animatedElements = document.querySelectorAll(".scroll-animate");

    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries, observerInstance) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observerInstance.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        animatedElements.forEach(element => observer.observe(element));
    }

    // musical notes -> play a tone using the Web Audio API
    const noteFrequencies = {
        do: 261.63, re: 293.66, mi: 329.63, fa: 349.23,
        so: 392.00, la: 440.00, ti: 493.88
    };

    let audioContext = null;

    function getAudioContext() {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        return audioContext;
    }

    function playNote(noteName) {
        if (!noteFrequencies[noteName]) return;

        const context = getAudioContext();
        if (context.state === "suspended") context.resume();

        const oscillator = context.createOscillator();
        const gainNode = context.createGain();

        oscillator.type = "sine";
        oscillator.frequency.value = noteFrequencies[noteName];
        oscillator.connect(gainNode);
        gainNode.connect(context.destination);

        const now = context.currentTime;
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.25, now + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

        oscillator.start(now);
        oscillator.stop(now + 1.2);
    }

    // floating notes
    const musicNotes = document.querySelectorAll(".music-note");
    musicNotes.forEach(note => {
        note.addEventListener("click", () => {
            playNote(note.dataset.note);
            note.classList.add("playing");
            setTimeout(() => note.classList.remove("playing"), 500);
        });
    });

    // hero + featured audio players (only one plays at a time)
    const heroAudio = document.getElementById("heroAudioTrack");
    const heroPlayBtn = document.getElementById("heroPlayBtn");
    const heroPlayText = document.getElementById("heroPlayText");
    const heroVinyl = document.getElementById("heroVinyl");

    const audioButton = document.getElementById("audioButton");
    const myAudioTrack = document.getElementById("myAudioTrack");

    if (heroVinyl) heroVinyl.style.animationPlayState = "paused";

    function pauseHeroTrack() {
        if (heroAudio) heroAudio.pause();
        if (heroPlayText) heroPlayText.textContent = "▶ Listen Now";
        if (heroVinyl) heroVinyl.style.animationPlayState = "paused";
    }

    function pauseBottomTrack() {
        if (myAudioTrack) myAudioTrack.pause();
        if (audioButton) audioButton.textContent = "▶ Play Sound Sample";
    }

    if (heroPlayBtn && heroAudio) {
        heroPlayBtn.addEventListener("click", async (e) => {
            e.preventDefault();

            if (heroAudio.paused) {
                pauseBottomTrack();

                try {
                    await heroAudio.play();
                    heroPlayText.textContent = "⏸ Pause Track";
                    heroVinyl.style.animationPlayState = "running";
                } catch (err) {
                    console.error("Hero track error:", err);
                    alert("Couldn't play this track — check the file path.");
                }
            } else {
                pauseHeroTrack();
            }
        });

        heroAudio.addEventListener("ended", pauseHeroTrack);
    }

    if (audioButton && myAudioTrack) {
        audioButton.addEventListener("click", async (e) => {
            e.preventDefault();

            if (myAudioTrack.paused) {
                pauseHeroTrack();

                try {
                    await myAudioTrack.play();
                    audioButton.textContent = "⏸ Pause Sound Sample";
                } catch (err) {
                    console.error("Audio sample error:", err);
                    alert("Couldn't play this track — check the file path.");
                }
            } else {
                pauseBottomTrack();
            }
        });

        myAudioTrack.addEventListener("ended", pauseBottomTrack);
    }

    // style mixer (tempo + timbre + rhythm -> a genre guess)
    const tempoSelect = document.getElementById("tempoSelect");
    const timbreSelect = document.getElementById("timbreSelect");
    const rhythmSelect = document.getElementById("rhythmSelect");
    const styleResult = document.getElementById("styleResult");
    const styleDescription = document.getElementById("styleDescription");

    if (tempoSelect && timbreSelect) {
        function updateStyle() {
            const tempo = tempoSelect.value;
            const timbre = timbreSelect.value;

            let result = "Experimental Fusion";
            let description = "A unique combination of musical characteristics.";

            if (tempo === "fast" && timbre === "heavy") {
                result = "Heavy Metal / Punk";
                description = "Fast rhythms and powerful distorted sounds create an intense and energetic style.";
            } else if (tempo === "slow" && timbre === "soft") {
                result = "Ambient / Lo-Fi";
                description = "Relaxed tempos and warm tones create a calm and atmospheric sound.";
            } else if (tempo === "medium" && timbre === "bright") {
                result = "Synth-Pop";
                description = "Bright electronic textures and steady rhythms create a catchy modern style.";
            } else if (tempo === "fast" && timbre === "bright") {
                result = "Electronic Dance";
                description = "Fast-paced rhythms and energetic electronic sounds create a dance-focused style.";
            } else if (tempo === "medium" && timbre === "soft") {
                result = "Neo-Soul";
                description = "Smooth rhythms and warm tones create an expressive and soulful atmosphere.";
            }

            styleResult.textContent = result;
            styleDescription.textContent = description;
        }

        tempoSelect.addEventListener("change", updateStyle);
        timbreSelect.addEventListener("change", updateStyle);
        if (rhythmSelect) rhythmSelect.addEventListener("change", updateStyle);
    }

    // mood -> genre selector
    const moodButtons = document.querySelectorAll(".mood-button");
    const moodTitle = document.getElementById("moodTitle");
    const moodGenre = document.getElementById("moodGenre");
    const moodDescription = document.getElementById("moodDescription");

    const moodData = {
        happy: { title: "Feeling Happy ☀️", genre: "Pop", description: "Bright melodies, catchy hooks and uplifting rhythms match your positive energy." },
        sad: { title: "Feeling Sad 🌧️", genre: "Blues", description: "Emotional melodies and expressive vocals can help you process and express difficult feelings." },
        energetic: { title: "Feeling Energetic ⚡", genre: "Rock", description: "Powerful guitar riffs and driving rhythms are perfect for high-energy moments." },
        relaxed: { title: "Feeling Relaxed 🌙", genre: "Lo-Fi", description: "Soft beats and mellow textures create a calm and comfortable atmosphere." },
        angry: { title: "Feeling Angry 🔥", genre: "Heavy Metal", description: "Intense drums, powerful guitars and aggressive vocals channel raw energy." },
        nostalgic: { title: "Feeling Nostalgic 📻", genre: "Synthwave", description: "Retro synthesizers and cinematic textures bring the feeling of another era." },
        focused: { title: "Feeling Focused 🎧", genre: "Ambient", description: "Minimal textures and atmospheric sounds help create a calm environment for concentration." }
    };

    if (moodButtons.length > 0 && moodTitle && moodGenre && moodDescription) {
        moodButtons.forEach(button => {
            button.addEventListener("click", () => {
                const data = moodData[button.dataset.mood];
                if (!data) return;

                moodTitle.textContent = data.title;
                moodGenre.textContent = data.genre;
                moodDescription.textContent = data.description;

                moodButtons.forEach(item => item.classList.remove("active"));
                button.classList.add("active");
            });
        });
    }
});

// used by the "Back to top" button in the footer
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}
