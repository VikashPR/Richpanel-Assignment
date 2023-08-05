import firebase from "firebase";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDHcxI8y8SsIU3_SlHeaTVBUAlXFA3ngyU",
  authDomain: "richpanel-assignment-de3f0.firebaseapp.com",
  projectId: "richpanel-assignment-de3f0",
  storageBucket: "richpanel-assignment-de3f0.appspot.com",
  messagingSenderId: "983638600847",
  appId: "1:983638600847:web:9af2607021bcc8f9f094fa",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);

export { db, auth };
