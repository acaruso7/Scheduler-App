const dbConnection = require("./connection");

/** 
 * @param {string} collection Name of the collection to be created
 * @returns {object} Pointer to the database collection 
 */
const getCollectionFn = collection => {
  let _col = undefined;

  return async () => {
    if (!_col) {
      const db = await dbConnection();
      _col = await db.collection(collection);
    }

    return _col;
  };
};

module.exports = {
  users: getCollectionFn("users"),
  schedules: getCollectionFn("schedules"),
  notes: getCollectionFn("notes")
};
