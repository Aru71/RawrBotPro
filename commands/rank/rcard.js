const { createCanvas, loadImage } = require('canvas');
const User = require('../../models/User');

module.exports = {
  name: 'rcard',
  description: 'Show your rank card',
  async execute(message) {
    const userData = await User.findOne({ userId: message.author.id, guildId: message.guild.id }) || { xp: 0, level: 1 };
    const canvas = createCanvas(700, 250);
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#2c2f33';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = '28px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`User: ${message.author.tag}`, 50, 50);
    ctx.fillText(`Level: ${userData.level}`, 50, 100);
    ctx.fillText(`XP: ${userData.xp}`, 50, 150);

    const buffer = canvas.toBuffer();
    message.channel.send({ files: [{ attachment: buffer, name: 'rank.png' }] });
  }
};