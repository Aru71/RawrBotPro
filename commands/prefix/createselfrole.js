const { ActionRowBuilder, StringSelectMenuBuilder, EmbedBuilder } = require('discord.js');

const selfRoleData = {}; // Penyimpanan sementara (untuk penggunaan penuh bisa pakai database)

module.exports = {
  name: 'createselfrole',
  description: 'Buat embed self role dengan dropdown',
  permissions: ['ManageRoles'],
  async execute(message, args) {
    const [title, imageUrl] = args;
    if (!title || !imageUrl) return message.reply('❌ Format: `rcreateselfrole <judul> <image_url>`');

    const embed = new EmbedBuilder()
      .setTitle(title)
      .setImage(imageUrl)
      .setColor('Random')
      .setDescription('Pilih role yang ingin kamu dapatkan.');

    const menu = new StringSelectMenuBuilder()
      .setCustomId('selfrole')
      .setPlaceholder('Click Me!')
      .setMinValues(0)
      .setMaxValues(5)
      .addOptions([]);

    const row = new ActionRowBuilder().addComponents(menu);

    const sent = await message.channel.send({ embeds: [embed], components: [row] });
    selfRoleData[sent.id] = { options: [], messageId: sent.id };

    message.reply('✅ Self role panel berhasil dibuat!');
  }
};