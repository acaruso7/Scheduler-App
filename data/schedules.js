const collections = require("../config/collections");
const schedules = collections.schedules;
const {ObjectId} = require('mongodb');

async function getAll() {
    const schedulesCollection = await schedules();  
    const allSchedules = await schedulesCollection.find({}).toArray();
    return allSchedules;
}

async function getUserSchedules(scheduleIds) {
    // scheduleIds is an array of schedule ids stored in the user collection
    const schedulesCollection = await schedules();
    for (let i=0; i < scheduleIds.length; i++) {
        scheduleIds[i] = ObjectId(scheduleIds[i])
    }
    const userSchedules = await schedulesCollection.find({_id: { $in: scheduleIds }}).toArray()
    return userSchedules
}

async function create(creator, dateCreated, title, description, numInvitees){
    if(!creator) throw "You must have a creator!";
    if(typeof creator !== "string") throw `'creator' must be a string. The inputted value is of type ${typeof creator}`
    //
    //check date
    //
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

async function addDateToSchedule(scheduleId, date){
    if(!scheduleId) throw "You must have a scheduleId!";
    if(typeof scheduleId !== "string") throw `'scheduleId' must be a string. The inputted value is of type ${typeof scheduleId}`
    // date is a object. The format is YYYY/mm/dd
    // if(!date) throw 'You must have a date!';
    // if(typeof date !== "string") throw `'date' must be a string. The inputted value is of type ${typeof date}`
    // need a check date format.

    const scheduleObjectId = ObjectId.createFromHexString(scheduleId);
    const schedulesCollection = await schedules();
    const updatedInfo = await schedulesCollection.updateOne({_id: scheduleObjectId}, {$addToSet: {dates: date}});

    if(updatedInfo.matchedCount === 0)
        throw `Not find any document have id:${scheduleId}`;
    if(updatedInfo.modifiedCount === 0)
        throw "Could not add date successfully.";

    return;
}

async function addResponseToSchedule(scheduleId, userId){
    if(!scheduleId) throw "You must have a scheduleId!";
    if(typeof scheduleId !== "string") throw `'scheduleId' must be a string. The inputted value is of type ${typeof scheduleId}`
    if(!userId) throw "You must have a userId!";
    if(typeof userId !== "string") throw `'userId' must be a string. The inputted value is of type ${typeof userId}`
    // check userId should exsit


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
    // Check the date should in schedule.dates
    // if(!date) throw 'You must have a date!';
    // if(typeof scheduleId !== "string") throw `'scheduleId' must be a string. The inputted value is of type ${typeof scheduleId}`
    // need a check date format.
    // if(typeof time !== "object") throw `'time' must be a array. The inputted value is of type ${typeof time}`

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
    if(!id) throw new Error("You must input a note id");
    if(typeof id !=="string") throw new Error(`'id' must be a string. The inputted id is of type ${typeof id}`);

    const scheduleObjectId = ObjectId.createFromHexString(scheduleId);
    const schedulesCollection = await schedules();

    const deletedOne = await schedulesCollection.findOneAndDelete({ _id: scheduleObjectId});
    if(deletedOne === null) throw new Error("Failed to delete this note.");
    return deletedOne;
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