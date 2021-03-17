const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const weather = require('weather-js')
const fs = require('fs');
const db = require('quick.db');
const http = require('http');
const express = require('express');
require('./util/eventLoader.js')(client);
const path = require('path');
const request = require('request');
const snekfetch = require('snekfetch');
require('moment-duration-format')
const queue = new Map();
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');

client.on('guildMemberAdd',async member => {
    let user = client.users.get(member.id);
  let kanal = client.channels.get("821422646825975813")//BU MESAJI ATACAĞI KANALIN İDSİ
const kayitms = new Date().getTime() - user.createdAt.getTime();
    const olusturma = moment(member.user.createdAt).format('DD/MM/YYYY')
       const kurulus = new Date().getTime() - user.createdAt.getTime();
    const gün = moment.duration(kurulus).format("D")   
    var kontrol;
     if (kurulus > 2629800000) kontrol = "Güvenli Gözüküyor <a:onaylv2:821658180311580674>"
    if (kurulus < 2629800000) kontrol = "Güvensiz Gözüküyor <a:onayszv2:821658826645700638"
let embed = new Discord.RichEmbed()
.setImage("https://media.giphy.com/media/iFmXVnIff6fM2yOVaS/giphy.gif")
.addField("__Sunucuya Giriş Yapan Birisi Var__", `**<a:girisv2:697029170647007272> Türkiyem Mustafa Kemal Ailesine Hoş Geldin${member}  \n<a:k_yldz:697046966022176859>Seninle Beraber Sunucumuz** ${member.guild.memberCount} **Kişi Oldu** \n **Burası Ne Diye Soruyorsan** \n<a:sonsuzlukv2:697042117721325599>Burası MTA Turkiyem Mustafa Kemal Atatürk Kalitenin Adresi \n <a:sirencik:697029149109256222>Seninle <@&712708235249057861> İlgilenecektir `)
.addField("__Hesap Bilgileri__", `**Kuruluş Tarihi**: ${olusturma} \n**Güvenli mi:** ${kontrol}`)
kanal.send(embed)
})

const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping tamamdır.");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);
////////////////////////////////////DEĞİŞENKANALSİSTEMİ/////////////
function rcpanel1() {
    return new Promise(resolve => {
        setTimeout(() => {
            client.channels.get(`821422646381903924`).setName(`Türkiyem Mustafa Kemal`);
            rcpanel2();
        }, 5);
      });
}

  function rcpanel2() {
    return new Promise(resolve => {
        setTimeout(() => {
            client.channels.get(`821422646381903924`).setName(`Kalitenin Adresi`);
            rcpanel3();
        }, 5);
      });
  }
  function rcpanel3() {
    return new Promise(resolve => {
        setTimeout(() => {
            client.channels.get(`821422646381903924`).setName(`YAKINDA`);
            rcpanel1();
        }, 5);
      });
  }

 client.on('ready', async message => {
   rcpanel1();
 })
////////////////
client.on("message", async msg => {
    if (msg.channel.type === "dm") return;
      if(msg.author.bot) return;  
        if (msg.content.length > 4) {
         if (db.fetch(`capslock_${msg.guild.id}`)) {
           let caps = msg.content.toUpperCase()
           if (msg.content == caps) {
             if (!msg.member.hasPermission("ADMINISTRATOR")) {
               if (!msg.mentions.users.first()) {
                 msg.delete()
                 return msg.channel.send(`✋ ${msg.author}, Bu sunucuda, büyük harf kullanımı engellenmekte!`).then(m => m.delete(5000))
     }
       }
     }
   }
  }
});

///
client.on("guildMemberAdd", member => {
  setTimeout(() => {
    member.guild.channels
      .get("821422646381903925")
      .setName(`SonÜye:${member.user.username}`);
  }, 5000);
});
//
client.on('ready', ()=>{
client.channels.get('821422646381903924').join()
});
//
client.on('message', msg => {
  if (msg.content.toLowerCase() === 'sa') {
    msg.reply('Aleyküm Selam, Hoş Geldin kardeşim :)')
  }
});