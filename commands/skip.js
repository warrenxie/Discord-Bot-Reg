const ytdl = require("ytdl-core");
const ytSearch = require("yt-search");
const { validateURL } = require("ytdl-core");

let servers = [];
module.exports = {
  name: "skip",
  description: "skip music",
  async execute(message, args) {
    let server = servers[message.guild.id];
    if (server.dispatcher) server.dispatcher.end();
  },
};
