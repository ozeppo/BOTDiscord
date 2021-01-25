// =======================================================
//         _   _           _   ____   ____ _______ 
//       | \ | |         | | |  _ \ / __ \__   __|
//      |  \| | ___  ___| |_| |_) | |  | | | |   
//     | . ` |/ _ \/ __| __|  _ <| |  | | | |   
//    | |\  |  __/\__ \ |_| |_) | |__| | | |   
//   |_| \_|\___||___/\__|____/ \____/  |_|   
//
// Custom Framework for easier building Discord bots.
// Author: ozeppo
// ======================================================                                        

const addExperiancePoints = require('../events/experiance.event');
//const Guild = require('../DataBase/models/guilds.schema');
const Guild = require('../DataBase/models/guild.schema');
const commandHandler = require('./commandHandler');
const User = require('../DataBase/models/users.schema');

const NestBOT = {
    
    "_BotParameters": {
        "languageFile": null,
        "configFile": null,
    },
    

    // Initializing NestBot Framework
    // Setting up every event
    init(client){

        console.log("\x1b[36m","[NestBOT] Initializing BOT!");


        // Ready EVENT to log bot informations
        client.on('ready', () => {
            console.log("\x1b[0m", "");
            console.log("+-----------------------------------------+");
            console.log("|                                         |");
            console.log(`|       Logged in as ${client.user.tag}!` + "    |");
            console.log("|                                         |");
            console.log("+-----------------------------------------+");
            console.log("|                                         |");
            console.log("|       Powered by NestBOT © 2021         |");
            console.log("|                                         |");
            console.log("+-----------------------------------------+");

            client.user.setPresence({ activity: { name: '✨ Active on ' + client.guilds.cache.size + " servers" }, status: 'online' });
          });


        // Message EVENT for commands
        client.on('message', msg => {

            if(msg.author.bot) return;

            if(msg.content === "<@!768911791518384139>" || msg.content === "<@!779094104273059880>"){
                let botEmbed = require('../baseFiles/botPingEmbed');
                botEmbed(msg, msg.guild.id);
                return;
            }

            let guildPrefix = "";
            let _language;
            let guildID = msg.guild.id;

            User.find({userID: msg.author.id})
                .then(user => {
                    if(user == undefined || user == null){
                        const newUser = require('../baseFiles/createNewUser');

                        newUser(msg.author.id).then(addExperiancePoints(msg));
                    }
                    else addExperiancePoints(msg);
                })

            Guild.find({guildID: guildID})
                .then(guild => {
                    guildPrefix = guild.config.prefix;
                    
                    switch(guild.config.language){
                        case "pl_PL":
                            _language = require('../languages/pl_PL.json');
                            break;

                        case "en_US":
                            _language = require('../languages/en_US.json');
                            break;   
                    }
                })
                .catch(() => {
                    const config = require('./Sample Files/baseConfigFile');
                    const members = [];
                    Guild.add(msg.guild.name, guildID, config);
                    console.log(`Guild ${msg.guild.name} added to LowDB`);
                })
                .then(() => {
                    if(!msg.content.startsWith(guildPrefix)) return;
                
                    let args = msg.content.split(' ');
                    let message = args[0].substring(guildPrefix.length);

                    commandHandler.checkCommand(message, msg, _language, args);

                })
                .catch(err => {
                    console.log("Error: " + err);
                });

            });



        // Guild Delete EVENT for DataBase 
        client.on('guildDelete', guild => {
            Guild.remove(guild.id);
            console.log('[NestBOT] Kicked from guild "' + guild.name + '"');
        });

        client.on('guildMemberAdd', member => {
            let guildID = member.guild.id;

            const autoRole = require('../events/autorole.event');
            const welcomeMessage = require('../events/welcomeMessage.event');

            welcomeMessage(member);
            autoRole(guildID, member);

        });
        
    },

    // Setting language file (need to be JSON format)
    language(languageFile){
        this._BotParameters.languageFile = languageFile;
    },

    // Setting configuration file (need to be JSON format)
    config(configFile){
        this._BotParameters.configFile = configFile;
    },


    // Connecting bot to Discord API
    login(client){
        if(!this._BotParameters.configFile.config.token){
            console.error("[NestBOT] Invalid token!");
            return;
        }

        client.login(this._BotParameters.configFile.config.token)
            .catch(err => {
                //console.log("[NestBOT] Error: " + err);
                console.error("[NestBOT] Invalid token!");
            })
    },


    // Method to add file to the Command List
    addCommand(command){
        commandHandler.addCommand(command);
    }

}

module.exports = NestBOT;