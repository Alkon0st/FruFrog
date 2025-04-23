const mongoose = require('mongoose');

// TO-DO: reimplement pond, members (as actual users), and paidBy
const billSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  category: { type: String },
  amount: { type: Number, required: true },
  tax: { type: Number },
  splitTax: { type: Boolean },
  members: { type: Number },
  paid: { type: String },
  percentPaid: { type: String },
  total: { type: String },
}, { timestamps: true });

const Bill = mongoose.model('Bill', billSchema);
module.exports = Bill;