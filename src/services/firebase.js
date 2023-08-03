// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCNYMkzohGK0-2ihb5pud7yHJtlNv9eWKQ",
    authDomain: "callebach-25acb.firebaseapp.com",
    projectId: "callebach-25acb",
    storageBucket: "callebach-25acb.appspot.com",
    messagingSenderId: "949515709367",
    appId: "1:949515709367:web:2cb95d8e3c99ccac6d9632",
    measurementId: "G-ZF4C3ZCEK9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;