import React, { createContext, useEffect, useState } from "react";

export const RecordingContext = createContext();

const RecordingsProvider = ({ children }) => {
  const [recordings, setRecordings] = useState([]);
  const [loading, setLoading] = useState(false);

  const contextInfo = {
    recordings,
    setRecordings,
    loading,
    setLoading,
  };
  return (
    <RecordingContext.Provider value={contextInfo}>
      {children}
    </RecordingContext.Provider>
  );
};

export default RecordingsProvider;
