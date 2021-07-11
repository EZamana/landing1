import firebase from "firebase/app";

import "firebase/analytics";

import "firebase/auth";
import "firebase/firestore";
import 'firebase/storage';

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

let db = firebase.firestore();
let featuredProducts = db.collection('featured')
let productsCollection = db.collection('products')

let storageRef = firebase.storage().ref();

// тест

export function addProduct(category, id, imagePath, cost, title) {
  return productsCollection.doc(id.toString()).set({
    category,
    id,
    imagePath,
    cost,
    title
  })
}

// тест

export function createUser(email, password) {
   return firebase.auth().createUserWithEmailAndPassword(email, password)
}

export function loginUser(email, password) {
  return firebase.auth().signInWithEmailAndPassword(email, password)
}

export function logoutUser() {
  return firebase.auth().signOut()
}

export function getFeaturedProducts() {
  return featuredProducts.get()
}

export function getProductImage(imagePath) {
  return storageRef.child(imagePath).getDownloadURL()
}

export function getLatestForLoadProducts (startAfter, limit) {
  return productsCollection.orderBy('id').startAfter(startAfter).where('category',"==",'latestForLoad').limit(limit).get()
}

export function getLatestProducts() {
  return productsCollection.where('category', "==", 'latest').get()
}