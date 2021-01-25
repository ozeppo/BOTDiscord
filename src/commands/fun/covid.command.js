const axios = require('axios');
const emojiFlags = require('emoji-flags');
const Discord = require('discord.js');

const command = {
    
    "properties": {
        "name": "covid",
        "displayName": "🦠 COVID-19 Stats",
        "usage": "covid",
        "aliases": ["corona", "coronavirus", "covid-stats"],

        "description": "Shows you covid stats",
        "format": "covid"      
    },

    "_languagePath": "",

    // Code that's runs before command
    _Initialize(msg, language, args){
        this._languagePath = language;
    },


    // Main command code
    _Command(msg, args){
        axios.get('https://api.covid19api.com/country/Poland')
            .then(res => {

                let emojiObject = emojiFlags.countryCode(res.data[res.data.length-1].CountryCode).emoji;

                const covidEmbed = new Discord.MessageEmbed()
                    .setColor('#c90000')
                    .setTitle((this._languagePath.box_name) + "")
                    .setDescription(this._languagePath.day_stats + "**" + (res.data[res.data.length-1].Date).substring(0, 10) + "**")
                    .setThumbnail('https://www.waszaturystyka.pl/wp-content/uploads/2020/03/koronawirus-covid19-zagraza-2.jpg')
                    .addFields(
                        { name: this._languagePath.country_field + ":", value: emojiObject + " " + res.data[res.data.length-1].Country, inline: true },
                        { name: this._languagePath.active_field + ':', value: res.data[res.data.length-1].Active, inline: true },
                    )
                    .addFields(
                        { name: this._languagePath.confirmed_field + ':', value: res.data[res.data.length-1].Confirmed },                  
                        { name: this._languagePath.deaths_field + ':', value: res.data[res.data.length-1].Deaths, inline: true },
                    )
                    .addFields(
                        { name: this._languagePath.recovered_field + ':', value: res.data[res.data.length-1].Recovered, inline: true }
                    )
                    .setFooter('NEST Bot © 2021 • Command called by ' + msg.author.tag, 'https://i.imgur.com/P4NZNnb.png');

            msg.channel.send(covidEmbed);
        });
    },
}

module.exports = command;