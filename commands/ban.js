module.exports = {
  name: "ban",
  description: "ban a member!",
  execute(message, args) {
    const member = message.mentions.users.first();
    if (!message.member.permissions.has("BAN_MEMBERS")) {
      message.channel.send("𝑌𝑜𝑢 𝑑𝑜 𝑛𝑜𝑡 ℎ𝑎𝑣𝑒 𝑝𝑒𝑟𝑚𝑖𝑠𝑠𝑖𝑜𝑛 𝑡𝑜 𝑏𝑎𝑛 𝑚𝑒𝑚𝑏𝑒𝑟𝑠..");
      return;
    }
    if (member) {
      const target = message.guild.members.cache.get(member.id);
      target.ban();
      message.channel.send("𝑀𝑒𝑚𝑏𝑒𝑟 ℎ𝑎𝑠 𝑏𝑒𝑒𝑛 𝑏𝑎𝑛𝑛𝑒𝑑");
    } else {
      message.channel.send("𝐶𝑜𝑢𝑙𝑑 𝑛𝑜𝑡 𝑏𝑎𝑛 𝑚𝑒𝑚𝑏𝑒𝑟!");
    }
  },
};
