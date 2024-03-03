import React from "react";

import Notes from "./Notes";


const Home = () => {

   





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


      {/* Notes Component from components */}

      <Notes/>





    </div>
  );
};

export default Home;
