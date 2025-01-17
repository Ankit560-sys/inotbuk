const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//ROUTE 1 :--- Fetch all notes for loggedin user  using :: get  "/api/notes/fetchallnotes" , Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });

    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error ");
  }
});

//ROUTE 2 :--- Add a new note using :: post "/api/notes/addnote" ,  Login required

router.post(
  "/addnote",
  fetchuser,
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
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error ");
    }
  }
);

//ROUTE 3 :--- Updating a exiting note using :: put "/api/notes/updatenote/:id" ,  Login required

router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;


  try{

  //Add a newNote object

  const newNote = {};

  if (title) {
    newNote.title = title;
  }
  if (description) {
    newNote.description = description;
  }
  if (tag) {
    newNote.tag = tag;
  }

  //Find the note to be updated and update it

  let note = await Notes.findById(req.params.id);

  if (!note) {
    return res.status(404).send("Not found");
  }

  //if note user id is not match with userid

  if (note.user.toString() != req.user.id) {
    return res.status(401).send("Not allowed");
  }

  note = await Notes.findByIdAndUpdate(
    req.params.id,
    { $set: newNote },
    { new: true }
  );

  res.json({ note });
}
catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error ");
  }

});

//ROUTE 4 :--- deleting a exiting note using :: delete  "/api/notes/deletenote/:id" ,  Login required

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;

  try {
    //find the note to be deleted and delete it
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not found");
    }

    //Allow deletion if the user is with owns id
    if (note.user.toString() != req.user.id) {
      return res.status(401).send("Not allowed");
    }

    note = await Notes.findByIdAndDelete(req.params.id);

    res.json({ success: "Note has been deleted", note: note });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error ");
  }
});

module.exports = router;
