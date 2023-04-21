const express = require("express");
const router = express.Router();
const { user } = require("../controllers/user");
const { protect } = require("../middlewares/auth");

router.get("/user", protect, user);

module.exports = router;
