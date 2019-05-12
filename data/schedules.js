const collections = require("../config/collections");
const schedules = collections.schedules;
const usersData = require('./users');
const noteData = require('./notes');

const {ObjectId} = require('mongodb');

//CRUD functions for schedules collection


/**
 * @returns Array of all the schedules in the database
 */
async function getAll() {
    const schedulesCollection = await schedules();  
    const allSchedules = await schedulesCollection.find({}).toArray();
    return allSchedules;
}

/**
 * Get all schedules for a single user
 * @param {object} scheduleIds an array of schedule ids stored in the user collection
 * @returns an array of all user schedules
 */
async function getUserSchedules(scheduleIds) {
    const schedulesCollection = await schedules();
    for (let i=0; i < scheduleIds.length; i++) {
        scheduleIds[i] = ObjectId(scheduleIds[i])
    }
    const userSchedules = await schedulesCollection.find({_id: { $in: scheduleIds }}).toArray()
    return userSchedules
}

/**
 * Creates a new schedule
 * @param {string} creator user id of creater
 * @param {Date} dateCreated date the schedule is created
 * @param {string} title title of the schedule
 * @param {string} description a short description for the schedule
 * @param {number} numInvitees number of persons to be invited
 * @return newly created schedule object
 */
async function create(creator, dateCreated, title, description, numInvitees){
    if(!creator) throw "You must have a creator!";
    if(typeof creator !== "string") throw `'creator' must be a string. The inputted value is of type ${typeof creator}`
    
    if(!title) throw "You must have a title!";
    if(typeof title !== "string") throw `'title' must be a string. The inputted value is of type ${typeof title}`
    if(!description) throw "You must have a description!";
    if(typeof description !== "string") throw `'description' must be a string. The inputted value is of type ${typeof description}`

    let newSchedules = {
        creator: creator,
        dateCreated: dateCreated,
        title: title,
        description: description,
        numInvitees: numInvitees,
        users: [],
        dates: [],
        responses: []
    }

    const schedulesCollection = await schedules();
    const insertInfo = await schedulesCollection.insertOne(newSchedules);
    if(insertInfo.insertedCount == 0) throw 'could not add a schedule.';
    return newSchedules;
}

/**
 * Get a schedule by its id
 * @param {string} scheduleId 
 * @return schedule object
 */
async function getScheduleByID(scheduleId){
    if(!scheduleId) throw "You must have a scheduleId!";
    if(typeof scheduleId !== "string") throw `'scheduleId' must be a string. The inputted value is of type ${typeof scheduleId}`

    const scheduleObjectId = ObjectId.createFromHexString(scheduleId);

    const schedulesCollection = await schedules();
    const oneSchedule = await schedulesCollection.findOne({_id: scheduleObjectId});
    if (oneSchedule === null)
        throw `Not find any thing with that id:${scheduleObjectId}.`;
    return oneSchedule;
}

/**
 * Add a user to an existing schedule
 * @param {string} scheduleId 
 * @param {string} userId 
 */
async function addUserToSchedule(scheduleId, userId){
    if(!scheduleId) throw "You must have a scheduleId!";
    if(typeof scheduleId !== "string") throw `'scheduleId' must be a string. The inputted value is of type ${typeof scheduleId}`
    if(!userId) throw "You must have a userId!";
    if(typeof userId !== "string") throw `'userId' must be a string. The inputted value is of type ${typeof userId}`

    const scheduleObjectId = ObjectId.createFromHexString(scheduleId);

    const schedulesCollection = await schedules();
    const updatedInfo = await schedulesCollection.updateOne({_id: scheduleObjectId}, {$addToSet: {users: userId}});

    if(updatedInfo.matchedCount === 0)
        throw `Not find any document have id:${scheduleId}`;
    if(updatedInfo.modifiedCount === 0)
        throw "Could not add user successfully.";

    return;
}
/**
 * Adds dates for a schedule
 * @param {string} scheduleId 
 * @param {Date} date Date to be added
 */
async function addDateToSchedule(scheduleId, date){
    if(!scheduleId) throw "You must have a scheduleId!";
    if(typeof scheduleId !== "string") throw `'scheduleId' must be a string. The inputted value is of type ${typeof scheduleId}`
    
    const scheduleObjectId = ObjectId.createFromHexString(scheduleId);
    const schedulesCollection = await schedules();
    const updatedInfo = await schedulesCollection.updateOne({_id: scheduleObjectId}, {$addToSet: {dates: date}});

    if(updatedInfo.matchedCount === 0)
        throw `Not find any document have id:${scheduleId}`;
    if(updatedInfo.modifiedCount === 0)
        throw "Could not add date successfully.";

    return;
}
/**
 * 
 * @param {string} scheduleId 
 * @param {string} userId 
 */
async function addResponseToSchedule(scheduleId, userId){
    if(!scheduleId) throw "You must have a scheduleId!";
    if(typeof scheduleId !== "string") throw `'scheduleId' must be a string. The inputted value is of type ${typeof scheduleId}`
    if(!userId) throw "You must have a userId!";
    if(typeof userId !== "string") throw `'userId' must be a string. The inputted value is of type ${typeof userId}`

    const scheduleObjectId = ObjectId.createFromHexString(scheduleId);
    const schedulesCollection = await schedules();
    let newResponse = {
        user: userId,
        availability: []
    }
    const updatedInfo = await schedulesCollection.updateOne({_id: scheduleObjectId}, {$addToSet: {responses: newResponse}});

    if(updatedInfo.matchedCount === 0)
        throw `Not find any document have id:${scheduleId}`;
    if(updatedInfo.modifiedCount === 0)
        throw "Could not add successfully.";

    return await getScheduleByID(scheduleId);
}


async function addAvailabilityToResponse(scheduleId, userId, date, times){
    if(!scheduleId) throw "You must have a scheduleId!";
    if(typeof scheduleId !== "string") throw `'scheduleId' must be a string. The inputted value is of type ${typeof scheduleId}`
    if(!userId) throw "You must have a userId!";
    if(typeof userId !== "string") throw `'userId' must be a string. The inputted value is of type ${typeof userId}`

    const scheduleObjectId = ObjectId.createFromHexString(scheduleId);
    const schedulesCollection = await schedules();

    let newAvailabilty = {
        date: date,
        times: times
    }
    
    const updatedInfo = await schedulesCollection.updateOne({_id: scheduleObjectId, "responses.user": userId}, {$addToSet: {"responses.$.availability": newAvailabilty}});

    if(updatedInfo.matchedCount === 0)
        throw `Not find any document have id:${scheduleId}`;
    if(updatedInfo.modifiedCount === 0)
        throw "Could not add successfully.";

    return await getScheduleByID(scheduleId); 
}

async function removeSchedule(scheduleId){
    if(!scheduleId) throw new Error("You must input a scheduleId");
    if(typeof scheduleId !=="string") throw new Error(`'scheduleId' must be a string. The inputted scheduleId is of type ${typeof scheduleId}`);

    const scheduleObjectId = ObjectId.createFromHexString(scheduleId);
    const schedulesCollection = await schedules();

    const deletedOne = await schedulesCollection.findOneAndDelete({ _id: scheduleObjectId});
    if(deletedOne === null) throw new Error("Failed to delete this note.");

    // remove all user record
    let userList = deletedOne.value.users;
    
    for (let i = 0; i < userList.length; i++) {
        const oneUser = userList[i];
        await usersData.removeOneScheduleByUserId(oneUser, scheduleId);
    }
    // remove all note record
    await noteData.removeAllNoteBySchedule(scheduleId);
    
    return deletedOne.value;
}



module.exports = {
    getAll,
    getUserSchedules,
    create,
    getScheduleByID,
    addUserToSchedule,
    addDateToSchedule,
    addResponseToSchedule,
    addAvailabilityToResponse,                
    removeSchedule
}