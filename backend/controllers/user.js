const User = require("../Models/User");
const Post = require("../Models/Post");
const generateToken = require("../utils/generateToken");
const { hashPassword } = require("../utils/hashPassword");
const { destroy } = require("../utils/cloudinaryConfig");

const register = async (req, res) => {
  const user = await new User({
    typeRegister: req.body.registerType,
    name: req.body.name,
    email: req.body.email,
    userId: req.body.userId,
    accessToken: req.body.accessToken,
    profilePic: req.body.profilePic,
    password: req.body.password,
  });
  user.password = user.password
    ? await hashPassword(req.body.password)
    : undefined;
  if (!user)
    return res
      .status(500)
      .send({ success: false, message: "Registration failed!" });
  const result = await user.save();
  if (!result)
    return res
      .status(500)
      .send({ success: false, message: "Registration failed!" });

  const token = await generateToken(result.email, result.name);
  res
    .status(200)
    .send({ success: true, message: "Registration successful", token: token });
};

const login = async (req, res) => {};

const user = async (req, res) => {
  // console.log(req);
  const user = await User.findById(req.user._id);
  if (!user)
    return res
      .status(500)
      .send({ success: false, message: "Failed fetching user data!" });
  res.status(200).send({
    success: true,
    message: "Successfully fetched user data",
    data: user,
  });
};

const viewUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user)
    return res.status(404).send({ success: false, message: "User not found!" });
  res.status(200).send({
    success: true,
    message: "successfully fetched the data",
    data: user,
  });
};

const post = async (req, res) => {
  const post = new Post({
    title: req.body.title,
    about: req.body.about,
    category: req.body.category,
    image: req.body.imageAsset,
    postedBy: req.user._id,
  });
  if (!post)
    return res
      .status(500)
      .send({ success: false, message: "Failed to save pin!" });

  const result = await post.save();
  if (!result)
    return res
      .status(500)
      .send({ success: false, message: "Failed to save pin!" });
  res
    .status(200)
    .send({ success: true, message: "Successfully saved the pin" });
};

const pinDetails = async (req, res) => {
  const pin = await Post.findById(req.params.id).populate("postedBy");
  if (!pin)
    return res.status(404).send({ success: false, message: "Pin not found!" });
  res.status(200).send({
    success: true,
    message: "Successfully fetched the data",
    data: pin,
  });
};

const uploadImage = (req, res) => {
  res.json({ picture: req.file.path });
};

const deleteUploaded = async (req, res) => {
  try {
    const url = req.body.url;
    await destroy(url);
    res
      .status(200)
      .send({ success: true, message: "Image deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Server Error" });
  }
};

module.exports = {
  register,
  login,
  user,
  viewUser,
  uploadImage,
  deleteUploaded,
  post,
  pinDetails,
};
