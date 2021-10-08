// This is middleware for restrictng routes a user is not allowed to visit if not logged in
module.exports = (req, res, next) => {
  // If the user is logged in, continue with the request to the restricted route
  const idToken = req.body.uid;
  console.log('isAuthenticated2');

  var admin = require('firebase-admin');
  var serviceAccount = require("../../key.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://bootcampproject2-1abd5.firebaseio.com',
    projectId: "bootcampproject2-1abd5",
  });
  admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      const uid = decodedToken.uid;
      console.log(uid, ' this uid is verified by admin sdk')
      // ...
    })
    .catch((error) => {
      // Handle error
    });

  if (req.user) {
    return next();
  }

  req.flash('unAuthenticated', 'Sorry, you must be logged in to see that');
  // If the user isnt' logged in, redirect them to the login page
  return res.redirect("/");
};

// get the uid of user model