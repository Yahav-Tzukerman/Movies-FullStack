// models/memberModel.js
const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: String,
  city: String
});

module.exports = mongoose.model('Member', memberSchema);
