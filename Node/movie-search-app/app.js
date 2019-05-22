var app = require("express")();
const request = require("request");
app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.render("index");
});

app.get("/search", function(req, res) {
  let movieName = req.query.movie;
  let apiquery =
    "http://www.omdbapi.com/?s='" + movieName + "'&type=movie&apikey=thewdb";
  let results;

  request(apiquery, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      let resultsJSON = JSON.parse(body);
      results = resultsJSON["Search"];
      console.log(results);
      res.render("results", { searchResults: results });
    }
  });
});

app.listen(3000, function() {
  console.log("Server started");
});
