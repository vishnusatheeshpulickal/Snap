const express = require("express");
const router = express.Router();
const { register, login, socialLogin } = require("../controllers/user");

router.post("/register", register);
router.post("/sociallogin", socialLogin);
router.post("/login", login);

module.exports = router;
