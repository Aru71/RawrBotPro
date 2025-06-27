const VoiceRole = require('../../models/VoiceRole');

module.exports = {
  name: 'setvoicerole',
  description: 'Set role yang diizinkan untuk mengelola pengaturan VC pribadi',
  async execute(message, args) {
    if (!message.member.permissions.has('ManageGuild')) {
      return message.reply('❌ Kamu tidak memiliki izin untuk mengatur ini.');
    }
    const role = message.mentions.roles.first();
    if (!role) return message.reply('❌ Mention role yang ingin kamu izinkan.');

    await VoiceRole.findOneAndUpdate(
      { guildId: message.guild.id },
      { roleId: role.id },
      { upsert: true }
    );

    message.channel.send(`✅ Role \`${role.name}\` sekarang dapat mengatur pengaturan VC pribadi.`);
  }
};