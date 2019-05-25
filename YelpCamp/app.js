const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  Campground = require("./models/campground"),
  Comment = require("./models/comment"),
  methodOverride = require("method-override"),
  seedDB = require("./seeds");

seedDB();
mongoose.connect("mongodb://localhost:27017/yelp_camp", {
  useNewUrlParser: true
});

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res) {
  res.render("landing");
});

app.get("/campgrounds", function(req, res) {
  //Find all campgrounds from DB
  Campground.find({}, function(err, allCampgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", { campgrounds: allCampgrounds });
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
  res.render("campgrounds/new");
});

app.get("/campgrounds/:id", function(req, res) {
  //Find the campground with provided id
  Campground.findById(req.params.id)
    .populate("comments")
    .exec(function(err, foundCampground) {
      if (err) {
        console.log(err);
      } else {
        // Render the show template with that campground
        res.render("campgrounds/show", { campground: foundCampground });
      }
    });
});

//===========================
// COMMENTS routes
//===========================

app.get("/campgrounds/:id/comments/new", function(req, res) {
  //Find campground by id
  Campground.findById(req.params.id, function(err, foundCampground) {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", { campground: foundCampground });
    }
  });
});

app.post("/campgrounds/:id/comments", function(req, res) {
  Comment.create(req.body.comment, function(err, newComment) {
    if (err) {
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) {
          console.log(err);
          res.redirect("/campgrounds");
        } else {
          foundCampground.comments.push(newComment);
          foundCampground.save();
          res.redirect("/campgrounds/" + req.params.id);
        }
      });
    }
  });
});

app.listen(3000, function() {
  console.log("YelpCamp App started");
});
