const {EmbedBuilder, Message} = require("discord.js");
const commands = require("../commands");
const IsAdmin = require("../admins");
const {UserReprocess, User} = require("../process/users");
module.exports = {"getuserstored": {
    help: "oa!getuserstored -osu osuid -discord discordid",
    category: "other",
    alias: [],
    admin: true,
    /**
     * @param {Message} message
     */
    run: async function (message, args, flags) {
        await message.reply(JSON.stringify(await UserReprocess.GetUserStored(new User(flags.osu, flags.discord))))
    }
}}