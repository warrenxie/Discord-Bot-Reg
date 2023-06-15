module.exports = {
  name: "youtube",
  description: "sends a youtube link!",
  execute(message, args) {
    message.channel.send(
      "https://www.youtube.com/watch?v=AUOb9_aAk7U&list=WL&index=84&t=28s"
    );
  },
};
