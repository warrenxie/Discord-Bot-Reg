const fetch = require("node-fetch");
const Discord = require("discord.js");

module.exports = {
  name: "gif",
  description: "send gif",
  async execute(message, args) {
    let keywords = args;

    if (keywords.length > 1) {
      keywords.slice(1, keywords.length).join(" ");
    }
    let url = `https://api.tenor.com/v1/search?q=${keywords}&key=${process.env.TENORKEY}&contentfilter=high`;
    let response = await fetch(url);
    let json = await response.json();
    const index = Math.floor(Math.random() * json.results.length);
    message.channel.send(json.results[index].url);
    const embed = new Discord.MessageEmbed();
    embed.setTitle("GIF from Tenor");
    embed.setDescription("" + keywords);
    message.channel.send(embed);
  },
};
