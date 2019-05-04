const dbConnection = require('./config/connection');
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
    const user4 = await users.create("Haolin Yang", "haolinyang95@gmail.com", password);
    const user4Id = user4._id.toString()
    const user5 = await users.create("Yangyang Liu", "yangyangliu@gmail.com", password);
    const user5Id = user5._id.toString()


    //create schedules
    let schedule = await schedules.create(user1Id, new Date("2019/4/8"), "first meeting", "this a description", 3);
    let scheduleId = schedule._id.toString();
    await schedules.addUserToSchedule(scheduleId, user1Id);
    await schedules.addUserToSchedule(scheduleId, user2Id);
    await schedules.addUserToSchedule(scheduleId, user3Id);
    await schedules.addDateToSchedule(scheduleId, new Date("2019/04/11"));
    await schedules.addDateToSchedule(scheduleId, new Date("2019/04/12"));
    await schedules.addResponseToSchedule(scheduleId, user1Id);
    await schedules.addResponseToSchedule(scheduleId, user2Id);
    await schedules.addAvailabilityToResponse(scheduleId, user1Id, new Date("2019/04/12"), ['1 PM','2 PM']);
    
    let schedule2 = await schedules.create(user2Id, new Date("2019/04/10"), "second meeting", "second meeting description", 3)
    let schedule2Id = schedule2._id.toString();
    await schedules.addUserToSchedule(schedule2Id, user2Id);
    await schedules.addUserToSchedule(schedule2Id, user3Id);
    await schedules.addUserToSchedule(schedule2Id, user4Id);
    await schedules.addDateToSchedule(schedule2Id, new Date("2019/04/15"));
    await schedules.addDateToSchedule(schedule2Id, new Date("2019/04/17"));
    await schedules.addResponseToSchedule(schedule2Id, user4Id);
    await schedules.addResponseToSchedule(schedule2Id, user5Id);
    await schedules.addAvailabilityToResponse(schedule2Id, user4Id, new Date("2019/04/15"), ['3 PM', '4 PM']);
    await schedules.addAvailabilityToResponse(schedule2Id, user4Id, new Date("2019/04/17"), ['9 AM', '10 AM']);

    let schedule3 = await schedules.create(user3Id, new Date("2019/04/20"), "third meeting", "third meeting description", 2)
    let schedule3Id = schedule3._id.toString();
    await schedules.addUserToSchedule(schedule3Id, user2Id);
    await schedules.addUserToSchedule(schedule3Id, user3Id);
    await schedules.addDateToSchedule(schedule3Id, new Date("2019/04/22"));
    await schedules.addDateToSchedule(schedule3Id, new Date("2019/04/23"));
    await schedules.addDateToSchedule(schedule3Id, new Date("2019/04/24"));
    await schedules.addResponseToSchedule(schedule3Id, user2Id);
    await schedules.addResponseToSchedule(schedule3Id, user3Id);
    await schedules.addAvailabilityToResponse(schedule3Id, user3Id, new Date("2019/04/22"), ['8 AM', '9 AM']);

    let schedule4 = await schedules.create(user4Id, new Date("2019/04/18"), "fourth meeting", "fourth meeting description", 3)
    let schedule4Id = schedule4._id.toString();
    await schedules.addUserToSchedule(schedule4Id, user3Id);
    await schedules.addUserToSchedule(schedule4Id, user4Id);
    await schedules.addUserToSchedule(schedule4Id, user5Id);
    await schedules.addDateToSchedule(schedule4Id, new Date("2019/04/26"));
    await schedules.addDateToSchedule(schedule4Id, new Date("2019/04/27"));
    await schedules.addDateToSchedule(schedule4Id, new Date("2019/04/29"));
    await schedules.addResponseToSchedule(schedule4Id, user3Id);
    await schedules.addResponseToSchedule(schedule4Id, user4Id);
    await schedules.addAvailabilityToResponse(schedule4Id, user3Id, new Date("2019/04/26"), ['3 PM', '4 PM']);
    await schedules.addAvailabilityToResponse(schedule4Id, user4Id, new Date("2019/04/26"), ['12 PM', '1 PM']);

    let schedule5 = await schedules.create(user5Id, new Date("2019/05/01"), "fifth meeting", "fifth meeting description", 3)
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
    await schedules.addAvailabilityToResponse(schedule5Id, user1Id, new Date("2019/05/10"), ['3 PM', '4 PM']);
    await schedules.addAvailabilityToResponse(schedule5Id, user4Id, new Date("2019/05/11"), ['12 PM', '1 PM']);
    await schedules.addAvailabilityToResponse(schedule5Id, user4Id, new Date("2019/05/12"), ['1 PM', '4 PM']);

    let schedule6 = await schedules.create(user1Id, new Date("2019/05/13"), "sixth meeting", "sixth meeting description", 5)
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
    await schedules.addAvailabilityToResponse(schedule6Id, user1Id, new Date("2019/05/20"), ['3 PM', '4 PM']);
    await schedules.addAvailabilityToResponse(schedule6Id, user2Id, new Date("2019/05/21"), ['6 PM', '7 PM']);
    await schedules.addAvailabilityToResponse(schedule6Id, user3Id, new Date("2019/05/21"), ['8 PM', '9 PM']);
    await schedules.addAvailabilityToResponse(schedule6Id, user4Id, new Date("2019/05/21"), ['12 PM', '1 PM']);
    await schedules.addAvailabilityToResponse(schedule6Id, user4Id, new Date("2019/05/24"), ['1 PM', '4 PM']);

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
    //schedule1 comments
    let comment1 = "I can only meet on Monday";
    let comment2 = "I'm only availble from 1:30 - 2:00 on Monday"
    await notes.createNote(scheduleId, user1Id, user1['fullName'], comment1);
    await notes.createNote(scheduleId, user2Id, user2['fullName'], comment2);

    //schedule2 comments
    let comment3 = "I can only meet on Wednesday";
    let comment4 = "I may have to take a phone call during our meeting on Wednesday"
    await notes.createNote(schedule2Id, user2Id, user2['fullName'], comment3);
    await notes.createNote(schedule2Id, user3Id, user3['fullName'], comment4);

    //schedule3 comments
    let comment5 = "We can use the classroom to meet on Thursdays";
    let comment6 = "Any time on Saturday works well for me"
    await notes.createNote(schedule3Id, user3Id, user3['fullName'], comment5);
    await notes.createNote(schedule3Id, user4Id, user4['fullName'], comment6);

    //schedule4 comments
    let comment7 = "I can only meet on Monday if I get my other project done first";
    let comment8 = "I may have to take a phone call during our meeting on Monday";
    await notes.createNote(schedule4Id, user4Id, user4['fullName'], comment7);
    await notes.createNote(schedule4Id, user5Id, user5['fullName'], comment8);

    //schedule5 comments
    let comment9 = "My availability for Thursday may change in the next few days";
    let comment10 = "I may have to take a phone call during our meeting on Wednesday"
    await notes.createNote(schedule5Id, user4Id, user4['fullName'], comment9);
    await notes.createNote(schedule5Id, user5Id, user5['fullName'], comment10);
    
    console.log('Done seeding database');
}

main();
