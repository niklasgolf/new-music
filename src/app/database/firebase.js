// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBfj7VvFzZR7UuBjupzBJ1NuykeDd0HCL4",
  authDomain: "new-music-75ec8.firebaseapp.com",
  projectId: "new-music-75ec8",
  storageBucket: "new-music-75ec8.appspot.com", // Corrected domain
  messagingSenderId: "31905147728",
  appId: "1:31905147728:web:3b71fcb47ab1dcec285a55",
  databaseURL: "https://new-music-75ec8-default-rtdb.europe-west1.firebasedatabase.app" // Manually added, assuming Europe region
};

// // ✅ Your Firebase config from the new web app
// const firebaseConfig = {
//   apiKey: "AIzaSyDOnbXJ5t_UmSLYz1ot6sOuaZtlESjf1i8",
//   authDomain: "unique-postcard.firebaseapp.com",
//   projectId: "unique-postcard",
//   storageBucket: "unique-postcard.appspot.com",
//   messagingSenderId: "261195944580",
//   appId: "1:261195944580:web:3c00dbbe52572a40aca8d1",
//   measurementId: "G-XZR2P7994X"
// };

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Export Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
