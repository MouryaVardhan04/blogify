const path = require("path");
const express = require("express");
const userRoute = require('./routes/user');
const blogRoute = require('./routes/blog');
const Blog = require('./models/blog')
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { checkForAuthenticationCookie } = require("./middlewares/authentication");
const app = express();
const PORT = 8000;
 
mongoose.connect('mongodb://localhost:27017/blogify')
.then((e)=>console.log("Mongodb Connected"));
app.set("view engine","ejs");
app.set("views",path.resolve("./views"))

app.use(express.urlencoded({extended : false}))
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"))
app.use(express.static('public'));


app.use((req, res, next) => {
    res.locals.user = req.user; // Assuming `req.user` contains the authenticated user
    next();
  });
  

app.use(express.static(path.resolve('./public')))
 
app.get("/" ,async (req,res)=>{
    const allBlogs = await Blog.find({});
    const topblog = await Blog.find().sort({ likes: -1 }).limit(1);
    const topBlog = topblog[0];
    res.render("home",{
        user : req.user,
        blogs: allBlogs,
        topBlog
    });
});

app.use("/user",userRoute);
app.use("/blog",blogRoute);

app.listen(PORT,()=>console.log(`Server started at Port : ${PORT}`));