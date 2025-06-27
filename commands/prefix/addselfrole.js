module.exports = {
  name: 'addselfrole',
  description: 'Tambah opsi self role dropdown',
  permissions: ['ManageRoles'],
  async execute(message, args) {
    const [label, emoji] = args;
    const role = message.mentions.roles.first();
    if (!label || !emoji || !role) return message.reply('❌ Format: `raddselfrole <label> <emoji> @role>`');

    const targetMsg = message.channel.messages.cache.find(m =>
      m.author.id === message.client.user.id &&
      m.components.length &&
      m.components[0].components[0].data.custom_id === 'selfrole'
    );

    if (!targetMsg) return message.reply('❌ Tidak ditemukan menu self role aktif.');

    const menu = targetMsg.components[0].components[0];
    if (menu.options.length >= 25) return message.reply('❌ Maksimal 25 opsi dalam dropdown.');

    menu.addOptions({ label, value: role.id, emoji, description: `get role ${role.name}` });

    const row = new message.client.actionRow().addComponents(menu);
    await targetMsg.edit({ components: [row] });

    message.reply(`✅ Opsi self role ${label} berhasil ditambahkan!`);
  }
};