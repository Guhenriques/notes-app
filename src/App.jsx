import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Header from "./components/NoteComponents/Header";
import Notes from "./components/NoteComponents/Notes";

import "./components/css/App.css";

function App() {
  // store current mode in localStorage
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  // update mode initial state based on localStorage
  useEffect(() =>{
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode) {
      setDarkMode(JSON.parse(savedMode));
    }
  }, []);

  // update mode state whenever user switch between modes
  const handleDarkModeToggle = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", JSON.stringify(newMode))
      return newMode;
    })
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

  useEffect(() => {
    console.log(`Is in dark mode? ${darkMode}`);
  }, [darkMode]);

  console.log("notes:", notes)

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