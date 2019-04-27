const dbConnection = require('./data/connection');
const data = require('./data/');
const users = data.users;
const schedules = data.schedules;
const notes = data.notes;
const bcrypt = require("bcrypt");
const saltrounds = 3;

async function main() {
    const db = await dbConnection();
    await db.dropDatabase();

     //create users
    let password = await bcrypt.hash('password', saltrounds)
    const user1 = await users.create("Alex Caruso", "acaruso@stevens.edu", password);
    const user1Id = user1._id.toString()
    const user2 = await users.create("John Doe", "johndoe@gmail.com", password);
    const user2Id = user2._id.toString()
    const user3 = await users.create("Jane Doe", "janedoe@gmail.com", password);
    const user3Id = user3._id.toString()
    const user4 = await users.create("Haolin Yang", "haolinyang@gmail.com", password);
    const user4Id = user4._id.toString()
    const user5 = await users.create("Yangyang Liu", "yangyangliu@gmail.com", password);
    const user5Id = user5._id.toString()


    //create schedules
    let schedule = await schedules.create("Alex", new Date("2019/4/8"), "first meeting", "this a description");
    let scheduleId = schedule._id.toString();
    await schedules.addUserToSchedule(scheduleId, user1Id);
    await schedules.addUserToSchedule(scheduleId, user2Id);
    await schedules.addUserToSchedule(scheduleId, user3Id);
    await schedules.addDateToSchedule(scheduleId, new Date("2019/04/11"));
    await schedules.addDateToSchedule(scheduleId, new Date("2019/04/12"));
    await schedules.addResponseToSchedule(scheduleId, user1Id);
    await schedules.addResponseToSchedule(scheduleId, user2Id);
    await schedules.addAvailabilityToResponse(scheduleId, user1Id, new Date("2019/04/12"), [1,2]);
    
    let schedule2 = await schedules.create("John", new Date("2019/04/10"), "second meeting", "second meeting description")
    let schedule2Id = schedule2._id.toString();
    await schedules.addUserToSchedule(schedule2Id, user2Id);
    await schedules.addUserToSchedule(schedule2Id, user3Id);
    await schedules.addUserToSchedule(schedule2Id, user4Id);
    await schedules.addDateToSchedule(schedule2Id, new Date("2019/04/15"));
    await schedules.addDateToSchedule(schedule2Id, new Date("2019/04/17"));
    await schedules.addResponseToSchedule(schedule2Id, user4Id);
    await schedules.addResponseToSchedule(schedule2Id, user5Id);
    await schedules.addAvailabilityToResponse(schedule2Id, user4Id, new Date("2019/04/15"), [3, 4]);
    await schedules.addAvailabilityToResponse(schedule2Id, user4Id, new Date("2019/04/17"), [9, 10]);

    let schedule3 = await schedules.create("Haolin", new Date("2019/04/20"), "third meeting", "third meeting description")
    let schedule3Id = schedule3._id.toString();
    await schedules.addUserToSchedule(schedule3Id, user2Id);
    await schedules.addUserToSchedule(schedule3Id, user3Id);
    await schedules.addDateToSchedule(schedule3Id, new Date("2019/04/22"));
    await schedules.addDateToSchedule(schedule3Id, new Date("2019/04/23"));
    await schedules.addDateToSchedule(schedule3Id, new Date("2019/04/24"));
    await schedules.addResponseToSchedule(schedule3Id, user2Id);
    await schedules.addResponseToSchedule(schedule3Id, user3Id);
    await schedules.addAvailabilityToResponse(schedule3Id, user3Id, new Date("2019/04/22"), [8, 9]);

    let schedule4 = await schedules.create("Jane", new Date("2019/04/18"), "fourth meeting", "fourth meeting description")
    let schedule4Id = schedule4._id.toString();
    await schedules.addUserToSchedule(schedule4Id, user3Id);
    await schedules.addUserToSchedule(schedule4Id, user4Id);
    await schedules.addUserToSchedule(schedule4Id, user5Id);
    await schedules.addDateToSchedule(schedule4Id, new Date("2019/04/26"));
    await schedules.addDateToSchedule(schedule4Id, new Date("2019/04/27"));
    await schedules.addDateToSchedule(schedule4Id, new Date("2019/04/29"));
    await schedules.addResponseToSchedule(schedule4Id, user3Id);
    await schedules.addResponseToSchedule(schedule4Id, user4Id);
    await schedules.addAvailabilityToResponse(schedule4Id, user3Id, new Date("2019/04/26"), [3, 4]);
    await schedules.addAvailabilityToResponse(schedule4Id, user4Id, new Date("2019/04/26"), [12, 1]);

    let schedule5 = await schedules.create("Yangyang", new Date("2019/05/01"), "fifth meeting", "fifth meeting description")
    let schedule5Id = schedule5._id.toString();
    await schedules.addUserToSchedule(schedule5Id, user1Id);
    await schedules.addUserToSchedule(schedule5Id, user4Id);
    await schedules.addUserToSchedule(schedule5Id, user5Id);
    await schedules.addDateToSchedule(schedule5Id, new Date("2019/05/10"));
    await schedules.addDateToSchedule(schedule5Id, new Date("2019/05/11"));
    await schedules.addDateToSchedule(schedule5Id, new Date("2019/05/12"));
    await schedules.addResponseToSchedule(schedule5Id, user1Id);
    await schedules.addResponseToSchedule(schedule5Id, user4Id);
    await schedules.addResponseToSchedule(schedule5Id, user5Id);
    await schedules.addAvailabilityToResponse(schedule5Id, user1Id, new Date("2019/05/10"), [3, 4]);
    await schedules.addAvailabilityToResponse(schedule5Id, user4Id, new Date("2019/05/11"), [12, 1]);
    await schedules.addAvailabilityToResponse(schedule5Id, user4Id, new Date("2019/05/12"), [1, 4]);

    let schedule6 = await schedules.create("Haolin", new Date("2019/05/13"), "sixth meeting", "sixth meeting description")
    let schedule6Id = schedule6._id.toString();
    await schedules.addUserToSchedule(schedule6Id, user1Id);
    await schedules.addUserToSchedule(schedule6Id, user2Id);
    await schedules.addUserToSchedule(schedule6Id, user3Id);
    await schedules.addUserToSchedule(schedule6Id, user4Id);
    await schedules.addUserToSchedule(schedule6Id, user5Id);
    await schedules.addDateToSchedule(schedule6Id, new Date("2019/05/20"));
    await schedules.addDateToSchedule(schedule6Id, new Date("2019/05/21"));
    await schedules.addDateToSchedule(schedule6Id, new Date("2019/05/24"));
    await schedules.addResponseToSchedule(schedule6Id, user1Id);
    await schedules.addResponseToSchedule(schedule6Id, user2Id);
    await schedules.addResponseToSchedule(schedule6Id, user3Id);
    await schedules.addResponseToSchedule(schedule6Id, user4Id);
    await schedules.addResponseToSchedule(schedule6Id, user5Id);
    await schedules.addAvailabilityToResponse(schedule6Id, user1Id, new Date("2019/05/20"), [3, 4]);
    await schedules.addAvailabilityToResponse(schedule6Id, user2Id, new Date("2019/05/21"), [6, 7]);
    await schedules.addAvailabilityToResponse(schedule6Id, user3Id, new Date("2019/05/21"), [8, 9]);
    await schedules.addAvailabilityToResponse(schedule6Id, user4Id, new Date("2019/05/21"), [12, 1]);
    await schedules.addAvailabilityToResponse(schedule6Id, user4Id, new Date("2019/05/24"), [1, 4]);

    //add schedules to users
    //schedule 1
    await users.addScheduleToUser(user1Id, scheduleId)
    await users.addScheduleToUser(user2Id, scheduleId)
    await users.addScheduleToUser(user3Id, scheduleId)
    //schedule 2
    await users.addScheduleToUser(user2Id, schedule2Id)
    await users.addScheduleToUser(user3Id, schedule2Id)
    await users.addScheduleToUser(user4Id, schedule2Id)
    //schedule 3
    await users.addScheduleToUser(user2Id, schedule3Id)
    await users.addScheduleToUser(user3Id, schedule3Id)
    //schedule 4
    await users.addScheduleToUser(user3Id, schedule4Id)
    await users.addScheduleToUser(user4Id, schedule4Id)
    await users.addScheduleToUser(user5Id, schedule4Id)
    //schedule 5
    await users.addScheduleToUser(user1Id, schedule5Id)
    await users.addScheduleToUser(user4Id, schedule5Id)
    await users.addScheduleToUser(user5Id, schedule5Id)
    //schedule 6
    await users.addScheduleToUser(user1Id, schedule6Id)
    await users.addScheduleToUser(user2Id, schedule6Id)
    await users.addScheduleToUser(user3Id, schedule6Id)
    await users.addScheduleToUser(user4Id, schedule6Id)
    await users.addScheduleToUser(user5Id, schedule6Id)


    // add comments / notes
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