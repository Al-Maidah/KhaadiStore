const Product = require('../Models/productModel');

// GET /products?collection=<name>
async function getAll(req, res) {
  try {
    const { collection } = req.query;
    const filter = collection ? { collections: collection } : {};
    const products = await Product.find(filter).sort({ id: 1 }).lean();
    return res.status(200).json(products);
  } catch (err) {
    console.error('getAll products error:', err);
    return res.status(500).json({ message: err.message });
  }
}

// GET /products/:id
async function getById(req, res) {
  try {
    const product = await Product.findOne({ id: Number(req.params.id) }).lean();
    if (!product) return res.status(404).json({ message: 'Product not found.' });
    return res.status(200).json(product);
  } catch (err) {
    console.error('getById product error:', err);
    return res.status(500).json({ message: err.message });
  }
}

module.exports = { getAll, getById };
