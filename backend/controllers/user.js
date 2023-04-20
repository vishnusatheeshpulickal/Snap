const User = require("../Models/User");

const register = async (req, res) => {
  const user = await new User({
    typeRegister: req.body.registerType,
    name: req.body.name,
    email: req.body.email,
    userID: req.body.userId,
    accessToken: req.body.accessToken,
    profilePic: req.body.profilePic,
    password: req.body.password,
  });
  if (!user)
    return res
      .status(500)
      .send({ success: false, message: "Registration failed!" });
  const result = await user.save();
  if (!result)
    return res
      .status(500)
      .send({ success: false, message: "Registration failed!" });
  res.status(200).send({ success: true, message: "Registration successful" });
};

const login = async (req, res) => {};

module.exports = { register, login };
