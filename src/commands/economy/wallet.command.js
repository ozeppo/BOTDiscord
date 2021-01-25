const createNewUser = require('../../baseFiles/createNewUser');
const User = require('../../DataBase/models/users.schema');

const sampleCommand = {
    
    "properties": {
        "name": "wallet",
        "displayName": "💵 User Wallet",
        "usage": "wallet",
        "aliases": ["balance", "bal", "bank", "money"],

        "description": "This command shows you money in your wallet",
        "format": "wallet [@user]"      
    },

    "language": null,


    // Code that's runs before command
    _Initialize(msg, language, args){
        this.language = language;
    },


    // Main command code
    _Command(msg, args){
        var money = "0";
        var userID;

        let response;
        let response2 = false;

        if(args[1] == null) {userID = msg.author.id; response=false;}
        else {userID = msg.mentions.members.first().id; response=true;}

        if(userID == undefined){
            msg.channel.send('Niemogę znaleźć użytkownika.');
            return;
        }
        
        User.find({userID: userID})
            .then(element => {    

                if(element == undefined){
                    response2 = false;
                }
                else{
                    money = element.money.toString();
                    response2 = true;
                }     
            })
            .then(() => {

                if(!response2) createNewUser(userID);
        
                if(response == false) msg.channel.send(this.language.user_wallet + ": **" + money + "**");    
                else if(response == true) msg.channel.send(this.language.pinged_wallet + " " + msg.mentions.members.first().user.username + ": **" + money + "**");

            })
            .catch(err => console.log(err));
    },
}

module.exports = sampleCommand;