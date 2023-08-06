import React from "react";

function CreateNote({ textHandler, saveHandler, inputText }) {
  const charLimit = 250;
  const charLeft = charLimit - inputText.length;
  return (
    <div className="note new">
      <textarea
        cols="10"
        rows="8"
        value={inputText}
        placeholder="Type to add a note..."
        onChange={textHandler}
        maxLength="250"
      ></textarea>
      <div className="note__footer">
        <span className="label">{charLeft} char left</span>
        <button className="note__save" onClick={saveHandler}>Save</button>
      </div>
    </div>
  );
}

export default CreateNote;