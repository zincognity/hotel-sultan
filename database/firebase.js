import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updatePassword } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js';
import { getFirestore, collection, getDocs, setDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js"
const firebaseConfig = {
    apiKey: "AIzaSyAbiSUArSBif7ff4VUIjdCkUL0_v3nk0mc",
    authDomain: "hotel-sultan.firebaseapp.com",
    projectId: "hotel-sultan",
    storageBucket: "hotel-sultan.appspot.com",
    messagingSenderId: "527729406278",
    appId: "1:527729406278:web:473b318060a203fbc7b547",
    measurementId: "G-4PN3NKENS1"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const fs = getFirestore(app);

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, fs, collection, getDocs, setDoc, doc, getDoc, updatePassword };