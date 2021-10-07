var admin = require('firebase-admin');
var serviceAccount = require("../../key.json");
if(!admin.apps.length){
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://bootcampproject2-1abd5.firebaseio.com',
  projectId: "bootcampproject2-1abd5",
});
}

const getAuthToken = (req, res, next) => {
  console.log(req.headers);
  console.log(req.headers.authorization);
  console.log(req.authToken);
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    req.authToken = req.headers.authorization.split(' ')[1];
  } else {
    req.authToken = null;
  }
  next();
};


const checkIfAuthenticated = (req, res, next) => {
 getAuthToken(req, res, async () => {
    try {
      const { authToken } = req;
      console.log(authToken);
      const userInfo = await admin
        .auth()
        .verifyIdToken(authToken);
      console.log(userInfo);
      req.authId = userInfo.uid;
      return next();
    } catch (e) {
      return res
        .status(401)
        .send({ error: 'You are not authorized to make this request' });
    }
  });
};

module.exports = checkIfAuthenticated;