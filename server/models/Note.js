import { Schema, model } from "mongoose";

const noteSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  downloadURL: {
    type: String,
    required: true,
  },
  subjectId: {
    type: Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
});

const Note = model("Note", noteSchema);
export default Note;
