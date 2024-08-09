const {EmbedBuilder, Message} = require("discord.js");
const IsAdmin = require("../admins");
const {CreateToken} = require("../process/tokens");
const {env} = require("../../env");


module.exports = {"resend": {
    help: "Resend authentication link",
    category: "authentication",
    alias: [],
    /**
     * @param {Message} message
     */
    run: async function (message, args, flags) {
        var user = message.author.id;
        if(args.length > 1) {
            if(IsAdmin(message.author.id)) {
                user = args[1];
            }
        }
        // TODO: check to see if user is authenticated already
        await message.reply("Sending to " + user);
        var token = await CreateToken(user);
        console.log(client);
        await (await client.users.fetch(user)).send(env.url + `/auth/${token}`);
    }
}}