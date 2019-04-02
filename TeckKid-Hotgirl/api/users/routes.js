const express = require("express");
const userRouters = express();
const user = require("./models");
userRouters.post("/", async (req, res) => {
  try {
    const existEmail = await user.findOne({ email: req.body.email }).exec();
    if (existEmail) {
      res.status(403).end("Email da bi su dung");
    }
    //save to db
    const userInfo = req.body;
    const newUser = await user.create(userInfo);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).end(error.message);
  }
});
module.exports = userRouters;
