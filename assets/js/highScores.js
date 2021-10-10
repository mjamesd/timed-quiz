var container = document.getElementById("highScoresContainer");

function renderHighScores() {
    // clicked the 'view high scores' button
    var highScores = JSON.parse(localStorage.getItem("highScores"));
    if (highScores !== null) {
        for (let index = 0; index < highScores.length; index++) {
            var element = document.createElement('div');
            var winsPlural = "question";
            if (highScores[index].hSwins !== 1) {
                winsPlural += "s";
            }
            element.innerHTML = "User \"" + highScores[index].hSuser + "\" got " + highScores[index].hSwins + " " + winsPlural + " right.";
            container.appendChild(element);
        }
    } else {
        var element = document.createElement('div');
        element.setAttribute("style", "text-align: center");
        element.innerHTML = "There are no scores saved. Why not test your knowledge and win a spot on the scoreboard?";
        container.appendChild(element);
    }
    var btn = document.createElement('button');
    btn.setAttribute("id", "playGame");
    btn.setAttribute("class", "btn");
    btn.innerHTML = "Play Game";
    container.appendChild(btn);
    btn.addEventListener("click", function () {
        window.location.assign("./index.html");
    });
}

renderHighScores();