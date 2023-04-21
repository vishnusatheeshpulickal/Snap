const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: {
    type: String,
  },
  about: {
    type: String,
  },
  category: {
    type: String,
  },
  image: {
    type: String,
  },
  destination: {
    type: String,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
