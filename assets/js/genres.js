function initMoodSelector() {
    const moodButtons = document.querySelectorAll(".mood-button");
    const moodTitle = document.getElementById("moodTitle");
    const moodGenre = document.getElementById("moodGenre");
    const moodDescription = document.getElementById("moodDescription");

    if (moodButtons.length === 0 || !moodTitle || !moodGenre || !moodDescription) return;

    const moodData = {
        happy: { title: "Happy? ☀️", genre: "Pop", description: "Positive energy, and vibes all around!" },
        sad: { title: "Sad? 🌧️", genre: "Emo", description: "Sad? Express your emotions in this genre!" },
        energetic: { title: "Energetic? ⚡", genre: "Rock", description: "Powerful guitar riffs & beautiful emotions!" },
        relaxed: { title: "Relaxed? 🌙", genre: "Lo-Fi", description: "Soft & mellow textures, relax dude!" },
        angry: { title: "Angry? 🔥", genre: "Heavy Metal", description: "Intense drums, powerful bass, MAKE IT ROCK!" },
        nostalgic: { title: "Nostalgic? 📻", genre: "Synthwave", description: "Retro synthesizers and cinematic music, enjoy!" },
        focused: { title: "Focused? 🎧", genre: "Ambient", description: "Atomospheric sounds, making you feel the vibes!" }
    };

    moodButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const data = moodData[button.dataset.mood];
            if (!data) return;

            moodTitle.textContent = data.title;
            moodGenre.textContent = data.genre;
            moodDescription.textContent = data.description;


            document.querySelector(".mood-button.active")?.classList.remove("active");
            button.classList.add("active");
        });
    });
}


document.addEventListener("DOMContentLoaded", () => {
    initMoodSelector();
});
