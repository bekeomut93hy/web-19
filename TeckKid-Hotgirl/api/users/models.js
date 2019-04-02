// user models
// email (uniq)
// password
// fbId
//first Name
//last Name
//avatarUrl
//createdAt
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const user = new Schema({
  email: {
    type: String,
    required: true,
    //unique: true
    // unique : duy nhat
  },
  password: String,
  fbId: String,
  firstName: String,
  lastName: String,
  avatarUrl: String,
  createdAt: {
      type : Date,
      default : new Date().toUTCString()
  },
  permissions : [String],

});
const UserModel = mongoose.model('User',user);
module.exports = UserModel;
