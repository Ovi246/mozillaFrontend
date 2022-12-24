import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import RecordingsProvider from "./components/contexts/RecordingsProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <RecordingsProvider>
      <App />
    </RecordingsProvider>
  </BrowserRouter>
);
