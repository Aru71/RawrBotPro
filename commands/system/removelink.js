const LinkWhitelist = require('../../models/LinkWhitelist');

module.exports = {
  name: 'removelink',
  description: 'Hapus link dari whitelist',
  async execute(message, args) {
    if (!message.member.permissions.has('ManageGuild')) {
      return message.reply('❌ Kamu tidak punya izin untuk menghapus whitelist link.');
    }
    const link = args[0];
    if (!link) return message.reply('❌ Masukkan link yang ingin dihapus.');

    const doc = await LinkWhitelist.findOneAndUpdate(
      { guildId: message.guild.id },
      { $pull: { links: link } },
      { new: true }
    );

    if (!doc || !doc.links.includes(link)) {
      return message.channel.send(`⚠️ Link \`${link}\` tidak ditemukan di whitelist.`);
    }

    message.channel.send(`🗑️ Link \`${link}\` telah dihapus dari whitelist.`);
  }
};