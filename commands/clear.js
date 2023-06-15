module.exports = {
  name: "clear",
  description: "Clear Messages",
  async execute(message, args) {
    if (!args[0])
      return message.reply(
        "𝐸𝑛𝑡𝑒𝑟 𝑡ℎ𝑒 𝑛𝑢𝑚𝑏𝑒𝑟 𝑜𝑓 𝑚𝑒𝑠𝑠𝑎𝑔𝑒𝑠 𝑦𝑜𝑢 𝑤𝑎𝑛𝑡 𝑡𝑜 𝑑𝑒𝑙𝑒𝑡𝑒..."
      );
    if (isNaN(args[0])) return message.reply(" 𝑃𝑙𝑒𝑎𝑠𝑒 𝑒𝑛𝑡𝑒𝑟 𝑎 𝑛𝑢𝑚𝑏𝑒𝑟");

    if (args[0] > 100)
      return message.reply("𝑌𝑜𝑢 𝑐𝑎𝑛'𝑡 𝑟𝑒𝑚𝑜𝑣𝑒 𝑚𝑜𝑟𝑒 𝑡ℎ𝑎𝑛 𝟷𝟶𝟶 𝑚𝑒𝑠𝑠𝑎𝑔𝑒𝑠!");
    if (args[0] < 1) return message.reply("𝑚𝑢𝑠𝑡 𝑑𝑒𝑙𝑒𝑡𝑒 𝑎𝑡 𝑙𝑒𝑎𝑠𝑡 𝑜𝑛𝑒 𝑚𝑒𝑠𝑠𝑎𝑔𝑒!");

    await message.channel.messages
      .fetch({ limit: args[0] })
      .then((messages) => {
        message.channel
          .bulkDelete(messages)
          .catch((error) => message.channel.send(`Error: ${error}`));
      });
  },
};
