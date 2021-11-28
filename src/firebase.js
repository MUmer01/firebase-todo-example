import firebase from "firebase/compat/app";
// import useEmulator
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/functions";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const functions = firebase.functions();

// auth.useEmulator("http://localhost:9099");
// firestore.useEmulator("localhost", 8080);
// functions.useEmulator("localhost", 5001);

export default firebase;
