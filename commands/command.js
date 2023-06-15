module.exports = {
  name: "command",
  description: "Embeds",
  execute(message, args, Discord) {
    const newEmbed = new Discord.MessageEmbed()
      .setColor("#86A9DC")
      .setTitle("Rules")
      .setURL("https://youtube.com")
      .setDescription("This is a embed for the server rules")
      .addFields(
        { name: "Rule 1", value: "Be nice" },
        { name: "Rule 2", value: "No Spam" },
        { name: "Rule 3", value: "No Harassment" }
      )
      .setImage(
        "https://steamuserimages-a.akamaihd.net/ugc/945078442636328670/76717612A1D0E791450382B25F48925EAFB80FCC/"
      )
      .setFooter("Make sure to check the rules channel");

    message.channel.send(newEmbed);
  },
};
