import Note from "../models/Note.js";

const uploadNote = async (req, res) => {
  const { name, subjectId, downloadURL } = req.body;
  const newNote = new Note({ name, subjectId, downloadURL });

  try {
    const noteCreated = await newNote.save();
    if (noteCreated) {
      console.log("new note created", noteCreated);
    }
  } catch (err) {
    console.log(err);
  }
};

export { uploadNote };
