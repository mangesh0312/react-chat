// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyDy73bsAeU1viST71kUHLG7ckHp1bRZWuo",
  authDomain: "chat-efc7c.firebaseapp.com",
  projectId: "chat-efc7c",
  storageBucket: "chat-efc7c.appspot.com",
  messagingSenderId: "540802443688",
  appId: "1:540802443688:web:56d7030a71be02260d159d",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app);
