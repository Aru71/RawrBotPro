const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  guildId: { type: String, required: true, unique: true },
  roleId: String,
  description: String
});

module.exports = mongoose.model('VerifyConfig', schema);