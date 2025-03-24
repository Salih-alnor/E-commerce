import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBCUm49WDbn0QP0bxGHeE4W4rp7h7Mju7o",
    authDomain: "fir-toturial-77eeb.firebaseapp.com",
    projectId: "fir-toturial-77eeb",
    storageBucket: "fir-toturial-77eeb.firebasestorage.app",
    messagingSenderId: "651781481837",
    appId: "1:651781481837:web:9ab9ff1e60d29ddeb96664",
    measurementId: "G-QWBNM546KG"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);