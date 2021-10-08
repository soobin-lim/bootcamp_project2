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
const exphbs = require("express-handlebars");     // node js has handlebars
const cors = require("cors");
var corsOptions = {
  origin: "http://localhost:8081"
};
const initRoutes = require("./fileuploader/routes");


const fileUpload = require("express-fileupload");
// Express settingsƒ
// ================

// instantiate our app
const app = express();
initRoutes(app);
app.use(cors(corsOptions));
global.__basedir = __dirname;
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
var hbs = exphbs.create({ 
  defaultLayout: "main",
  extname: '.handlebars'
})
app.engine(".handlebars", hbs.engine);
app.set("view engine", ".handlebars");

const authCheck = require("./config/middleware/attachAuthenticationStatus");

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(fileUpload());
app.use(
  session({ secret: config.sessionKey, resave: true, saveUninitialized: true })
);
app.use(passport.initialize());   // access to 
app.use(passport.session());

app.use(authCheck);     // default path is omitted, authCheck function executes if user comes to localhost:3000

app.use(compression());

require("./routes/allroutes")(app);


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
// app.locals.uid = 'undefined';

// our module get's exported as app.
module.exports = app;


db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
  // set our app to listen to the port we set above
  const server = app.listen(app.get("port"), () =>
    debug("Express server listening on port " + server.address().port)
  );
});