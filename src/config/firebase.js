import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';



const firebaseConfig = {
    apiKey: "AIzaSyDzMmlHI8ZUeJTsQ8zn-2T0uWEe-Yti7ug",
    authDomain: "bardchirp-e23fe.firebaseapp.com",
    projectId: "bardchirp-e23fe",
    storageBucket: "bardchirp-e23fe.firebasestorage.app",
    messagingSenderId: "543640899775",
    appId: "1:543640899775:web:55c988887de4d22f10f60a",
    measurementId: "G-5CTLLGX21Y"
  };

    const firebaseApp = firebase.initializeApp(firebaseConfig);
    const db = firebaseApp.firestore();
    const auth = firebase.auth();


    export { db, auth };