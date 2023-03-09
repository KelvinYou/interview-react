// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

import { getMessaging } from "firebase/messaging";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs
} from 'firebase/firestore';

import {
  getAuth, 
  signInWithRedirect, 
  signInWithPopup, 
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5G2DXyYMPK4RQCfvB2WbqT7dspNMGsp0",
  authDomain: "interview-react-401a9.firebaseapp.com",
  projectId: "interview-react-401a9",
  storageBucket: "interview-react-401a9.appspot.com",
  messagingSenderId: "172398083311",
  appId: "1:172398083311:web:58534b1cecf2537fa4ef1a",
  measurementId: "G-NDGRF0X4QW"
};

// Initialize Firebase
export const Firebase = initializeApp(firebaseConfig);
export const analytics = getAnalytics(Firebase);
export const auth = getAuth();
export const Providers = { google: new GoogleAuthProvider() };
export const db = getFirestore(Firebase);

const messaging = getMessaging(Firebase);
