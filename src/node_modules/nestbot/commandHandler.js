const commandHandler = {

    "commandsList": [],

    addCommand(command){
        this.commandsList.push(command);
        console.log("\x1b[36m","[NestBOT] Importing " + command.properties.name + ".");
    },

    checkCommand(message, msg){
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
                element._Initialize(msg);
                element._Command(msg);
            }
        });
    }

}

module.exports = commandHandler;