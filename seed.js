const dbConnection = require('./data/connection');
const data = require('./data/');
const users = data.users;
const notes = data.notes;

async function main() {
    const db = await dbConnection();
    await db.dropDatabase();
    
    await users.create("Alex Coruso", "acaruso@stevens.edu", 'password')
    console.log('Done seeding database');
    //test for notes
    let scheduleId =  "5t487a2-c0d2-4f8c-b27a-6a1d4b5b1111"; //the schedule to which the notes refer
    let userId = "7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310";
    let user = "John Doe";
    let comment = "I can only meet on Monday";
    let createOne = await notes.createNote(scheduleId,userId,user,comment);
    console.log("create one  "+JSON.stringify(createOne))
    let getOne = await notes.getNoteById(createOne._id.toString())
    console.log("get one  "+JSON.stringify(getOne))
  
    let removeOne = await notes.removeNote(getOne._id.toString());
    console.log("remove one  "+JSON.stringify(removeOne))
    let createtwo = await notes.createNote(scheduleId,userId,user,comment);
    console.log("create one  "+JSON.stringify(createtwo))
    let modifyOne = await notes.modifyNote(createtwo._id.toString(),createtwo.comment+"???");
    console.log("modify one  "+JSON.stringify(modifyOne))
}

main();