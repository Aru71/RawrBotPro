module.exports = {
  name: 'ban',
  description: 'Ban a user from the server',
  async execute(message, args) {
    if (!message.member.permissions.has('BanMembers')) {
      return message.reply('❌ You need "Ban Members" permission to use this command.');
    }
    const user = message.mentions.members.first();
    if (!user) return message.reply('❌ Mention a user to ban.');

    const reason = args.slice(1).join(' ') || 'No reason provided';
    if (!user.bannable) return message.reply('❌ I can't ban this user.');

    await user.ban({ reason });
    message.channel.send(`🔨 Banned ${user.user.tag} | Reason: ${reason}`);
  }
};