const Guild = require('../DataBase/models/guild.schema');

function welcomeMessage(event){

    Guild.find({guildID: event.guild.id})
        .then(guild => {
            if(guild.config.welcomeMessage == "") return;
            event.send(guild.config.welcomeMessage);
        })
        .catch(err => console.log(err))

}

module.exports = welcomeMessage;