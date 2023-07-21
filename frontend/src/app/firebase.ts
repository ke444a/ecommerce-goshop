import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAXicZCsAOaPd_NBmqYeEPInynFJn7w2gQ",
    authDomain: "ecommerce-mern-1.firebaseapp.com",
    projectId: "ecommerce-mern-1",
    storageBucket: "ecommerce-mern-1.appspot.com",
    messagingSenderId: "210524482098",
    appId: "1:210524482098:web:907b6bb35716cc6607ea2b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
