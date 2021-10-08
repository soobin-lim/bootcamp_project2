// const db = require("../models");
const create_user = require('./controllers/firebase_auth/create_user');
const create_anonymous_user = require('./controllers/firebase_auth/anonymous');
//this is the users_controller.js file
exports.registrationPage = (req, res) => {
  res.render("users/registration", {
    layout: "main-registration",
  });
};

exports.signOutUser = (req, res) => {
  req.logout();
  res.redirect("/");
};

// login
exports.loginUser = (req, res) => {
  // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
  // So we're sending the user back the route to the members page because the redirect will happen on the front end
  // They won't get this or even be able to access this page if they aren't authed
  res.json("/");
};

exports.loginAnonymous = async (req, res) => {
  var uid;
  console.log('controller -loginAnonymous')
  // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
  // So we're sending the user back the route to the members page because the redirect will happen on the front end
  // They won't get this or even be able to access this page if they aren't authed
  uid = await create_anonymous_user();
  console.log(uid);
  res.locals.uid = uid;
  req.app.locals.uid = uid;
  // res.json("/");
  res.json(uid);
};

// register a user
exports.signUpUser = (req, res) => {
  console.log('users_controller_signUpUserfunction', req.body);
  create_user(req.body);
  res.json({ redirect: "/" });
};
