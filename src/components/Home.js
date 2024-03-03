import React, {useContext} from "react";
import noteContext from "../context/notes/noteContext";

const Home = () => {

   const context = useContext(noteContext);

    const {notes , setNotes} = context;





  return (
    <div>


      <h2>Add a Note</h2>

      <div class="container my-3">

      <form>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
           Title
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
         
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Description
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Tag
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>

      </div>




      <div className="container">

      <h2>Your Notes</h2>

        {notes.map((note)=>
        {return note.title}
        
        )}

     </div>





    </div>
  );
};

export default Home;
