// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Author: Mark Drummond
// Date: 09-Oct-2021
// Assignment: Code Quiz
// See README.md for more information
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Document selectors
var submitAnswer = document.getElementById("submitAnswer");
var timerText = document.getElementById("theTimer");
var questionText = document.getElementById("question");
var answersText = document.getElementById("answersList");
var answersContainer = document.getElementById("answersContainer");


// Global Variables
var wins = 0;
var losses = 0;
var userInitials;
var highScores;
var thisHighScore;
const defaultSecondsLeft = 60;
var secondsLeft = defaultSecondsLeft;
var timerInterval;
var winMsg = "You won!!!";
var lossMsg = "You lost!!!";
var questions = [
    {
        question: "Commonly used data types DO NOT include:",
        answers: ["strings", "booleans", "alerts", "numbers"],
        win: "alerts"
    }, {
        question: "The condition in an if / else statement is enclosed within ______.",
        answers: ["quotes", "curly brackets", "parentheses", "square brackets"],
        win: "curly brackets"
    }, {
        question: "Arrays in JavaScript can be used to store _______.",
        answers: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        win: "all of the above"
    }, {
        question: "String values must be enlosed within ________ when being assigned to variables.",
        answers: ["commas", "curly brackets", "quotes", "parentheses"],
        win: "quotes"
    }, {
        question: "A very useful tool during development and debugging for printing content to the debugger is:",
        answers: ["JavaScript", "terminal/bash", "for loops", "console.log"],
        win: "console.log"
    }
];


// Functions
function init(isNotFirstRun=false) {
    wins = 0;
    losses = 0;
    setTimer(isNotFirstRun);
    startGame(0);
}

function setTimer(restartGame = false) {
    if (restartGame === true) {
        secondsLeft = defaultSecondsLeft;
    }
    timerInterval = setInterval(function() {
        secondsLeft--;
        timerText.textContent = secondsLeft;

        // this element is by default 110%
        if (secondsLeft < parseInt(Math.floor(defaultSecondsLeft / 1.25))) {
            timerText.setAttribute("style", "font-size: 200%; background-color: var(--card-bg-color);");
        }
        
        if (secondsLeft < parseInt(Math.floor(defaultSecondsLeft / 2))) {
            timerText.setAttribute("style", "font-size: 275%; background-color: var(--light1);");
        }
        
        if (secondsLeft < parseInt(Math.floor(defaultSecondsLeft / 4))) {
            timerText.setAttribute("style", "font-size: 350%; background-color: var(--light2); width: 90px; height: 90px;");
        }
        
        if (secondsLeft <= 5) {
            timerText.setAttribute("style", "font-size: 400%; background-color: var(--error); width: 90px; height: 90px;");
        }
        
        if (secondsLeft <= -1) {
            timerText.textContent = "0";
            // clearInterval(timerInterval);
            gameOver("Time over!");
        }
    }, 250);
}

function startGame(index = 0) {
    if (index >= questions.length) {
        gameOver("Let's see how you did!");
    } else {
        submitAnswer.remove();
        // submitAnswer.textContent = "Submit Answer";
        answersText.textContent = '';
        //questionText.textContent =questions[0].question;
        // console.log(questions.length);
        //for (let i = 0; i < questions.length; i++) { // i < 1; i++) {
        // print the question
        let thisQuestionEl = document.createElement('h1');
        thisQuestionEl.textContent = questions[index].question;
        // console.log(questionText.innerHTML);
        // console.log(thisQuestionEl.innerHTML);
        // questionText.textContent = thisQuestionEl;
        // console.log(thisQuestionEl);
        questionText.textContent = '';
        questionText.appendChild(thisQuestionEl);
        // console.log(questions[i].answers[0]);
        // append each answer to the answersList <ul>
        for (let j = 0; j < questions[index].answers.length; j++) {
            let thisAnswer = document.createElement("li");
            thisAnswer.dataset.id = j;
            thisAnswer.textContent = (j+1) + ". " + questions[index].answers[j];
            thisAnswer.addEventListener("click", function(event) {
                // if correct
                if (event.target.innerHTML.substring(3) == questions[index].win) {
                    alert('ya got it');
                    wins++;
                } else {
                    losses++;
                    alert('wronggggg');
                    secondsLeft -= 10;
                }
                startGame(++index);
            });
            //console.log(thisAnswer);
            answersText.appendChild(thisAnswer);
        }
    }
    // var questionText, answersText
}

function gameOver(gameOverMsg = "") {
    clearInterval(timerInterval);
    alert("The game is over. " + gameOverMsg);
    secondsLeft = defaultSecondsLeft;
    timerText.setAttribute("style", "font-size: 1.17em; background-color: unset;");
    submitAnswer.textContent = "Restart Game";
    timerText.textContent = secondsLeft;

    questionText.textContent = '';
    answersContainer.textContent = '';
    let headEl = document.createElement('h1');
    let paraEl = document.createElement('p');
    headEl.textContent = "So You Think You Can Code?";
    paraEl.textContent = "Let's see how you did!";
    questionText.appendChild(headEl);
    questionText.appendChild(paraEl);

    let msgH2El = document.createElement('h2');
    let msgParaEl = document.createElement('p');
    if (wins > losses) {
        msgH2El.textContent = winMsg;
    } else {
        msgH2El.textContent = lossMsg;
    }
    msgParaEl.innerHTML = "# correct: " + wins + "<br /># wrong: " + losses;
    answersContainer.appendChild(msgH2El);
    answersContainer.appendChild(msgParaEl);

    // save user initials and score to localstorage
    var userInitialsLabelEl = document.createElement('label');
    userInitialsLabelEl.setAttribute("for", "userInitials");
    userInitialsLabelEl.innerHTML = "Your Initials:";
    var userInitialsEl = document.createElement('input');
    userInitialsEl.setAttribute("id", "userInitials");
    var submitUserInitialsBtn = document.createElement('button');
    submitUserInitialsBtn.setAttribute("id", "submitUserInitials");
    submitUserInitialsBtn.innerHTML = "Submit Your Score!";
    answersContainer.appendChild(userInitialsLabelEl);
    answersContainer.appendChild(userInitialsEl);
    answersContainer.appendChild(submitUserInitialsBtn);

    submitUserInitialsBtn.addEventListener("click", function(event) {
        event.preventDefault();
        // remove initials input and button so you can't submit it more than once.
        userInitialsLabelEl.remove();
        userInitialsEl.remove();
        submitUserInitialsBtn.remove();
        userInitialsSubmittedEl = document.createElement('p');
        userInitialsSubmittedEl.innerHTML = "Thank you for submitting your score!";
        submitAnswer = document.createElement('button');
        submitAnswer.setAttribute("id", "submitAnswer");
        submitAnswer.setAttribute("class", "btn");
        submitAnswer.innerHTML = "Play Again";
        answersContainer.appendChild(userInitialsSubmittedEl);
        document.getElementById("btnContainer").appendChild(submitAnswer);
        submitAnswer.addEventListener("click", function() {
            init(false); // isFirstRun = false
        });

        // make new high score obj and append to high scores array
        thisHighScore = {
            hSuser: userInitialsEl.value,
            hSwins: wins,
            hSlosses: losses
        };
        // get current high scores
        var localHighScores = JSON.parse(localStorage.getItem("highScores"));
        if (localHighScores !== null) {
            highScores = localHighScores;
        } else {
            highScores = [];
            // highScores.push(JSON.stringify(thisHighScore));
        }
        console.log(highScores);

        // push high scores array to localstorage
        localStorage.setItem("highScores", highScores);
    });
}

function renderHighScores() {
    // clicked the 'view high scores' button
    var highScores = JSON.parse(localStorage.getItem("highScores"));
}




// Code Initiation Point
submitAnswer.addEventListener("click", init);

// eof