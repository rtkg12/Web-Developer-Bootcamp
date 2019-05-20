var colors = []
var squares = document.querySelectorAll(".square");
generateRandomColors();

var pickedColorLabel = document.querySelector("#colorDisplay");
var pickedColor;
pickRandomColor();

var statusLabel = document.querySelector("#choiceStatus");
var h2 = document.querySelector("h2");
var resetButton = document.querySelector("#resetButton");

resetButton.addEventListener("click", resetGame);

for (var i = 0; i < squares.length; i++) {
    var currSquare = squares[i];
    currSquare.addEventListener("click", function () { //On click
        if (this.style.backgroundColor === pickedColor) { //If clicked on correct color
            statusLabel.textContent = "Correct!";
            changeAllColorsToPickedColor();
            h2.style.backgroundColor = pickedColor;
        } else { //Change color to background color
            statusLabel.textContent = "Try Again";
            this.style.backgroundColor = document.body.style.backgroundColor;
        }
    })
}

function pickRandomColor() {
    pickedColor = colors[Math.floor(Math.random() * colors.length)].name();
    pickedColorLabel.textContent = pickedColor;
}

function changeAllColorsToPickedColor() {
    for (var j = 0; j < squares.length; j++) { //Change color of all squares to picked color
        squares[j].style.backgroundColor = pickedColor;
    }
}

function generateRandomColors(){
    var num = squares.length;

    //Create 6 color objects with random r g b values
    for(var i=0; i<squares.length;i++){
        //Create random color
        var r = Math.floor(Math.random()*256);
        var g =  Math.floor(Math.random()*256);
        var b = Math.floor(Math.random()*256);
        colors[i] = new Color(r, g, b); 
        
        squares[i].style.backgroundColor = colors[i].name(); //Add colors to all
    }
}

function Color(r, g, b){
    this.r = r;
    this.g = g;
    this.b = b;

    this.name = function(){
        var outputString = "rgb(" + this.r + ", " + this.g + ", " + this.b + ")";
        // outputString += this.r + ", ";
        // outputString += this.g + ", ";
        // outputString += this.b + ")";

        return outputString;
    }
}

function resetGame(){
    generateRandomColors();
    pickRandomColor();
    h2.style.backgroundColor = document.body.style.backgroundColor;
}
