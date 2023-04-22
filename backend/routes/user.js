const express = require("express");
const router = express.Router();
const {
  user,
  viewUser,
  uploadImage,
  deleteUploaded,
  post,
  pinDetails,
} = require("../controllers/user");
const { protect } = require("../middlewares/auth");
const { upload } = require("../utils/cloudinaryConfig");

router.get("/user", protect, user);
router.get("/viewuser/:id", protect, viewUser);
router.post("/uploadimage", protect, upload.single("image"), uploadImage);
router.post("/deleteuploaded", protect, deleteUploaded);
router.post("/newpin", protect, post);
router.get("/pindetails/:id", protect, pinDetails);

module.exports = router;
