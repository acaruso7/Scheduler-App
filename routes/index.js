const settingsRoute = require("./settings");
const surveyRoute = require("./survey");
const path = require("path");

const constructorMethod = app => {
  app.use("/settings", settingsRoute);
  app.use("/survey", surveyRoute);
  app.use("*", (req, res) => {
    res.redirect("/survey");
  });
};

module.exports = constructorMethod;
