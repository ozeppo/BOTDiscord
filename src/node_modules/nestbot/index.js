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

const commandHandler = require('./commandHandler');

const NestBOT = {
    
    "_BotParameters": {
        "languageFile": null,
        "configFile": null,
    },
    

    // Initializing NestBot Framework
    init(client){

        console.log("\x1b[36m","[NestBOT] Initializing BOT!");

        client.on('ready', () => {
            console.log("\x1b[0m", "");
            console.log("+-----------------------------------------+");
            console.log("|                                         |");
            console.log(`|       Logged in as ${client.user.tag}!` + "        |");
            console.log("|                                         |");
            console.log("+-----------------------------------------+");
            console.log("|                                         |");
            console.log("|       Powered by NestBOT © 2020         |");
            console.log("|                                         |");
            console.log("+-----------------------------------------+");
          });

        client.on('message', msg => {

            if(msg.author.bot) return;
            if(!msg.content.startsWith(this._BotParameters.configFile.config.prefix)) return;

            let message = msg.content.substring(this._BotParameters.configFile.config.prefix.length);

            commandHandler.checkCommand(message, msg);

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


    // 
    login(client){
        if(!this._BotParameters.configFile.config.token){
            console.error("[NestBOT] Invalid token!")
            return;
        }

        client.login(this._BotParameters.configFile.config.token);
    },

    addCommand(command){
        commandHandler.addCommand(command);
    }

}

module.exports = NestBOT;