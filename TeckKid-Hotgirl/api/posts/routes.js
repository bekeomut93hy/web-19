const express = require("express");
const postRouter = express();
const post = require("./models");
postRouter.post("/", async (req, res) => {
  try {
    if (!req.session.user) {
      res.status(403).json({
        message: "Unauthenticated"
      });
    }
    if (
      req.session.user &&
      req.session.user.permissions.indexOf("POST_CREATE") > -1
    ) {
      const postInfo = req.body;
      const newPost = await post.create({...postInfo , author : req.session.user._id});
      res.status(201).json(newPost);
    } else {
      res.status(201).json({
        message: "Unauthorized"
      });
    }
  } catch (err) {
    res.status(500).end(err.message);
  }
});
postRouter.get("/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    const postInfo = await post
      .findById(postId)
      //   .populate("author", "email firstName createdAt")
      .populate({
        path: "author",
        select: "email firstName lastName createdAt"
      })
      .exec();
    res.status(200).json(postInfo);
  } catch (error) {
    res.status(500).end(error.message);
  }
});
postRouter.get("/", async (req, res) => {
  try {
    const { pageNumber, pageSize } = req.query;
    //const totalPost = await post.countDocuments().exec();
    const data = await post
      .find()
      .skip(Number(pageNumber - 1) * Number(pageSize))
      .limit(Number(pageSize))
      //.sort({createdAt : -1})
      .exec();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).end(error.message);
  }
});
module.exports = postRouter;
