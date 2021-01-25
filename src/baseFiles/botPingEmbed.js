const Discord = require('discord.js');
const Guild = require('../DataBase/models/guild.schema');

function sendBotPingEmbed(msg, guildID){

    let prefix;

    Guild.find({guildID: guildID})
        .then(guild => {
            prefix = guild.config.prefix;

            const embed = new Discord.MessageEmbed()
                .setColor('#4fb9ff')
                .setTitle('NestBOT')
                .setURL('https://discord.gg/SYJ5cC4')
                .setDescription('Mój aktualny prefix to ``' + prefix + "``")
                .setThumbnail('https://i.imgur.com/P4NZNnb.png')
                .addFields(
                    {name: "⚙️ Potrzebna Pomoc?", value: '[Serwer Discord Pomocy Technicznej](https://discord.gg/SYJ5cC4) lub bezpośredni kontakt z <@!327860794135937024>'},
                    {name: "🏓 Aktualny Ping", value: Date.now() - msg.createdTimestamp + "ms"}
                )
                .setFooter('NEST Bot © 2021 • Command called by ' + msg.author.tag, 'https://i.imgur.com/P4NZNnb.png');
                
            msg.channel.send(embed);
        })
        .catch(err => console.log('Error: ' + err));

}

module.exports = sendBotPingEmbed;