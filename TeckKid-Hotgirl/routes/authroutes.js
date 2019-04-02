const express = require("express");
const authRouter = express();
authRouter.get("/register", (req,res)=>{
    res.status(200).render('register');
})
authRouter.get("/login", (req,res)=>{
    res.status(200).render('login');
})
module.exports = authRouter;
