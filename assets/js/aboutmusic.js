document.addEventListener("DOMContentLoaded", () => {
    initScrollObserver();
    initHeroNotes();
    initSheetNotes();
    initStyleMixer();
});

let audioCtx = null;
function getAudioContext() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === "suspended") {
        audioCtx.resume();
    }
    return audioCtx;
}


function initScrollObserver() {
    const items = document.querySelectorAll(".scroll-animate");
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
        items.forEach(item => item.classList.add("is-visible"));
        return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    items.forEach(item => observer.observe(item));
}

/*notes*/

function initHeroNotes() {
    const notes = document.querySelectorAll(".music-note");
    if (!notes.length) return;

    const sounds = {
        do: 261.63,
        re: 293.66,
        mi: 329.63,
        fa: 349.23,
        so: 392.00,
        la: 440.00,
        ti: 493.88
    };

    notes.forEach(btn => {
        btn.addEventListener("click", () => {
            const freq = sounds[btn.dataset.note];
            if (!freq) return;

            const ctx = getAudioContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = "sine";
            osc.frequency.value = freq;

            gain.gain.setValueAtTime(0.3, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start();
            osc.stop(ctx.currentTime + 1);
        });
    });
}


function initSheetNotes() {
    const notes = document.querySelectorAll(".note");
    const display = document.getElementById("display");
    if (!notes.length || !display) return;

    notes.forEach(note => {
        note.addEventListener("click", () => {
            const ctx = getAudioContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = "triangle";
            osc.frequency.value = Number(note.dataset.freq);

            gain.gain.setValueAtTime(0.3, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start();
            osc.stop(ctx.currentTime + 0.8);

            display.innerHTML = `${note.dataset.name} <span class="text-gold">(${note.dataset.solfege})</span>`;
        });
    });
}


function initStyleMixer() {
    const tempo = document.getElementById("tempoSelect");
    const timbre = document.getElementById("timbreSelect");
    const rhythm = document.getElementById("rhythmSelect");

    const result = document.getElementById("styleResult");
    const desc = document.getElementById("styleDescription");

    if (!tempo || !timbre || !rhythm || !result || !desc) return;

    function update() {
        let title = "Custom Fusion";
        let text = "You created your own unique music style.";

        if (tempo.value === "slow" && timbre.value === "soft" && rhythm.value === "smooth") {
            title = "Ambient Chillout";
            text = "Relaxing music that's great for studying or winding down.";
        } else if (tempo.value === "fast" && timbre.value === "heavy" && rhythm.value === "aggressive") {
            title = "Cyberpunk";
            text = "Fast, energetic beats with powerful electronic sounds.";
        } else if (tempo.value === "medium" && timbre.value === "bright" && rhythm.value === "groovy") {
            title = "Funk & Disco";
            text = "Bright melodies with danceable rhythms inspired by the 80s.";
        } else if (tempo.value === "slow" && timbre.value === "heavy" && rhythm.value === "groovy") {
            title = "Down-Tempo";
            text = "Deep bass mixed with relaxed grooves for a chilled vibe.";
        }

        result.textContent = title;
        desc.textContent = text;
    }

    [tempo, timbre, rhythm].forEach(select => {
        select.addEventListener("change", update);
    });

    update();
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}
