const express = require("express");
const postRouter = express();
postRouter.get("/create-post", (req,res)=>{
    res.status(200).render('create-post');
})
module.exports = postRouter;
