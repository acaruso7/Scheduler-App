const collections = require("./collections");
const notes = collections.notes;
const {ObjectId} = require('mongodb');


module.exports = {
    async getNoteById(id){
        if(!id)
        throw new Error("Id does't exist.");
        // if(typeof id !=="string")
        // throw new Error("Invalid note Id");
        let objId = ObjectId(id);
        const noteCollection = await notes();
        const note = await noteCollection.findOne({_id:objId});
        if(note === null)
        throw new Error("Can't find this note.");
        return note;
    },
    async createNote(scheduleId,userId,user,comment){
        //check if params exist
        if(!scheduleId||!userId||!user||!comment)
        throw new Error("Invalid notes information");
        //check the type of params
        if(typeof scheduleId !=="string"||typeof userId !== "string"||typeof user !=="string"||typeof comment!=="string")
        throw new Error("Invalid type for notes params");
        //create a note
        let newNote ={
            scheduleId, 
            userId,
            user,
            comment
        }
        const noteCollection = await notes();
        let createOne = await noteCollection.insertOne(newNote);
        if(createOne.insertedCount === 0){
            throw new Error("Failed to create a new note.");
        }
        let newCreatedId = createOne.insertedId;
        let note = await this.getNoteById(newCreatedId);
        return note;
    },
    async removeNote(id){
        if(!id)
        throw new Error("Id does't exist.");
        if(typeof id !=="string")
        throw new Error("Invalid id");

        const noteCollection = await notes();
        const objId = ObjectId(id);
        const deletedOne = await noteCollection.findOneAndDelete({_id:objId});
        if(deletedOne === null)
        throw new Error("Can't delete this note.");
        return deletedOne;
    },
    async modifyNote(id,comment){
        if(!id||typeof id !=="string")
        throw new Error("Id does't exist.");
        if(!comment||typeof comment !=="string")
        throw new Error("Invalid comment info.");
        const noteCollection = await notes();
        const objId = ObjectId(id);
        let preNote = await noteCollection.findOne({_id:objId});
        if(preNote === null)
        throw new Error("Can't find previous note for this.");
        let newNote = {
            $set:{
                comment
            }
        }
        const updateOne = await noteCollection.updateOne({_id:objId},newNote);
        if(updateOne.modifiedCount === 0)
        throw new Error("Can't modify this note.");
        
        return await this.getNoteById(id);
    }
};