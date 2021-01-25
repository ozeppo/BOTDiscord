const sampleCommand = {
    
    "properties": {
        "name": "sampleCommand",
        "usage": "ping",
        "aliases": ["sampleCommand"],

        "description": "This is an Sample Command",
        "format": "ping"      
    },

    // Code that's runs before command
    _Initialize(msg){
        
    },


    // Main command code
    _Command(msg){
        msg.channel.send("Pong!");
    },
}

module.exports = sampleCommand;