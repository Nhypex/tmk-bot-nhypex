const Discord = require('discord.js');

exports.run = (client, message, args) => {
 let guild = message.guild;

    guild.fetchBans()
        .then(bans => message.channel.send(`Sunucunuzda **${bans.size}** banlanmış üye bulunmaktadır.`))
        .catch(console.error);

}

exports.conf = {
    enabled: true,
    runIn: ["bansay"],
    aliases: [],
    permLevel: 0
  };

  exports.help = {
    name: "bansay",
    description: "Sunucudan banlanan kişilerin sayısını gösterir",
    usage: "bansay"
  }