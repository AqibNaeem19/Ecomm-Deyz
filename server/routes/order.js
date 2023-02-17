const express = require('express');
const router = express.Router();

const { verifyTokenAndAuthorization,
  verifyTokenAndAdmin, verifyToken } = require('./verifyToken');

const Order = require('../models/Order');

// @route   Create /order/new
// @desc    Anyone can create new order.
// @access  Protected. Must be signed in
router.post('/new', verifyToken, async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);

  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "Unable to create new Order"
    });
  }
})

// @route   Update /order/:id
// @desc    User can update his order
// @access  Protected
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);

  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "Unable to update existing Order"
    });
  }
})

// @route   DELETE order/:id
// @desc    delete order
// @access  Protected
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "Success",
      message: "Order has been deleted successfully"
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
    const order = await Order.find({ userId: req.params.userId });
    if (!order) {
      res.status(401).send({
        status: "failed",
        message: "This user has placed no orders"
      })
    } else {
      res.status(200).json(order);
    }

  } catch (error) {
    res.status(500).send({
      status: "failed",
      message: "Unable to find the user Orders"
    })
  }
});



module.exports = router;