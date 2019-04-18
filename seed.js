const dbConnection = require('./data/connection');
const data = require('./data/');
const users = data.users;
const schedules = data.schedules;
const notes = data.notes;

async function main() {
    const db = await dbConnection();
    await db.dropDatabase();
    
    const user1 = await users.create("Alex Caruso", "acaruso@stevens.edu", 'password');
    const user1Id = user1._id.toString()
    const user2 = await users.create("John Doe", "johndoe@gmail", 'password');
    const user2Id = user2._id.toString()
    // await users.getAll();
    // await users.get(user1Id)

    // let today = new Date()
    let schedule = await schedules.create("Alex", new Date("2019/4/8"), "first meeting", "this a description");
    let scheduleId = schedule._id.toString();
    await schedules.addUserToSchedule(scheduleId, user1Id);
    await schedules.addUserToSchedule(scheduleId, user2Id);
    await schedules.addDateToSchedule(scheduleId, new Date("2019/04/11"));
    await schedules.addDateToSchedule(scheduleId, new Date("2019/04/12"));
    await schedules.addResponseToSchedule(scheduleId, user1Id);
    await schedules.addResponseToSchedule(scheduleId, user2Id);
    await schedules.addAvailabilityToResponse(scheduleId, user1Id, new Date("2019/04/12"), [1,2]);
    
    let schedule2 = await schedules.create("John", new Date("2019/04/10"), "second meeting", "second meeting description")
    let schedule2Id = schedule2._id.toString();
    await users.addScheduleToUser(user1Id, scheduleId)
    await users.addScheduleToUser(user1Id, schedule2Id)


    let comment1 = "I can only meet on Monday";
    let createOne = await notes.createNote(scheduleId, user1Id, user1['fullName'], comment1);
    let getOne = await notes.getNoteById(createOne._id.toString())
    let removeOne = await notes.removeNote(getOne._id.toString());

    let comment2 = "I can only meet on Wednesday";
    let createTwo = await notes.createNote(scheduleId, user2Id, user2['fullName'], comment2);
    let modifyOne = await notes.modifyNote(createTwo._id.toString(), "Modified note");
    
    console.log('Done seeding database');
}

main();