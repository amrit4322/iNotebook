import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/noteContext";


function AddNote(props) {
    const context = useContext(NoteContext);
  // eslint-disable-next-line
  const {addNote} = context;

  const [note, setNote] = useState({title:"",description:"",tag:""})

  const handleClick=(e)=>{
    e.preventDefault();
    addNote(note.title,note.description,note.tag);
    props.showAlert("Added Successfully","success");
    setNote({title:"",description:"",tag:""});
  }
  const onChange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value})
  }
  return (
    <div>
      <div className="container my-3">
        <h2>Add a Note</h2>
        <form className="my-3">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              value={note.title}
              onChange={onChange}
              
              minLength={5}
              required
            />
           
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={note.description}
              onChange={onChange}
              minLength={5}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="tag">Tag</label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              value={note.tag}
              onChange={onChange}
            />
          </div>
         
          <button disabled={note.description.length<5 || note.title.length<5 } type="submit" className="btn btn-primary" onClick={handleClick}>
            Add note
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddNote;
