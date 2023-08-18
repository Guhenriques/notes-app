import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import CreateNote from "./components/NoteComponents/CreateNote";
import EditNote from "./components/NoteComponents/EditNote";
import Header from "./components/NoteComponents/Header";
import Notes from "./components/NoteComponents/Notes";

import "./components/css/App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const handleDarkModeToggle = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("Notes"));
    if (data && data.length > 0) {
      setNotes(data);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("Notes", JSON.stringify(notes));
  }, [notes]);


  return (
    <div className={darkMode ? "dark-mode" : "white-mode"}>
      <Header onDarkModeToggle={handleDarkModeToggle} />
      <main id="app">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Notes notes={notes} setNotes={setNotes} />} />
            {/*<Route path="/create-note" element={<CreateNote />} /> */}
            <Route path="/edit-note/:id" element={<EditNote />} />
          </Routes>
        </BrowserRouter>
      </main>
    </div>
  );
}
export default App;