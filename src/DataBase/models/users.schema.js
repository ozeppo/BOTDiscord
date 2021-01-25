const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('../db.json');
const db = low(adapter);

const User = {
    async add(userID, preferences, inventory, money, exp, level, config) {
        db.read();

        db.get('users')
        .push({userID: userID, preferences: preferences, inventory: inventory, money: money, exp: exp, level: level, config: config})
        .write();
    },
    async update(userID, fieldName, value){
        db.read();

        db.get('users')
            .find({userID: userID})
            .update(fieldName, temp => temp = value)
            .write();
    },
    async find(filter){
        db.read();

        return (db.get('users').find(filter).value());
    },

    async remove(userID){
        db.read();
        
        db.get('users').remove({userID: userID}).write();
    }

}

module.exports = User;
