const passport = require("passport");
// const LocalStrategy = require("passport-local").Strategy;
// const db = require("../models");
// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;
