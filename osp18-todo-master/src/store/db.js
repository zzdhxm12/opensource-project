import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAhmahkD6LPTylIozDimN4jaIIK7t2PTCc",
    authDomain: "osp18-sun-1.firebaseapp.com",
    databaseURL: "https://osp18-sun-1.firebaseio.com",
    projectId: "osp18-sun-1",
    storageBucket: "osp18-sun-1.appspot.com",
    messagingSenderId: "417836785049"
  };
  firebase.initializeApp(config);

const db = firebase.firestore();
db.settings({
    timestampsInSnapshots: true
});
const dbRef = db.collection('todos');
const authRef = firebase.auth();
authRef.setPersistence(firebase.auth.Auth.Persistence.SESSION);
//구글 로그인
const gProvider = new firebase.auth.GoogleAuthProvider();
//페이스북 로그인
const fProvider = new firebase.auth.FacebookAuthProvider();

//기트헙 로그인
const giProvider = new firebase.auth.GithubAuthProvider();
giProvider.addScope('repo');
giProvider.setCustomParameters({
  'allow_signup': 'false'
});

export {authRef, dbRef, gProvider, fProvider, giProvider};
