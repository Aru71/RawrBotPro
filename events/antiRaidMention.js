const { Collection, PermissionsBitField } = require('discord.js');

const mentionCount = new Collection();

module.exports = {
  name: 'messageCreate',
  async execute(message, client) {
    if (message.author.bot || !message.guild) return;

    const mentions = message.mentions.users.size + message.mentions.roles.size;
    if (mentions >= 5) {
      const key = `${message.guild.id}-${message.author.id}`;
      const count = mentionCount.get(key) || 0;
      mentionCount.set(key, count + 1);

      if (mentionCount.get(key) >= 2) {
        await message.member.timeout(10 * 60 * 1000, 'Mention spam'); // 10 menit timeout
        message.channel.send(`🚫 <@${message.author.id}> telah ditindak karena mention spam.`);
        mentionCount.delete(key);
      }
    }
  }
};