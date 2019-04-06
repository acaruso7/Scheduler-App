const dbConnection = require('./data/connection');
const data = require('./data/');
const users = data.users;

async function main() {
    const db = await dbConnection();
    await db.dropDatabase();
    
    await users.create("Alex Coruso", "acaruso@stevens.edu", 'password')
	console.log('Done seeding database');
}

main();