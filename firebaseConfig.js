// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_reB3Tq5sXksspO1rTXkZcCUxFSYUEb4",
  authDomain: "project1-20231.firebaseapp.com",
  projectId: "project1-20231",
  storageBucket: "project1-20231.appspot.com",
  messagingSenderId: "268085608311",
  appId: "1:268085608311:web:cf04f24486299c7a492b72",
  measurementId: "G-7FKPNZ1LPL"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);