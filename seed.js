const dbConnection = require('./data/connection');
const data = require('./data/');
const users = data.users;
const notes = data.notes;

async function main() {
    const db = await dbConnection();
    await db.dropDatabase();
    
    const user = await users.create("Alex Caruso", "acaruso@stevens.edu", 'password');
    const userId = user._id.toString()
    await users.create("test user 2", "test@test.edu", 'password');
    await users.getAll();
    await users.get(userId)
    await users.addScheduleToUser(userId, "test scheduleId")
    await users.addScheduleToUser(userId, "test scheduleId2")
  
    let scheduleId =  "5t487a2-c0d2-4f8c-b27a-6a1d4b5b1111"; //the schedule to which the notes refer
    let userId2 = "7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310";
    let user = "John Doe";
    let comment = "I can only meet on Monday";
    let createOne = await notes.createNote(scheduleId,userId2,user,comment);
    console.log("create one  "+JSON.stringify(createOne))
    let getOne = await notes.getNoteById(createOne._id.toString())
    console.log("get one  "+JSON.stringify(getOne))
  
    let removeOne = await notes.removeNote(getOne._id.toString());
    console.log("remove one  "+JSON.stringify(removeOne))
    let createtwo = await notes.createNote(scheduleId,userId2,user,comment);
    console.log("create one  "+JSON.stringify(createtwo))
    let modifyOne = await notes.modifyNote(createtwo._id.toString(),createtwo.comment+"???");
    console.log("modify one  "+JSON.stringify(modifyOne))
	  console.log('Done seeding database');
}

main();