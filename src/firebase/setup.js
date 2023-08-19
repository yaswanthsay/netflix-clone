import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyD4moxpWEJA6SZw3ftDkbjRabDGX6ZvvhE",
  authDomain: "netflix-clone2-c5334.firebaseapp.com",
  projectId: "netflix-clone2-c5334",
  storageBucket: "netflix-clone2-c5334.appspot.com",
  messagingSenderId: "617299751050",
  appId: "1:617299751050:web:2fc9f3c09e8b0d5611fd73"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleAuth = new GoogleAuthProvider()
export const database = getFirestore(app)