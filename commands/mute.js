const ms = require("ms");
const fs = require("fs");
//let cachedUserRoles = {};
let cachedUserRoles = JSON.parse(fs.readFileSync("./roles.json", "utf-8"));
module.exports = {
  name: "mute",
  description: "Mute a member",
  execute(message, args) {
    let muteRole = message.guild.roles.cache.find(
      (role) => role.name === "Mute"
    );
    const target =
      message.mentions.users.first() || message.guild.members.get(args[0]);
    let memberTarget = message.guild.members.cache.get(target.id);
    let cachedUserRoles = JSON.parse(fs.readFileSync("./roles.json", "utf-8"));
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.channel.send(
        "You do not have the permission to manage messages"
      );
    if (!target) return message.channel.send("You did not specify a user");
    if (target) {
      if (memberTarget.roles.cache.some((role) => role.name === "Mute"))
        return message.channel.send("User is already muted!");
      cachedUserRoles[memberTarget] = memberTarget.roles.cache;
      if (!args[1]) {
        memberTarget.roles.add(muteRole);
        message.channel.send(`<@${memberTarget.user.id}> ℎ𝑎𝑠 𝑏𝑒𝑒𝑛 𝑚𝑢𝑡𝑒𝑑`);
        return;
      }
      if (isNaN(ms(args[1]))) {
        message.channel.send("𝐼𝑛𝑝𝑢𝑡 𝑎 𝑣𝑎𝑙𝑖𝑑 𝑡𝑖𝑚𝑒 𝟷𝟸𝑑/𝟷𝟸ℎ/𝟷𝟸𝑚/𝟷𝟸𝑠");
        return;
      }
      memberTarget.roles.add(muteRole.id);
      message.channel.send(
        `<@${memberTarget.user.id}> ℎ𝑎𝑠 𝑏𝑒𝑒𝑛 𝑚𝑢𝑡𝑒𝑑 𝑓𝑜𝑟 ${ms(ms(args[1]))}`
      );
      setTimeout(function () {
        //memberTarget.roles.add(mainRole.id);
        memberTarget.roles.remove(muteRole.id);
        message.channel.send(`<@${memberTarget.user.id}>ℎ𝑎𝑠 𝑏𝑒𝑒𝑛 𝑢𝑛𝑚𝑢𝑡𝑒𝑑`);
        cachedUserRoles = {};
      }, ms(args[1]));
    } else {
      message.chanel.send("𝐶𝑎𝑛'𝑡 𝑓𝑖𝑛𝑑 𝑚𝑒𝑚𝑏𝑒𝑟!");
    }
  },
};
