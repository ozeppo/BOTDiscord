const numeral = require('numeral');

const createNewUser = require('../../../baseFiles/createNewUser');
const User = require('../../../DataBase/models/users.schema');
const discord = require('discord.js');

const sampleCommand = {
    
    "properties": {
        "name": "profile",
        "displayName": "🙎 Profile",
        "usage": "profile",
        "aliases": ["prof"],

        "description": "That command shows you your or another user's profile",
        "format": "profile [@user]"      
    },

    "language": null,

    // Code that's runs before command
    _Initialize(msg, language, args){
        this.language = language;
    },


    // Main command code
    _Command(msg, args){
        
        let userID;
        let user_;
        let username;

        if(args[1] == null) { 
            userID = msg.author.id;
            username = msg.author.username;
            user_ = msg.author;
        }
        else { 
            userID = msg.mentions.members.first().user.id;
            username = msg.mentions.members.first().user.username;
            user_ = msg.mentions.members.first().user;
        }

        if(user_ == undefined){
            msg.channel.send('Niemogę znaleźć użytkownika.');
            return;
        }

        //console.log(msg.mentions.members.first());

        let money = "0";
        let description = "You can set it on our website";
        let badges = "None";
        let level = "0";
        let exp = "0";
        let reputation = "0";
        let birthday = "Not set";
        let marriage = "Single";


        let finded_;

        User.find({userID: userID})
            .then(temp => {

                if(temp) finded_ = true;
                else return;

                money = temp.money;

                badges = "";

                let inv = temp.inventory;
                inv.forEach(temp2 => {
                    badges = badges + " " + temp2;
                })

                if(!badges || badges == "") badges = "None";
                
                description = temp.preferences.description;
                exp = numeral(temp.exp).format('0 a');
                reputation = temp.preferences.reputation;
                birthday = temp.preferences.birthday;
                marriage = temp.preferences.marriage;
                level = temp.level;
                
            })
            .then(() => {
                if(!finded_) createNewUser(userID);

                const embed = new discord.MessageEmbed()
                    .setTitle(username)
                    .setColor('#eb4236')
                    .setThumbnail(user_.avatarURL())
                    .setDescription(description)
                    .addFields(
                        { name: "🧳 Badges", value: badges },
                        { name: "✨ Level", value: level + " (XP: " + exp + "/" + (1000 * (level * 0.25)).toString() + ")", inline: true},
                        { name: "🏅 Reputation", value: reputation, inline: true},
                        { name: "🎉 Birthday", value: birthday },
                        { name: "❤️ Marriage", value: marriage },
                        { name: "💸 Wallet", value: money + "$" }
                    )
                    .setFooter('NEST Bot © 2021 • Command called by ' + msg.author.tag, 'https://i.imgur.com/P4NZNnb.png');

                msg.channel.send(embed);
                
            })

    },
}

module.exports = sampleCommand;