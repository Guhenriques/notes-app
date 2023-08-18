import { React, useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import "../css/Note.css";
import Note from "./Note";
import CreateNote from "./CreateNote";
import Search from "./Search";


const Notes = ( {notes, setNotes} ) => {
  // states
  const [inputText, setInputText] = useState("");
  const [searchText, setSearchText] = useState("");

  // get text and store in state
  const textHandler = (e) => {
    setInputText(e.target.value);
  };

  // Create note function
  const createNote = () => {
    if (inputText.trim().length > 0) {
      setNotes((prevNotes) => [
        ...prevNotes,
        {
          id: uuid(),
          text: inputText,
        },
      ]);
      setInputText(""); // Clear the textarea
    }
  };

  // Delete note function
  const deleteNote = (id) => {
    const filteredNotes = notes.filter((note) => note.id !== id);
    setNotes(filteredNotes);
  };

  // Filter notes based on search text
  const filteredNotes = notes
   ? notes.filter((note) =>
    note.text.toLowerCase().includes(searchText.toLowerCase())
  )

  : [];

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
          //onEditNote={editHandler}
          />
        ))}
        <CreateNote
          textHandler={textHandler}
          saveHandler={createNote}
          inputText={inputText}
        />

        {/*
        {editingNoteId && (
          <EditNote
            textHandler={textHandler} // Pass the textHandler function from the Notes component
            saveHandler={handleSaveChanges}
            inputText={inputText}
            setInputText={setInputText} // Pass the setInputText function
            handleCancelEdit={() => setEditingNoteId("")}
          />
        )} */}

      </div>
    </div>
  );
}

export default Notes;