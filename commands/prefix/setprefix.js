const PrefixConfig = require('../../schemas/prefixConfig');

module.exports = {
  name: 'setprefix',
  async execute(message, args) {
    if (!message.member.permissions.has('Administrator')) {
      return message.reply('❌ Kamu butuh izin Admin.');
    }

    const newPrefix = args[0];
    if (!newPrefix) return message.reply('❌ Format salah. Contoh: `rsetprefix !`');

    await PrefixConfig.findOneAndUpdate(
      { guildId: message.guild.id },
      { prefix: newPrefix },
      { upsert: true }
    );

    message.reply(`✅ Prefix berhasil diubah menjadi \`${newPrefix}\``);
  }
}
