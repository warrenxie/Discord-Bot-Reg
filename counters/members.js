module.exports = async (client) => {
  const guild = client.guilds.cache.get("259552722242633728");
  setInterval(() => {
    const memberCount = guild.memberCount;
    const channel = guild.channels.cache.get("792653236032372757");

    channel.setName(`Total Members: ${memberCount.toLocaleString()}`);
    console.log("Updating member count");
  }, 900000);
};
