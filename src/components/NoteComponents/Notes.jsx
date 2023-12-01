import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import "../css/Note.css";
import Note from "./Note";
import CreateNote from "./CreateNote";
import Search from "./Search";

const Notes = () => {
  const [notes, setNotes] = useState(() => {
    const localStorageNotes = JSON.parse(localStorage.getItem("Notes"));
    return localStorageNotes || [];
  });
  
  const [inputText, setInputText] = useState("");
  const [searchText, setSearchText] = useState("");
  const [editingNoteId, setEditingNoteId] = useState('');

  // Second useEffect
  useEffect(() => {
    localStorage.setItem("Notes", JSON.stringify(notes));
  }, [notes]);

  const textHandler = (e) => {
    setInputText(e.target.value);
  };

  const createNote = () => {
    if (inputText.trim().length > 0) {
      setNotes((prevNotes) => [
        ...prevNotes,
        {
          id: uuid(),
          text: inputText,
        },
      ]);
      setInputText("");
    }
  };

  const deleteNote = (id) => {
    const filteredNotes = notes.filter((note) => note.id !== id);
    setNotes(filteredNotes);
  };

  const startEdit = (note) => {
    setEditingNoteId(note.id);
    setInputText(note.text); // Set the input text to the note's text
  };

  const handleSaveChanges = (id, editedText) => {
    if (editedText.trim().length > 0 && id) {
      const updatedNotes = notes.map((note) => {
        if (note.id === id) {
          return { ...note, text: editedText };
        }
        return note;
      });

      console.log('updatedNotes:', updatedNotes)

      setNotes(updatedNotes);
      setEditingNoteId(null);
      setInputText('');

      // Update local storage
      localStorage.setItem("Notes", JSON.stringify(updatedNotes));
    }
  };

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
            startEdit={() => startEdit(note)}
            isEditing={editingNoteId === note.id}
            handleSaveChanges={handleSaveChanges}
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
};

export default Notes;
