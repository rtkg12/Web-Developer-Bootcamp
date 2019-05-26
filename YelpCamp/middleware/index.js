//ALL the middleware goes here
const Campground = require('../models/campground'),
  Comment = require('../models/comment');
const middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
  //Is user logged in
  if (req.isAuthenticated()) {
    Campground.findById(req.params.id, function(err, foundCampground) {
      if (err) {
        console.log(err);
        res.redirect('back');
      } else {
        //Does user own campground
        if (foundCampground.author.id.equals(req.user._id)) {
          next();
        } else {
          res.redirect('back');
        }
      }
    });
  } else {
    res.redirect('back');
  }
};

middlewareObj.checkCommentOwnership = function(req, res, next) {
  // If user is logged in
  if (req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
      if (err) {
        console.log(err);
        res.redirect('back');
      } else {
        //Check if user owns comment
        if (foundComment.author.id.equals(req.user._id)) {
          next();
        } else {
          res.redirect('back');
        }
      }
    });
  } else {
    res.redirect('back');
  }
};

middlewareObj.isLoggedIn = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

module.exports = middlewareObj;
