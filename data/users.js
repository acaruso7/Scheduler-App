const collections = require("./collections");
const users = collections.users;
const {ObjectId} = require('mongodb');


module.exports = {
    async create(fullName, email, password) {
        if (!fullName) throw new Error("You must provide a name");
        if (typeof fullName !== 'string') throw new Error(`'fullName' must be a string. The inputted value is of type ${typeof fullName}`)   
        if (!email) throw new Error("You must provide an email address");
        if (typeof email !== 'string') throw new Error(`'email' must be a string. The inputted value is of type ${typeof email}`)  
    
        let newUser = {
            fullName: fullName,
            email: email,
            password: password,
            schedules: []
        }

        const userCollection = await users(); 
        const insertInfo = await userCollection.insertOne(newUser);
        if (insertInfo.insertedCount === 0) throw new Error("Could not add user");
        return newUser;
    }

    // async getAll() {
    //     const settingsCollection = await settings();  
    //     const settings_new = await settingsCollection.find({}).toArray();
    //     return settings_new;
    // }
}