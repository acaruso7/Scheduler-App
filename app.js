const express = require("express");
const app = express();
const configRoutes = require("./routes");
const static = express.static(__dirname + "/public");
const exphbs = require("express-handlebars");
const session = require('express-session');

// set static
app.use("/public", static);

// set body parser
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// set handlerbar
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// set session
app.use(session({
  name: 'AuthCookie',
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie:{
      maxAge: 10*60*1000 // 10 min
  }
}));

// middleware
// middleware for authentication
app.get('/', (req, res, next) => {
  if(req.session.isAuthenticated){
      res.redirect('/dashboard');
  }
  else
      next();
});

app.use('/login', (req, res, next) => {
  if(req.session.isAuthenticated){
      res.redirect('/dashboard');
  }
  else
      next();
});

app.use('/dashboard', (req, res, next) => {
  if(!req.session.isAuthenticated){
      res.status(403);
      res.render('error/error', {error: 'No authority!'});
  }
  else
      next();
});

app.use('/logout', (req, res, next) => {
  if(!req.session.isAuthenticated){
    res.status(403);
    res.render('error/error', {error: 'No authority!'});
  }
  else
      next();
});

// config the routes
configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
