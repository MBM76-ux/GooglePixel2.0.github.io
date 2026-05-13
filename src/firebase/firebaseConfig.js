// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwl7nNoKSIMMxwnMfn7BxnFBKjLW58Zr0",
  authDomain: "pixel-eee3d.firebaseapp.com",
  projectId: "pixel-eee3d",
  storageBucket: "pixel-eee3d.firebasestorage.app",
  messagingSenderId: "307597355044",
  appId: "1:307597355044:web:3db41c22459b67840010b1",
  measurementId: "G-MFL48L7RXS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);