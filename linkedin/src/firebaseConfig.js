// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPWaqsX-HZf6jHJNeX_hghqH6VlVa9bQw",
  authDomain: "linked-in-clone-eb01b.firebaseapp.com",
  projectId: "linked-in-clone-eb01b",
  storageBucket: "linked-in-clone-eb01b.appspot.com",
  messagingSenderId: "57430017810",
  appId: "1:57430017810:web:d1129dece2ae92cbce55cb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
export { app, auth, firestore, storage };
