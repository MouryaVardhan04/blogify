app.get("/moreblogs" ,async (req,res)=>{
    const allBlogs = await Blog.find({});
    res.render("moreblogs",{
        user : req.user,
        blogs: allBlogs,
    });
});