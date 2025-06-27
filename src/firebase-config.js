// src/firebase-config.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAjl1LWYgNAqe4qPR8vOZRoMRlSHB2wDDs",
  authDomain: "student-mental-health-chatbot.firebaseapp.com",
  projectId: "student-mental-health-chatbot",
  storageBucket: "student-mental-health-chatbot.firebasestorage.app",
  messagingSenderId: "568397964727",
  appId: "1:568397964727:web:4e4adde74ba65f51cb3432",
  measurementId: "G-4SMN4BTFRS",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const signInAnon = () =>
  signInAnonymously(auth).catch((error) => {
    console.error("Anonymous sign-in failed:", error);
  });

export { db, auth, signInAnon, onAuthStateChanged };
