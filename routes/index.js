const dashboardRoute = require("./dashboard");
const inviteFormRoute = require("./inviteForm");
const loginRoute = require("./login");
const path = require("path");

const constructorMethod = app => {
  app.get("/", (req, res) => {
    if(req.session.isAuthenticated){
      res.redirect('/dashboard');
    }
    else{
      res.sendFile(path.resolve("static/login.html"));
    }
  });
  
  app.use("/dashboard", dashboardRoute);
  app.use("/inviteForm", inviteFormRoute);
  app.use("/login", loginRoute);
  app.use("*", (req, res) => {
    res.redirect("/dashboard");
  });
};

module.exports = constructorMethod;
