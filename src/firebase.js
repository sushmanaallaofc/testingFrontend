import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAoZqQInrbaKZWeCBLYnGeNxKvwHE0DRko",
    authDomain: "auth-19af9.firebaseapp.com",
    projectId: "auth-19af9",
    storageBucket: "auth-19af9.appspot.com",
    messagingSenderId: "876056439703",
    appId: "1:876056439703:web:42a54ed45c972b17fa32d2",
    measurementId: "G-2CRW20N5LN"
  };
  

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();