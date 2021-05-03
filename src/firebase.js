import firebase from "firebase/app";

import "firebase/analytics";

import "firebase/auth";
import "firebase/firestore";

let firebaseConfig = {
  apiKey: "AIzaSyB3x79gKP8eZOq0w1nEnVsTmpTgGv-ApFE",
  authDomain: "landing111-93f75.firebaseapp.com",
  projectId: "landing111-93f75",
  storageBucket: "landing111-93f75.appspot.com",
  messagingSenderId: "598546710693",
  appId: "1:598546710693:web:fa5be11a882fd7aec90d4c",
  measurementId: "G-PBPC0Y9FGP"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();


export default function createUser(email, password) {
   return firebase.auth().createUserWithEmailAndPassword(email, password)
}