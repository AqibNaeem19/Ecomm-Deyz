const express = require('express');
const { verifyTokenAndAuthorization,
  verifyToken } = require('./verifyToken');
const router = express.Router();

const Cart = require('../models/Cart');

// @route   Create /cart/new
// @desc    Anyone can create cart
// @access  Protected. Must be signed in
router.post('/new', verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);
  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);

  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "Unable to create new Cart"
    });
  }
})

// @route   Update /cart/:id
// @desc    User ccan update his cart
// @access  Protected
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body
      },
      { new: true }
    );
    res.status(200).json(updatedCart);

  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "Unable to update existing Cart"
    });
  }
})

// @route   DELETE cart/:id
// @desc    delete cart
// @access  Protected
router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "Success",
      message: "Cart has been deleted successfully"
    });

  } catch (error) {
    res.status(500).send({
      status: "failed",
      message: "Unable to delete the Cart"
    })
  }
});

// @route   Get cart/:id
// @desc    Get the items in your cart by using the userId, not cartId
// @access  Protected
router.get('/:userId', verifyTokenAndAuthorization, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) {
      res.status(401).send({
        status: "failed",
        message: "There is no Cart against that userId"
      })
    } else {
      res.status(200).json(cart);
    }

  } catch (error) {
    res.status(500).send({
      status: "failed",
      message: "Unable to find the user cart"
    })
  }
});

module.exports = router;