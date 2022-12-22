import "./App.css";
import { RecordView } from "./RecordView";
import Home from "./components/Home";
import Speak from "./components/Speak";
import { Route, Routes } from "react-router-dom";
import Listen from "./components/Listen";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/speak" element={<Speak />} />
        <Route path="/listen" element={<Listen />} />
      </Routes>
    </div>
  );
}

export default App;
