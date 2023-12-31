const { execute } = require("./play");

module.exports = {
  name: "leave",
  description: "stops the bot and leaves voice channel",

  async execute(message, args) {
    const voiceChannel = message.member.voice.channel;

    if (!voiceChannel)
      return message.channel.send("You need to be in a voice channel!");
    await voiceChannel.leave();
    await message.channel.send("Leaving channel..");
  },
};
