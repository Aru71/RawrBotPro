const VerifyConfig = require('../../models/VerifyConfig');

module.exports = {
  name: 'setverify',
  description: 'Atur caption dan role untuk verifikasi',
  async execute(message, args) {
    if (!message.member.permissions.has('ManageGuild')) {
      return message.reply('❌ Kamu tidak punya izin untuk mengatur verifikasi.');
    }
    const role = message.mentions.roles.first();
    const desc = args.slice(1).join(' ');
    if (!role || !desc) return message.reply('❌ Format: rsetverify @role Deskripsi');

    await VerifyConfig.findOneAndUpdate(
      { guildId: message.guild.id },
      { roleId: role.id, description: desc },
      { upsert: true }
    );

    message.channel.send(`✅ Verifikasi disetel. Role: \`${role.name}\`, Caption: "${desc}"`);
  }
};