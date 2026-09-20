const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    id:              { type: Number, required: true, unique: true },
    category:        { type: String },
    title:           { type: String },
    subtitle:        { type: String },
    price:           { type: String },
    originalPrice:   { type: String },
    salePrice:       { type: String },
    oldPrice:        { type: String },
    discountPercent: { type: Number },
    discountTag:     { type: String },
    discount:        { type: String },
    tag:             { type: String },
    image:           { type: String },
    images:          { type: [String], default: [] },
    collections:     { type: [String], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
