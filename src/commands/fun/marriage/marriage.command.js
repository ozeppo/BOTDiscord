const sampleCommand = {
    
    "properties": {
        "name": "sampleCommand",
        "displayName": "❓ Ping",
        "usage": "ping",
        "aliases": ["sampleCommand"],

        "description": "This is an Sample Command",
        "format": "ping"      
    },

    "language": null,

    // Code that's runs before command
    _Initialize(msg, language, args){
        this.language = language;
    },


    // Main command code
    _Command(msg, args){
        msg.channel.send(this.language.response);
    },
}

module.exports = sampleCommand;