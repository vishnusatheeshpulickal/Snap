const User = require("../Models/User");
const Post = require("../Models/Post");
const generateToken = require("../utils/generateToken");
const { hashPassword } = require("../utils/hashPassword");
const { destroy } = require("../utils/cloudinaryConfig");
const bcrypt = require("bcrypt");
const { sendMail } = require("../services/mail");

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
  await sendMail(req.body.email, req.body.name);
  if (!result)
    return res
      .status(500)
      .send({ success: false, message: "Registration failed!" });

  const token = await generateToken(result.email, result.name);
  res
    .status(200)
    .send({ success: true, message: "Registration successful", token: token });
};

const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res
      .status(400)
      .send({ success: false, message: "Incorrect password or email!" });
  if (!bcrypt.compareSync(req.body.password, user.password))
    return res
      .status(400)
      .send({ success: false, message: "Invalid username or password!" });
  const token = generateToken(user.email);
  res.status(200).send({
    success: true,
    message: "Successfully loggedIn",
    token,
  });
};

const socialLogin = async (req, res) => {
  const user = await User.findOne({
    userId: req.body.userId,
    typeRegister: req.body.type,
  });
  if (!user)
    return res
      .status(400)
      .send({ success: false, message: "Incorrect password or email!" });
  user.accessToken = req.body.accessToken;
  const result = await user.save();
  if (!result)
    return res.status(400).send({ success: false, message: "Login failed!" });
  const token = generateToken(user.email);
  res
    .status(200)
    .send({ success: true, message: "Successfully loggedin", token });
};

const user = async (req, res) => {
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
    destination: req.body.destination,
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

const createdPins = async (req, res) => {
  const pins = await Post.find({ postedBy: req.params.id }).populate(
    "postedBy"
  );
  if (!pins)
    return res
      .status(500)
      .send({ success: false, message: "Failed to fetch the data!" });
  res.status(200).send({
    success: true,
    message: "Successfully fetched the data",
    data: pins,
  });
};

const viewPins = async (req, res) => {
  const pins = await Post.find().populate("postedBy");
  if (!pins)
    return res
      .status(500)
      .send({ success: false, message: "Failed to fetch the data!" });
  res.status(200).send({
    success: true,
    message: "Successfully fetched the data!",
    data: pins,
  });
};

const viewCategoryPins = async (req, res) => {
  const pins = await Post.find({ category: req.params.category }).populate(
    "postedBy"
  );
  if (!pins)
    return res
      .status(500)
      .send({ success: false, message: "Failed to fetch the data!" });
  res.status(200).send({
    success: true,
    message: "Successfully fetched the data!",
    data: pins,
  });
};

const savePin = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user)
    return res.status(200).send({ success: false, message: "User not found!" });
  user.savedPins.push(req.body.pinId);
  const result = await user.save();
  if (!result)
    return res.status(500).send({ success: false, message: "Failed to save!" });
  res.status(200).send({ success: true, message: "Successfully saved" });
};

const deletePin = async (req, res) => {
  const pin = await Post.findByIdAndDelete(req.body.pinId);
  if (!pin)
    return res
      .status(404)
      .send({ success: false, message: "Failed to delete pin!" });
  await destroy(pin.image);
  res.status(200).send({ success: true, message: "Successfully deleted Pin" });
};

const savedPins = async (req, res) => {
  const pins = await User.findById(req.params.id)
    .populate({
      path: "savedPins",
      model: "Post",
      populate: {
        path: "postedBy",
        model: "User",
      },
    })
    .select("savedPins");
  if (!pins)
    return res
      .status(400)
      .send({ success: false, message: "Failed to fetch the data!" });
  res.status(200).send({
    success: true,
    message: "Successfully fetched the data",
    data: pins,
  });
};

const searchPin = async (req, res) => {
  console.log(req.body.searchTerm);
  const regex = new RegExp(req.body.searchTerm, "i");
  const pins = await Post.find({ title: regex }).populate("postedBy");
  if (!pins)
    return res
      .status(500)
      .send({ success: false, message: "Failed to fetch the data" });
  res.status(200).send({
    success: false,
    message: "Successfully fetched the data",
    data: pins,
  });
};

module.exports = {
  register,
  login,
  socialLogin,
  user,
  viewUser,
  uploadImage,
  deleteUploaded,
  post,
  pinDetails,
  createdPins,
  viewPins,
  savePin,
  deletePin,
  savedPins,
  viewCategoryPins,
  searchPin,
};
