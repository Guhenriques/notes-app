import React, { useState, useEffect } from "react";
import { GithubPicker } from "react-color";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import ColorLensTwoToneIcon from "@mui/icons-material/ColorLensTwoTone";
import EditIcon from '@mui/icons-material/Edit';


const Note = ({ id, text, deleteNote, startEdit, isEditing, handleSaveChanges }) => {
  const defaultColor = "#fef3bd";
  const [bgColor, setBgColor] = useState(() => {
    return localStorage.getItem(`note_${id}_color`) || defaultColor;
  });
  const [showColorPicker, setShowColorPicker] = useState(false);

  const [editText, setEditText] = useState(() => {
    const localStorageText = localStorage.getItem(`note_${id}_text`);
    return localStorageText !== null ? localStorageText : text;
  });

  const handleChangeColor = (color) => {
    setBgColor(color.hex);
  };

  const handleColorPickerClick = () => {
    setShowColorPicker((prevShowColorPicker) => !prevShowColorPicker);
  };

  const customColors = [
    "#eb9694",
    "#fad0c3",
    "#fef3bd",
    "#c1e1c5",
    "#bedadc",
    "#c4def6",
    "#bed3f3",
    "#d4c4fb",
    "#abb8c3",
    "#969696",
  ];

  // storing in localStorage
  useEffect(() => {
    localStorage.setItem(`note_${id}_color`, bgColor); // save the new color
  }, [id, bgColor]);

  // Use useEffect to handle updates from localStorage when the component mounts
  useEffect(() => {
    const localStorageText = localStorage.getItem(`note_${id}_text`);
    if (localStorageText !== null) {
      setEditText(localStorageText);
    }
  }, []);

  // storing in localStorage when editing the note or creating the note
  useEffect(() => {
    if (isEditing) {
      localStorage.setItem(`note_${id}_text`, editText); // save the new text when editing
    } else {
      const localStorageText = localStorage.getItem(`note_${id}_text`);
      if (localStorageText !== null) {
        setEditText(localStorageText);
      }
    }
  }, [id, editText, isEditing]);

  return (
    <div className="note" style={{ background: bgColor }}>
      <div className="note__body">
        {isEditing ? (
          <textarea
            cols="30"
            rows="8"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
        ) : (
          text
        )}
      </div>
      <div className="note__footer">
        {showColorPicker && (
          <GithubPicker
            color={bgColor}
            onChangeComplete={handleChangeColor}
            colors={customColors}
          />
        )}

        <button onClick={handleColorPickerClick} className="note__buttons close-button">
          {showColorPicker ? "X" : <ColorLensTwoToneIcon fontSize="medium" />}
        </button>

        {isEditing ? (
          <button onClick={handleSaveChanges}>Save Changes</button>
        ) : (
          <EditIcon
            className="note_buttons"
            onClick={() => startEdit(id, text)}
            aria-hidden="true"
            fontSize="medium"
          />
        )}

        <DeleteForeverOutlinedIcon
          className="note__buttons"
          onClick={() => deleteNote(id)}
          aria-hidden="true"
          fontSize="medium"
        />
      </div>
    </div>
  );
};

export default Note;
