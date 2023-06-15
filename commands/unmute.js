const fs = require("fs");
let cachedUserRoles = JSON.parse(fs.readFileSync("./roles.json", "utf-8"));

module.exports = {
  name: "unmute",
  description: "Unmute a member",
  execute(message, args) {
    const target =
      message.mentions.users.first() || message.guild.members.get(args[0]);
    let muteRole = message.guild.roles.cache.find(
      (role) => role.name === "Mute"
    );

    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.channel.send(
        "You do not have the permission to manage messages"
      );
    if (!target) return message.channel.send("You did not specify a user");
    if (target) {
      let memberTarget = message.guild.members.cache.get(target.id);

      if (!memberTarget.roles.cache.some((role) => role.name === "Mute"))
        return message.channel.send("User is not muted!");

      memberTarget.roles.remove(muteRole.id);
      message.channel.send(`<@${memberTarget.user.id}> ℎ𝑎𝑠 𝑏𝑒𝑒𝑛 𝑢𝑛𝑚𝑢𝑡𝑒𝑑`);
      cachedUserRoles = {};
    } else {
      message.chanel.send("𝐶𝑎𝑛'𝑡 𝑓𝑖𝑛𝑑 𝑚𝑒𝑚𝑏𝑒𝑟!");
    }
  },
};
