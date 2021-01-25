const axios = require('axios');
const Discord = require('discord.js');

const sampleCommand = {
    
    "properties": {
        "name": "anime",
        "displayName": "📚 anime",
        "usage": "anime",
        "aliases": ["animu"],

        "description": "Shows info about anime",
        "format": "anime [anime name]"      
    },

    "language": null,

    // Code that's runs before command
    _Initialize(msg, language, args){
        this.language = language;
    },


    // Main command code
    _Command(msg, args){
        
        if(!args[1]) {
            msg.channel.send("You need to give an argument!");
            return;
        }

        let anmieName = "";
        for(let i = 1; i <= args.length; i++) anmieName += args[i] + "_";
        

        axios.get('https://api.jikan.moe/v3/search/anime?q=' + anmieName)
            .then(resp => {

                const embed = new Discord.MessageEmbed()
                    .setColor('#4fb9ff')
                    .setTitle(resp.data.results[0].title)
                    .setURL(resp.data.results[0].url)
                    .setDescription(resp.data.results[0].synopsis)
                    .setThumbnail(resp.data.results[0].image_url)
                    .addFields(
                        {name: "📚 Type", value: resp.data.results[0].type, inline: true},
                        {name: "📺 Episodes", value: resp.data.results[0].episodes, inline: true},
                        {name: "⭐ Score", value: resp.data.results[0].score},
                        {name: "🔞 Rated", value: resp.data.results[0].rated}
                    )
                    .setFooter('NEST Bot © 2021 • Command called by ' + msg.author.tag, 'https://i.imgur.com/P4NZNnb.png');
                
                msg.channel.send(embed);
            })
            .catch(err => console.log(err));

    },
}

module.exports = sampleCommand;