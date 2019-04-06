const dbConnection = require('./data/connection');
const data = require('./data/');
const settings = data.settings;

async function main() {
    const db = await dbConnection();
    await db.dropDatabase();
    
    var options = {
        salary: ["Industry Median", "Industry Median + $10,000", "Industry Median - $10,000"],
        insurance: ["None", "Partial (medical only)", "Full (medical, dental, & vision)"],
        has401k: ["None", "Yes (no match)", "Yes (contribution match)"],
        relocationRequired: ["Yes", "No"],
        travelRequired: ["Yes", "No"],
        workRemotely: ["Yes", "No"],
        vacation: ["2 weeks", "3 weeks"]
    };

    function getCombinations(options, optionIndex, results, current) {
        var allKeys = Object.keys(options);
        var optionKey = allKeys[optionIndex];
        var vals = options[optionKey];
        for (var i = 0; i < vals.length; i++) {
            current[optionKey] = vals[i];
            if (optionIndex + 1 < allKeys.length) {
                getCombinations(options, optionIndex + 1, results, current);
            } else {
                var res = JSON.parse(JSON.stringify(current));
                results.push(res);
            }
        }
        return results;
    };
    
    var results = getCombinations(options, 0, [], {});
    await settings.create(results)
	console.log('Done seeding database');
}

main();