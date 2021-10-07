// Dependencies
// ============
const express = require("express");
const path = require("path");
const logger = require("morgan");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const config = require("./config/extra-config");
const compression = require("compression");
const { sequelize } = require("./models");
const passport = require("./config/passport");
global.__basedir = __dirname;

// Express settings
// ================

// instantiate our app
const app = express();

//allow sessions
app.use(
  session({
    secret: config.sessionKey,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize,
    }),
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));  // './views folder' is set to app.set("views")

//set up handlebars
const exphbs = require("express-handlebars");     // node js has handlebars

app.engine(
  "handlebars",
  exphbs({
    helpers: require('./helpers/handlebars').helpers, // helper function for handlebars
    defaultLayout: "main",                    // default Layout is "main" -> main.handlebars
  })
);
app.set("view engine", "handlebars");     // app.engine("handlebars") has set as a "view engine" in node express, with helpers

const isAuth = require("./config/middleware/isAuthenticated");  // not used
const isAuth2 = require("./config/middleware/isAuthenticatedfb");  // not used

const authCheck = require("./config/middleware/attachAuthenticationStatus");

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({ secret: config.sessionKey, resave: true, saveUninitialized: true })
);
app.use(passport.initialize());   // access to 
app.use(passport.session());

app.use(authCheck);     // default path is omitted, authCheck function executes if user comes to localhost:3000

app.use(compression());    

require("./routes")(app);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
// no stacktraces leaked to user unless in development environment
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: app.get("env") === "development" ? err : {},
  });
});

//res.locals
app.locals.uid = 'undefined';

// our module get's exported as app.
module.exports = app;

// Where's the listen? Open up bin/www, and read the comments.
