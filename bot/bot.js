const { Client, GatewayIntentBits } = require('discord.js');
const {env} = require("../env");
const parseCommand = require("./commandparser");
const commands = require("./commands");
const IsAdmin = require("./admins");
const {UserReprocess} = require("./process/users");

class Bot {
    async start() {
        console.log("running bot!");


        global.client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages] });

        client.on('ready', () => {
            console.log(`Logged in as ${client.user.tag}!`);
        });

        client.on('messageCreate', async message => {
            try {
                if (message.content.startsWith("oa!")) {
                    var [args, flags] = parseCommand(message.content);
                    args[0] = args[0].slice(3);
                    var ran = false;

                    var command = null;

                    if(args[0] in commands) {
                        ran = true;
                        command = commands[args[0]]
                    } else {
                        for(var command in commands) {
                            if(commands[command].alias.includes(args[0])) {
                                ran = true;
                                command = commands[command]
                            }
                        }
                    }

                    if(typeof(command.admin) != "undefined" && command.admin === true && !IsAdmin(message.author.id)) {
                        ran = false;
                    } else if(ran == true) {
                        command.run(message, args, flags);
                    }
                    if(ran == false) {
                        message.react("❓")
                        message.reply("`" + args[0] + "` not found");
                    }
                }
            } catch (err) {
                console.log(err);
                try {
                    await message.reply("```" + JSON.stringify(err, Object.getOwnPropertyNames(err), 4) + "```")
                } catch {
                    await message.reply("Bad error!")
                }
            }
        });

        console.log(env.token);
        await client.login(env.token);
        UserReprocess.StartQueue().then(r => () => {});
    }
}

module.exports = { Bot }