import { Schema, model } from "mongoose";

const courseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  universityId: {
    type: Schema.Types.ObjectId,
    ref: "University",
    required: true,
  },
});

const Course = model("Course", courseSchema);
export default Course;
