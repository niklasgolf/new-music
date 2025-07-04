"use client";

import { createContext, useContext, useState } from "react";

const MelodyContext = createContext();

export function MelodyProvider({ children }) {
  const [selectedMelody, setSelectedMelody] = useState(null);

  return (
    <MelodyContext.Provider value={{ selectedMelody, setSelectedMelody }}>
      {children}
    </MelodyContext.Provider>
  );
}

export function useMelody() {
  return useContext(MelodyContext);
}
