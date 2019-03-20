const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
    gameID :{
        type : Number,
        required : true
    },
    player : {
        type : String ,
        required : true   // dinh nghia truong bat buoc
    },
    point : {
        type : Array,
        default : 0,
        required : true
    },
    total :{
        type : Number,
        default : 0,
        required : true
    }
});

const questionModel = mongoose.model('Diemso', QuestionSchema);
module.exports = questionModel;

