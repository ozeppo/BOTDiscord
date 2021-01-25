const Discord = require('discord.js');

const Command = {
    
    "properties": {
        "name": "Pool Command",
        "displayName": "❓ Pool",
        "usage": "pool",
        "aliases": [],

        "description": "Command that helps you to create a pool",
        "format": "pool [question]"      
    },

    "language": null,

    // Code that's runs before command
    _Initialize(msg, language, args){
        this.language = language;
    },


    // Main command code
    _Command(msg, args){
        
        let question = args.join(" ");

        if(!args[1]) {
            msg.channel.send('Musisz zadać pytanie!');
            return;
        }

        const embed = new Discord.MessageEmbed()
            .setColor('#4fb9ff')
            .setTitle('📊 Ankieta 📊')
            .setDescription(question)
            .setFooter('NEST Bot © 2021 • Command called by ' + msg.author.tag, 'https://i.imgur.com/P4NZNnb.png');

        msg.channel.send(embed)
            .then(message => {
                message.react("👍");
                message.react("👎");
                msg.delete();
            })
            .catch(err => console.log('Error: ' + err));

    },
}

module.exports = Command;