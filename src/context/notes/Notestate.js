import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {

   const host = "http://localhost:5000" ;


  const notesInitial = [];


  

  const [notes, setNotes] = useState(notesInitial);


   //Get all notes
   const getNotes = async( ) => {


    //API CALL-----
    
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVlMWU2NzM5YWE5NDM0MjhjYjYzZDY5In0sImlhdCI6MTcwOTMwMzQxMn0.lo3eHOXa0eLhKNpSkI6bEduvHEuW5nm7EGuQsunCuLw"
          
        },
       
       
      });
      
       const json =  await response.json();
       console.log(json)

    setNotes(json);
  };










  //Add a note

  const addNote = async(title, description, tag) => {


    //API CALL-----
    
    const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVlMWU2NzM5YWE5NDM0MjhjYjYzZDY5In0sImlhdCI6MTcwOTMwMzQxMn0.lo3eHOXa0eLhKNpSkI6bEduvHEuW5nm7EGuQsunCuLw"
          
        },
       
        body: JSON.stringify({title ,description , tag}), 
      });
      
      const json =response.json();
      console.log(json)



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

  const editNote =  async (id , title , description , tag) =>  {

    //API CALL-----
    
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVlMWU2NzM5YWE5NDM0MjhjYjYzZDY5In0sImlhdCI6MTcwOTMwMzQxMn0.lo3eHOXa0eLhKNpSkI6bEduvHEuW5nm7EGuQsunCuLw"
            
          },
         
          body: JSON.stringify({title ,description , tag}), 
        });
        const json = response.json();
    

    //Logic to edit in frontend or client side

    for (let index = 0; index < notes.length; index++) {
        const element = notes[index];

        if( element._id === id){
            element.title = title ;
            element.description = description ;
            element.tag = tag ;
        }
        
    }


 



  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote ,editNote , getNotes}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
