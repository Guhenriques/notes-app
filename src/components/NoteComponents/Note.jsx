import React, { useState, useEffect } from "react";
import { GithubPicker } from "react-color";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import ColorLensTwoToneIcon from "@mui/icons-material/ColorLensTwoTone";
import EditIcon from '@mui/icons-material/Edit';

const Note = ({ id, text, deleteNote, startEdit, isEditing, handleSaveChanges }) => {
  const defaultColor = "#fef3bd";
  const [bgColor, setBgColor] = useState(() => localStorage.getItem(`note_${id}_color`) || defaultColor);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [editedText, setEditedText] = useState(text);

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

  useEffect(() => {
    localStorage.setItem(`note_${id}_color`, bgColor);
  }, [id, bgColor]);

  const handleEditToggle = () => {
    startEdit(id, text);
  };

  const handleSaveChangesInternal = () => {
    handleSaveChanges(id, editedText);
  };

  return (
    <div className="note" style={{ background: bgColor }}>
      <div className="note__body">
        {isEditing ? (
          <textarea
            cols="30"
            rows="8"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
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
          <button onClick={handleSaveChangesInternal}>Save Changes</button>
        ) : (
          <EditIcon
            className="note_buttons"
            onClick={handleEditToggle}
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
