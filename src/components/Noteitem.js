import React from 'react'

const Noteitem = (props) => {

   const {note} = props;

  return (
    <div class="col-md-3 ">

<div class="card my-3" >

  <div class="card-body">
    <h5 class="card-title">{note.title}</h5>
    <p class="card-text">{note.description} lorem34dvkbav vbab vbibwvbiwv vnvs vjbwbvwvnwv vibvbrvb lorem20</p>
    
  </div>
</div>


    </div>
  )
}

export default Noteitem