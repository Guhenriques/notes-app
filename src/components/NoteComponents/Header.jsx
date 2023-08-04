import React from "react";
import DarkModeToggle from "./DarkModeToggle";

function Header({ darkMode, onDarkModeToggle }) {
  return (
    <header>
      <div className="header-nav">
        <h1 className="notes__title">My Notes</h1>
        <DarkModeToggle darkMode={darkMode} onDarkModeToggle={onDarkModeToggle} />
      </div>
    </header>
  );
}

export default Header;