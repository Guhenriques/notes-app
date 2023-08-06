import React, { useState, useEffect } from "react";
import { GithubPicker } from "react-color";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import ColorLensTwoToneIcon from "@mui/icons-material/ColorLensTwoTone";

const Note = ({ id, text, deleteNote }) => {
  const defaultColor = "#fef3bd";
  const [bgColor, setBgColor] = useState(() => {
    return localStorage.getItem(`note_${id}_color`) || defaultColor;
  });
  const [showColorPicker, setShowColorPicker] = useState(false);

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

  return (
      <div className="note" style={{ background: bgColor }}>
        <div className="note__body">{text}</div>
        <div className="note__footer" style={{ justifyContent: "flex-end" }}>
          <DeleteForeverOutlinedIcon
            className="note__buttons"
            onClick={() => deleteNote(id)}
            aria-hidden="true"
            fontSize="medium"
          ></DeleteForeverOutlinedIcon>

          {showColorPicker && (
            <GithubPicker
              color={bgColor}
              onChangeComplete={handleChangeColor}
              colors={customColors}
            />
          )}

          <button onClick={handleColorPickerClick} className="note__buttons close-button">
            {showColorPicker ? (
              "X"
            ) : (
              <ColorLensTwoToneIcon fontSize="medium" />
            )}
          </button>

        </div>
      </div>
  );
};

export default Note;
