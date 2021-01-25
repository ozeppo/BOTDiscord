const User = require('../../DataBase/models/users.schema');

const sampleCommand = {
    
    "properties": {
        "name": "daily",
        "displayName": "📅 Daily",
        "usage": "daily",
        "aliases": [],

        "description": "Command that allow you to get some money every 24h",
        "format": "daily"      
    },

    "language": null,

    // Code that's runs before command
    _Initialize(msg, language, args){
        this.language = language;
    },


    // Main command code
    _Command(msg, args){
        
        let canDaily = false;
        let toNextDaily;
        
        User.find({userID: msg.author.id})
            .then(user => {
                if(user.config.lastDailyDate == ""){
                    canDaily = true;
                    User.update(msg.author.id, 'config.lastDailyDate', Date.now())
                        .catch(err => console.log(err));
                }
                else if(Date.now() - user.config.lastDailyDate >= 86400000){
                    canDaily = true;
                    User.update(msg.author.id, 'config.lastDailyDate', Date.now())
                        .catch(err => console.log(err));
                }
                else{
                    toNextDaily = 86400000 - (Date.now() - user.config.lastDailyDate);
                    
                }

                if(canDaily){
                    User.update(msg.author.id, 'money', user.money + 2700)
                        .then(() => {
                            msg.channel.send('Dodano 2700 do konta');
                        })
                        .catch(err => console.log(err))
                }

                else{
                    msg.channel.send(`Niemożesz jeszcze odebrać dniówki. Poczekaj jeszcze ${this.timeConversion(toNextDaily)}`);
                }

            })
            .catch(err => console.log(err))

    },

    timeConversion(millisec) {

        var seconds = (millisec / 1000).toFixed(1);

        var minutes = (millisec / (1000 * 60)).toFixed(1);

        var hours = (millisec / (1000 * 60 * 60)).toFixed(1);

        var days = (millisec / (1000 * 60 * 60 * 24)).toFixed(1);

        if (seconds < 60) {
            return seconds + " Sekund";
        } else if (minutes < 60) {
            return minutes + " Minut";
        } else if (hours < 24) {
            return hours + " Godzin";
        } else {
            return days + " Dni"
        }
    }
}

module.exports = sampleCommand;