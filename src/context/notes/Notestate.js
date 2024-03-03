import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const notesInitial = [
    {
      _id: "65e4070a59174798f32648c6",
      user: "65e1e6739aa943428cb63d69",
      title: "SAM SULEK title",
      description: "this is my SAM SULEK descrption",
      tag: "Personal",
      timestamp: "2024-03-03T05:13:46.840Z",
      __v: 0,
    },
    {
      _id: "65e4070b59174798f32648c8",
      user: "65e1e6739aa943428cb63d69",
      title: "SAM SULEK title",
      description: "this is my SAM SULEK descrption",
      tag: "Personal",
      timestamp: "2024-03-03T05:13:47.908Z",
      __v: 0,
    },
    {
      _id: "65e4070c59174798f32648ca",
      user: "65e1e6739aa943428cb63d69",
      title: "SAM SULEK title",
      description: "this is my SAM SULEK descrption",
      tag: "Personal",
      timestamp: "2024-03-03T05:13:48.802Z",
      __v: 0,
    },
    {
      _id: "65e4070d59174798f32648cc",
      user: "65e1e6739aa943428cb63d69",
      title: "SAM SULEK title",
      description: "this is my SAM SULEK descrption",
      tag: "Personal",
      timestamp: "2024-03-03T05:13:49.504Z",
      __v: 0,
    },
  ];

    const [notes, setNotes] = useState(notesInitial);


  return (
  <NoteContext.Provider value={{notes,setNotes}}>{props.children}</NoteContext.Provider>)
};

export default NoteState;
