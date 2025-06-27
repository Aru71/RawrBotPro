const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  guildId: { type: String, required: true, unique: true },
  links: [String]
});

module.exports = mongoose.model('LinkWhitelist', schema);