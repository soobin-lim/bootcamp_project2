var admin = require('firebase-admin');
const { stringify } = require('qs');
var serviceAccount = require("../../key.json");
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://bootcampproject2-1abd5.firebaseio.com',
    projectId: "bootcampproject2-1abd5",
  });
}

const checkIfAuthenticated = (req, res, next) => {
  const uid = req.app.locals.uid;
  req.app.locals.username='Anonymous';
  try {
    admin
      .auth()
      .getUser(uid)
      .then((userRecord) => {
        // See the UserRecord reference doc for the contents of userRecord.
        // console.log(JSON.stringify(userRecord));
        const userdata = JSON.stringify(userRecord);
        
        console.log(`Successfully fetched user data: ${userdata}`);
      })
      .catch((error) => {
        console.log('Error fetching user data:', error);
        res.status(401).send({error: 'You are not authorized to make this request'});
      });
    return next();
  } catch (e) {
    return res
      .status(401)
      .send({ error: 'You are not authorized to make this request' });
  };
};

module.exports = checkIfAuthenticated;