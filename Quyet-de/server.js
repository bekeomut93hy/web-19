const express = require("express");
const path = require("path");
const server = express();
//const HTMLParser = require('node-html-parser');
const fs = require("fs"); // doc file
const bodyParser = require("body-parser"); // chuyen doi du lieu khi gui ve server
server.use(express.static("public"));
server.use(express.static("home_page"));
server.use(express.static("result"));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.get("/", (request, respone) => {
  console.log("Request to route / ");
  respone
    .status(200)
    .sendFile(path.resolve(__dirname, "./home_page/home_page.html"));
  // let question = getRandomQues();
  // let htmlSource = fs.readFileSync("./home_page/home_page.html", "utf8");
  // htmlSource = htmlSource.replace(
  //   "./api/question/",
  //   "./api/question/" + question.id.toString()
  // );
  // respone.status(200).send(htmlSource.replace("{question}", question.content));
});

server.post("/create-question", (req, res) => {
  // id ,content, yes, no , creatTime

  fs.readFile("./data.json", (err, data) => {
    if (err) {
      res.status(500).send("Internal server error");
    }
    const question = JSON.parse(data);
    question.push({
      id: question.length,
      content: req.body.content,
      yes: 0,
      no: 0,
      creatAt: new Date().toLocaleString()
    });
    fs.writeFile("data.json", JSON.stringify(question), err => {
      if (err) throw err;
    });
  });
    res.status(200).json({"url" : "/"} );
});
server.listen(3000, err => {
  if (err) throw err;
  console.log("Server listen on port 3000...");
});

// API

//let data = JSON.parse(fs.readFileSync("data.json"));
// server.get("/api", (req, res) => {
//   console.log("Request to creat");
//   res.send("adu");

// });
// server.get("/api/data", (req,res) => {

//   res.json(data);
// });

// CLick yes , no sida
// server.post("/api/question/:id", (req, res) => {
//   let dataId = parseInt(req.params.id, 10);
//   let check;
//   let number;
//   let htmlSource = fs.readFileSync("./result/result.html", "utf8");
//   let yesPercent = 0;
//   let noPercent = 0;
//   data.forEach(data => {
//     if (data.id == dataId) {
//       check = data;
//       number = data.id;
//     }
//   });
//   if (req.body["btn-click"] == "yes") {
//     data[number].yes++;
//   }
//   if (req.body["btn-click"] == "no") {
//     data[number].no++;
//   }
//   if (req.body["btn-click"] == "cauhoikhac") {
//     res.redirect(req.get("referer"));
//   }
//   if (data[number].yes == data[number].no) {
//     yesPercent = "50%";
//     noPercent = "50%";
//   } else {
//     yesPercent =
//       caculatorPer(
//         parseInt(data[number].yes / (data[number].yes + data[number].no))
//       ) *
//         100 +
//       "%";
//     noPercent =
//       caculatorPer(
//         parseInt(data[number].no / (data[number].yes + data[number].no))
//       ) *
//         100 +
//       "%";
//   }
//   htmlSource = htmlSource.replace(/{yeswidth}/g, yesPercent);
//   htmlSource = htmlSource.replace(/{nowidth}/g, noPercent);
//   htmlSource = htmlSource.replace("{question}", data[number].content);
//   htmlSource = htmlSource.replace(
//     "{number}",
//     data[number].yes + data[number].no
//   );
//   htmlSource = htmlSource.replace("{action}", "/");
//   fs.writeFileSync("data.json", JSON.stringify(data));
//   res.status(201).send(htmlSource);
// });

// server.put('/vote/:questionId/:vote', async(req,res) =>{
//   const {questionId , vote} = req.params;
// })
server.get("/result/:questionId", (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, "./public/voteresult.html"));
});
server.get("/get-random-question", (req, res) => {
  const question = getRandomQues();
  res.status(200).json(question);
});
server.post("/click", (req, res) => {
  const { questionId, value } = req.query;
  fs.readFile("./data.json", (err, data) => {
    if (err) res.status(501).send("Internal server error");
    data = JSON.parse(data);
    switch (value) {
      case "yes":
        data[Number(questionId)].yes++;
        break;
      case "no":
        data[Number(questionId)].no++;
        break;
    }
    fs.writeFileSync("./data.json", JSON.stringify(data));
   res.status(201).json({"url":`/result/${questionId}`});
  });
});
server.get("/get-question-by-id", (req, res) => {
  const questionId = req.query.questionId;
  fs.readFile("./data.json", (err, data) => {
    if (err) {
      res.status(500).send("Internal server error");
    }
    const questions = JSON.parse(data);
    let selectQuestion;
    for (let item of questions) {
      if (item.id === Number(questionId)) {
        selectQuestion = item;
        break;
      }
    }
    if (selectQuestion) {
      res.status(200).json(selectQuestion);
    } else {
      res.status(200).json({ message: "Question not found" });
    }
  });
});
function caculatorPer(x) {
  return Number(x).toFixed(2);
}
function getRandomQues() {
  const arraydata = JSON.parse(fs.readFileSync("data.json", "utf8"));
  const index = Math.floor(Math.random() * arraydata.length);
  return arraydata[index];
}
