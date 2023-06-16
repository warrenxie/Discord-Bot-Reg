module.exports = {
  name: "youtube",
  description: "sends a youtube link!",
  execute(message, args) {
    message.channel.send(
      "https://www.youtube.com/watch?v=TJBh_hj6DzE"
    );
  },
};
