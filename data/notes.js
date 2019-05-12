const collections = require("../config/collections");
const notes = collections.notes;
const {ObjectId} = require('mongodb');

//CRUD dunctions for notes/comments data collection

module.exports = {
    /**
     * Returns a note with requested id
     * @param {string} id id for the note to be fetched
     * @returns {object} the requested note
     * 
     */
    async getNoteById(id){
        if(!id) throw new Error("You must provide an id");
        if(typeof id !== "string") throw new Error(`'id' must be a string. The inputted value is of type ${typeof id}`);
        const noteCollection = await notes();
        const note = await noteCollection.findOne({ _id: ObjectId(id) });
        if(note === null) throw new Error("No note with that id");
        return note;
    },
    /**
     * Return an array of all notes associated with the requested Schedule
     * @param {string} id id for the schedule whose notes are to be fetched
     * @returns array of notes
     * 
     */
    async getNotesByScheduleId(id) {
        if(!id) throw new Error("You must provide an id");
        if(typeof id !== "string") throw new Error(`'id' must be a string. The inputted value is of type ${typeof id}`);
        const noteCollection = await notes();
        const scheduleNotes = await noteCollection.find({scheduleId: id}).toArray();
        if(scheduleNotes === null) throw new Error("No notes for that schedule");
        return scheduleNotes;
    },
    
    /**
     * Creates a new note and enters it into the database
     * @param {string} scheduleId id of the schedule
     * @param {string} userId id of the note creator
     * @param {string} user name of the note creator
     * @param {string} comment 
     * @returns updated note
     * 
     */
    async createNote(scheduleId, userId, user, comment){
        if(!scheduleId||!userId||!user||!comment) throw new Error("One of scheduleId, userId, user, comment is undefined");
        if(typeof scheduleId !=="string"||typeof userId !== "string"||typeof user !=="string"||typeof comment!=="string") 
        throw new Error("One of scheduleId, userId, user, comment is not a string");
        let newNote ={
            scheduleId, 
            userId,
            user,
            comment
        }
        const noteCollection = await notes();
        let createOne = await noteCollection.insertOne(newNote);
        if(createOne.insertedCount === 0){
            throw new Error("Failed to create a new note");
        }
        let newCreatedId = createOne.insertedId.toString();
        let note = await this.getNoteById(newCreatedId);
        return note;
    },
    /**
     * Removing a note from the schedule
     * @param {string} id id of the note to be deleted
     * @returns deleted note just before deletion
     */
    async removeNote(id){
        if(!id) throw new Error("You must input a note id");
        if(typeof id !=="string") throw new Error(`'id' must be a string. The inputted id is of type ${typeof id}`);
        const noteCollection = await notes();
        const deletedOne = await noteCollection.findOneAndDelete({ _id: ObjectId(id) });
        if(deletedOne === null) throw new Error("Failed to delete this note.");
        return deletedOne;
    },

    /**
     * Modifying the note
     * @param {string} id 
     * @param {string} comment 
     * @return modified note
     */

    async modifyNote(id,comment){
        if(!id||typeof id !=="string") throw new Error("id is undefined or not a string");
        if(!comment||typeof comment !=="string") throw new Error("comment is undefined or not a string");
        const noteCollection = await notes();
        let preNote = await noteCollection.findOne({ _id: ObjectId(id)});
        if(preNote === null)
        throw new Error("Can't find note to be modified");
        let newNote = {
            $set:{
                comment
            }
        }
        const updateOne = await noteCollection.updateOne({ _id: ObjectId(id) }, newNote);
        if(updateOne.modifiedCount === 0) throw new Error("Unable to modify this note.");
        
        return await this.getNoteById(id);
    },
    /**
     * Removes all notes from a schedule
     * @param {id} scheduleId 
     */
    async removeAllNoteBySchedule(scheduleId){
        if(!scheduleId) throw new Error("You must input a scheduleId");
        if(typeof scheduleId !=="string") throw new Error(`'scheduleId' must be a string. The inputted scheduleId is of type ${typeof scheduleId}`);
        const noteCollection = await notes();
        const deletedMany = await noteCollection.deleteMany({ scheduleId: scheduleId });
        if(deletedMany === null) throw new Error("Failed to delete this note.");
        return;
    },
};