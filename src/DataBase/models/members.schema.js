const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('../db.json');
const db = low(adapter);

const Members = {
    async add(userID) {
        db.read();

        db.get('members')
            .push({userID: userID, warns: []})
            .write();
    },
    async find(filter){
        db.read();

        return (db.get('members').find(filter).value());
    },
    async remove(userID){
        db.read();
        
        db.get('members').remove({userID: userID}).write();

    },
    async addWarn(userID, guildID, reason){
        db.read();

        db.get('members')
            .find({userID: userID})
            .get('warns')
            .push({guildID: guildID, reason: reason})
            .write();
    },
    async getWarns(userID){
        db.read();

        return db.get('members').find({userID: userID}).warns.value();
    }

}

module.exports = Members;
