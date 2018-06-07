//Allowing access to files made within the project folder
const botConfig = require("./botconfig.json");
const musicPlaylist = require("./musicplaylist.js").musicPlaylist;

const Discord = require("discord.js");
const bot = new Discord.Client({autoReconnect: true, maxMessageCache: 0});
const prefix = botConfig.prefix;

const ytdl = require("ytdl-core");
const streamOptions = {seek: 0, volume: 0.5};


//Outputs to the console when bot is active
bot.on("ready", async () => {
    console.log(`Logged in as ${bot.user.username}!`);
});

//Command to check bot is receiving commands
bot.on("message", async message => {

    if(message.author.bot) return; //Checks to see if person who types the command is a bot; if true stops the function
    if(message.channel.type === "dm") return; //Checks to see if the command was typed in dm; if true stops the function

    if(message.content === `${prefix}ping`) {
        message.channel.send("pong");
    }
    else return; //If all conditions in the if statement are not met function stops
});

//Command to start music looping in a desired voice channel
bot.on("message", async message => {

    let voiceChannel = bot.channels.get("VOICE CHANNEL ID GOES HERE"); //Specifies the voice channel id (optained from discord)

    if(message.content === `${prefix}youtube`) {
        function loopNumber() { //A looping function called loopNumber

            var randomPosition = musicPlaylist[Math.floor(Math.random()*musicPlaylist.length)]; //Selects a random place within the musicPlaylist array in the musicplaylist.js file
            console.log(randomPosition);

            //Bot joins the specified voice channel
            voiceChannel.join().then(connection => {
                
                //Bot starts to stream using ytdl the randomPosition variable we generated above using our array in the musicplaylist.js file
                let stream = ytdl(randomPosition);
                const dispatcher = connection.playStream(stream, streamOptions); //streamOptions are specified at a const at the top of the index.js file
                dispatcher.on("end", () => {
              
                    loopNumber(); //Calls to do the function loopNumber again

                });
            })
            .catch(console.error);
        }
    loopNumber(); //Calls to do the function loopNumber again  
    }
});

//Login the bot with the token specified in the botConfig.json file
bot.login(botConfig.token);