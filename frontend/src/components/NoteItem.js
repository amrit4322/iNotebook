import React, { useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrashCan,faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import NoteContext from "../context/notes/noteContext";


function NoteItem(props) {
  const context = useContext(NoteContext);
  // eslint-disable-next-line
  const { deleteNote } = context;
  const { note,updateNote } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
            <div className="d-flex align-items-center">
          <h5 className="card-title">{note.title}</h5>
          <FontAwesomeIcon icon={faTrashCan} className="mx-3 fa-icon" onClick={()=>{deleteNote(note._id); props.showAlert("Deleted Successfully","success");}} />
          <FontAwesomeIcon icon={faPenToSquare} className="mx-3 fa-icon" onClick={()=>updateNote(note)}/>
          </div>
          <p className="card-text">
            {note.description}
           
           
          </p>
          
         
        </div>
      </div>
    </div>
  );
}

export default NoteItem;
