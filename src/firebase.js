import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDcVsPgkKG1k8I6CKQnHlsIPzU2EoDcvM4",
    authDomain: "carro-compra-fb.firebaseapp.com",
    projectId: "carro-compra-fb",
    storageBucket: "carro-compra-fb.firebasestorage.app",
    messagingSenderId: "255664318264",
    appId: "1:255664318264:web:2f12cdb6b66667172e43cd"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
