import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import CreateNote from "./components/NoteComponents/CreateNote";
import Header from "./components/NoteComponents/Header";
import Notes from "./components/NoteComponents/Notes";

import "./components/css/App.css";

function App() {

  const [darkMode, setDarkMode] = useState(false);

  const handleDarkModeToggle = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className={darkMode ? "dark-mode" : "white-mode"}>
      <Header onDarkModeToggle={handleDarkModeToggle} />
      <main id="app">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Notes />} />
            <Route path="/create-note" element={<CreateNote />} />
            {/*<Route path="/edit-note/:id" element={<Notes />} />*/}
          </Routes>
        </BrowserRouter>
      </main>
    </div>
  );
}
export default App;