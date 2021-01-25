const User = require('../DataBase/models/users.schema');

function addExperiancePoints(msg){

    let userID = msg.author.id;
    let expCount = getRandomInt(0, 4);

    User.find({userID: userID})
        .then(user => {

            let exp = user.exp + expCount;
            let level = user.level;

            let nextLevel = 1000 * (level * 0.25);

            if(exp >= nextLevel){
                User.update(userID, 'exp', 0);
                User.update(userID, 'level', user.level+1);
                msg.channel.send(`**Gratulacje ${msg.author.toString()}!** Uzyskałeś poziom **${user.level+1}**.`);
            }
            else{
                User.update(userID, 'exp', exp);  
            }
  

        })
        .catch(err => console.log('Error: ' + err));

}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    
    return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = addExperiancePoints;