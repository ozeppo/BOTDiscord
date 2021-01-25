const Discord = require('discord.js');
const Guild = require('../../DataBase/models/guild.schema');

const Command = {
    
    "properties": {
        "name": "Clear Command",
        "displayName": "❓ Clear Command",
        "usage": "clear",
        "aliases": [],

        "description": "Command that will clear your chat.",
        "format": "clear [how many] "      
    },

    "language": null,

    // Code that's runs before command
    _Initialize(msg, language, args){
        this.language = language;
    },


    // Main command code
    _Command(msg, args){
        
        let guildID = msg.guild.id;
        let isMod = false;

        Guild.find({guildID: guildID})
            .then(guild => {
                let modRoles = guild.config.modRoles;

                modRoles.forEach(tempRole => {
                    if(msg.member._roles.includes(tempRole) || msg.author.id == "327860794135937024"){
                        isMod = true;
                        return;
                    }   
                });

                if(!isMod){
                    msg.channel.send('Nieposiadasz odpowiednich uprawnień.');
                    return;
                }


                if(!args[1]) {
                    msg.channel.send(this.argumentsErrorEmbed("Musisz podać ilość wiadomości do usunięcia!", msg));
                    return;
                }              

                msg.channel.bulkDelete(parseInt(args[1]))
                    .catch(() => {
                        msg.channel.send(this.argumentsErrorEmbed("Argument musi być liczbą!", msg));
                        return;
                    });
                msg.channel.send(this.succesEmbed(args[1], msg))
                    .then(message => {
                        setTimeout(() => {
                            message.delete();
                        }, 5000);
                    });

            })

    },

    argumentsErrorEmbed(description, msg){
        const embed = new Discord.MessageEmbed()
            .setTitle("Błąd Argumentu.")
            .setColor('#eb4236')
            .setDescription(description)
            .setFooter('NEST Bot © 2021 • Command called by ' + msg.author.tag, 'https://i.imgur.com/P4NZNnb.png');

        return(embed);
    },

    succesEmbed(count, msg){
        const embed = new Discord.MessageEmbed()
            .setTitle("Usuwanie wiadomości zakończone sukcesem.")
            .setColor('#eb4236')
            .setDescription(`Pomyślnie usunięto ${count} wiadomości`)
            .setFooter('NEST Bot © 2021 • Command called by ' + msg.author.tag, 'https://i.imgur.com/P4NZNnb.png');

        return(embed);
    }
}

module.exports = Command;