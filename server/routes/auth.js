const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
require('dotenv').config();

const User = require('../models/User');
const saltRounds = 10;

// @route   POST auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', async (req, res) => {
  const password = req.body.password;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);

  } catch (error) {
    res.status(500).send(error);
  }
});


// @route   POST auth/login
// @desc    Log-in an existing user
// @access  Public
router.post('/login', async (req, res) => {
  const email = req.body.email;
  const pass = req.body.password;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(401).json({
        status: "failed",
        message: "This email doesn't exist"
      });
    }
    const passwordMatch = await bcrypt.compare(pass, user.password);
    if (!passwordMatch) {
      res.status(401).json({
        status: "failed",
        message: "email or password don't match"
      });
    } else {
      // Extract password from the user document and sends the remaining entities in the document.
      const { password, ...remaining } = user._doc;

      const accessToken = jwt.sign({
        id: user._id,
        isAdmin: user.isAdmin
      }, process.env.JWT_SECRET, { expiresIn: "2d" });

      res.status(200).send({ ...remaining, accessToken });
    }

  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;