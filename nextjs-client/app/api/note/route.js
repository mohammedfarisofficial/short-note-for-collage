import { NextResponse } from "next/server";
import connect from "@/utils/db";
import { generateUniqueSlug } from "../utils/generateSlug";
import Note from "@/modals/Note";

// Create Course
export const POST = async (request) => {
  const {
    name,
    university_id,
    course_id,
    stream_id,
    semester_id,
    subject_id,
    createdBy,
    downloadURL,
  } = await request.json();
  if (
    !name ||
    !university_id ||
    !course_id ||
    !stream_id ||
    !semester_id ||
    !subject_id ||
    !createdBy ||
    !downloadURL
  ) {
    return new NextResponse(
      "title, university_id, course_id, stream_id, semester_id, downloadURL, subject_id and createdBy are required!",
      {
        status: 404,
      }
    );
  }
  try {
    await connect();
    // gen slug
    const slug = await generateUniqueSlug(Note, name);
    if (!slug) {
      return new NextResponse("Can't generate slug!", { status: 404 });
    }
    const newNote = new Note({
      name,
      slug,
      university_id,
      course_id,
      stream_id,
      semester_id,
      subject_id,
      createdBy,
      downloadURL,
    });
    const noteSaved = await newNote.save();
    if (noteSaved) {
      return new NextResponse(noteSaved, { status: 201 });
    }
    return new NextResponse("Can't create note!", { status: 404 });
  } catch (err) {
    console.log(err);
    return new NextResponse(`Error: ${err.message}`, { status: 404 });
  }
};

export const GET = async () => {
  try {
    const notes = await Note.find();
    if (!notes) {
      return new NextResponse("Notes not found!", { status: 404 });
    }
    return new NextResponse(notes, { status: 200 });
  } catch (err) {
    return new NextResponse(`Error: Notes not found ${err.message}`, {
      status: 404,
    });
  }
};
