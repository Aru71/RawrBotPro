const { Collection } = require('discord.js');

const mentionTracker = new Collection();
const joinTracker = new Collection();

module.exports = {
  name: 'guildMemberAdd',
  async execute(member) {
    const { guild } = member;

    // Anti-join flood: batasi join dalam waktu singkat
    if (!joinTracker.has(guild.id)) {
      joinTracker.set(guild.id, []);
    }

    const now = Date.now();
    const joins = joinTracker.get(guild.id).filter(t => now - t < 10000); // 10 detik terakhir
    joins.push(now);
    joinTracker.set(guild.id, joins);

    if (joins.length > 5) {
      const logChannel = guild.systemChannel;
      logChannel?.send('🚨 **Peringatan Join Flood**: Banyak user join dalam waktu singkat!');
    }
  }
};