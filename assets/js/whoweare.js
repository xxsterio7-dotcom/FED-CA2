function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

const revealTargets = document.querySelectorAll(".scroll-animate");
if (revealTargets.length) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealTargets.forEach((target) => observer.observe(target));
}

document.querySelectorAll(".card img").forEach((img) => {
    img.addEventListener("error", () => (img.style.display = "none"));
});


const audio = document.getElementById("audio-sample");
const playBtn = document.getElementById("btn-play");
const btnCompressed = document.getElementById("btn-compressed");
const btnLossless = document.getElementById("btn-lossless");
const statusText = document.getElementById("audio-status");

let audioCtx;
let filter;

function initAudio() {
    if (audioCtx) return; 

    audioCtx = new AudioContext();
    filter = audioCtx.createBiquadFilter();
    
    const source = audioCtx.createMediaElementSource(audio);
    filter.type = "lowpass";
    filter.frequency.value = 3200; 

    source.connect(filter);
    filter.connect(audioCtx.destination);
}

function togglePlay() {
    initAudio();

    if (audioCtx.state === "suspended") {
        audioCtx.resume();
    }

    if (audio.paused) {
        audio.play();
        playBtn.innerHTML = `<i class="fa-solid fa-pause me-1"></i> Pause Sample`;
    } else {
        audio.pause();
        playBtn.innerHTML = `<i class="fa-solid fa-play me-1"></i> Play Sample`;
    }
}

function setQuality(mode) {
    const isCompressed = mode === "compressed";

    btnCompressed.classList.toggle("active", isCompressed);
    btnCompressed.classList.toggle("btn-warning", isCompressed);
    btnCompressed.classList.toggle("btn-outline-warning", !isCompressed);

    btnLossless.classList.toggle("active", !isCompressed);
    btnLossless.classList.toggle("btn-warning", !isCompressed);
    btnLossless.classList.toggle("btn-outline-warning", isCompressed);

    if (isCompressed) {
        statusText.innerHTML = `<i class="fa-solid fa-circle-info me-1"></i> Standard Output: High-frequency response cut off at 3.5kHz.`;
        if (filter) filter.frequency.setTargetAtTime(3200, audioCtx.currentTime, 0.1);
    } else {
        statusText.innerHTML = `<i class="fa-solid fa-circle-check me-1"></i> Vault HD Output: Full spectrum lossless audio (up to 20kHz).`;
        if (filter) filter.frequency.setTargetAtTime(22000, audioCtx.currentTime, 0.1);
    }
}