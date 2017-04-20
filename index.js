const Discord = require("discord.js");
const bot = new Discord.Client({autoReconnect: true, maxMessageCache: 0});

const urlsPlaylist = require("./urlsArray.js").urlsPlaylist;

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
    if(message.content === "play track") {
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
});

//Event listener for when both "joinvoice" and "leavevoice" are inputted
bot.on("message", message => {
    //Voice channel ID that the bot will connect to when the command "joinvoice" is inputted goes within the quote marks
    let voiceChannel = bot.channels.get("VOICE CHANNEL ID GOES HERE");
    const ytdl = require("ytdl-core");
    const streamOptions = {seek: 0, volume: 0.5};
    if(message.content === "play youtube") {
        function looping() {
            //Random number representing position within the urlsPlaylist array to select url. End number must be equal to the total amount of possibly selected urls from the array discounting position 0
            randomPosition = Math.round(Math.random() * 4); 
            console.log("Song position in array:", randomPosition);

            //Bot joins voice channel and plays the YouTube stream collected from urlsPlaylist array
            voiceChannel.join()
            .then(connection => {
                let stream = ytdl(urlsPlaylist[randomPosition], {filter: "audioonly", quality: "lowest"});
                const dispatcher = connection.playStream(stream, streamOptions);
                dispatcher.on("end", () => {
                    looping();
                });
            })  
            .catch(console.error);
        }
        looping();
    }
});

//Log the Discord bot application in
bot.login(token);