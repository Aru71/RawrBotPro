const { ActionRowBuilder, StringSelectMenuBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
  name: 'voiceStateUpdate',
  async execute(oldState, newState, client) {
    const autoChannelId = 'AUTO_CREATE_CHANNEL_ID';
    const categoryId = 'VOICE_CATEGORY_ID';

    if (!newState.guild) return;

    // Auto create private VC
    if (newState.channelId === autoChannelId) {
      const user = newState.member.user;
      const voiceChannel = await newState.guild.channels.create({
        name: `🔊 ${user.username}'s Room`,
        type: 2,
        parent: categoryId,
        permissionOverwrites: [
          {
            id: user.id,
            allow: [
              PermissionsBitField.Flags.Connect,
              PermissionsBitField.Flags.Speak,
              PermissionsBitField.Flags.ManageChannels,
              PermissionsBitField.Flags.MuteMembers
            ],
          },
          {
            id: newState.guild.roles.everyone,
            allow: [PermissionsBitField.Flags.Connect, PermissionsBitField.Flags.Speak],
          },
        ],
      });

      await newState.setChannel(voiceChannel);

      // Auto delete if empty
      const interval = setInterval(() => {
        if (!voiceChannel.members.size) {
          clearInterval(interval);
          voiceChannel.delete().catch(() => {});
        }
      }, 5000);

      // Send menu for settings
      const row = new ActionRowBuilder().addComponents(
        new StringSelectMenuBuilder()
          .setCustomId(`vc-setting-${user.id}`)
          .setPlaceholder('🔧 Voice Channel Settings')
          .addOptions([
            { label: 'Rename Channel', value: 'rename' },
            { label: 'Set User Limit', value: 'limit' },
            { label: 'Set Status (AFK/Normal)', value: 'status' },
            { label: 'Lock Channel', value: 'lock' },
            { label: 'Unlock Channel', value: 'unlock' },
          ])
      );

      const msg = await newState.guild.channels.cache
        .filter(c => c.type === 0)
        .first()
        ?.send({ content: `<@${user.id}>`, components: [row] });

      // Optional: delete menu after 1-2 mins
      setTimeout(() => msg?.delete().catch(() => {}), 120000);
    }
  }
};