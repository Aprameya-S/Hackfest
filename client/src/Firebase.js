import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, initializeAuth, browserSessionPersistence, browserPopupRedirectResolver } from "firebase/auth";

import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCZxxI7UWYibGwhRDUEHZq_DcbHnWL3aW8",
  authDomain: "vitalfund-e6b0a.firebaseapp.com",
  projectId: "vitalfund-e6b0a",
  storageBucket: "vitalfund-e6b0a.appspot.com",
  messagingSenderId: "79687960769",
  appId: "1:79687960769:web:d08d6ab25ce56e4b516c40",
  measurementId: "G-CMXJMKN65V"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

//Google sign-in
export const signInWithGoogle = () => signInWithPopup(auth, provider);


//Google sign-out
export const signOutFromGoogle = () => signOut(auth);

// Firestore initialization
export const db = getFirestore(app)