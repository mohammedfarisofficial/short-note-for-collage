import { Schema, models, model } from "mongoose";

const universitySchema = new Schema(
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
    logo: {
      type: String,
    },
  },
  { timestamps: true }
);

export default models.University || model("University", universitySchema);
