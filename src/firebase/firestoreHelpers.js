import { db } from "./firebaseConfig";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  orderBy,
  query,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";

// 💾 Spara vykort: postcards/{userEmail}/postcards/{1,2,...}
export async function savePostcardForUser(userEmail, postcardData) {
  const userDocRef = doc(db, "postcards", userEmail);
  const userPostcardsCollection = collection(userDocRef, "postcards");

  const snapshot = await getDocs(userPostcardsCollection);
  const existingCount = snapshot.size;

  if (existingCount >= 5) {
    throw new Error("You have reached the maximum of 5 postcards.");
  }

  const newId = (existingCount + 1).toString();
  const newPostcardRef = doc(userPostcardsCollection, newId);

  await setDoc(newPostcardRef, {
    ...postcardData,
    createdAt: new Date(),
  });
}

// 🔄 Hämta vykort from postcards/{userEmail}/postcards
export async function getUserPostcards(userEmail) {
  const userPostcardsCollection = collection(
    db,
    "postcards",
    userEmail,
    "postcards"
  );
  const snapshot = await getDocs(userPostcardsCollection);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

// ❌ Ta bort vykort från postcards/{userEmail}/postcards/{id}
export async function deletePostcard(userEmail, id) {
  const ref = doc(db, "postcards", userEmail, "postcards", id);
  return await deleteDoc(ref);
}

// 🎵 Spara musikdokument till 'music/{documentId}'
export async function saveMusicDocument(documentId, instructionData) {
  const docRef = doc(db, "music", documentId);
  const docSnap = await getDoc(docRef);

  let nextId = 100001;
  if (docSnap.exists()) {
    const existingData = docSnap.data();
    let maxId = 0;
    for (const key in existingData) {
      const numKey = parseInt(key, 10);
      if (!isNaN(numKey) && numKey >= 100001) {
        if (numKey > maxId) {
          maxId = numKey;
        }
      }
    }
    if (maxId > 0) {
      nextId = maxId + 1;
    }
  }

  const newFieldKey = String(nextId);

  return await setDoc(docRef, { [newFieldKey]: instructionData }, { merge: true });
}

// ❌ Ta bort musikdokument från 'music/{documentId}'
export async function deleteMusicDocument(documentId) {
  const docRef = doc(db, "music", documentId);
  return await deleteDoc(docRef);
}

// 🎵 Hämta musikdokument från 'music/{documentId}'
export async function getMusicDocument(documentId) {
  const docRef = doc(db, "music", documentId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    if (Object.keys(data).length === 0) {
      return null;
    }
    return { id: docSnap.id, ...data };
  } else {
    console.log("No such document!");
    return null;
  }
}

// 🔄 Hämta alla musikdokument från 'music'
export async function getAllMusicDocuments() {
  const musicCollection = collection(db, "music");
  const snapshot = await getDocs(musicCollection);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

// 🎵 Ersätt musikdokument i 'music/{documentId}'
export async function replaceMusicDocument(documentId, newData) {
  const docRef = doc(db, "music", documentId);
  return await setDoc(docRef, newData);
}
