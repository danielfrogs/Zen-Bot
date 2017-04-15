const Discord = require("discord.js");
const bot = new Discord.Client({autoReconnect: true, maxMessageCache: 0});

//The bot token goes within the quote marks
const token = "BOT TOKEN GOES HERE";

//The bot will only start reacting to information after ready is outputted
bot.on("ready", () => {
    console.log("Bot is active!");
});

//Event listener for when the message "ping" is inputted
bot.on("message", message => {
    if(message.content === "ping") {
        message.channel.sendMessage("pong");
    }
});

//Event listener for when both "joinvoice" and "leavevoice" are inputted
bot.on("message", message => {
    //Voice channel ID that the bot will connect to when the command "joinvoice" is inputted goes within the quote marks
    let voiceChannel = bot.channels.get("296737276405350402");
    if(message.content === "joinvoice") {
        voiceChannel.join()
        .then(connection => {
            //Audio file directory, in this case the root directory goes within the quote marks
            return connection.playFile("./song.wav");
        })
        .then(dispatcher => {
            dispatcher.on("error", console.error);
        })
        .catch(console.error);
    }
    if(message.content === "leavevoice") {
        voiceChannel.leave();
    }
});

//Log the Discord bot application in
bot.login(token);


