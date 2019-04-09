const dbConnection = require('./data/connection');
const data = require('./data/');
const users = data.users;
const schedules = data.schedules;

async function main() {
    const db = await dbConnection();
    await db.dropDatabase();
    
    await users.create("Alex Coruso", "acaruso@stevens.edu", 'password')
    console.log('Done seeding database');
    

    let schedule = await schedules.create("Alex", "2019--04--08", "first meeting", "this a description");
    let id = schedule._id.toString();
    await schedules.addUserToSchedules(id,"1");
    await schedules.addUserToSchedules(id,"2");
    await schedules.addUserToSchedules(id,"3");
    console.log("first")
    await schedules.addDateToSchedule(id, "2019--04--11");
    await schedules.addDateToSchedule(id,"2019--04--12");
    await schedules.addResponseToSchedule(id,"1");
    await schedules.addResponseToSchedule(id,"2");
    console.log("done create");
    

    await db.serverConfig.close();
}

main();