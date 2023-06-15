module.exports = {
  name: "reactionrole",
  description: "Sets up a reaction role message!",
  async execute(message, args, Discord, client) {
    const channel = "791822740784545833";
    const roleA = message.guild.roles.cache.find((role) => role.name === "PVP");
    const roleB = message.guild.roles.cache.find((role) => role.name === "PVE");
    const roleAEmoji = "⚜️";
    const roleBEmoji = "💠";
    if (!(message.channel.id === channel)) {
      message.channel.send("𝑃𝑙𝑒𝑎𝑠𝑒 𝑢𝑠𝑒 𝑡ℎ𝑒 𝑔𝑒𝑡-𝑟𝑜𝑙𝑒𝑠 𝑐ℎ𝑎𝑛𝑛𝑒𝑙");
      return;
    }
    let embed = new Discord.MessageEmbed()
      .setColor("#33cc33")
      .setTitle("Select a role")
      .setDescription(
        "Choose one of the two roles to join!\n\n" +
          `${roleAEmoji} to join PVP \n` +
          `${roleBEmoji}to join PVE`
      );
    let messageEmbed = await message.channel.send(embed);
    messageEmbed.react(roleAEmoji);
    messageEmbed.react(roleBEmoji);

    client.on("messageReactionAdd", async (reaction, user) => {
      if (reaction.message.partial) await reaction.message.fetch();
      if (reaction.partial) await reaction.fetch();
      if (user.bot) return;
      if (!reaction.message.guild) return;

      if (reaction.message.channel.id === channel) {
        if (reaction.emoji.name === roleAEmoji) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.add(roleA);
        }
        if (reaction.emoji.name === roleBEmoji) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.add(roleB);
        }
      } else {
        return;
      }
    });
    client.on("messageReactionRemove", async (reaction, user) => {
      if (reaction.message.partial) await reaction.message.fetch();
      if (reaction.partial) await reaction.fetch();
      if (user.bot) return;
      if (!reaction.message.guild) return;

      if (reaction.message.channel.id === channel) {
        if (reaction.emoji.name === roleAEmoji) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.remove(roleA);
        }
        if (reaction.emoji.name === roleBEmoji) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.remove(roleB);
        }
      } else {
        return;
      }
    });
  },
};
