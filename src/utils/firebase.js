// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDuGEmryN04fQh7CQZBQqV_X0D_T2OpLVA",
  authDomain: "netflixgpt-7345a.firebaseapp.com",
  projectId: "netflixgpt-7345a",
  storageBucket: "netflixgpt-7345a.appspot.com",
  messagingSenderId: "39455747304",
  appId: "1:39455747304:web:d105337988e19ba131ad5d",
  measurementId: "G-Z6YJY113NW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();