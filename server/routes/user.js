const express = require('express');
const { verifyTokenAndAuthorization,
  verifyTokenAndAdmin } = require('./verifyToken');
const bcrypt = require('bcrypt');
const router = express.Router();

const saltRounds = 10;
const User = require('../models/User');


// @route   UPDATE user/:id
// @desc    Update user info
// @access  Protected
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = await bcrypt.hash(req.body.password, saltRounds);
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).send(updatedUser);

  } catch (error) {
    res.status(500).send({
      status: "failed",
      message: "Faile to update the user info"
    });
  }
});

// @route   DELETE user/:id
// @desc    delete user
// @access  Protected
router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "Success",
      message: "User has been deleted successfully"
    });

  } catch (error) {
    res.status(500).send({
      status: "failed",
      message: "Unable to delete the user"
    })
  }
});

// @route   Get user/list
// @desc    Admin can get the list of newly registered 5 users.
// @access  Protected
router.get('/list', verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new;
  
  try {
    const users = query ? await User.find().sort({ _id: -1 }).limit(5) : await User.find();
    res.status(200).send(users);

  } catch (error) {
    res.status(500).send({
      status: "failed",
      message: "Cannot get newely registered users"
    });
  }
});

// @route   Get user/check/:id
// @desc    Admin can get profile info of any user.
// @access  Protected
router.get('/check/:id', verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(401).send({
        status: "failed",
        message: "There is no user against that id"
      })
    } else {

      const { password, ...remaining } = user._doc;
      res.status(200).json({ ...remaining });
    }

  } catch (error) {
    res.status(500).send({
      status: "failed",
      message: "Unable to get the user info route running"
    })
  }
});


module.exports = router;