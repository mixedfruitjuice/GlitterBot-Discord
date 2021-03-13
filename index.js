// https://super.vette.website/images.json

const Discord = require("discord.js");
require("dotenv").config();
const config = require("./config.js");
var cron = require("node-cron");
const axios = require("axios");

const client = new Discord.Client();
var MainChannel = null;
var images = null;

var options = [];

this.sendImage = function (type, msg) {
  console.log(type);
  var category = type ? type : "generic";
  if (!options.includes(category)) {
    if (msg) {
      msg.reply(
        `${category} is not a valid option, valid options are: ` + options
      );
    }
  } else {
    console.log("category: " + category);
    var index = Math.floor(Math.random() * images[category].length);
    console.log(images[category].length + " chose " + index);
    var image = images[category][index];
    MainChannel.send(`https://super.vette.website/${image}`);
  }
};

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}! Downloading list of images`);
  axios
    .get("https://super.vette.website/images.json")
    .then((response) => {
      images = response.data;
      options = Object.keys(images);
    })
    .catch(console.log);
  client.channels
    .fetch(config.channelId)
    .then((channel) => {
      console.log(channel.name);
      MainChannel = channel;
    })
    .catch(console.error);
});

client.on("message", async (msg) => {
  if (msg.author.bot) return;
  if (!msg.guild) return;
  if (!msg.content.startsWith(config.commandPrefix)) return;
  if (!msg.member) msg.member = await msg.guild.fetchMember(msg);

  let args = msg.content.slice(config.commandPrefix.length).trim();
  args = args.split(" ");
  const cmd = args.shift().toLowerCase();
  if (cmd === config.commands.sendImage) {
    console.log("sending image");
    console.log(args);
    this.sendImage(args[0], msg);
  }
});

client.login(process.env.DJS_TOKEN);

cron.schedule(
  "0 9 * * *",
  () => {
    console.log("cron ran");
    console.log("run every day at 9am");
    this.sendImage("generic");
  }, {
    scheduled: true,
    timezone: "Europe/Amsterdam",
  }
);