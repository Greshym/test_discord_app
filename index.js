const { TOKEN, PREFIX } = require("./config.js");
const { Client, Intents, MessageEmbed } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

function isValidHttpUrl(string) {
    let url;
    
    try {
      url = new URL(string);
    } catch (_) {
      return false;  
    }
  
    return url.protocol === "http:" || url.protocol === "https:";
  }

client.on("messageCreate", (message) => {
    //The bot only manage messages starting with PREFIX
    if (!message.content.startsWith(PREFIX) || message.author.bot) return;

    //Array of the arguments after the command in the message
    const args = message.content.slice(PREFIX.length).split(/ +/);

    //The command following PREFIX in the massage
    const command = args.shift().toLowerCase();

    //console.log(args);
    if (command === "post") {
        if (args.length !== 1) {
            message.channel.send("Nombre darguments fournis invalide. \nUtilisez \`\`\`%post 'immage_url\`\`\`'");
            return;
        }
/*         if (isValidHttpUrl(message.embeds[0].url)) {
            console.log(message.embeds[0].url);
        } */
        else if (!message.embeds[0]) {
          message.channel.send("L'url envoyé n'est pas valide");
          return;
        }
        else if (!isValidHttpUrl(message.embeds[0].url)) {
          message.channel.send("Le format d'image n'est pas supporté par Radamir Bot");
          return;
        }
        else
          console.log(message.embeds[0].url);
    }

});

client.login(TOKEN);
