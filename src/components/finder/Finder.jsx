"use client";

import { useState, useEffect } from "react";
import { useMelody } from "./MelodyContext";
import { getAllMusicDocuments } from "../../firebase/firestoreHelpers";
import { db } from "../../firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import styles from "./Finder.module.css";

export default function Finder() {
  const [music, setMusic] = useState([]);
  const { selectedMelody, setSelectedMelody } = useMelody();

  useEffect(() => {
    const fetchData = async () => {
      const musicData = await getAllMusicDocuments();
      setMusic(musicData);
    };
    fetchData();
  }, []);

  const handleSelectMusic = (musicDoc) => {
    setSelectedMelody(musicDoc);
  };

  const handleCreateMelody = async () => {
    try {
      const newMelody = {
        title: "Untitled Melody",
        createdAt: new Date(),
        notes: [],
      };

      await addDoc(collection(db, "music"), newMelody);
      // Re-fetch music after creation
      const updatedMusic = await getAllMusicDocuments();
      setMusic(updatedMusic);
    } catch (error) {
      console.error("Error creating melody:", error);
    }
  };

  return (
    <div className={styles.finderContainer}>
      <div className={styles.windowHeader}>
        <div className={styles.trafficLights}>
          <div className={`${styles.dot} ${styles.red}`}></div>
          <div className={`${styles.dot} ${styles.yellow}`}></div>
          <div className={`${styles.dot} ${styles.green}`}></div>
        </div>
        <div className={styles.windowTitle}>Music</div>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.sidebar}>
          <h3>Favorites</h3>
          <ul>
            <li className={styles.selected}>All Music</li>
            <li>Documents</li>
            <li>Downloads</li>
          </ul>
        </div>

        <div className={styles.main}>
          <div className={styles.header}>
            <div className={styles.headerLeft}>
              <p>Music</p>
            </div>
          </div>
          <div className={styles.files}>
            <ul>
              {music.map((musicDoc) => (
                <li
                  key={musicDoc.id}
                  className={selectedMelody?.id === musicDoc.id ? styles.selected : ''}
                  onClick={() => handleSelectMusic(musicDoc)}
                >
                  {musicDoc.id}
                </li>
              ))}
            </ul>
            <button onClick={handleCreateMelody} className={styles.newMelodyButton}>
              + New Melody
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

