const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');
const play = require('play-dl');

const queue = new Map();

module.exports = {
  name: 'play',
  description: 'Play music from YouTube/Spotify/SoundCloud',
  async execute(message, args) {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply('❌ Join a voice channel first!');
    const query = args.join(" ");
    if (!query) return message.reply('❌ Provide a song name or URL.');

    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('Connect') || !permissions.has('Speak')) {
      return message.reply('❌ I need permission to join and speak in your voice channel!');
    }

    let serverQueue = queue.get(message.guild.id);
    if (!serverQueue) {
      const connection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: message.guild.id,
        adapterCreator: message.guild.voiceAdapterCreator,
      });
      serverQueue = {
        voiceChannel,
        connection,
        songs: [],
        player: createAudioPlayer(),
      };
      queue.set(message.guild.id, serverQueue);
      serverQueue.connection.subscribe(serverQueue.player);
    }

    const searched = await play.search(query, { limit: 1 });
    if (!searched[0]) return message.reply('❌ No results found.');
    const stream = await play.stream(searched[0].url);
    const resource = createAudioResource(stream.stream, { inputType: stream.type });
    const song = { title: searched[0].title, url: searched[0].url, resource };

    serverQueue.songs.push(song);
    message.channel.send(`🎶 Queued: **${song.title}**`);

    if (serverQueue.songs.length === 1) {
      playNext(message.guild.id);
    }

    function playNext(guildId) {
      const queueData = queue.get(guildId);
      if (!queueData || queueData.songs.length === 0) return;
      const nextSong = queueData.songs[0];
      queueData.player.play(nextSong.resource);
      queueData.player.once(AudioPlayerStatus.Idle, () => {
        queueData.songs.shift();
        playNext(guildId);
      });
    }
  }
};