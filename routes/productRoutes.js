const express = require('express');
const { protect, admin } = require('../middleware/auth');
const Product = require('../models/Product');

const router = express.Router();

// @desc Fetch all products
// @route GET /api/products
// @access Public
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc Fetch single product
// @route GET /api/products/:id
// @access Public
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc Create a product
// @route POST /api/products
// @access Admin
router.post('/', protect, admin, async (req, res) => {
  const { title, description, price, category, image } = req.body;

  try {
    const product = new Product({
      title,
      description,
      price,
      category,
      image
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc Update a product
// @route PUT /api/products/:id
// @access Admin
router.put('/:id', protect, admin, async (req, res) => {
  const { title, description, price, category, image } = req.body;

  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      product.title = title;
      product.description = description;
      product.price = price;
      product.category = category;
      product.image = image;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc Delete a product
// @route DELETE /api/products/:id
// @access Admin
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.remove();
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
