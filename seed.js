const dbConnection = require('./data/connection');
const data = require('./data/');
const users = data.users;

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
	console.log('Done seeding database');
}

main();