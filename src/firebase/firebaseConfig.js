import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCImKr5KtiHNArH313utLt2NJohFV2y_d8",
  authDomain: "pixel-e29cf.firebaseapp.com",
  projectId: "pixel-e29cf",
  storageBucket: "pixel-e29cf.firebasestorage.app",
  messagingSenderId: "356685627508",
  appId: "1:356685627508:web:17b3a7a143afd74c1d5121"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();