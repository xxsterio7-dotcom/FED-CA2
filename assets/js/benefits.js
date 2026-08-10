const quizData = [
    {
        question: "Which type of music is best when studying?",
        choices: ["Music with lyrics", "Instrumental music", "Very loud music", "Fast music"],
        answer: 1
    },
    {
        question: "How does relaxing music affect muscle tension?",
        choices: ["Increases tension", "Loosens tight muscles", "Causes spasms", "Has no effect"],
        answer: 1
    },
    {
        question: "What effect does slow music have on your heart?",
        choices: ["Lowers heart rate", "Spikes adrenaline", "Causes stress", "Increases strain"],
        answer: 0
    },
    {
        question: "Which stress hormone is lowered by listening to music?",
        choices: ["Insulin", "Cortisol", "Melatonin", "Thyroxine"],
        answer: 1
    }
];

let currentQn = 0;

const quizIntro = document.getElementById("quizIntro");
const quizBox = document.getElementById("quiz");
const quizEnd = document.getElementById("quizEnd");

const qnNoEl = document.getElementById("QnNo");
const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const resultEl = document.getElementById("result");
const nextBtn = document.getElementById("nextBtn");

document.getElementById("startBtn").onclick = function() {
    quizIntro.style.display = "none";
    quizBox.style.display = "block";
    currentQn = 0;
    showQuestion();
};

function showQuestion() {
    let q = quizData[currentQn];
    
    qnNoEl.textContent = "Question " + (currentQn + 1) + " of " + quizData.length;
    questionEl.textContent = q.question;
    resultEl.textContent = "";
    nextBtn.style.visibility = "hidden";
    choicesEl.innerHTML = "";

    for (let i = 0; i < q.choices.length; i++) {
        let btn = document.createElement("button");
        btn.type = "button";
        btn.className = "btn btn-outline-warning w-100 text-start p-3";
        btn.textContent = q.choices[i];
        btn.onclick = function() { checkAnswer(i); };
        choicesEl.appendChild(btn);
    }
}

function checkAnswer(chosenIndex) {
    let q = quizData[currentQn];
    let buttons = choicesEl.getElementsByTagName("button");

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
    }

    if (chosenIndex === q.answer) {
        resultEl.textContent = "Correct!";
        resultEl.className = "fw-bold mt-3 fs-5 text-center text-success";
    } else {
        resultEl.textContent = "Wrong!";
        resultEl.className = "fw-bold mt-3 fs-5 text-center text-danger";
    }

    nextBtn.style.visibility = "visible";
}

nextBtn.onclick = function() {
    currentQn++;
    if (currentQn < quizData.length) {
        showQuestion();
    } else {
        quizBox.style.display = "none";
        quizEnd.style.display = "block";
    }
};


document.getElementById("retryBtn").onclick = function() {
    quizEnd.style.display = "none";
    quizIntro.style.display = "block";
};

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
} 
