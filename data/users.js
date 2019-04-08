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
    },

    async getAll() {
        const userCollection = await users();  
        const allUsers = await userCollection.find({}).toArray();
        return allUsers;
    },

    async get(id) {
        if (!id) throw new Error("You must provide an id to search for");
        if (typeof id !== 'string') throw new Error(`'id' must be a string. The inputted value is of type ${typeof id}`)
        const userCollection = await users();
        const user = await userCollection.findOne({ _id: ObjectId(id)});
        if (user === null) throw new Error("No user with that id");
        return user;
    },

    async addScheduleToUser(id, scheduleId) {
        // append a scheduleId associated with the user to the field 'schedules'
        if (!id) throw new Error("You must provide a user id");
        if (typeof id !== 'string') throw new Error(`'id' must be a string. The inputted value is of type ${typeof id}`)
        if (!scheduleId) throw new Error("You must provide a schedule id");
        if (typeof scheduleId !== 'string') throw new Error(`'schedulId' must be a string. The inputted value is of type ${typeof scheduleId}`)
        
        const userCollection = await users();
        const addedSchedule = await userCollection.updateOne({ _id: ObjectId(id) }, { $addToSet: { schedules: scheduleId}}); 
        if (addedSchedule.modifiedCount === 0) {
            throw new Error(`Could not add schedule to user successfully. id ${id} is not in the database`);
        }

        return await this.get(id)
    }
}