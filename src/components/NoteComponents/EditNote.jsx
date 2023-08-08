import React from "react";

function EditNote({ textHandler, saveHandler, inputText, setInputText, handleCancelEdit }) {
  const charLimit = 250;
  const charLeft = charLimit - (inputText ? inputText.length : 0); // Check if inputText is not null or undefined

  return (
    <div className="note">
      <textarea
        cols="10"
        rows="8"
        value={inputText}
        onChange={textHandler}
        placeholder="Type to edit the note..."
        maxLength={charLimit}
      ></textarea>
      <div className="note__footer">
        <span className="label">{charLeft} char left</span>
        <button className="note__save" onClick={() => saveHandler(inputText)}>
          Save Changes
        </button>
        <button className="note__save" onClick={handleCancelEdit}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default EditNote;