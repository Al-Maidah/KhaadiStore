const Product = require('../Apis/Models/productModel');
const catalog = require('./productCatalog');

async function seedProducts() {
  for (const item of catalog) {
    await Product.findOneAndUpdate(
      { id: item.id },
      { $set: item },
      { upsert: true, returnDocument: 'after' }
    );
  }
  console.log(`Synced ${catalog.length} products`);
}

module.exports = { seedProducts };
