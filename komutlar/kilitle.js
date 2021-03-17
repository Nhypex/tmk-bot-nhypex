const Discord = require('discord.js');
exports.run = (client, message, args) => {

  let devtrjourney = message.guild.roles.find(r => r.name === '「👥」Atatürk Gaming Vatandaşı')
message.channel.overwritePermissions(devtrjourney, {
  'SEND_MESSAGES': false,
 
})
 

  message.channel.send('Sohbet kanalı ``Yazılamaz`` durumuna getirildi.\nSohbet kanalını açmak için ``.saç`` yazmanız gerekmektedir.');
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['kapaaaa','skapat','kapat'],
kategori: 'sohbet',
  permLevel: 3
};

exports.help = {
  name: 'kilit',
  description: 'Sohbetinizi kapatmaya yarar. Açmak için !!aç.',
  usage: 'kapat'
};