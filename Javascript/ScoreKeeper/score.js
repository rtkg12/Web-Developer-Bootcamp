p1b = document.querySelector("#p1button");
p2b = document.querySelector("#p2button");
resetButton = document.querySelector("#reset");
num = document.querySelector("#max");
maxScoreLabel = document.querySelector(".maxScore");
maxScore = 5; // Initial max score
p1ScoreLabel = document.querySelector(".p1");
p2ScoreLabel = document.querySelector(".p2");

p1Score = 0;
p2Score = 0;

maxScoreReached = false; //Whether one of the players has reached the maxScore

//Make objects for both players
player1 = {
    "label":p1ScoreLabel,
    "score":p1Score
}

player2 = {
    "label":p2ScoreLabel,
    "score":p2Score
}

function incrementScore(player){
    if(!maxScoreReached){
        player.score += 1;
        player.label.textContent = player.score;

        if(player.score === maxScore){
            maxScoreReached = true;
            player.label.classList.add("green");
        }
    }
}

//Increment score on button click
p1b.addEventListener("click", function(){
    incrementScore(player1);
});

p2b.addEventListener("click", function(){
    incrementScore(player2);
});

num.addEventListener("click", function(){
    maxScore = Number(num.value);
    maxScoreLabel.textContent = maxScore;
})

resetButton.addEventListener("click", function() {
    player1.label.textContent = 0;
    player1.label.classList.remove("green");
    player2.label.textContent = 0;
    player2.label.classList.remove("green");
    maxScore = 5;
    maxScoreLabel.textContent = 5;
    num.value = "";
})

