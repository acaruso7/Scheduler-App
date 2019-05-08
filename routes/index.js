const dashboardRoute = require("./dashboard");
const inviteFormRoute = require("./inviteForm");
const loginRoute = require("./login");
const signupRoute = require("./signup");
const createScheduleRoute = require("./createSchedule");
const path = require("path");

const constructorMethod = app => {
  app.get("/", async (req, res) => {
      res.sendFile(path.resolve("static/welcome.html"));
  });
  app.get("/email/:scheduleId", async (req, res) => {
    req.session.scheduleId = req.params.scheduleId;
    req.session.fromEmail = true;
    res.redirect('/login')
  })
  app.use("/login", loginRoute);
  app.use("/signup", signupRoute);
  app.use("/dashboard", dashboardRoute);
  app.use("/inviteForm", inviteFormRoute);
  app.use("/createSchedule", createScheduleRoute);
  app.get('/logout', async (req, res) =>{
    req.session.destroy();
    res.clearCookie("AuthCookie");
    res.sendFile(path.resolve("static/logout.html"));
  });
  app.use("*", async (req, res) => {
    res.redirect("/");
  });
};

module.exports = constructorMethod;
