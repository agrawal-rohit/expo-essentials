// TODO: Add your Firebase config here
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import settings from "./settings";

const firebaseConfig = {
  apiKey: settings.apiKey,
  authDomain: settings.authDomain,
  projectId: settings.projectId,
  storageBucket: settings.storageBucket,
  messagingSenderId: settings.messagingSenderId,
  appId: settings.appId,
  measurementId: settings.measurementId,
};

// Initialize Firebase
const Firebase = firebase.initializeApp(firebaseConfig)

export default Firebase