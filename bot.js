const discord = require("discord.js")
const botConfig =  require("./botconfig.json");

const bot = new discord.Client();


bot.on("ready", async () => {

    console.log(`${bot.user.username} is online!`)

    bot.user.setActivity("#SOON", {type: "PLAYING"});

});


bot.on("message", async message => {

    // Als bot bericht stuurt dan return
if(message.author.bot) return;

if(message.channel.type === "dm") return;

 var prefix = botConfig.prefix;

 var messageArray = message.content.split(" ");

 var command = messageArray[0];

 var arguments = messageArray.slice(1);

 if (command === `${prefix}hallo`){

 return message.channel.send("hallo");

  }

 if (command === `${prefix}info`){

    var botIcon = bot.user.displayAvatarURL

var botEmbed = new discord.RichEmbed()
    .setDescription("discord bot info")
    .setColor("#4286f4")
    .setThumbnail(botIcon) 
    .addField("Bot naam", bot.user.username)
    .addField("Gemaakt op:", bot.user.createdAt);

return message.channel.send(botEmbed);

   }

 if (command === `${prefix}serverinfo`){
   
    var botIcon = message.guild.iconURL;

    var serverEmbed = new discord.RichEmbed()
    .setDescription("Server informatie")
    .setColor("#4286f4")
    .setThumbnail(botIcon) 
    .addField("Bot naam:", bot.user.username)
    .addField("Je bent gejoint op:", message.member.joinedAt)
    .addField("Totaal members:", message.guild.memberCount);

    return message.channel.send(serverEmbed);

   } 

   if (command === `${prefix}kick`) {

    var botIcon = message.guild.iconURL;

    // !kick @spyke1304 reden hier.

   var kickUser = message.guild.member(message.mentions.users.first() || message.guild.members(arguments[0]));
   
   if (!kickUser) return message.channel.send("Gebruiker is niet gevonden!");
   
   var reason = arguments.join(" ").slice(22);

   if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Sorry je kunt dit niet doen.");

   if (kickUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Deze gebruiker kan je niet kicken.");

   var kick = new discord.RichEmbed()
      .setDescription("kick")
      .setColor("#f20909")
      .setThumbnail(botIcon) 
      .addField("Kicked gebruiker:", kickUser)
      .addField("Gekicked door:", message.author)
      .addField("Reden:", reason);

    var kickChannel = message.guild.channels.find('name', "straffen");
    if (!kickChannel) return message.guild.send("Kan het kanaal niet vinden!");

    message.guild.member(kickUser).kick(reason);

    kickChannel.send(kick);

    return; 

} 

if (command === `${prefix}ban`) {

    var botIcon = message.guild.iconURL;

    // !ban @spyke1304 reden hier.

   var banUser = message.guild.member(message.mentions.users.first() || message.guild.members(arguments[0]));
   
   if (!banUser) return message.channel.send("Gebruiker is niet gevonden!");
   
   var reason = arguments.join(" ").slice(22);

   if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Sorry je kunt dit niet doen.");

   if (banUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Deze gebruiker kan je niet bannen.");

   var ban = new discord.RichEmbed()
      .setDescription("ban")
      .setColor("#f20909")
      .setThumbnail(botIcon) 
      .addField("verbannen gebruiker:", banUser)
      .addField("Geband door:", message.author)
      .addField("Reden:", reason);

    var banChannel = message.guild.channels.find('name', "straffen");
    if (!banChannel) return message.guild.send("Kan het kanaal niet vinden!");

    message.guild.member(banUser).ban(reason);

    banChannel.send(ban);

    return; 

}

});


bot.login(botConfig.token);
