const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  username: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
    minlength: 3,
    maxlength: 10,
  },
  email: String,
  password: String,
});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);
