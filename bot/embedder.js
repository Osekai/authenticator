const Discord = require('discord.js');
class Embedder {
    embedText = "";
    embed = null;
    emessage = null;
    constructor(message) {

    }
    async Create(message, command) {
        this.embed = new Discord.EmbedBuilder();
        this.embed.setDescription("...");
        this.embed.setTitle("Running " + command)
        this.emessage = await message.reply({ embeds: [this.embed] });
    }
    async Update(line, override = false, colour = 0xFFFFFF) {
        if(override) this.embedText = "";
        this.embedText += "\n";
        this.embedText += line;
        this.embed.setDescription(this.embedText);
        this.embed.setColor(colour);
        if(line == "Done!") {
            this.embed.setColor(0x0000FF);
        }
        await this.emessage.edit({ embeds: [this.embed] });
    }
}
module.exports = Embedder;