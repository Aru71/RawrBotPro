const User = require('../../models/User');

module.exports = {
  name: 'rleaderboard',
  description: 'Show XP leaderboard',
  async execute(message) {
    const topUsers = await User.find({ guildId: message.guild.id }).sort({ xp: -1 }).limit(10);
    const leaderboard = topUsers.map((u, i) => `#${i + 1} <@${u.userId}> - Level ${u.level} | XP: ${u.xp}`).join('\n');
    message.channel.send(`🏆 **Leaderboard**\n${leaderboard}`);
  }
};