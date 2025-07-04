"use client";

import { useEffect, useState } from "react";
import { getMusicDocument, saveMusicDocument, deleteMusicDocument } from "./firestoreHelpers";
import styles from "./Database.module.css";

export default function Database() {
  const [musicData, setMusicData] = useState(null);

  useEffect(() => {
    async function fetchMusicData() {
      const data = await getMusicDocument("shortmusic");
      if (data) {
        setMusicData(data);
      }
    }
    fetchMusicData();
  }, []);

  const [newInstruction, setNewInstruction] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [targetDocumentId, setTargetDocumentId] = useState("shortmusic");
  const [jsonFiles, setJsonFiles] = useState([]);

  useEffect(() => {
    // In a real app, you'd fetch this list from a server or hardcode it
    setJsonFiles(["short-music.json"]);
  }, []);

  const handleLoadJsonFile = async () => {
    if (!selectedFile) {
      alert("Please select a JSON file.");
      return;
    }
    if (!targetDocumentId) {
      alert("Please enter a target music document ID.");
      return;
    }

    try {
      const response = await fetch(`/${selectedFile}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const fileContent = await response.json();

      if (!Array.isArray(fileContent)) {
        alert("JSON file content must be a JSON array of objects.");
        return;
      }

      for (const instruction of fileContent) {
        await saveMusicDocument(targetDocumentId, instruction);
      }

      alert(`Successfully loaded ${fileContent.length} instructions from ${selectedFile} to ${targetDocumentId}!`);
      // Refresh the displayed music data if it's the current document
      if (targetDocumentId === musicData?.id) {
        const updatedData = await getMusicDocument(targetDocumentId);
        if (updatedData) {
          setMusicData(updatedData);
        }
      }
    } catch (error) {
      console.error("Error loading JSON file:", error);
      alert("Error loading JSON file: " + error.message + ". Check console for details.");
    }
  };

  const handleAddInstruction = async () => {
    if (!newInstruction) {
      alert("Please enter instruction data.");
      return;
    }

    let instructionsToSave = [];
    try {
      instructionsToSave = JSON.parse(newInstruction);
      if (!Array.isArray(instructionsToSave)) {
        instructionsToSave = [instructionsToSave];
      }
    } catch (error) {
      alert("Invalid JSON format. Please ensure the input is a valid JSON array or a single JSON object." + error.message);
      return;
    }

    try {
      for (const instruction of instructionsToSave) {
        await saveMusicDocument("shortmusic", instruction);
      }
      alert(`${instructionsToSave.length} instruction(s) added successfully!`);
      setNewInstruction("");
      // Refresh the displayed music data
      const updatedData = await getMusicDocument("shortmusic");
      if (updatedData) {
        setMusicData(updatedData);
      }
    } catch (error) {
      console.error("Error adding instruction:", error);
      alert("Error adding instruction: " + error.message + ". Check console for details.");
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(`Delete document '${id}'?`);
    if (!confirmed) return;

    try {
      await deleteMusicDocument(id);
      alert("Document deleted successfully!");
      setMusicData(null); // Clear displayed data after deletion
    } catch (err) {
      alert("Error deleting document: " + err.message);
    }
  };

  const handleEdit = (data) => {
    // For editing, we'll pre-populate the instruction field with the entire document
    // User can then modify and save, which will overwrite the document with merge:true
    // Exclude the 'id' field when stringifying for editing
    const dataWithoutId = { ...data };
    delete dataWithoutId.id;
    setNewInstruction(JSON.stringify(dataWithoutId, null, 2));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={styles.container}>
      {musicData && (
        <div className={styles.musicData}>
          <h3>Document: {musicData.id}</h3>
          <div className={styles.instructionsList}>
            {Object.keys(musicData).filter(key => key !== 'id').sort((a, b) => parseInt(a) - parseInt(b)).map(key => (
              <div key={key} className={styles.instructionItem}>
                <strong>{key}:</strong> <pre>{JSON.stringify(musicData[key], null, 2)}</pre>
              </div>
            ))}
          </div>
          <div className={styles.buttonGroup}>
            <button
              onClick={() => handleDelete(musicData.id)}
              className={styles.buttonDelete}
            >
              Delete Document
            </button>
            <button
              onClick={() => handleEdit(musicData)}
              className={styles.buttonEdit}
            >
              Edit Document
            </button>
          </div>
        </div>
      )}

      <div className={styles.addData}>
        <h3>Add New Instruction(s)</h3>
        <textarea
          placeholder='Enter JSON instruction(s) (e.g., {"name": "rita_not", "data": [10, 20]}), or multiple separated by commas, or as a JSON array.'
          value={newInstruction}
          onChange={(e) => setNewInstruction(e.target.value)}
          rows={10}
          className={styles.textarea}
        ></textarea>
        <button onClick={handleAddInstruction} className={styles.button}>
          Add Instruction(s)
        </button>
      </div>

      <div className={styles.addData}>
        <h3>Load JSON File to Music Document</h3>
        <select
          value={selectedFile}
          onChange={(e) => setSelectedFile(e.target.value)}
          className={styles.input}
        >
          <option value="">Select a file</option>
          {jsonFiles.map((file) => (
            <option key={file} value={file}>
              {file}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Enter Music Document ID (e.g., shortmusic)"
          value={targetDocumentId}
          onChange={(e) => setTargetDocumentId(e.target.value)}
          className={styles.input}
        />
        <button onClick={handleLoadJsonFile} className={styles.button}>
          Load File to Document
        </button>
      </div>
    </div>
  );
}
