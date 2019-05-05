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

    let password = await bcrypt.hash('password', saltrounds)

    const user4 = await users.create("Haolin Yang", "haolinyang95@gmail.com", password);
    const user4Id = user4._id.toString()
    const user7 = await users.create("test Yang", "hyang40@stevens.edu", password);
    const user7Id = user7._id.toString()

    let schedule_deleted = await schedules.create(user7Id, new Date("2019/10/10"), "test delete", "test delete", 2);
    let schedule_deleted_Id = schedule_deleted._id.toString();
    await schedules.addUserToSchedule(schedule_deleted_Id, user7Id);
    await schedules.addUserToSchedule(schedule_deleted_Id, user4Id);
    await schedules.addDateToSchedule(schedule_deleted_Id, new Date("2019/10/10"));
    await schedules.addResponseToSchedule(schedule_deleted_Id, user4Id);
    await schedules.addAvailabilityToResponse(schedule_deleted_Id, user4Id, new Date("2019/10/10"), ['3 PM', '4 PM']);

    await users.addScheduleToUser(user7Id, schedule_deleted_Id)
    await users.addScheduleToUser(user4Id, schedule_deleted_Id)

    let comment1 = "I can only meet on Monday";
    let comment2 = "I'm only availble from 1:30 - 2:00 on Monday"
    await notes.createNote(schedule_deleted_Id, user7Id, user7['fullName'], comment1);
    await notes.createNote(schedule_deleted_Id, user4Id, user4['fullName'], comment2);

    let test = await schedules.removeSchedule(schedule_deleted_Id);

    console.log('Done seeding test database');
}

main();