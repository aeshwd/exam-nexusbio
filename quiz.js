//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

//Questions and Options array

const quizArray = [
    {
        question: "Which of the following is not a function of the liver?",
        options: [
            "Production of bile",
            "Storage of glycogen",
            "Production of insulin",
            "Detoxification of blood"
        ],
        answer: 2 // Index of the correct answer (options[2] is "Production of insulin")
    },
    {
        question: "Which hormone is responsible for the regulation of blood calcium levels?",
        options: [
            "Insulin",
            "Glucagon",
            "Calcitonin",
            "Parathyroid hormone"
        ],
        answer: 3 // Index of the correct answer (options[3] is "Parathyroid hormone")
    },
    {
        question: "The functional unit of kidney is:",
        options: [
            "Neuron",
            "Nephron",
            "Alveolus",
            "Hepatocyte"
        ],
        answer: 1 // Index of the correct answer (options[1] is "Nephron")
    },
    {
        question: "Which one of the following organisms will have a single circulatory loop?",
        options: [
            "Fish",
            "Amphibian",
            "Reptile",
            "Bird"
        ],
        answer: 0 // Index of the correct answer (options[0] is "Fish")
    },
    {
        question: "Which of the following hormones is not produced by the pituitary gland?",
        options: [
            "Growth hormone",
            "Thyroid-stimulating hormone",
            "Adrenocorticotropic hormone",
            "Insulin"
        ],
        answer: 3 // Index of the correct answer (options[3] is "Insulin")
    },
    {
        question: "In human males, which of the following structures produces testosterone?",
        options: [
            "Testes",
            "Epididymis",
            "Seminal vesicle",
            "Prostate gland"
        ],
        answer: 0 // Index of the correct answer (options[0] is "Testes")
    },
    {
        question: "Which one of the following is not a vestigial organ in humans?",
        options: [
            "Appendix",
            "Coccyx",
            "Plica semilunaris",
            "Kidney"
        ],
        answer: 3 // Index of the correct answer (options[3] is "Kidney")
    },
    {
        question: "Which part of the brain is responsible for maintaining posture and balance?",
        options: [
            "Cerebrum",
            "Cerebellum",
            "Medulla oblongata",
            "Thalamus"
        ],
        answer: 1 // Index of the correct answer (options[1] is "Cerebellum")
    },
    {
        question: "In which process does the reduction division take place?",
        options: [
            "Mitosis",
            "Meiosis",
            "Fertilization",
            "Budding"
        ],
        answer: 1 // Index of the correct answer (options[1] is "Meiosis")
    },
    {
        question: "Which blood vessel carries blood from the heart to the lungs?",
        options: [
            "Pulmonary artery",
            "Pulmonary vein",
            "Aorta",
            "Superior vena cava"
        ],
        answer: 0 // Index of the correct answer (options[0] is "Pulmonary artery")
    },
    // Add more questions as needed...
];


//Restart Quiz
restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});

//Next Button
nextBtn.addEventListener(
    "click",
    (displayNext = () => {
        //increment questionCount
        questionCount += 1;
        //if last question
        if (questionCount == quizArray.length) {
            //hide question container and display score
            displayContainer.classList.add("hide");
            scoreContainer.classList.remove("hide");
            //user score
            userScore.innerHTML =
                "Your score is " + scoreCount + " out of " + questionCount;
        } else {
            //display questionCount
            countOfQuestion.innerHTML =
                questionCount + 1 + " of " + quizArray.length + " Question";
            //display quiz
            quizDisplay(questionCount);
            count = 11;
            clearInterval(countdown);
            timerDisplay();
        }
    })
);

//Timer
const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    //Hide other cards
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    //display current question card
    quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
    //randomly sort questions
    quizArray.sort(() => Math.random() - 0.5);
    //generate quiz
    for (let i of quizArray) {
        //randomly sort options
        i.options.sort(() => Math.random() - 0.5);
        //quiz card creation
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        //question number
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
        //question
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        //options
        div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
        quizContainer.appendChild(div);
    }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
    let userSolution = userOption.innerText;
    let question =
        document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    //if user clicked answer == correct option stored in object
    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");
        //For marking the correct option
        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }

    //clear interval(stop timer)
    clearInterval(countdown);
    //disable all options
    options.forEach((element) => {
        element.disabled = true;
    });
}

//initial setup
function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 11;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});

//hide quiz and display start screen
window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};