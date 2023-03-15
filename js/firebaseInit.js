import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
// import { getFirestore,collection } from "firebase/firestore/lite";
import {
  getFirestore,
  collection,
} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js";
// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyBdFMZoNwEWNqCOfUezoSB-TewpOBUfX98",
    authDomain: "mgoalindo---app.firebaseapp.com",
    databaseURL: "https://mgoalindo---app-default-rtdb.firebaseio.com",
    projectId: "mgoalindo---app",
    storageBucket: "mgoalindo---app.appspot.com",
    messagingSenderId: "909481590933",
    appId: "1:909481590933:web:a0626d75765bd850a5db9c",
    measurementId: "G-RLCM7JVYFY"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const col = "kupon-stratch";
export const db = getFirestore(firebaseApp);
export const leaderboard = collection(db, col);
