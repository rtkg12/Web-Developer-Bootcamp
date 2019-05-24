const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/yelp_camp", {
  useNewUrlParser: true
});

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

//Schema Setup
const campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

const Campground = mongoose.model("Campground", campgroundSchema);

app.get("/", function(req, res) {
  res.render("landing");
});

app.get("/campgrounds", function(req, res) {
  //Find all campgrounds from DB
  Campground.find({}, function(err, allCampgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render("index", { campgrounds: allCampgrounds });
    }
  });
});

app.post("/campgrounds", function(req, res) {
  //Get data and add to campgrounds array
  // Redirect back to campgrounds page
  let name = req.body.name;
  let image = req.body.image;
  let desc = req.body.description;

  let newCampground = {
    name: name,
    image: image,
    description: desc
  };

  //Create new campground and store in DB
  Campground.create(newCampground, function(err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      // Go back to campgrounds page
      res.redirect("/campgrounds");
    }
  });
});

app.get("/campgrounds/new", function(req, res) {
  res.render("new");
});

app.get("/campgrounds/:id", function(req, res) {
  //Find the campground with provided id
  Campground.findById(req.params.id, function(err, foundCampground) {
    if (err) {
      console.log(err);
    } else {
      // Render the show template with that campground
      res.render("show", { campground: foundCampground });
    }
  });
});

app.listen(3000, function() {
  console.log("YelpCamp App started");
});
