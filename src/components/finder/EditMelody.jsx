"use client";

import { useMelody } from "./MelodyContext";
import { replaceMusicDocument } from "../../firebase/firestoreHelpers";
import styles from "./EditMelody.module.css";

export default function EditMelody() {
  const { selectedMelody, setSelectedMelody } = useMelody();

  const handleDelete = async (fieldKeyToDelete) => {
    if (!selectedMelody || !window.confirm(`Are you sure you want to delete field ${fieldKeyToDelete}?`)) {
      return;
    }

    const currentData = { ...selectedMelody };
    delete currentData.id;

    delete currentData[fieldKeyToDelete];

    const remainingKeys = Object.keys(currentData).sort((a, b) => parseInt(a) - parseInt(b));
    
    const newData = {};
    let newIndex = 100001;

    for (const oldKey of remainingKeys) {
        newData[newIndex.toString()] = currentData[oldKey];
        newIndex++;
    }

    try {
      await replaceMusicDocument(selectedMelody.id, newData);

      setSelectedMelody({ id: selectedMelody.id, ...newData });

      alert(`Field ${fieldKeyToDelete} deleted and document re-indexed successfully.`);
    } catch (error) {
      console.error("Error updating document: ", error);
      alert("Failed to update the melody. See console for details.");
    }
  };

  const fields = selectedMelody
    ? Object.keys(selectedMelody).filter(key => key !== 'id').sort((a, b) => parseInt(a) - parseInt(b))
    : [];

  return (
    <div className={styles.editMelodyContainer}>
      <div className={styles.windowHeader}>
        <div className={styles.trafficLights}>
          <div className={`${styles.dot} ${styles.red}`}></div>
          <div className={`${styles.dot} ${styles.yellow}`}></div>
          <div className={`${styles.dot} ${styles.green}`}></div>
        </div>
        <div className={styles.windowTitle}>Edit Melody</div>
      </div>

      <div className={styles.mainContent}>
        {selectedMelody ? (
          <div className={styles.fieldsList}>
            <h4>{selectedMelody.id}</h4>
            {fields.map((key) => (
              <div key={key} className={styles.fieldItem}>
                <div className={styles.fieldContent}>
                  <strong>{key}:</strong>
                  <pre>{JSON.stringify(selectedMelody[key], null, 2)}</pre>
                </div>
                <button onClick={() => handleDelete(key)} className={styles.deleteButton}>
                  &times;
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.noMelodySelected}>
            <p>No melody selected</p>
          </div>
        )}
      </div>
    </div>
  );
}
