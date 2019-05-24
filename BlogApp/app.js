const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  methodOverride = require("method-override"),
  expressSanitizer = require("express-sanitizer");

// App Config
mongoose.connect("mongodb://localhost:27017/blog_app", {
  useNewUrlParser: true
});
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(expressSanitizer());

//Mongoose Model Config
const blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: { type: Date, default: Date.now }
});

const Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//   title: "Test Blog",
//   image:
//     "https://d2u4q3iydaupsp.cloudfront.net/2PiK3P0orm8BdqHaAnF7pfgANE6MYXbJQjDhp5sgB1WNtYLm9SyXPhjixHGeeek4rXR8vetqvEAlAJNgXst4uyREzzqXE6cYcRE4hoSDsxqlJ94qlY7CmBLYu0Y88pqw",
//   body: "This is a test blog"
// });

app.get("/", function(req, res) {
  res.redirect("/blogs");
});

//INDEX route
app.get("/blogs", function(req, res) {
  Blog.find({}, function(err, blogs) {
    if (err) {
      console.log(err);
    } else {
      res.render("index", { blogs: blogs });
    }
  });
});

//NEW route
app.get("/blogs/new", function(req, res) {
  res.render("new");
});

//CREATE route
app.post("/blogs", function(req, res) {
  //Sanitize input i.e. remove scripts and JS
  req.body.blog.body = req.sanitize(req.body.blog.body);
  //Create blog
  Blog.create(req.body.blog, function(err, newBlog) {
    if (err) {
      res.render("new");
    } else {
      res.redirect("/blogs");
    }
  });
});

//SHOW route
app.get("/blogs/:id", function(req, res) {
  Blog.findById(req.params.id, function(err, foundBlog) {
    if (err) {
      res.redirect("/blogs");
    } else {
      res.render("show", { blog: foundBlog });
    }
  });
});

//EDIT route
app.get("/blogs/:id/edit", function(req, res) {
  Blog.findById(req.params.id, function(err, foundBlog) {
    if (err) {
      res.redirect("/blogs");
    } else {
      res.render("edit", { blog: foundBlog });
    }
  });
});

//UPDATE route
app.put("/blogs/:id", function(req, res) {
  //Sanitize input i.e. remove scripts and JS
  req.body.blog.body = req.sanitize(req.body.blog.body);
  Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(
    err,
    updatedBlog
  ) {
    if (err) {
      red.redirect("blogs");
    } else {
      red.redirect("/blogs/" + req.params.id);
    }
  });
});

//DESTROY route
app.delete("/blogs/:id", function(req, res) {
  //Destroy blog
  Blog.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      res.redirect("/blogs");
    } else {
      res.redirect("/blogs");
    }
  });
});

app.listen(3000, function() {
  console.log("Blog App Server started");
});
