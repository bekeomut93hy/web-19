const express = require("express");
const path = require("path");
const server = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const point = require("./model");
server.use(express.static("public"));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
mongoose.connect("mongodb://localhost:27017/Point", async err => {
  server.get("/", (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, "./public/main.html"));
  });
  server.post("/get-started", async (req, res) => {
    let id = 0;
    console.log(await point.count());
    id = (await point.count()) / 4;

    point.create({
      gameID: id,
      player: req.body.player1
    });
    point.create({
      gameID: id,
      player: req.body.player2
    });
    point.create({
      gameID: id,
      player: req.body.player3
    });
    point.create({
      gameID: id,
      player: req.body.player4
    });
    res.status(200).json({ url: id });
  });
  server.get("/game/:id", (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, "./public/play.html"));
  });
  server.get("/get-player/:id", async (req, res) => {
    const id = req.params.id;
    let roundplayer = await point.find({ gameID: id });
    res
      .status(200)
      .json({
        player1: roundplayer[0].player,
        player2: roundplayer[1].player,
        player3: roundplayer[2].player,
        player4: roundplayer[3].player,
        playertotal1: roundplayer[0].total,
        playertotal2:roundplayer[1].total,
        playertotal3: roundplayer[2].total,
        playertotal4: roundplayer[3].total
      });
  });
  server.post("/get-score/:id", async (req, res) => {
    const id = req.params.id;
    let roundplayer = await point.find({ gameID: id });
    await point.updateOne(
      { player: roundplayer[0].player },
      {
        $inc: { total: parseFloat(req.body.score1) },
        $push: { point: parseFloat(req.body.score1) }
      }
    );
    await point.updateOne(
      { player: roundplayer[1].player },
      {
        $inc: { total: parseFloat(req.body.score2) },
        $push: { point: parseFloat(req.body.score2) }
      }
    );
    await point.updateOne(
      { player: roundplayer[2].player },
      {
        $inc: { total: parseFloat(req.body.score3) },
        $push: { point: parseFloat(req.body.score3) }
      }
    );
    await point.updateOne(
      { player: roundplayer[3].player },
      {
        $inc: { total: parseFloat(req.body.score4) },
        $push: { point: parseFloat(req.body.score4) }
      }
    );
    roundplayer = await point.find({ gameID: id });
    res
      .status(200)
      .json({
        total1: roundplayer[0].total,
        total2: roundplayer[1].total,
        total3: roundplayer[2].total,
        total4: roundplayer[3].total
      });
  });
  server.listen(8080, err => {
    if (err) throw err;
    console.log("Server listen on port 8080");
  });
});
