const mongoose = require('mongoose');

const prefixSchema = new mongoose.Schema({
  guildId: { type: String, required: true, unique: true },
  prefix: { type: String, required: true, default: 'r' }
});

module.exports = mongoose.model('Prefix', prefixSchema);