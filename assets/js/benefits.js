const benefitsCards = document.querySelectorAll(".benefitsCard");

benefitsCards.forEach(function(card) { //Loops through all 4 cards
    card.addEventListener("mouseenter", function() { //Flip when hover
        card.classList.add("flipped");
    });

    card.addEventListener("mouseleave", function() { //Remove flip effect when cursor leaves
        card.classList.remove("flipped");
    });
});

/* Questions for trivia quiz */
const questions = [
    {
        question: "Which type of music is generally less distracting when studying?",
        answers: [
            "Music with familiar lyrics",
            "Instrumental music",
            "Very loud music",
            "Music that constantly changes tempo"
        ],
        correct: 1
    },

    {
        question: "Why can listening to music during exercise make a workout feel easier?",
        answers: [
            "It reduces the amount of oxygen your body needs",
            "It makes your muscles physically stronger",
            "It lowers your body temperature",
            "It can distract you from feelings of fatigue"
        ],
        correct: 3
    },

    {
        question: "Which effect can slow, calming music have on the body?",
        answers: [
            "Increase heart rate",
            "Increase muscle tension",
            "Encourage relaxation",
            "Increase reaction speed"
        ],
        correct: 2
    },

    {
        question: "Why can songs be useful for remembering information?",
        answers: [
            "Music increases the size of your memory",
            "Rhythm and melody can provide patterns that help recall",
            "Music prevents the brain from forgetting anything",
            "Lyrics automatically enter long-term memory"
        ],
        correct: 1
    },

    {
        question: "Which activity combines music with social and physical benefits?",
        answers: [
            "Dancing with other people",
            "Listening alone while sleeping",
            "Reading song titles",
            "Changing your headphones"
        ],
        correct: 0
    },

    {
        question: "Why might a familiar song improve someone's mood?",
        answers: [
            "It permanently removes stress",
            "It increases intelligence immediately",
            "It prevents negative emotions",
            "It can trigger positive memories and emotions"
        ],
        correct: 3
    },

    {
        question: "Which situation is music most likely to help with during repetitive exercise?",
        answers: [
            "Increasing bone length",
            "Reducing the need for rest completely",
            "Keeping a steady rhythm",
            "Replacing physical training"
        ],
        correct: 2
    },

    {
        question: "What is one reason music can help people feel socially connected?",
        answers: [
            "Everyone reacts to music in exactly the same way",
            "People can share musical experiences and preferences",
            "Music removes differences between people",
            "Only musicians benefit socially from music"
        ],
        correct: 1
    },

    {
        question: "Why might upbeat music be useful before a sports activity?",
        answers: [
            "It can increase motivation and energy",
            "It guarantees better performance",
            "It prevents muscle injuries",
            "It reduces the need for warming up"
        ],
        correct: 0
    },

    {
        question: "Which is the best example of music supporting emotional wellbeing?",
        answers: [
            "Listening at maximum volume for several hours",
            "Replacing sleep with music",
            "Avoiding all difficult emotions using music",
            "Using music to relax after a stressful day"
        ],
        correct: 3
    }
];

const questionNumber = document.getElementById("QnNo");
const questionElement = document.getElementById("question");
const choices = document.getElementById("choices");
const result = document.getElementById("result");
const nextBtn = document.getElementById("nextBtn");
const startBtn = document.getElementById("startBtn");
const quizIntro = document.getElementById("quizIntro");
const quizQuestions = document.querySelector(".quiz-container");
const quizEnd = document.getElementById("quizEnd")
const scoreText = document.getElementById("scoreText")
const retryBtn = document.getElementById("retryBtn")

quizQuestions.style.display = "none";
nextBtn.style.visibility = "hidden";
quizEnd.style.display = "none"

let currentQn = 0
let score = 0

startBtn.addEventListener("click", function() {
    quizIntro.style.display = "none";
    quizQuestions.style.display = "flex";
    quizEnd.style.display = "none"
    showqn();
});

function showqn(){
    const question = questions[currentQn]
    const qnText = question.question
    
    questionElement.textContent = qnText
    questionNumber.textContent = (currentQn+1)
    choices.innerHTML = ""
    result.textContent = ""
    nextBtn.style.visibility = "hidden";

    for(let i=0; i<4; i++){
        const button = document.createElement("button")
        button.textContent = question.answers[i]
        button.classList.add("answer-btn")
        button.classList.add("btn-primary")
        button.addEventListener("click", function(){
            checkAns(i)
        })
        choices.appendChild(button)
    }
}

function checkAns(selected){
    const question = questions[currentQn]
    const answer = question.correct
    if(answer==selected){
        result.textContent = "Correct!"
        score++
    }
    else{
        result.textContent = "Wrong!"
    }
    nextBtn.style.visibility = "visible";
}

function showscore(){
    currentQn = 0
    quizQuestions.style.display = "none";
    quizEnd.style.display = "flex"
    scoreText.textContent = score + "/" + questions.length
}

function startAgain(){
    score = 0
    currentQn = 0
    quizIntro.style.display = "flex";
    quizQuestions.style.display = "none";
    quizEnd.style.display = "none"
}

retryBtn.addEventListener("click", function(){
            startAgain()
        })

nextBtn.addEventListener("click", function(){
    currentQn++
    if(currentQn<questions.length){
        showqn()
    }
    else{
        showscore()
    }
})

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}