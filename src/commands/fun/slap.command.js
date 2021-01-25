const axios = require('axios');
const Discord = require('discord.js');

const sampleCommand = {
    
    "properties": {
        "name": "slap",
        "displayName": "😠 Slap",
        "usage": "slap",
        "aliases": [],

        "description": "Shows gif where you slaps somebody",
        "format": "slap [@user]"      
    },

    "language": null,

    // Code that's runs before command
    _Initialize(msg, language, args){
        this.language = language;
    },


    // Main command code
    _Command(msg, args){

        if(!msg.mentions.members.first()){
            msg.channel.send("Musisz podać innego użytkownika");
            return;
        }
        let kissed = msg.mentions.members.first().user.username;

        axios.get('https://api.tenor.com/v1/search?nothing&q=anime-slap&key=27T9K6KM7H2L&limit=10')
            .then(response => {

                let toGet = getRandomInt(0, 9);
                let gif = response.data.results[toGet].media[0].gif.url;

                const Embed = new Discord.MessageEmbed()
                    .setImage(gif)
                    .setFooter('NEST Bot © 2021 • Command called by ' + msg.author.tag, 'https://i.imgur.com/P4NZNnb.png')
                    .setColor('#ffaf2e');

                msg.channel.send("**" + kissed + "**, you have been slapped by **" + msg.author.username + "**", Embed);

            })
            .catch(err => console.log(err));

    },
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    
    return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = sampleCommand;