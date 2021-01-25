const Guild = require('../DataBase/models/guild.schema');

function addAutoRole(guildID, guildMember){

    Guild.find({guildID: guildID})
        .then(guild => {
            const rolesArray = guild.config.autoRoles;

            rolesArray.forEach(roleID => {
                let role = guildMember.guild.roles.cache.get(roleID);

                guildMember.roles.add(role);                
            });
            
        })
        .catch(err => console.log("Error: " + err));

}

module.exports = addAutoRole;