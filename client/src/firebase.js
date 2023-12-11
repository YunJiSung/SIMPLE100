import firebase from "firebase/compat/app";
import "firebase/compat/auth";


const firebaseConfig = {
    apiKey: "AIzaSyCOeqvPr4djhxMPzVfD3zAQahVgKJhDDCQ",
    authDomain: "simple100-19a84.firebaseapp.com",
    projectId: "simple100-19a84",
    storageBucket: "simple100-19a84.appspot.com",
    messagingSenderId: "796490307667",
    appId: "1:796490307667:web:00b83cb57ae0b66d6c8ea6",
    measurementId: "G-L3KTKVGP8D"
};


firebase.initializeApp(firebaseConfig);

export default firebase;
