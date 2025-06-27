const PrefixModel = require('../../models/Prefix');

module.exports = {
  name: 'setprefix',
  description: 'Set a custom prefix for this server',
  async execute(message, args) {
    if (!message.member.permissions.has('ManageGuild')) return message.reply('❌ Need "Manage Server" permission.');
    const newPrefix = args[0];
    if (!newPrefix) return message.reply('❌ Provide a new prefix.');

    await PrefixModel.findOneAndUpdate(
      { guildId: message.guild.id },
      { prefix: newPrefix },
      { upsert: true, new: true }
    );

    message.channel.send(`✅ Prefix updated to \`${newPrefix}\``);
  }
};