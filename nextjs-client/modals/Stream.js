import { Schema, models, model } from "mongoose";

const streamSchema = new Schema(
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
    logo: {
      type: String,
    },
  },
  { timestamps: true }
);

export default models.Stream || model("Stream", streamSchema);
