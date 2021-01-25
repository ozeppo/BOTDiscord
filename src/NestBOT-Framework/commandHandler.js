const Discord = require("discord.js");

const commandHandler = {

    "commandsList": [],

    addCommand(command){
        this.commandsList.push(command);
        console.log("\x1b[36m","[NestBOT] Importing " + command.properties.name + ".");
    },

    checkCommand(message, msg, language, args){

        if(message === "help"){
            this.helpCommand(message, msg, args);
        }

        this.commandsList.forEach(element => {

            let isAlias = false;

            if(message === element.properties.usage){
               isAlias = true; 
            }
            
            else{
                element.properties.aliases.forEach(alias => {
                    if(message === alias) isAlias = true;
                });
            }

            if(isAlias){ 
                element._Initialize(msg, language.commands[element.properties.name], args);
                element._Command(msg, args);
            }
        });
    },

    helpCommand(message ,msg, args){

        if(!args[1]){

            const embed = new Discord.MessageEmbed()
                    .setColor('#84a8f5')
                    .setTitle('NestBOT Help')
                    .setDescription('For details use ``help [command name]``. More information about commands on our website.')
                    .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Orange_question_mark.svg/450px-Orange_question_mark.svg.png')
                    .addFields(
                        { name: "🔨 Admin Commands", value: "``ban``, ``kick``, ``warn``, ``clear`` " },                  
                        { name: "🤵 Community Commands", value: "``profile``" },
                        { name: "💸 Economy Commands", value: "``wallet``, ``daily``" },
                        { name: "🎉 Fun Commands", value: "``anime``, ``covid``, ``hug``, ``kiss``, ``slap``" },
                        { name: "💡 Utility Commands", value: "``pool``" }
                    )
                    .setFooter('NEST Bot © 2021 • Command called by ' + msg.author.tag, 'https://i.imgur.com/P4NZNnb.png');

                msg.channel.send(embed);

        }

        this.commandsList.forEach(element => {

            let isAlias = false;

            if(args[1] === element.properties.usage){
               isAlias = true; 
            }
            
            else{
                element.properties.aliases.forEach(alias => {
                    if(args[1] === alias) isAlias = true;
                });
            }

            if(isAlias){
                
                const embed = new Discord.MessageEmbed()
                    .setColor('#84a8f5')
                    .setTitle(element.properties.displayName)
                    .setDescription(element.properties.description)
                    .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Orange_question_mark.svg/450px-Orange_question_mark.svg.png')
                    .addFields(
                        { name: "Usage", value: element.properties.usage, inline: true },                  
                        { name: "Format", value: element.properties.format },
                    )
                    .setFooter('NEST Bot © 2021 • Command called by ' + msg.author.tag, 'https://i.imgur.com/P4NZNnb.png');

                msg.channel.send(embed);

            }
        });

    }

}

module.exports = commandHandler;