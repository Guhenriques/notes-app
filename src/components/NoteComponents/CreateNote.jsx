import React from "react";
import LinearProgress from "@mui/material/LinearProgress";

function CreateNote({ textHandler, saveHandler, inputText }) {
  const charLimit = 100;
  const charLeft = charLimit - inputText.length;
  return (
    <div className="note new">
      <textarea
        cols="10"
        rows="5"
        value={inputText}
        placeholder="Type to add a note..."
        onChange={textHandler}
        maxLength="100"
      ></textarea>
      <div className="note__footer">
        <span className="label">{charLeft} char left</span>
        <button className="note__save" onClick={saveHandler}>Save</button>
      </div>
      <LinearProgress
        className="char__progress"
        variant="determinate"
        value={charLeft} />
    </div>
  );
}

export default CreateNote;