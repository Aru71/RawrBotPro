const VerifyConfig = require('../models/VerifyConfig');

module.exports = {
  name: 'messageReactionAdd',
  async execute(reaction, user) {
    if (user.bot || !reaction.message.guild) return;
    const config = await VerifyConfig.findOne({ guildId: reaction.message.guild.id });
    if (!config || reaction.emoji.name !== '✅') return;

    const member = await reaction.message.guild.members.fetch(user.id);
    if (!member.roles.cache.has(config.roleId)) {
      await member.roles.add(config.roleId).catch(() => {});
    }
  }
};