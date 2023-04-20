const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  typeRegister: {
    type: String,
    default: "email",
  },
  name: {
    type: String,
  },
  profilePic: {
    type: String,
    default: "",
  },
  password: {
    type: String,
  },
  userId: {
    type: String,
  },
  email: {
    type: String,
  },
  accessToken: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
