
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBjbU1U_lMbhvxJkMOiTCTDfp1nN-S531c",
  authDomain: "todo-listapp-f8a80.firebaseapp.com",
  projectId: "todo-listapp-f8a80",
  storageBucket: "todo-listapp-f8a80.appspot.com",
  messagingSenderId: "687721834426",
  appId: "1:687721834426:web:7f90babd4f8433f05e9f83"
};


const app = initializeApp(firebaseConfig);
export const db= getFirestore(app);