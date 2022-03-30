// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNT-brbQnb0uXL2KdUgftuZ3m5Qg70Skw",
  authDomain: "d-animals-bsc.firebaseapp.com",
  projectId: "d-animals-bsc",
  storageBucket: "d-animals-bsc.appspot.com",
  messagingSenderId: "1097767743950",
  appId: "1:1097767743950:web:e78beb83e0863fd16ebb9f",
  measurementId: "G-9T2D2BYFMB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
