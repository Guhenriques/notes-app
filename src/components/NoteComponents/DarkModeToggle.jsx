import React from "react";

const DarkModeToggle = ({ onDarkModeToggle }) => {
  return (
    <button onClick={onDarkModeToggle} className="note__save toggle-mode">
      {"Toggle Light"}
    </button>
  );
};

export default DarkModeToggle;