// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCC8MrvrBEamh_5r1zGgdaaJTgkqN8TgBo",
  authDomain: "musicapp-2e1b7.firebaseapp.com",
  projectId: "musicapp-2e1b7",
  storageBucket: "musicapp-2e1b7.appspot.com",
  messagingSenderId: "1046299945642",
  appId: "1:1046299945642:web:5e6467c84181c028a6bed3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
