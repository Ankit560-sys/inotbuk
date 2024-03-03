import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const notesInitial = [
   
    
   
    
    {
      _id: "65e4070d59174798f326563d69",
      title: "SAM SULEK title",
      description: "this is my SAM SULEK descrption",
      tag: "Personal",
      timestamp: "2024-03-03T05:13:49.504Z",
      __v: 0,
    },
    {
      _id: "65e4070d59174798f326448cc",
      user: "65e1e6739aa943428cb63d69",
      title: "SAM SULEK title",
      description: "this is my SAM SULEK descrption",
      tag: "Personal",
      timestamp: "2024-03-03T05:13:49.504Z",
      __v: 0,
    },
    {
      _id: "65e4070d59174798f322648cc",
      user: "65e1e6739aa943428cb63d69",
      title: "SAM SULEK title",
      description: "this is my SAM SULEK descrption",
      tag: "Personal",
      timestamp: "2024-03-03T05:13:49.504Z",
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(notesInitial);

  //Add a note

  const addNote = (title, description, tag) => {
   const  note = {
      id: "65e4070d59174798f322648cdfczcdd",
      user: "65e1e6739aa943428cb63d69",
      title: title,
      description: description,
      tag: tag,
      timestamp: "2024-03-03T05:13:49.504Z",
      __v: 0,
    };

    setNotes(notes.concat(note));
  };

  //Delete a note

  const deleteNote = (id) => {

    //for checking the id is taken by this function

    console.log("Deleting the  note id " + id);

    const newNotes = notes.filter((note)=>{
        return  note._id !== id
    })

     setNotes(newNotes);
  };

  //Edit a note

  const editNote = () => {};

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote ,editNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
