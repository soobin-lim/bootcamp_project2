// This is middleware for restrictng routes a user is not allowed to visit if not logged in
module.exports = function(uid) {
  // If the user is logged in, continue with the request to the restricted route
  const idToken = uid;
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
      return true;
      // ...
    })
    .catch((error) => {
      // Handle error
      return false;
    });
  return false;  
};