const collections = require("./collections");
const settings = collections.settings;
const {ObjectId} = require('mongodb');


module.exports = {
    async create() {
        const usersCollection = await users(); 



        // for (i = 0; i < combos.length; i++) {
        //     var insertInfo = await settingsCollection.insertOne(combos[i]);
        //     if (insertInfo.insertedCount === 0) throw new Error("Could not add setting");
        // }
        return await settingsCollection.find({}).toArray();;
    },

    // async getAll() {
    //     const settingsCollection = await settings();  
    //     const settings_new = await settingsCollection.find({}).toArray();
    //     return settings_new;
    // }
}