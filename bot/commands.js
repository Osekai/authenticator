const {Message} = require("discord.js");
const Discord = require('discord.js');
const connection = require("../database");
const Embedder = require("./embedder");
const {EmbedBuilder} = require('discord.js');
const env = require("../env");
var fs = require('fs');
const {exec} = require('child_process');

const {help} = require("./commands/help");
const {adminonly} = require("./commands/adminonly");
const {resend} = require("./commands/resend");
const {getuserstored} = require("./commands/getuserstored");


var commands = {
    "help": help, "adminonly": adminonly, "resend": resend, "getuserstored": getuserstored
}

console.log(commands);

module.exports = commands;