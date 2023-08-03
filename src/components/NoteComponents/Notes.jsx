import { React, useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import "../css/Note.css";
import Note from "./Note";
import CreateNote from "./CreateNote";
import Search from "./Search";


function Notes() {
  // states
  const [notes, setNotes] = useState([]);
  const [inputText, setInputText] = useState("");
  const [searchText, setSearchText] = useState("");


  // get text and store in state
  const textHandler = (e) => {
    setInputText(e.target.value);
  };

  // add new note to the state array
  const saveHandler = () => {
    if (inputText.trim().length > 0) {
      setNotes((prevState) => [
        ...prevState,
        {
          id: uuid(),
          text: inputText,
        },
      ]);
      // clear the textarea
      setInputText("");
    }
  };

  // delete note function
  const deleteNote = (id) => {
    const filteredNotes = notes.filter((note) => note.id !== id);
    setNotes(filteredNotes);
  };

  //get the saved notes and add them to the array
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("Notes"));
    if (data && data.length > 0) {
      setNotes(data);
    }
  }, []);

  //saving data to local storage
  useEffect(() => {
    localStorage.setItem("Notes", JSON.stringify(notes));
  }, [notes]);

  // Filter notes based on search text
  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="container">
      <Search handleSearchNote={setSearchText} />
      <div className="notes">
        {filteredNotes.map((note) => (
          <Note
            key={note.id}
            id={note.id}
            text={note.text}
            deleteNote={deleteNote}
          />
        ))}
        <CreateNote
          textHandler={textHandler}
          saveHandler={saveHandler}
          inputText={inputText}
        />
      </div>
    </div>
  );
}

export default Notes;