import React, { useContext, useEffect, useRef ,useState} from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import {useNavigate} from "react-router-dom" ; 

const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getNotes , editNote } = context;
   let navigate = useNavigate();

  useEffect(() => {

    if(localStorage.getItem('token')){
      
      getNotes();
    }
    else{
      navigate("/login")
      
      
    }
    // eslint-disable-next-line 
  }, []);

  const [note, setnote] = useState({id:" " , etitle:" " , edescription :" "  , etag:" "}); 

  const ref = useRef(null);

  const refClose = useRef(null);


  const updateNote = (currentNote) => {
    ref.current.click();
    setnote({id : currentNote._id , etitle: currentNote.title , edescription: currentNote.description , etag: currentNote.tag})
    
  };



  const onChange=(e)=>{


    setnote({...note ,  [e.target.name]: e.target.value}) ;
    

}

const handleClick = (e) =>{
   
    
    editNote(note.id , note.etitle , note.edescription , note.etag)
    ref.current.click();
    props.showAlert(" Updated successfully " , "success")

    

 }

  return (
    <>
      <AddNote showAlert={props.showAlert} />

      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
                 <form>
          <div className="mb-3">
            <label htmlFor="etitle" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="etitle"
              name="etitle"
              aria-describedby="emailHelp"  onChange={onChange} value={note.etitle}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="edescription" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="edescription" name="edescription" onChange={onChange} value={note.edescription}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="etag" className="form-label" >
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="etag"
              name="etag"
              onChange={onChange} value={note.etag}
            />
          </div>

         
        </form>
        </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal" ref={refClose}
              >
                Close
              </button>
              <button  disabled={note.etitle.length <5 || note.edescription.length < 5} type="button" className="btn btn-primary" onClick={handleClick}>
                Update
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container row">


        <h2>Your Notes</h2>

        <div className="container mx-3">

         {notes.length === 0 && 'No notes to display'}

         </div>

        {notes.map((note) => {
          return (
            <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
