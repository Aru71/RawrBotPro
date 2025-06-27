const allowedLinks = require('../models/LinkWhitelist');

module.exports = {
  name: 'messageCreate',
  async execute(message) {
    if (message.author.bot || !message.guild) return;
    const urls = message.content.match(/https?:\/\/[^\s]+/g);
    if (!urls) return;

    const whitelist = await allowedLinks.findOne({ guildId: message.guild.id });
    const allowed = whitelist?.links || [];

    const isAllowed = urls.every(link => allowed.some(allowedLink => link.includes(allowedLink)));
    if (!isAllowed) {
      await message.delete().catch(() => {});
      message.channel.send(`🚫 Link yang kamu kirim tidak diizinkan di server ini.`)
        .then(msg => setTimeout(() => msg.delete().catch(() => {}), 5000));
    }
  }
};