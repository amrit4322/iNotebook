const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

//Route 1: Fetch all notes of user: Get "api/notes/fetchallnotes " Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json({ success: true, notes });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ success: false, error: "Internal Server Error" });
  }
});

//Route 2: Fetch all notes of user: Get "api/notes/addnote " Login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 charachters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //if there are errors then return bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }

      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json({ success: true, note: savedNote });
    } catch (err) {
      console.error(err.message);
      res.status(500).send({ success: false, error: "Internal Server Error" });
    }
  }
);

//Route 3: Update an existing note :Put "api/notes/updatenote " Login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;

  try {
    //Create a newNote objext
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
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send({ success: false, error: "Note Found" });
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send({ success: false, error: "Not Allowed" });
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ success: true, note });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ success: false, error: "Internal Server Error" });
  }
});

//Route 4: Delete an existing note :Delete "api/notes/deletenote " Login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    //Find the note to be delete and delete it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send({ success: false, error: "Note Found" });
    }

    //Allow deletion only if user owns this Note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send({ success: false, error: "Not Allowed" });
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Note has been deleted", note: note });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ success: false, error: "Internal Server Error" });
  }
});

module.exports = router;
