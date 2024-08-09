const {EmbedBuilder, Message} = require("discord.js");
const commands = require("../commands");
const IsAdmin = require("../admins");
module.exports = {"adminonly": {
    help: "admin oNLY!",
    category: "other",
    alias: [],
    admin: true,
    /**
     * @param {Message} message
     */
    run: async function (message, args, flags) {
        if(IsAdmin(message.author.id)) {
            await message.reply("You are an admin!");
        } else {
            await message.reply("you are not an admin :)");
        }
    }
}}