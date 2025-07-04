// src/firebase/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL
};


// const firebaseConfig = {
//     apiKey: "AIzaSyBfj7VvFzZR7UuBjupzBJ1NuykeDd0HCL4",
//     authDomain: "new-music-75ec8.firebaseapp.com",
//     projectId: "new-music-75ec8",
//     storageBucket: "new-music-75ec8.appspot.com", // Corrected domain
//     messagingSenderId: "31905147728",
//     appId: "1:31905147728:web:3b71fcb47ab1dcec285a55",
//     databaseURL: "https://new-music-75ec8-default-rtdb.europe-west1.firebasedatabase.app" // Manually added, assuming Europe region
// };

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
