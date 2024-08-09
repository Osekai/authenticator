const {EmbedBuilder, Message} = require("discord.js");
const IsAdmin = require("../admins");


module.exports = {"help": {
    help: "help provided",
    category: "other",
    alias: [],
    /**
     * @param {Message} message
     */
    run: async function (message, args, flags) {
        const commands = require("../commands");

        var organized = {};

        for (var command in commands) {
            if(typeof(commands[command].admin) != "undefined" && commands[command].admin === true) {
                if(!IsAdmin(message.author.id)) {
                    continue;
                }
            }
            if (typeof (organized[commands[command].category]) == "undefined") {
                organized[commands[command].category] = [];
            }
            organized[commands[command].category].push(command);
        }


        var embeds = [];
        for (let category in organized) {
            let exampleEmbed = new EmbedBuilder().setTitle(category);
            for (let command of organized[category]) {
                let names = command;
                for (let alias of commands[command].alias) {
                    names += " / " + alias;
                }
                exampleEmbed.addFields({
                    "name": names,
                    "value": commands[command].help ? commands[command].help : "no help proveded",
                    inline: false
                })
            }
            embeds.push(exampleEmbed);
        }
        console.log(commands);

        message.reply("wish me luck")
        message.reply({embeds: embeds});
    }
}}