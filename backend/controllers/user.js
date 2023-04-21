const User = require("../Models/User");
const generateToken = require("../utils/generateToken");
const { hashPassword } = require("../utils/hashPassword");

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

module.exports = { register, login, user, viewUser };
