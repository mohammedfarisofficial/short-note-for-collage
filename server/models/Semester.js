import { Schema, model } from "mongoose";

const semesterSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  universityId: {
    type: Schema.Types.ObjectId,
    ref: "University",
    required: true,
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  streamId: {
    type: Schema.Types.ObjectId,
    ref: "Stream",
    required: true,
  },
});

const Semester = model("Semester", semesterSchema);
export default Semester;
