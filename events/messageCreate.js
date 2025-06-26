const fs = require('fs');
const path = require('path');
const PrefixConfig = require('../schemas/prefixConfig');

module.exports = {
  name: 'messageCreate',
  async execute(message, client) {
    if (message.author.bot || !message.guild) return;

    let data = await PrefixConfig.findOne({ guildId: message.guild.id });
    const prefix = data?.prefix || 'r';

    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.prefixCommands.get(commandName);
    if (!command) return;

    try {
      command.execute(message, args);
    } catch (error) {
      console.error(error);
      message.reply('❌ Terjadi kesalahan saat menjalankan command.');
    }
  }
}
