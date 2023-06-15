require("dotenv").config();
const { memory } = require("console");
const Discord = require("discord.js");
const fetch = require("node-fetch");
const client = new Discord.Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});

const prefix = "!";
const memberCounter = require(`./counters/members`);

const fs = require("fs");
client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync("./commands/")
  .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}


client.once("ready", () => {
  console.log("Reg is now online..");
  memberCounter(client);
});
client.on("guildMemberAdd", (guildMember) => {
  let welcomeRole = guildMember.guild.roles.cache.find(
    (role) => role.name === "Alright People"
  );

  guildMember.roles.add(welcomeRole);
  guildMember.guild.channels.cache
    .get("791589058747826207")
    .send(`𝑊𝑒𝑙𝑐𝑜𝑚𝑒 <@${guildMember.user.id}> 𝑡𝑜 𝑜𝑢𝑟 𝑠𝑒𝑟𝑣𝑒𝑟!`);
});
client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;


  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === "ping") {
    client.commands.get("ping").execute(message, args);
  } else if (command === "youtube") {
    client.commands.get("youtube").execute(message, args);
  } else if (command === "clear") {
    client.commands.get("clear").execute(message, args);
  } else if (command === "command") {
    client.commands.get("command").execute(message, args, Discord);
  } else if (command === "mute") {
    client.commands.get("mute").execute(message, args);
  } else if (command === "unmute") {
    client.commands.get("unmute").execute(message, args);
  } else if (command === "reactionrole") {
    client.commands.get("reactionrole").execute(message, args, Discord, client);
  } else if (command === "kick") {
    client.commands.get("kick").execute(message, args);
  } else if (command === "ban") {
    client.commands.get("ban").execute(message, args);
  } else if (command === "play") {
    client.commands.get("play").execute(message, args);
  } else if (command === "leave") {
    client.commands.get("leave").execute(message, args);
  } else if (command === "skip") {
    client.commands.get("skip").execute(message, args);
  } else if (command === "gif") {
    client.commands.get("gif").execute(message, args);
  } else  if (message.content === "!test") {
    message.channel.send("Bot is working!");
  }
});

//Must be on the last line of the file
client.login(process.env.TOKEN);
