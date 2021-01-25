const User = require('../DataBase/models/users.schema');

async function createNewUser(userID){
    const preferences = require('./defaultUser.preferences');
    const inventory = [];
    const money = 0;
    const exp = 0;
    const level = 1;
    const config = require('./defaultUserConfig');
        
    //const NewUser = new User({userID, preferences, inventory, money, exp});
        
    User.add(userID, preferences, inventory, money, exp, config);
}

module.exports = createNewUser;