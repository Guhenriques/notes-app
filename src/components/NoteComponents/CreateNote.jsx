import React from "react";

const CreateNote = ({ textHandler, saveHandler, inputText }) => {
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
        maxLength={charLimit}
      ></textarea>
      <div className="note__footer">
        <span className="label">{charLeft} char left</span>
        <button className="note__save" onClick={saveHandler}>Save</button>
      </div>
    </div>
  );
}

export default CreateNote;