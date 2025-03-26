import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDzMmlHI8ZUeJTsQ8zn-2T0uWEe-Yti7ug",
  authDomain: "bardchirp-e23fe.firebaseapp.com",
  projectId: "bardchirp-e23fe",
  storageBucket: "bardchirp-e23fe.firebasestorage.app",
  messagingSenderId: "543640899775",
  appId: "1:543640899775:web:55c988887de4d22f10f60a",
  measurementId: "G-5CTLLGX21Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firestore and Auth instances
export const db = getFirestore(app);
export const firestore = getFirestore(app); // For Firestore operations
export const auth = getAuth(app);


