const mongoose = require('mongoose');

const shippingSchema = new mongoose.Schema({
  firstName:      { type: String },
  lastName:       { type: String },
  mobile:         { type: String },
  street:         { type: String },
  country:        { type: String, default: 'Pakistan' },
  state:          { type: String },
  city:           { type: String },
  shippingMethod: { type: String, default: 'fixed' },
}, { _id: false });

const orderSchema = new mongoose.Schema(
  {
    orderNumber:   { type: String, unique: true },
    userId:        { type: String, default: null },
    email:         { type: String, required: true },
    newsletter:    { type: Boolean, default: false },
    shipping:      { type: shippingSchema },
    paymentMethod: { type: String, default: 'cod' },
    items:         { type: Array, default: [] },
    subtotal:      { type: Number, default: 0 },
    shippingCost:  { type: Number, default: 0 },
    total:         { type: Number, default: 0 },
    status:        { type: String, default: 'placed' },
  },
  { timestamps: true, collection: 'orders' }
);

// Auto-generate orderNumber before saving
orderSchema.pre('save', function () {
  if (!this.orderNumber) {
    this.orderNumber = `ORD-${Date.now()}`;
  }
});

module.exports = mongoose.model('Order', orderSchema);
