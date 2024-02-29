const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const Notes = require("../models/Notes");
const { body, validationResult } = require('express-validator');

//ROUTE 1 :--- Fetch all notes for loggedin user :: "/api/notes/fetchallnotes" , Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {

    try{
        const notes = await Notes.find({ user: req.user.id });

        res.json(notes);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error ");
      }


});






//ROUTE 2 :--- Add a new note :: "/api/notes/addnote" ,  Login required

router.post(
  "/addnote", fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 5 }),
    body("description", "Description at least must be 5 characters").isLength({
      min: 5,
    }),
  ],
  
  async (req, res) => {
      
      try {
        const { title, description, tag } = req.body;
      // If there are errors ,return bad request and  the errors :
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savedNote = await note.save();

      res.json(savedNote);

    } 
    
    
    catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error ");
    }
  }
);

module.exports = router;
