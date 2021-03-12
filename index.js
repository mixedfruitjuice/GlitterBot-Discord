// https://super.vette.website/images.json

const Discord = require("discord.js");
require('dotenv').config();
var cron = require('node-cron');
const axios = require("axios");

const client = new Discord.Client();
var MainChannel = null;
var images = null;

var options = [];

this.sendImage = function (type, msg) {
    if (!type) {
        type = "generic"
    } else if (!options.includes(type)) {
        if (msg) {
            msg.reply(`${type} is not a valid option, valid options are: ` + options)
        }
    } else {
        var index = Math.floor(Math.random() * images[type].length)
        console.log(images[type].length + " chose " + index)
        var image = images[type][index]
        MainChannel.send(`https://super.vette.website/${image}`);
    }
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}! Downloading list of images`);
    axios.get("https://super.vette.website/images.json")
        .then((response) => {
            images = response.data;
            options = Object.keys(images);
        }).catch(console.log)

    client.channels.fetch('752599526958694601').then(channel => {
        MainChannel = channel;
    }).catch(console.error);
})

client.on('message', msg => {
    const msgsplit = msg.content.split(" ")
    if (msgsplit[0] === 'ping') {
        this.sendImage(msgsplit[1], msg)
    }
});

client.login(process.env.DJS_TOKEN);

cron.schedule('* 9 * * *', () => {
    console.log("cron ran")
    console.log('run every day at 9am');
    this.sendImage("generic")
}, { scheduled: true, timezone: "Europe/Amsterdam" });