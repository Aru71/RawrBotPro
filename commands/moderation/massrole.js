module.exports = {
  name: 'massrole',
  description: 'Tambahkan role ke target user secara massal (non-bot)',
  async execute(message, args) {
    if (!message.member.permissions.has('ManageRoles')) {
      return message.reply('❌ Kamu tidak punya izin untuk menambahkan role.');
    }

    const role = message.mentions.roles.first();
    const userTarget = message.mentions.roles.size === 2 ? message.mentions.roles.last() : null;

    if (!role || !userTarget) {
      return message.reply('❌ Format: `rmassrole @RoleBaru @TargetUserRole`');
    }

    const members = await message.guild.members.fetch();
    const targetMembers = members.filter(m =>
      !m.user.bot &&
      m.roles.cache.has(userTarget.id) &&
      !m.roles.cache.has(role.id)
    );

    let count = 0;
    for (const member of targetMembers.values()) {
      try {
        await member.roles.add(role);
        count++;
      } catch {}
    }

    message.channel.send(`✅ Role ${role.name} ditambahkan ke ${count} member dengan role ${userTarget.name}.`);
  }
};