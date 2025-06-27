const PrefixModel = require('../models/Prefix');

module.exports = {
  name: 'messageCreate',
  async execute(message, client) {
    if (message.author.bot || !message.guild) return;

    let guildPrefix = client.prefix;
    const data = await PrefixModel.findOne({ guildId: message.guild.id });
    if (data) guildPrefix = data.prefix;

    if (!message.content.startsWith(guildPrefix)) return;
    const args = message.content.slice(guildPrefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);
    if (!command) return;

    try {
      await command.execute(message, args);
    } catch (err) {
      console.error(err);
      message.reply('❌ Terjadi kesalahan saat menjalankan command ini.');
    }
  }
};