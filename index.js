const commando = require("discord.js-commando");
const bot = new commando.Client();

//This allows for commands to be located in their own .js file instead of all being located in one file
bot.registry.registerGroup("public", "Admin");
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands");

//The bot token goes within the quote marks and this will log in the Discord bot application
bot.login("BOT TOKEN GOES HERE");