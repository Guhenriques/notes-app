import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

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
  
    // Cleanup function that runs after the component is unmounted or before the next effect runs
    return () => {
      console.log("Before update:", localStorage.getItem("Notes"));
    };
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
            {/*<Route path="/edit-note/:id" element={<EditNote />} /> */}
            
          </Routes>
        </BrowserRouter>
      </main>
    </div>
  );
}
export default App;