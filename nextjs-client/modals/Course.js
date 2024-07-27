import { Schema, models, model } from "mongoose";

const courseSchema = new Schema(
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
    logo: {
      type: String,
    },
  },
  { timestamps: true }
);

export default models.Course || model("Course", courseSchema);
