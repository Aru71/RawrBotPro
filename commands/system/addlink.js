const LinkWhitelist = require('../../models/LinkWhitelist');

module.exports = {
  name: 'addlink',
  description: 'Tambah link ke whitelist agar tidak terhapus',
  async execute(message, args) {
    if (!message.member.permissions.has('ManageGuild')) {
      return message.reply('❌ Kamu tidak punya izin untuk menambahkan whitelist link.');
    }
    const link = args[0];
    if (!link) return message.reply('❌ Masukkan link yang ingin ditambahkan.');

    const doc = await LinkWhitelist.findOneAndUpdate(
      { guildId: message.guild.id },
      { $addToSet: { links: link } },
      { upsert: true, new: true }
    );
    message.channel.send(`✅ Link \`${link}\` berhasil ditambahkan ke whitelist.`);
  }
};