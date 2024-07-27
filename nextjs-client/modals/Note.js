import { Schema, models, model } from "mongoose";

const noteSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    downloadURL: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      required: true,
    },
    university_id: {
      type: Schema.Types.ObjectId,
      ref: "University",
      required: true,
    },
    course_id: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    stream_id: {
      type: Schema.Types.ObjectId,
      ref: "Stream",
      required: true,
    },
    semester_id: {
      type: Schema.Types.ObjectId,
      ref: "Semester",
      required: true,
    },
    subject_id: {
      type: Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    branch: {
      type: Number,
      default: 0,
    },
    thumbnailURL: {
      type: String,
    },
    desc: {
      type: String,
    },
  },
  { timestamps: true }
);

export default models.Note || model("Note", noteSchema);
