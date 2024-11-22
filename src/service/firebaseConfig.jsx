import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAAGG_g18uuo7toZ91LyLEK-cbAY5s6Atg",
  authDomain: "ai-trip-planner-978b6.firebaseapp.com",
  projectId: "ai-trip-planner-978b6",
  storageBucket: "ai-trip-planner-978b6.firebasestorage.app",
  messagingSenderId: "929187947676",
  appId: "1:929187947676:web:beac68db0164cb4b1b3959",
  measurementId: "G-NY3KDMKJJ2",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
