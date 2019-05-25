const express = require('express');
const router = express.Router({ mergeParams: true });
const Campground = require('../models/campground');
const Comment = require('../models/comment');

//= ==========================
// COMMENTS routes
//= ==========================

router.get('/new', isLoggedIn, (req, res) => {
  // Find campground by id
  Campground.findById(req.params.id, (err, foundCampground) => {
    if (err) {
      console.log(err);
    } else {
      res.render('comments/new', { campground: foundCampground });
    }
  });
});

router.post('/', isLoggedIn, (req, res) => {
  Comment.create(req.body.comment, (err, newComment) => {
    if (err) {
      console.log(err);
      res.redirect('/campgrounds');
    } else {
      Campground.findById(req.params.id, (err, foundCampground) => {
        if (err) {
          console.log(err);
          res.redirect('/campgrounds');
        } else {
          foundCampground.comments.push(newComment);
          foundCampground.save();
          res.redirect(`/campgrounds/${req.params.id}`);
        }
      });
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
