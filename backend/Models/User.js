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
    default:
      "https://res.cloudinary.com/vishnusatheesh/image/upload/v1682066569/Snap/user_1_qnowjs.png",
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
  savedPins: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
