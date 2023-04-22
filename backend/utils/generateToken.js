const jwt = require("jsonwebtoken");
require("dotenv/config");

const generateToken = (id, name) => {
  const token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 10,
      id: id,
      name: name,
    },
    process.env.Secret_Code
  );
  return token;
};

module.exports = generateToken;
