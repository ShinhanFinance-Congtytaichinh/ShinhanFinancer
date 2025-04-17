const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: true, match: /^[0-9]{10}$/ },
  email: { type: String, required: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  idNumber: { type: String, required: true, match: /^[0-9]{9,12}$/ },
  loanAmount: { type: Number, required: true, min: 1000000 },
  loanTerm: { type: Number, required: true, min: 6, max: 60 },
  loanType: { type: String, enum: ['unsecured', 'auto', 'home', 'renovation'], required: true },
  contractId: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Lead', leadSchema);