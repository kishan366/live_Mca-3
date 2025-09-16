const express = require("express");
const router = express.Router();
const multer = require("multer");
const { registerUser, loginUser } = require("../controllers/authController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// POST /api/auth/register
router.post("/register", upload.single("profileImage"), registerUser);

// POST /api/auth/login
router.post("/login", loginUser);

module.exports = router;
