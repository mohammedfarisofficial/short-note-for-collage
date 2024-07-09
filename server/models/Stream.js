import { Schema, model } from "mongoose";

const streamSchema = new Schema({
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
});

const Stream = model("Stream", streamSchema);
export default Stream;
