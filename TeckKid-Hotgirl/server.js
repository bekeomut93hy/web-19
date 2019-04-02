const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const expressSecssion = require("express-session");
const bodyParser = require("body-parser");
const userRouter = require("./api/users/routes");
const postRouter = require("./api/posts/routes");
const authRouterView = require("./routes/authroutes");
const postRouterView = require("./routes/postroutes");
const authRouter = require("./api/auth/routes");
mongoose.connect("mongodb://localhost:27017/hotgirl", async err => {
  if (err) throw err;
  console.log("Connect to mongo success");

  const server = express();
  //set view
  server.set("views", path.join(__dirname, "views"));
  server.engine("html", require("ejs").renderFile);
  server.set("view engine", "html");
  // middleware
  server.use(express.static(path.join(__dirname + "/public")));
  server.use(
    "/javascripts",
    express.static(path.join(__dirname + "/javascripts"))
  );
  server.use(
    "/stylesheets",
    express.static(path.join(__dirname + "/stylesheets"))
  );
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());
  server.use(
    expressSecssion({
      secret: "ditme",
      resave: false,
      proxy: true,
      saveUninitialized: true
    })
  );
  //routers
  server.use("/api/users", userRouter);
  server.use("/api/posts", postRouter);
  server.use("/api/auth", authRouter);
  server.use("/auth", authRouterView);
  server.use("/post", postRouterView);
  // start server
  server.listen(3000, err => {
    if (err) throw err;
    console.log("Server listen on port 3000");
  });
});
