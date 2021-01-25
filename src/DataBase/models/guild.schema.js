const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('../db.json');
const db = low(adapter);

const Guild = {
    async add(guildName, guildID, config) {
        db.read();

        db.get('guilds')
        .push({guildName: guildName, guildID: guildID, config: config})
        .write();
    },
    async update(guildID, fieldName, value){
        db.read();

        db.get('guilds')
            .find({guildID: guildID})
            .update(fieldName, temp => temp = value)
            .write();
    },
    async find(filter){
        db.read();

        return (db.get('guilds').find(filter).value());
    },
    async remove(guildID){
        db.read();
        
        db.get('guilds').remove({guildID: guildID}).write();

    }

}

module.exports = Guild;
