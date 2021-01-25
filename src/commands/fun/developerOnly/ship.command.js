const sampleCommand = {
    
    "properties": {
        "name": "ship",
        "displayName": "❓ Ship",
        "usage": "ship",
        "aliases": [],

        "description": "This is an Developer Command only",
        "format": "ship [@user] [@user]"      
    },

    "language": null,

    // Code that's runs before command
    _Initialize(msg, language, args){
        this.language = language;
    },


    // Main command code
    _Command(msg, args){
        
        let user1 = msg.mentions.members[0].user.username;
        let user2 = msg.mentions.members[1].user.username;

        let endUsername = function(){
            let user1Length = user1.length;
            let user2Length = user2.length;

            let toRet = "";

            for(let i = 0; i <= user1Length/2; i++){
                toRet += user1[i];
            }

            for(let i = user2Length; i >= user1Length/2; i--){
                toRet += user2[i];
            }
        }

        msg.channel.send(endUsername);

    },
}

module.exports = sampleCommand;