const warns = new Map();

module.exports = {
  name: 'warn',
  description: 'Warn a user',
  async execute(message, args) {
    if (!message.member.permissions.has('ManageMessages')) {
      return message.reply('❌ You need "Manage Messages" permission to use this command.');
    }
    const user = message.mentions.members.first();
    if (!user) return message.reply('❌ Mention a user to warn.');

    const reason = args.slice(1).join(' ') || 'No reason provided';
    const key = `${message.guild.id}-${user.id}`;
    const userWarns = warns.get(key) || [];
    userWarns.push({ reason, moderator: message.author.tag, date: new Date() });
    warns.set(key, userWarns);

    message.channel.send(`⚠️ Warned ${user.user.tag} | Reason: ${reason}`);
  }
};