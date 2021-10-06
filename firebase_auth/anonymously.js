const signinAnonymously = () => {
  // Import the functions you need from the SDKs you need
  // import { initializeApp } from "/firebase/app";

  import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
  import { getAuth, onAuthStateChanged, signInAnonymously } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCQzqfCjA8dsgDq8vy2n1tW392HBEwSFSY",
    authDomain: "bootcampproject2-1abd5.firebaseapp.com",
    projectId: "bootcampproject2-1abd5",
    storageBucket: "bootcampproject2-1abd5.appspot.com",
    messagingSenderId: "672212372076",
    appId: "1:672212372076:web:dee6ed4399134dec732649"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // import { getAuth, signInAnonymously } from "firebase/auth";

  const auth = getAuth(app);
  console.log(auth);
  signInAnonymously(auth)
    .then(() => {
      // Signed in..
      console.log('Signed in Anonymously');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      // ...
    });

  // import { getAuth, onAuthStateChanged } from "firebase/auth";
  // import { onAuthStateChanged } from "firebase/auth";


  // const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      console.log(uid);
      // ...
    } else {
      // User is signed out
      // ...
      console.log('User is signed out');
    }
  });
}
module.exports = signinAnonymously;