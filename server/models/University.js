import { Schema, model } from "mongoose";

const universitySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const University = model("University", universitySchema);
export default University;
