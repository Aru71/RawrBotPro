module.exports = {
  name: 'kick',
  description: 'Kick a user from the server',
  async execute(message, args) {
    if (!message.member.permissions.has('KickMembers')) {
      return message.reply('❌ You need "Kick Members" permission to use this command.');
    }
    const user = message.mentions.members.first();
    if (!user) return message.reply('❌ Mention a user to kick.');
    const reason = args.slice(1).join(' ') || 'No reason provided';
    if (!user.kickable) return message.reply('❌ I can't kick this user.');

    await user.kick(reason);
    message.channel.send(`👢 Kicked ${user.user.tag} | Reason: ${reason}`);
  }
};