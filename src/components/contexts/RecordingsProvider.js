import React, { createContext, useEffect, useState } from "react";

export const RecordingContext = createContext();

const RecordingsProvider = ({ children }) => {
  const initialQuotes = [
    {
      id: 1,
      text: "Thrinaxodon has been dated between the Permian-Triassic boundary and the mid-Triassic.",
    },
    {
      id: 2,
      text: "North Freedom was named from the American ideal of freedom.",
    },
    {
      id: 3,
      text: "For much of this period he recorded and toured with Eddie Kirkland.",
    },
    {
      id: 4,
      text: "Blythe was buried at Rose Hill Cemetery in Hope, Hempstead County, Arkansas.",
    },
    {
      id: 5,
      text: "Further, klezmorim were usually itinerant musicians, who moved from town to town for work.",
    },
    {
      id: 6,
      text: "Further, klezmorim were usually itinerant musicians, who moved from town to town for work.",
    },
    {
      id: 7,
      text: "Further, klezmorim were usually itinerant musicians, who moved from town to town for work.",
    },
    {
      id: 8,
      text: "Further, klezmorim were usually itinerant musicians, who moved from town to town for work.",
    },
  ];

  const [recordings, setRecordings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [quotes, setQuotes] = useState(initialQuotes);

  const contextInfo = {
    recordings,
    setRecordings,
    loading,
    setLoading,
    quotes,
  };
  return (
    <RecordingContext.Provider value={contextInfo}>
      {children}
    </RecordingContext.Provider>
  );
};

export default RecordingsProvider;
