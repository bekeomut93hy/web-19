const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
    content : {
        type : String ,
        required : true   // dinh nghia truong bat buoc
    },
    yes : {
        type : Number,
        default : 0,
        required : true
    },
    no : {
        type : Number,
        default : 0,
        required : true
    },
    creatAt : {
        type : Date,
        default : Date.now,
        required : true
    }
});

const questionModel = mongoose.model('Cauhoi', QuestionSchema);
module.exports = questionModel;

