module.exports = {
  name: 'massroleremove',
  description: 'Hapus role dari target user secara massal',
  async execute(message, args) {
    if (!message.member.permissions.has('ManageRoles')) {
      return message.reply('❌ Kamu tidak punya izin untuk menghapus role.');
    }

    const role = message.mentions.roles.first();
    const userTarget = message.mentions.roles.size === 2 ? message.mentions.roles.last() : null;

    if (!role || !userTarget) {
      return message.reply('❌ Format: `rmassroleremove @RoleTarget @UserDenganRoleIni`');
    }

    const members = await message.guild.members.fetch();
    const targetMembers = members.filter(m =>
      !m.user.bot &&
      m.roles.cache.has(userTarget.id) &&
      m.roles.cache.has(role.id)
    );

    let count = 0;
    for (const member of targetMembers.values()) {
      try {
        await member.roles.remove(role);
        count++;
      } catch {}
    }

    message.channel.send(`🗑️ Role ${role.name} dihapus dari ${count} member yang memiliki ${userTarget.name}.`);
  }
};