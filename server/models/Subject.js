import { Schema, model } from "mongoose";

const subjectSchema = new Schema({
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
  semesterId: {
    type: Schema.Types.ObjectId,
    ref: "Semester",
    required: true,
  },
});

const Subject = model("Subject", subjectSchema);
export default Subject;
