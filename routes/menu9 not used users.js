var express = require("express");
var router = express.Router();

var users_controller = require("../controllers/users_controller");
var isAuthenticated = require("../config/middleware/isAuthenticated");  

// middle ware in users routes isAuthenticated, to check if ..

router.get("/signup", users_controller.registrationPage);

router.get("/sign-out", users_controller.signOutUser);

router.post(
  "/login",
  users_controller.loginUser
);

router.get(
  "/anonymous",
  users_controller.loginAnonymous
);

router.post(
  "/signup",
  users_controller.signUpUser
);

module.exports = router;
