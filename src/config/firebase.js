// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyC9TjnA95_UTgmGFJGlLOIb8w0i4oOGiO4",
  authDomain: "todolist-firebase-e1927.firebaseapp.com",
  projectId: "todolist-firebase-e1927",
  storageBucket: "todolist-firebase-e1927.appspot.com",
  messagingSenderId: "62636594838",
  appId: "1:62636594838:web:452fd4879f693bf17114b7",
  measurementId: "G-W2S1RRDJTS"
};


const app = initializeApp(firebaseConfig);
export const Auth = getAuth(app)
export const db = getFirestore(app)