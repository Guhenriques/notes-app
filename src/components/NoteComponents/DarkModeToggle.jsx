import React from "react";

const DarkModeToggle = ({ onDarkModeToggle }) => {
  return (
    <button onClick={onDarkModeToggle} className="note__save toggle-mode">
      {"Toggle Mode"}
    </button>
  );
};

export default DarkModeToggle;