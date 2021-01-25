const Members = require('../../DataBase/models/members.schema');
const Guild = require('../../DataBase/models/guild.schema');

const Command = {
    
    "properties": {
        "name": "warn",
        "displayName": "🔨 Warn",
        "usage": "warn",
        "aliases": [],

        "description": "Admin command to warn users",
        "format": "warn [@user] (reason)"      
    },

    "language": null,

    // Code that's runs before command
    _Initialize(msg, language, args){
        this.language = language;
    },


    // Main command code
    _Command(msg, args){

        let isMod = false;

        Guild.find({guildID: msg.guild.id})
            .then(guild => {
                let modRoles = guild.config.modRoles;

                modRoles.forEach(tempRole => {
                    if(msg.member._roles.includes(tempRole)){
                        isMod = true;
                        return;
                    }   
                });

                if(!isMod) {
                    msg.channel.send('Nieposiadasz odpowiednich uprawnień.');
                    return;
                }
        
                if(!args[1]) {
                    msg.channel.send(this.language.needUser);
                    return;
                }
                
                let user = msg.mentions.members.first();
        
                if(user == undefined){
                    msg.channel.send('Niemogę znaleźć użytkownika.');
                    return;
                }
        
                let reason = "Nie podano powodu.";
        
                if(args[2] != ""){   
                    reason = args;
                    reason.shift();
                    reason.shift();
                    reason = reason.join(" ");
                }
                
                Members.find({userID: user.id})
                    .then(resp => {
                        if(resp === undefined){
                            Members.add(user.id)
                            .then(() => {
                                Members.addWarn(user.id, msg.guild.id, reason)
                                    .then(msg.channel.send('Ostrzeżono Użytkownika.'))
                                    .catch(err2 => console.log(err2))
                                    .then(() => {
                                        return;
                                    });
                            })
                            
                        }
                        else{
                            Members.addWarn(user.id, msg.guild.id, reason)
                                .then(msg.channel.send('Ostrzeżono Użytkownika.'))
                                .catch(err => console.log(err));
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            })
            .catch(err => console.log(err));

    },
}

module.exports = Command;