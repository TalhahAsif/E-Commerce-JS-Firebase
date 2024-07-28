import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  getDocs,
  deleteDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyB1vHKXx2fq4_n3SovJ3lN4fUmu0MTcezQ",
  authDomain: "my-1001-project.firebaseapp.com",
  projectId: "my-1001-project",
  storageBucket: "my-1001-project.appspot.com",
  messagingSenderId: "805674283226",
  appId: "1:805674283226:web:50a6b83d0d5ece8bb1f5e3",
  measurementId: "G-SXZTJF026S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export {
  app,
  db,
  auth,
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  collection,
  addDoc,
  setDoc,
  getDocs,
  deleteDoc,
  doc,
};
