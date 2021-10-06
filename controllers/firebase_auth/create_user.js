module.exports = () => {
  console.log('created user.js file starting');

  var admin = require('firebase-admin');
  var serviceAccount = require("../../key.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://bootcampproject2-1abd5.firebaseio.com',
    projectId: "bootcampproject2-1abd5",
  });

  admin
    .auth()
    .createUser({
      email: 'user@example.com',
      emailVerified: false,
      phoneNumber: '+11234567890',
      password: 'secretPassword',
      displayName: 'John Doe',
      photoURL: 'http://www.example.com/12345678/photo.png',
      disabled: false,
    })
    .then((userRecord) => {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log('Successfully created new user:', userRecord.uid);
    })
    .catch((error) => {
      console.log('Error creating new user:', error);
    });

};