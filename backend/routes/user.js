const express = require("express");
const router = express.Router();
const {
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
} = require("../controllers/user");
const { protect } = require("../middlewares/auth");
const { upload } = require("../utils/cloudinaryConfig");

router.get("/user", protect, user);
router.get("/viewuser/:id", protect, viewUser);
router.post("/uploadimage", protect, upload.single("image"), uploadImage);
router.post("/deleteuploaded", protect, deleteUploaded);
router.post("/newpin", protect, post);
router.get("/pindetails/:id", protect, pinDetails);
router.get("/createdpins/:id", protect, createdPins);
router.get("/viewPins", protect, viewPins);
router.get("/viewpins/:category", protect, viewCategoryPins);
router.post("/savepin", protect, savePin);
router.post("/deletepin", protect, deletePin);
router.get("/savedPins/:id", protect, savedPins);
router.post("/search", searchPin);

module.exports = router;
