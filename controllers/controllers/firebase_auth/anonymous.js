module.exports = () => {
  console.log('anonymous auth starting');

  var admin = require('firebase-admin');
  var serviceAccount = require("../../../key.json");

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: 'https://bootcampproject2-1abd5.firebaseio.com',
      projectId: "bootcampproject2-1abd5",
    });
  };

  return admin
    .auth()
    .createUser({})
    .then((userRecord) => {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log('Successfully created anonymous user uid:', userRecord.uid);
      return userRecord.uid;
    })
    .catch((error) => {
      console.log('Error creating new user:', error);
      return error;
    });
};

