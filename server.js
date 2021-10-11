


// Dependencies
// ============
const express = require("express");
const path = require("path");
const logger = require("morgan");
const compression = require("compression");
// const { sequelize } = require("./models");
const exphbs = require("express-handlebars");     // node js has handlebars
const cors = require("cors");
const fileUpload = require("express-fileupload");
const favicon = require('serve-favicon');
const fileuploadRouter = require("./routes/controllers/api/fileuploader/routes/");
const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};
global.__basedir = __dirname;


app.use(cors(corsOptions));
fileuploadRouter(app);
app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());
// app.use(passport.initialize());   // access to 
// app.use(passport.session());
app.use(compression());
// view engine setup
app.set("views", path.join(__dirname, "views"));  // './views folder' is set to app.set("views")
require("./routes/allroutes")(app);
var hbs = exphbs.create({ 
  // defaultLayout: "main",
  layoutsDir: 'views/layouts/',
  partialsDir: 'views/partials/',
  defaultLayout: 'main',
  extname: '.handlebars'
})
app.engine(".handlebars", hbs.engine);
app.set("view engine", ".handlebars");

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: app.get("env") === "development" ? err : {},
  });
});

module.exports = app;
