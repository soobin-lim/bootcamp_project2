var express = require("express");
var router = express.Router();

var passport = require("../config/passport");
var users_controller = require("../controllers/users_controller");
var isAuthenticated = require("../config/middleware/isAuthenticated");  

// middle ware in users routes isAuthenticated, to check if ..

router.get("/signup", users_controller.registrationPage);

router.get("/sign-out", users_controller.signOutUser);

router.post(
  "/login",
  passport.authenticate("local-login"),
  users_controller.loginUser
);

router.get(
  "/anonymous",
  // passport.authenticate("local-login-anonymous"), <- 400 bad request
  users_controller.loginAnonymous
);

router.post(
  "/signup",
  passport.authenticate("local-signup"),
  users_controller.signUpUser
);

module.exports = router;
