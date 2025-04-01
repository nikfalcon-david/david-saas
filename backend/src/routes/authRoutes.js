const express = require("express");
const router = express.Router();
const { register, login, googleAuth } = require("../controllers/authController");

// Try-Catch wrapper function to handle async errors
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Routes
router.post("/register", asyncHandler(register));
router.post("/login", asyncHandler(login));
router.post("/auth/google", asyncHandler(googleAuth));

module.exports = router;