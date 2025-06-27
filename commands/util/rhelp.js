module.exports = {
  name: 'help',
  description: 'Show command list',
  execute(message) {
    const commands = message.client.commands.map(cmd => `\`${cmd.name}\`: ${cmd.description}`).join('\n');
    message.channel.send(`📜 **Command List:**\n${commands}`);
  }
};