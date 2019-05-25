const express = require('express'),
  router = express.Router(),
  Campground = require('../models/campground'),
  Comment = require('../models/comment');

router.get('/', function(req, res) {
  //Find all campgrounds from DB
  Campground.find({}, function(err, allCampgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render('campgrounds/index', { campgrounds: allCampgrounds });
    }
  });
});

router.post('/', function(req, res) {
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
      res.redirect('/campgrounds');
    }
  });
});

router.get('/new', function(req, res) {
  res.render('campgrounds/new');
});

router.get('/:id', function(req, res) {
  //Find the campground with provided id
  Campground.findById(req.params.id)
    .populate('comments')
    .exec(function(err, foundCampground) {
      if (err) {
        console.log(err);
      } else {
        // Render the show template with that campground
        res.render('campgrounds/show', { campground: foundCampground });
      }
    });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

module.exports = router;
