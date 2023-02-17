const express = require('express');
const { verifyTokenAndAdmin } = require('./verifyToken');
const router = express.Router();

const Product = require('../models/Product');


// @route   Create /product/new
// @desc    Admin can upload a new product.
// @access  Protected
router.post('/new', verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);

  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "Unable to upload new peoduct"
    });
  }
})

// @route   Update /product/:id
// @desc    Admin ccan update existing product
// @access  Protected
router.put('/:id', verifyTokenAndAdmin, async ( req, res ) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);

  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "Unable to update existing peoduct"
    });
  }
})

// @route   DELETE product/:id
// @desc    delete product
// @access  Protected
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "Success",
      message: "Product has been deleted successfully"
    });

  } catch (error) {
    res.status(500).send({
      status: "failed",
      message: "Unable to delete the product"
    })
  }
});

// @route   Get product/check/:id
// @desc    Anybody can view any Product
// @access  Public
router.get('/check/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(401).send({
        status: "failed",
        message: "There is no product against that id"
      })
    } else {
      res.status(200).json(product);
    }

  } catch (error) {
    res.status(500).send({
      status: "failed",
      message: "Unable to find the product"
    })
  }
});

// @route   Get product/list
// @desc    Anyone can fetch latest products or search by category
// @access  Public
router.get('/list', async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  
  try {
    let products;

    if(qNew){
      products = await Product.find().sort({ _id: -1}).limit(1);
    } else if(qCategory){
      products = await Product.find({
        categories: {
          $in: [qCategory]
        }
      })
    } else {
      products = await Product.find();
    }
    res.status(200).json(products);

  } catch (error) {
    res.status(500).send({
      status: "failed",
      message: "Cannot get products"
    });
  }
});



module.exports = router;