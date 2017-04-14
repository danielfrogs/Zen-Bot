const commando = require("discord.js-commando");

//A class attached to a specific command
class helpme extends commando.Command {
    constructor(client) {
        super(client, {name: "helpme", group: "public", memberName: "helpme", description: "Sends some help"});
    }

//This is what happens when the arguments are met on the Discord server
    async run(message, args) {
        message.reply("Sending help");
    }
}

module.exports = helpme;