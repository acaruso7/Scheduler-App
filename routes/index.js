const dashboardRoute = require("./dashboard");
const inviteFormRoute = require("./inviteForm");
const path = require("path");

const constructorMethod = app => {
  app.get("/", (req, res) => {
    res.sendFile(path.resolve("static/login.html"));
  });
  app.use("/dashboard", dashboardRoute);
  app.use("/inviteForm", inviteFormRoute);
  app.use("*", (req, res) => {
    res.redirect("/dashboard");
  });
};

module.exports = constructorMethod;
