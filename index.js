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
//bot.on("message", message => {
    //Voice channel ID that the bot will connect to when the command "joinvoice" is inputted goes within the quote marks
    //let voiceChannel = bot.channels.get("296737276405350402");
    //if(message.content === "joinvoice") {
        //voiceChannel.join()
        //.then(connection => {
            //Audio file directory, in this case the root directory goes within the quote marks
            //return connection.playFile("./song.wav");
        //})
        //.then(dispatcher => {
            //dispatcher.on("error", console.error);
        //})
        //.catch(console.error);
    //}
    //if(message.content === "leavevoice") {
        //voiceChannel.leave();
    //}
//});

//var test = ["a", "b", "c"];

//Array for the list of YouTube urls to pull when looping over voice streams
let urlsPlaylist = [
    "https://www.youtube.com/watch?v=JbjzPKTfjlc",
    "https://www.youtube.com/watch?v=JbjzPKTfjlc",
    "https://www.youtube.com/watch?v=no3B0uS6nLk",
    "https://www.youtube.com/watch?v=3oQHMREyXSw"
] 

//Array for the total time to delay the loop in milliseconds dependent on the YouTube stream that is being played (must be in same order as urls are in urlPlaylist array)
let urlsTimePlaylist = [
    360000,
    360000,
    554000,
    224000
]

var i = 1;

//Event listener for when both "joinvoice" and "leavevoice" are inputted
bot.on("message", message => {
    //Voice channel ID that the bot will connect to when the command "joinvoice" is inputted goes within the quote marks
    let voiceChannel = bot.channels.get("VOICE CHANNEL ID GOES HERE");
    const ytdl = require("ytdl-core");
    const streamOptions = {seek: 0, volume: 1};
    if(message.content === "joinvoice") {
        function myLoop() {
            //Random number with the number at the end always being the total number urls in the urlsPlaylist array to give a number within the range of the total amount which will be used to select a track
            let random = urlsPlaylist.length - Math.floor(Math.random() * 4); 
                setInterval(function () {
                    //Checks to see if loop is continuing
                    console.log("Logged");
                    i++;
                    if(i < 10) {
                        myLoop();
                    }
                }, urlsTimePlaylist[random]);
                console.log("Selected placeholder:", random);
                console.log("Time wiat in milliseconds:", urlsTimePlaylist[random]);
                //Bot joins voice channel and plays the YouTube stream collected from urlsPlaylist array
                voiceChannel.join()
                .then(connection => {
                    const stream = ytdl(urlsPlaylist[random], {filter: "audioonly", quality: "lowest"});
                    return connection.playStream(stream, streamOptions);
                })
            .catch(console.error);
        }    
        myLoop()
    }
    if(message.content === "leavevoice") {
        voiceChannel.leave();
    }
});

//Log the Discord bot application in
bot.login(token);


