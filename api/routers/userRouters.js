const express = require("express");
const { login, register } = require("../controllers/userControllers");
const hash = require("../helper/hash");
const { User, Role } = require("../models");
const router = express.Router();

// Login
router.post("/login", login);

// Register
router.post("/register", register);

module.exports = router;
