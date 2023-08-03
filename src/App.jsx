import { BrowserRouter, Routes, Route } from "react-router-dom";

import CreateNote from "./components/NoteComponents/CreateNote";
import Header from "./components/NoteComponents/Header";
import Notes from "./components/NoteComponents/Notes";

import "./components/css/App.css";

function App() {
  return (
    <main id="app">
      <Header />
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Notes />} />
          <Route path="/create-note" element={<CreateNote />} />

          {/*<Route path="/edit-note/:id" element={<Notes />} />*/}

        </Routes>

      </BrowserRouter>
    </main>
  );
}
export default App;