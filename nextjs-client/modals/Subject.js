import { Schema, models, model } from "mongoose";

const subjectSchema = new Schema(
  {
    title: {
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
    logo: {
      type: String,
    },
  },
  { timestamps: true }
);

export default models.Subject || model("Subject", subjectSchema);
