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
    let password = await bcrypt.hash('123', saltrounds)
    const user1 = await users.create("Alex Caruso", "acaruso@stevens.edu", password);
    const user1Id = user1._id.toString()
    const user2 = await users.create("John Doe", "johndoe@gmail.com", password);
    const user2Id = user2._id.toString()
    const user3 = await users.create("Shujaat Bakhsh", "shujaatbakhsh@gmail.com", password);
    const user3Id = user3._id.toString()
    const user4 = await users.create("Haolin Yang", "haolinyang95@gmail.com", password);
    const user4Id = user4._id.toString()
    const user5 = await users.create("Yangyang Liu", "yangyangliu@gmail.com", password);
    const user5Id = user5._id.toString()
    const user6 = await users.create("Jiawei Wang", "jiaweiwang@gmail.com", password);
    const user6Id = user6._id.toString()

    //schedule 1
    let schedule = await schedules.create(user1Id, new Date("2019/4/8"), "CS546 Meeting 1 - Project Proposal", "Work on project proposal. Summarize main idea of the application, and define core features and extra features. Write up document", 3);
    let scheduleId = schedule._id.toString();
    await schedules.addUserToSchedule(scheduleId, user1Id);
    await schedules.addUserToSchedule(scheduleId, user2Id);
    await schedules.addUserToSchedule(scheduleId, user3Id);
    await users.addScheduleToUser(user1Id, scheduleId)
    await users.addScheduleToUser(user2Id, scheduleId)
    await users.addScheduleToUser(user3Id, scheduleId)
    await schedules.addDateToSchedule(scheduleId, new Date("2019/04/11"));
    await schedules.addDateToSchedule(scheduleId, new Date("2019/04/12"));
    await schedules.addDateToSchedule(scheduleId, new Date("2019/04/15"));
    await schedules.addResponseToSchedule(scheduleId, user1Id);
    await schedules.addResponseToSchedule(scheduleId, user2Id);
    await schedules.addResponseToSchedule(scheduleId, user3Id);
    await schedules.addAvailabilityToResponse(scheduleId, user1Id, new Date("2019/04/11"), ['1 PM','2 PM']);
    await schedules.addAvailabilityToResponse(scheduleId, user1Id, new Date("2019/04/15"), ['9 AM', '11 AM', '3 PM']);
    await schedules.addAvailabilityToResponse(scheduleId, user2Id, new Date("2019/04/11"), ['3 PM','4 PM']);
    await schedules.addAvailabilityToResponse(scheduleId, user2Id, new Date("2019/04/12"), ['9 AM','4 PM']);
    await schedules.addAvailabilityToResponse(scheduleId, user3Id, new Date("2019/04/11"), ['1 PM','2 PM']);
    await schedules.addAvailabilityToResponse(scheduleId, user3Id, new Date("2019/04/12"), ['12 PM','4 PM']);
    let comment1 = "I may have to take a phone call during our meeting if we meet on Thursday";
    let comment2 = "My availability on Monday may change. If so I will let everyone know"
    await notes.createNote(scheduleId, user1Id, user1['fullName'], comment1);
    await notes.createNote(scheduleId, user2Id, user2['fullName'], comment2);
    
    // schedule 2
    let schedule2 = await schedules.create(user2Id, new Date("2019/04/10"), "CS546 Meeting 2 - Database Proposal", "Work on database proposal. Define JSON structure of schedules collection, users collection, and notes collection. Write document and modify readme markup to include schema and tables.", 3)
    let schedule2Id = schedule2._id.toString();
    await schedules.addUserToSchedule(schedule2Id, user2Id);
    await schedules.addUserToSchedule(schedule2Id, user3Id);
    await schedules.addUserToSchedule(schedule2Id, user4Id);
    await users.addScheduleToUser(user2Id, schedule2Id)
    await users.addScheduleToUser(user3Id, schedule2Id)
    await users.addScheduleToUser(user4Id, schedule2Id)
    await schedules.addDateToSchedule(schedule2Id, new Date("2019/04/15"));
    await schedules.addDateToSchedule(schedule2Id, new Date("2019/04/17"));
    await schedules.addDateToSchedule(schedule2Id, new Date("2019/04/18"));
    await schedules.addDateToSchedule(schedule2Id, new Date("2019/04/19"));
    await schedules.addResponseToSchedule(schedule2Id, user2Id);
    await schedules.addResponseToSchedule(schedule2Id, user3Id);
    await schedules.addResponseToSchedule(schedule2Id, user4Id);
    await schedules.addAvailabilityToResponse(schedule2Id, user2Id, new Date("2019/04/15"), ['3 PM', '4 PM']);
    await schedules.addAvailabilityToResponse(schedule2Id, user2Id, new Date("2019/04/17"), ['9 AM', '10 AM']);
    await schedules.addAvailabilityToResponse(schedule2Id, user2Id, new Date("2019/04/19"), ['11 AM', '12 PM', '1 PM', '2 PM']);
    await schedules.addAvailabilityToResponse(schedule2Id, user3Id, new Date("2019/04/17"), ['4 PM', '5 PM']);
    await schedules.addAvailabilityToResponse(schedule2Id, user3Id, new Date("2019/04/19"), ['9 AM', '10 AM']);
    await schedules.addAvailabilityToResponse(schedule2Id, user4Id, new Date("2019/04/17"), ['10 AM']);
    await schedules.addAvailabilityToResponse(schedule2Id, user4Id, new Date("2019/04/19"), ['12 PM', '1 PM', '2 PM']);
    let comment3 = "Friday is the best day for me to meet";
    let comment4 = "I may be able to extend my availability on Friday"
    await notes.createNote(schedule2Id, user2Id, user2['fullName'], comment3);
    await notes.createNote(schedule2Id, user3Id, user3['fullName'], comment4);

    // schedule 3
    let schedule3 = await schedules.create(user3Id, new Date("2019/04/20"), "CS546 Meeting 3 - Seed Script", "Write an initial seed script to populate the database", 4)
    let schedule3Id = schedule3._id.toString();
    await schedules.addUserToSchedule(schedule3Id, user2Id);
    await schedules.addUserToSchedule(schedule3Id, user3Id);
    await schedules.addUserToSchedule(schedule3Id, user4Id);
    await schedules.addUserToSchedule(schedule3Id, user5Id);
    await users.addScheduleToUser(user2Id, schedule3Id)
    await users.addScheduleToUser(user3Id, schedule3Id)
    await users.addScheduleToUser(user4Id, schedule3Id)
    await users.addScheduleToUser(user5Id, schedule3Id)
    await schedules.addDateToSchedule(schedule3Id, new Date("2019/04/22"));
    await schedules.addDateToSchedule(schedule3Id, new Date("2019/04/23"));
    await schedules.addDateToSchedule(schedule3Id, new Date("2019/04/24"));
    await schedules.addResponseToSchedule(schedule3Id, user2Id);
    await schedules.addResponseToSchedule(schedule3Id, user3Id);
    await schedules.addResponseToSchedule(schedule3Id, user4Id);
    await schedules.addResponseToSchedule(schedule3Id, user5Id);
    await schedules.addAvailabilityToResponse(schedule3Id, user2Id, new Date("2019/04/22"), ['8 AM', '9 AM']);
    await schedules.addAvailabilityToResponse(schedule3Id, user3Id, new Date("2019/04/22"), ['9 AM', '10 AM']);
    await schedules.addAvailabilityToResponse(schedule3Id, user4Id, new Date("2019/04/22"), ['9 AM', '7 PM', '8 PM']);
    await schedules.addAvailabilityToResponse(schedule3Id, user4Id, new Date("2019/04/23"), ['10 AM', '7 PM', '9 PM']);
    await schedules.addAvailabilityToResponse(schedule3Id, user4Id, new Date("2019/04/24"), ['2 PM', '4 PM']);
    await schedules.addAvailabilityToResponse(schedule3Id, user5Id, new Date("2019/04/22"), ['2 PM', '4 PM']);
    await schedules.addAvailabilityToResponse(schedule3Id, user5Id, new Date("2019/04/24"), ['11 AM', '5 PM', '6 PM']);
    let comment5 = "We can use the classroom to meet on Monday";
    let comment6 = "I'm good to meet any of these days, though Monday morning works best for me"
    await notes.createNote(schedule3Id, user3Id, user3['fullName'], comment5);
    await notes.createNote(schedule3Id, user4Id, user4['fullName'], comment6);

    // schedule 4
    let schedule4 = await schedules.create(user4Id, new Date("2019/04/18"), "CS546 Meeting 4 - Routes", "Set up basic unauthenticated routes for the main pages in the application (login, dashboard, display grid, createSchedule form, inviteForm.", 4)
    let schedule4Id = schedule4._id.toString();
    await schedules.addUserToSchedule(schedule4Id, user3Id);
    await schedules.addUserToSchedule(schedule4Id, user4Id);
    await schedules.addUserToSchedule(schedule4Id, user5Id);
    await schedules.addUserToSchedule(schedule4Id, user6Id);
    await users.addScheduleToUser(user3Id, schedule4Id)
    await users.addScheduleToUser(user4Id, schedule4Id)
    await users.addScheduleToUser(user5Id, schedule4Id)
    await users.addScheduleToUser(user6Id, schedule4Id)
    await schedules.addDateToSchedule(schedule4Id, new Date("2019/04/26"));
    await schedules.addDateToSchedule(schedule4Id, new Date("2019/04/27"));
    await schedules.addDateToSchedule(schedule4Id, new Date("2019/04/29"));
    await schedules.addResponseToSchedule(schedule4Id, user3Id);
    await schedules.addResponseToSchedule(schedule4Id, user4Id);
    await schedules.addResponseToSchedule(schedule4Id, user5Id);
    await schedules.addResponseToSchedule(schedule4Id, user6Id);
    await schedules.addAvailabilityToResponse(schedule4Id, user3Id, new Date("2019/04/26"), ['3 PM', '4 PM']);
    await schedules.addAvailabilityToResponse(schedule4Id, user3Id, new Date("2019/04/27"), ['6 PM', '7 PM', '8 PM']);
    await schedules.addAvailabilityToResponse(schedule4Id, user4Id, new Date("2019/04/26"), ['12 PM', '1 PM']);
    await schedules.addAvailabilityToResponse(schedule4Id, user4Id, new Date("2019/04/29"), ['3 PM', '4 PM', '5 PM', '6 PM']);
    await schedules.addAvailabilityToResponse(schedule4Id, user5Id, new Date("2019/04/26"), ['12 PM', '3 PM', '4 PM', '7 PM']);
    await schedules.addAvailabilityToResponse(schedule4Id, user5Id, new Date("2019/04/27"), ['3 PM']);
    await schedules.addAvailabilityToResponse(schedule4Id, user5Id, new Date("2019/04/29"), ['9 AM', '12 PM', '1 PM']);
    await schedules.addAvailabilityToResponse(schedule4Id, user6Id, new Date("2019/04/29"), ['9 AM', '12 PM', '4 PM', '5 PM']);
    let comment7 = "I can only meet on Friday if I get my other project done first";
    let comment8 = "We should try to meet before our next class so we can ask professor questions, so Friday looks like the best day";
    await notes.createNote(schedule4Id, user4Id, user4['fullName'], comment7);
    await notes.createNote(schedule4Id, user5Id, user5['fullName'], comment8);

    // schedule 5
    let schedule5 = await schedules.create(user5Id, new Date("2019/05/01"), "CS546 Meeting 5 - Auth, Email Invite & UI", "Authenticate all routes, set up login and signup, set up email invites, develop all static pages and handlebars templates.", 3)
    let schedule5Id = schedule5._id.toString();
    await schedules.addUserToSchedule(schedule5Id, user1Id);
    await schedules.addUserToSchedule(schedule5Id, user4Id);
    await schedules.addUserToSchedule(schedule5Id, user5Id);
    await users.addScheduleToUser(user1Id, schedule5Id)
    await users.addScheduleToUser(user4Id, schedule5Id)
    await users.addScheduleToUser(user5Id, schedule5Id)
    await schedules.addDateToSchedule(schedule5Id, new Date("2019/05/02"));
    await schedules.addDateToSchedule(schedule5Id, new Date("2019/05/03"));
    await schedules.addDateToSchedule(schedule5Id, new Date("2019/05/04"));
    await schedules.addResponseToSchedule(schedule5Id, user1Id);
    await schedules.addResponseToSchedule(schedule5Id, user4Id);
    await schedules.addResponseToSchedule(schedule5Id, user5Id);
    await schedules.addAvailabilityToResponse(schedule5Id, user1Id, new Date("2019/05/02"), ['3 PM', '4 PM']);
    await schedules.addAvailabilityToResponse(schedule5Id, user4Id, new Date("2019/05/02"), ['12 PM', '1 PM']);
    await schedules.addAvailabilityToResponse(schedule5Id, user4Id, new Date("2019/05/03"), ['1 PM', '4 PM']);
    await schedules.addAvailabilityToResponse(schedule5Id, user5Id, new Date("2019/05/02"), ['1 PM', '3 PM', '6 PM']);
    await schedules.addAvailabilityToResponse(schedule5Id, user5Id, new Date("2019/05/03"), ['11 AM', '12 PM', '3 PM']);
    await schedules.addAvailabilityToResponse(schedule5Id, user5Id, new Date("2019/05/04"), ['1 PM', '4 PM', '5 PM']);
    let comment9 = "I might be able to stop by breifly on Saturday and help out with authentication";
    let comment10 = "I'm free to work on the UI a lot this week"
    await notes.createNote(schedule5Id, user4Id, user4['fullName'], comment9);
    await notes.createNote(schedule5Id, user5Id, user5['fullName'], comment10);

    // schedule 6
    let schedule6 = await schedules.create(user6Id, new Date("2019/05/04"), "CS546 Meeting 6 - Input Validation & UI Improvements", "Write jQuery to validate all form inputs. Write jQuery to manipulate DOM when necessary (inviteForm, login page, etc.)", 6)
    let schedule6Id = schedule6._id.toString();
    await schedules.addUserToSchedule(schedule6Id, user1Id);
    await schedules.addUserToSchedule(schedule6Id, user2Id);
    await schedules.addUserToSchedule(schedule6Id, user3Id);
    await schedules.addUserToSchedule(schedule6Id, user4Id);
    await schedules.addUserToSchedule(schedule6Id, user5Id);
    await schedules.addUserToSchedule(schedule6Id, user6Id);
    await users.addScheduleToUser(user1Id, schedule6Id)
    await users.addScheduleToUser(user2Id, schedule6Id)
    await users.addScheduleToUser(user3Id, schedule6Id)
    await users.addScheduleToUser(user4Id, schedule6Id)
    await users.addScheduleToUser(user5Id, schedule6Id)
    await users.addScheduleToUser(user6Id, schedule6Id)
    await schedules.addDateToSchedule(schedule6Id, new Date("2019/05/05"));
    await schedules.addDateToSchedule(schedule6Id, new Date("2019/05/06"));
    await schedules.addDateToSchedule(schedule6Id, new Date("2019/05/07"));
    await schedules.addResponseToSchedule(schedule6Id, user1Id);
    await schedules.addResponseToSchedule(schedule6Id, user2Id);
    await schedules.addResponseToSchedule(schedule6Id, user3Id);
    await schedules.addResponseToSchedule(schedule6Id, user4Id);
    await schedules.addResponseToSchedule(schedule6Id, user5Id);
    await schedules.addResponseToSchedule(schedule6Id, user6Id);
    await schedules.addAvailabilityToResponse(schedule6Id, user1Id, new Date("2019/05/05"), ['3 PM', '4 PM']);
    await schedules.addAvailabilityToResponse(schedule6Id, user1Id, new Date("2019/05/06"), ['9 AM', '10 AM', '11 AM', '12 PM']);
    await schedules.addAvailabilityToResponse(schedule6Id, user2Id, new Date("2019/05/05"), ['6 PM']);
    await schedules.addAvailabilityToResponse(schedule6Id, user2Id, new Date("2019/05/07"), ['10 AM', '11 AM', '12 PM','3 PM']);
    await schedules.addAvailabilityToResponse(schedule6Id, user3Id, new Date("2019/05/05"), ['8 PM', '9 PM']);
    await schedules.addAvailabilityToResponse(schedule6Id, user3Id, new Date("2019/05/06"), ['4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM']);
    await schedules.addAvailabilityToResponse(schedule6Id, user3Id, new Date("2019/05/07"), ['10 AM', '2 PM', '3 PM']);
    await schedules.addAvailabilityToResponse(schedule6Id, user4Id, new Date("2019/05/06"), ['4 PM', '5 PM', '6 PM', '7 PM', '8 PM']);
    await schedules.addAvailabilityToResponse(schedule6Id, user5Id, new Date("2019/05/06"), ['1 PM', '4 PM']);
    await schedules.addAvailabilityToResponse(schedule6Id, user5Id, new Date("2019/05/07"), ['1 PM']);
    await schedules.addAvailabilityToResponse(schedule6Id, user6Id, new Date("2019/05/05"), ['1 PM', '3 PM', '4 PM']);
    await schedules.addAvailabilityToResponse(schedule6Id, user6Id, new Date("2019/05/06"), ['9 AM', '10 AM', '12 PM']);
    let comment11 = "I might be available Tuesday was well, but I'm not sure yet. I'll let everyone know";
    let comment12 = "I can probably extend my availability for Monday this week, and work up until class and after class"
    let comment13 = 'My interview on Tuesday was rescheduled so I can meet around noon that day'
    await notes.createNote(schedule6Id, user4Id, user4['fullName'], comment11);
    await notes.createNote(schedule6Id, user5Id, user5['fullName'], comment12);
    await notes.createNote(schedule6Id, user6Id, user6['fullName'], comment13);
    
    console.log('Done seeding database');
}

main();
