import { React, useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import "../css/Note.css";
import Note from "./Note";
import CreateNote from "./CreateNote";
import Search from "./Search";


const Notes = ({ notes, setNotes }) => {
  // states
  const [inputText, setInputText] = useState("");
  const [editText, setEditText] = useState("");
  const [searchText, setSearchText] = useState("");
  const [editingNoteId, setEditingNoteId] = useState(null); // Track the note being edited

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

  const startEdit = (id, initialText) => {
    setEditingNoteId(id); // Set the ID of the note being edited
    setEditText(initialText); // Initialize the edit text with the note's text
  };

  const handleSaveChanges = () => {
    if (editText.trim().length > 0 && editingNoteId) {
      const updatedNotes = notes.map((note) => {
        if (note.id === editingNoteId) {
          return { ...note, text: editText };
        }
        return note;
      });
      setNotes(updatedNotes);
      setEditingNoteId(null);
      setEditText([]);
    }
  };

  useEffect(() => {
    const localStorageNotes = JSON.parse(localStorage.getItem("notes"));
    if (localStorageNotes) {
      setNotes(localStorageNotes);
    }
  }, []);

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
            startEdit={startEdit} // Pass the startEdit function to begin editing
            isEditing={editingNoteId === note.id}
            handleSaveChanges={handleSaveChanges} // Pass the function to save changes

          />
        ))}
        <CreateNote
          textHandler={textHandler}
          saveHandler={createNote}
          inputText={inputText}
        />


      </div>
    </div>
  );
}

export default Notes;