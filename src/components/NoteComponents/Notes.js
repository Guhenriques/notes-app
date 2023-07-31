import { React, useState, useEffect } from "react";
import "../css/Note.css";
import Note from "./Note";

import CreateNote from "./CreateNote";


function Notes() {
  //states
  const [notes, setNotes] = useState([]);
  const [inputText, setInputText] = useState("");

  return (
    <div className="notes">
      <Note />
      <Note />
      <CreateNote />
    </div>
  );
}

export default Notes;