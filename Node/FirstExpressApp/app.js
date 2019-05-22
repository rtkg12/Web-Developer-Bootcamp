var express = require("express");
var app = express();

app.get("/", function(req, res) {
  res.send("Hi there, welcome to my assignment!");
});

app.get("/speak/:animal", function(req, res) {
  var animal = req.params.animal.toLowerCase();
  var sounds = {
    pig: "Oink",
    cow: "Moo",
    dog: "Woof Woof!"
  };
  var sound = sounds[animal];

  res.send("The " + animal + " says '" + sound + "'");
});

app.get("/repeat/:word/:times", function(req, res) {
  var word = req.params.word;
  var times = Number(req.params.times);
  var output = "";
  for (var i = 0; i < times; i++) {
    output += word + " ";
  }

  res.send(output);
});

app.get("*", function(req, res) {
  res.send("Sorry, page not found... What are you even doing with your life?");
});

app.listen(3000, function() {
  console.log("Server started");
});
