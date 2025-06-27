module.exports = {
  name: 'removeselfrole',
  description: 'Hapus opsi self role dari dropdown',
  permissions: ['ManageRoles'],
  async execute(message, args) {
    const role = message.mentions.roles.first();
    if (!role) return message.reply('❌ Format: `rremoveselfrole @role`');

    const targetMsg = message.channel.messages.cache.find(m =>
      m.author.id === message.client.user.id &&
      m.components.length &&
      m.components[0].components[0].data.custom_id === 'selfrole'
    );

    if (!targetMsg) return message.reply('❌ Tidak ditemukan menu self role aktif.');

    const menu = targetMsg.components[0].components[0];
    menu.options = menu.options.filter(opt => opt.value !== role.id);

    const row = new message.client.actionRow().addComponents(menu);
    await targetMsg.edit({ components: [row] });

    message.reply(`🗑️ Opsi role ${role.name} dihapus dari self role.`);
  }
};