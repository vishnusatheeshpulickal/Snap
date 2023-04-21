const express = require("express");
const router = express.Router();
const { user, viewUser } = require("../controllers/user");
const { protect } = require("../middlewares/auth");

router.get("/user", protect, user);
router.get("/viewuser/:id", protect, viewUser);

module.exports = router;
