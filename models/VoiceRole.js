const mongoose = require('mongoose');

const voiceRoleSchema = new mongoose.Schema({
  guildId: { type: String, required: true, unique: true },
  roleId: { type: String, required: true }
});

module.exports = mongoose.model('VoiceRole', voiceRoleSchema);