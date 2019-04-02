const express = require("express");
const authRouter = express();
const brcyptjs = require("bcryptjs");
const UserModel = require("../users/models");
// register
authRouter.post("/register", async (req, res) => {
  try {
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header(
    //   "Access-Control-Allow-Headers",
    //   "Origin, X-Requested-With, Content-Type, Accept"
    // );
    // check email/password/firstName/lastName emopty
    // check email exist
    // checkpassword regex
    const userInfo = req.body;
    const hashPassword = await brcyptjs.hash(userInfo.password, 10);
    const newUser = await UserModel.create({
      ...userInfo,
      password: hashPassword,
      permissions : ["POST_CREATE"]
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).end(error.message);
  }
});
// register check valid empty
authRouter.post("/register/checkvalid", async (req, res) => {
  try {
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header(
    //   "Access-Control-Allow-Headers",
    //   "Origin, X-Requested-With, Content-Type, Accept"
    // );
    const validemail = /^([\w]*[\w\.]*(?!\.)@gmail.com)$/;
    const validpassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[A-Za-z0-9_#@%\*\-]{6,}$/;
    const checkInfo = req.body;
    let isExist = false ;
    let isValid = true ;
    let isNull = false;
    if(checkInfo.value === "") isNull = true ;
    else if(checkInfo.type === "email"){
      const userExist = await UserModel.findOne({email : checkInfo.value});
      if(userExist) isExist = true;
      if(!checkInfo.value.match(validemail)) isValid = false; 
    }
    else if(checkInfo.type === "password"){
      if(!checkInfo.value.match(validpassword)) isValid = false;
    }
     res.status(201).json({isExist , isValid , isNull , type : checkInfo.type});
  } catch (error) {
    res.status(500).end(error.message);
  }
});
// login
authRouter.post("/login", async (req, res) => {
  try {
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header(
    //   "Access-Control-Allow-Headers",
    //   "Origin, X-Requested-With, Content-Type, Accept"
    // );
    const loginInfo = req.body;

    const user = await UserModel.findOne({ email: loginInfo.email }).exec();
    if (!user) {
      res.status(404).json({ message: "User not found", success: false });
    } else {
      const comparePassword = await brcyptjs.compare(
        loginInfo.password,
        user.password
      );
      if (comparePassword) {
        // save session storage
        req.session.user = {
          _id: user._id,
          email: user.email,
          permissions: user.permissions.length > 0 ? user.permissions : []
        };
        req.session.save();
        res.status(201).json({
          message: "Login sucess",
          success: true
        });
      } else {
        res.status(200).json({
          message: "Password is not correct",
          success: false
        });
      }
    }
  } catch (error) {
    res.status(500).end(error.message);
  }
});
// logout
authRouter.get("/logout", async (req, res) => {
  try {
    req.session.destroy();
    res.status(200).json({
      message: "logout success",
      success: true
    });
  } catch (error) {
    res.status(500).end(error.message);
  }
});
authRouter.post("/test", (req, res) => {
  console.log(req.session.user);
  res.status(200).json(req.session.user);
});
module.exports = authRouter;
