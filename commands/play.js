const ytdl = require("ytdl-core");
const ytSearch = require("yt-search");
const { validateURL } = require("ytdl-core");
const Discord = require("discord.js");

module.exports = {
  name: "play",
  description: "Joins and plays a video from youtube",
  async execute(message, args) {
    const voiceChannel = message.member.voice.channel;
    const embed = new Discord.MessageEmbed();
    if (!voiceChannel)
      return message.channel.send("You need to be in a voice channel first!");
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT"))
      return message.channel.send("You do not have the permissions");
    if (!permissions.has("SPEAK"))
      return message.channel.send("You do not have the permissions");
    if (!args.length) return message.channel.send("Not enough information!");

    if (validateURL(args[0])) {
      const connection = await voiceChannel.join();
      const stream = ytdl(args[0], { filter: "audioonly" });
      connection.play(stream, { seek: 0, volume: 1 }).on("finish", () => {
        voiceChannel.leave();
      });

      embed.setAuthor(message.author.username, message.author.avatarURL());
      embed.setDescription(`:musical_note:  Now Playing your video!***`);
      embed.setColor("#BB150A");
      embed.setTimestamp(Date.now());
      message.channel.send(embed);
      return;
    }

    const connection = await voiceChannel.join();
    const videoFinder = async (query) => {
      const videoResult = await ytSearch(query);
      return videoResult.videos.length > 1 ? videoResult.videos[0] : null;
    };

    const video = await videoFinder(args.join(" "));

    if (video) {
      const stream = ytdl(video.url, { filter: "audioonly" });
      connection.play(stream, { seek: 0, volume: 1 }).on("finish", () => {
        voiceChannel.leave();
      });
      const embed = new Discord.MessageEmbed();
      embed.setAuthor(message.author.username, message.author.avatarURL());
      embed.setDescription(`:musical_note:  Now Playing ***${video.title}***`);
      embed.setColor("#BB150A");
      embed.setTimestamp(Date.now());
      message.channel.send(embed);
    } else {
      message.channel.send("No video results found");
    }
  },
};
