import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC_z3s-47x_NaAXwLEeQ-JGfMKVVKNmvwc",
  authDomain: "pixel-app-b4761.firebaseapp.com",
  projectId: "pixel-app-b4761",
  storageBucket: "pixel-app-b4761.firebasestorage.app",
  messagingSenderId: "557172219458",
  appId: "1:557172219458:web:d2dc2fb3f1c91a564157db"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);