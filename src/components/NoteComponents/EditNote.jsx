import { Link } from "react-router-dom";

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { ArrowBack } from "@mui/icons-material";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";


const EditNote = () => {
  return (
    <section>
      <header className="create-note__header">
        <Link to="/" className="btn"><ArrowBack/></Link>
        <button className="btn lg-primary">Save</button>
        <button className="btn danger"><DeleteForeverOutlinedIcon/></button>

      </header>

      <form className="create-note__form">
        <input type="text" placeholder="Title" autoFocus/>
        <textarea rows="28" placeholder="Note details..."></textarea>
      </form>
    </section>
  )
}

export default EditNote;