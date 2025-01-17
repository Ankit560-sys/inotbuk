import React ,{useContext} from "react";
import noteContext from '../context/notes/noteContext';

const Noteitem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote} = context ;
    const { note , updateNote } = props;
    
    
    



 
  return (
    <div className="col-md-3 ">
      <div className="card my-3">
        <div className="card-body">
            <h6 className="card-title">{note.title}</h6>

          <p className="card-text">
            {note.description} 
          </p>
          <p className="card-text">
            {note.tag} 
          </p>
          <div className="d-flex align-items-center justify-content-center">

            <i className="fa-solid fa-trash  mx-3" onClick={()=>{deleteNote(note._id);
            props.showAlert("deleted successfully " , "success")}}></i>

            <i className="fa-solid fa-pen-to-square  mx-3" onClick={()=>{updateNote(note)}}></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
