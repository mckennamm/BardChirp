// src/Services/userService.js
import { firestore } from '../config/firebase'; 
import { doc, getDoc, setDoc } from 'firebase/firestore';

// Fetch user data from Firestore
export const getUserData = async (uid) => {
  const docRef = doc(firestore, 'users', uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    throw new Error('User data not found');
  }
};

// Save or update user data to Firestore
export const saveUserData = async (uid, data) => {
  const docRef = doc(firestore, 'users', uid);
  await setDoc(docRef, data, { merge: true }); // merge: true to update only specified fields
};
