import { NextResponse } from "next/server";
import connect from "@/utils/db";
import { generateUniqueSlug } from "../utils/generateSlug";
import Subject from "@/modals/Subject";

// Create Course
export const POST = async (request) => {
  const { title, university_id, course_id, stream_id, semester_id } =
    await request.json();
  if (!title || !university_id || !course_id || !stream_id || !semester_id) {
    return new NextResponse(
      "title, university_id, course_id, stream_id and semester_id are required!",
      {
        status: 404,
      }
    );
  }
  try {
    await connect();
    // gen slug
    const slug = await generateUniqueSlug(Subject, title);
    if (!slug) {
      return new NextResponse("Can't generate slug!", { status: 404 });
    }
    const newSubject = new Subject({
      slug,
      title,
      university_id,
      course_id,
      stream_id,
      semester_id
    });
    const subjectSaved = await newSubject.save();
    if (subjectSaved) {
      return new NextResponse(subjectSaved, { status: 201 });
    }
    return new NextResponse("Can't create subject!", { status: 404 });
  } catch (err) {
    console.log(err);
    return new NextResponse(`Error: ${err.message}`, { status: 404 });
  }
};

export const GET = async () => {
  try {
    await connect();
    const subjects = await Subject.find();
    if (!subjects) {
      return new NextResponse("Subjects not found!", { status: 404 });
    }
    return new NextResponse(subjects, { status: 200 });
  } catch (err) {
    return new NextResponse(`Error: Subjects not found ${err.message}`, {
      status: 404,
    });
  }
};
