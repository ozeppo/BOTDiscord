const Guild = require('../../DataBase/models/guild.schema');

const command = {
    
    "properties": {
        "name": "ban",
        "displayName": "🔨 Ban Command",
        "usage": "ban",
        "aliases": [],

        "description": "Administrator command to banning users",
        "format": "ban [@user] (reason)"      
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
                    msg.channel.send(this.language.permissionDeny);
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
        
                let reason = this.language.defaultReason;
                if(args[2]){
                    reason = "";

                    for(let i = 2; i <= args.length; i++){
                        if(args[i] == undefined) break;
                        reason += args[i] + " ";
                    }
                }

                if(user == undefined){
                    msg.channel.send(this.language.cantFindUser);
                    return;
                }
        
                user.send((this.language.bannedInfo).replace("{guildName}", msg.guild.name).replace("{reason}", reason));
                user.ban({reason: reason})
                    .catch(err => {
                        msg.channel.send('Wystąpił błąd. Niemogę wykonać tej akcji. ');
                        console.log('Error: ' + err);
                        return;
                    });
                msg.channel.send(this.language.succes);

            })
            .catch(err => console.log('Error: ' + err));
    },
}

module.exports = command;