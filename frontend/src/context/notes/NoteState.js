import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const getNotes = async () => {
    //fetching data using api
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const jsonValue = await response.json();
   
    setNotes(jsonValue.notes);
  };

  const [notes, setNotes] = useState(notesInitial);

  //Add a note
  const addNote = async (title, description, tag) => {
    //fetching data using api
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const jsonValue = await response.json();

    setNotes(notes.concat(jsonValue.note));
  };

  //delete a note
  const deleteNote = async (id) => {
    //fetching data using api
   await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
  

    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //edit a note

  const editNote = async (id, title, description, tag) => {
    //fetching data using api
    await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });


    let newNote = JSON.parse(JSON.stringify(notes));
    newNote.forEach((elem) => {
      if (elem._id === id) {
        elem.title = title;
        elem.description = description;
        elem.tag = tag;
      }
    });
   
    setNotes(newNote);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
