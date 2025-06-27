const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'giveaway',
  aliases: ['ga'],
  description: 'Mulai giveaway baru',
  async execute(message, args) {
    if (!message.member.permissions.has('ManageGuild')) {
      return message.reply('❌ Kamu tidak punya izin untuk membuat giveaway.');
    }

    const duration = args[0];
    const winnerCount = parseInt(args[1]);
    const prize = args.slice(2).join(' ');

    if (!duration || isNaN(winnerCount) || !prize) {
      return message.reply('❌ Format: rgiveaway <durasi> <jumlah_pemenang> <hadiah>
Contoh: `rgiveaway 1h 2 Nitro`');
    }

    const ms = require('ms');
    const durationMs = ms(duration);
    if (!durationMs) return message.reply('❌ Durasi tidak valid.');

    const embed = new EmbedBuilder()
      .setTitle('🎉 GIVEAWAY 🎉')
      .setDescription(`🎁 Hadiah: **${prize}**
👥 Pemenang: **${winnerCount}**
⏰ Durasi: **${duration}**

Klik 🎉 untuk ikut!`)
      .setColor('Random')
      .setTimestamp(Date.now() + durationMs)
      .setFooter({ text: `Berakhir` });

    const msg = await message.channel.send({ embeds: [embed] });
    await msg.react('🎉');

    setTimeout(async () => {
      const fetched = await msg.fetch();
      const users = await fetched.reactions.cache.get('🎉')?.users.fetch();
      if (!users) return;

      const entries = users.filter(u => !u.bot).map(u => u.id);
      if (entries.length === 0) {
        return message.channel.send('Tidak ada yang ikut giveaway 😢');
      }

      const winners = [];
      while (winners.length < winnerCount && entries.length > 0) {
        const index = Math.floor(Math.random() * entries.length);
        const winnerId = entries.splice(index, 1)[0];
        winners.push(`<@${winnerId}>`);
      }

      message.channel.send(`🎉 Selamat kepada ${winners.join(', ')}! Kamu menang **${prize}**!`);
    }, durationMs);
  }
};