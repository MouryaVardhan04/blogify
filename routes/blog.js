const { Router } = require("express");
const multer = require("multer");
const path = require("path");
const Blog = require("../models/blog");
const Comment = require("../models/comment");
const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads/`));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

// Middleware to check if a user is the owner of the blog
const isOwner = async (req, res, next) => {
  const blog = await Blog.findById(req.params.id || req.params.blogId);
  if (blog && blog.createdBy.equals(req.user._id)) {
    return next();
  }
  res.status(403).send("Unauthorized");
};

router.get("/moreblogs" ,async (req,res)=>{
  const allBlogs = await Blog.find({});
  res.render("moreblogs",{
      user : req.user,
      blogs: allBlogs,
  });
});

router.get("/add-new", (req, res) => {
  const user = req.user;
  return res.render("addBlog", {
    user: user,
    fullName: user.fullName,
  });
});

router.get("/search", async (req, res) => {
  const query = req.query.q || ""; // Get the search query from the URL parameters
  try {
    // Use regex to perform a case-insensitive search
    const regex = new RegExp(query, "i");

    // Find blogs that match the search query in any of the specified fields
    const blogs = await Blog.find({
      $or: [
        { title: regex },
        { description: regex },
        { body: regex },
      ],
    });
    if (blogs.length === 0) {
      // Redirect to homepage if no blogs are found
      return res.redirect("/");
    }

    res.render("search_results", {
      
      user: req.user,
      blogs,
      query,
    });
  } catch (error) {
    console.error("Error during search:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("createdBy");
  const comments = await Comment.find({ blogId: req.params.id }).populate(
    "createdBy"
  );

  return res.render("blog", {
    user: req.user,
    blog,
    comments,
  });
});



router.post("/like/:blogId", async (req, res) => {
  const blog = await Blog.findById(req.params.blogId);
  const user = req.user;

  if (!blog.likes.includes(user._id)) {
    blog.likes.push(user._id);
    await blog.save();
  }

  return res.redirect(`/blog/${req.params.blogId}`);
});

router.post("/unlike/:blogId", async (req, res) => {
  const blog = await Blog.findById(req.params.blogId);
  const user = req.user;

  if (blog.likes.includes(user._id)) {
    const index = blog.likes.indexOf(user._id);
    blog.likes.splice(index, 1);
    await blog.save();
  }

  return res.redirect(`/blog/${req.params.blogId}`);
});



router.post("/comment/:blogId", async (req, res) => {
  await Comment.create({
    content: req.body.content,
    blogId: req.params.blogId,
    createdBy: req.user._id,
  });
  return res.redirect(`/blog/${req.params.blogId}`);
});


router.get("/edit/:id", isOwner, async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if(!blog){
    console.log("Not Found");
  }
  res.render("edit_blog",{
    blog,
    user : req.user
  })
});


router.post("/edit/:id", isOwner, upload.single("coverImage"), async (req, res) => {
  const { title, description, body } = req.body;
  const update = {
    title,
    description,
    body,
  };
  if (req.file) {
    update.coverImageURL = `/uploads/${req.file.filename}`;
  }
  await Blog.findByIdAndUpdate(req.params.id, update);
  return res.redirect(`/blog/${req.params.id}`);
});


router.post("/delete/:id", isOwner, async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  return res.redirect("/blog/moreblogs");
});


router.post("/", upload.single("coverImage"), async (req, res) => {
  const { title,description, body } = req.body;
  const blog = await Blog.create({
    body,
    description,
    title,
    createdBy: req.user._id,
    coverImageURL: `/uploads/${req.file.filename}`,
  });
  return res.redirect(`/blog/${blog._id}`);
});




module.exports = router;