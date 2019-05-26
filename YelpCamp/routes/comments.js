const express = require('express');
const router = express.Router({ mergeParams: true });
const Campground = require('../models/campground');
const Comment = require('../models/comment');
const middleware = require('../middleware');

//= ==========================
// COMMENTS routes
//= ==========================

router.get('/new', middleware.isLoggedIn, (req, res) => {
  // Find campground by id
  Campground.findById(req.params.id, (err, foundCampground) => {
    if (err) {
      console.log(err);
    } else {
      res.render('comments/new', { campground: foundCampground });
    }
  });
});

router.post('/', middleware.isLoggedIn, (req, res) => {
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
          //Add username and id to comment
          newComment.author.id = req.user._id;
          newComment.author.username = req.user.username;
          //Save comment
          newComment.save();
          foundCampground.comments.push(newComment);
          foundCampground.save();
          res.redirect(`/campgrounds/${req.params.id}`);
        }
      });
    }
  });
});

// UPDATE route
router.get('/:comment_id/edit', middleware.checkCommentOwnership, function(req, res) {
  Comment.findById(req.params.comment_id, function(err, foundComment) {
    if (err) {
      console.log(err);
      res.redirect('/campgrounds/' + req.params.id);
    } else {
      res.render('comments/edit', { campground_id: req.params.id, currComment: foundComment });
    }
  });
});

router.put('/:comment_id', middleware.checkCommentOwnership, function(req, res) {
  const updatedComment = req.body.comment;
  console.log(updatedComment);
  Comment.findByIdAndUpdate(req.params.comment_id, updatedComment, function(err) {
    if (err) {
      console.log(err);
      res.redirect('back');
    } else {
      res.redirect('/campgrounds/' + req.params.id);
    }
  });
});

//DESTROY routes
router.delete('/:comment_id', middleware.checkCommentOwnership, function(req, res) {
  Comment.findByIdAndRemove(req.params.comment_id, function(err) {
    if (err) {
      console.log(err);
      res.redirect('back');
    } else {
      res.redirect('/campgrounds/' + req.params.id);
    }
  });
});

module.exports = router;
