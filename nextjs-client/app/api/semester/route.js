import { NextResponse } from "next/server";
import connect from "@/utils/db";
import { generateUniqueSlug } from "../utils/generateSlug";
import Semester from "@/modals/Semester";

// Create Course
export const POST = async (request) => {
  const { title, university_id, course_id, stream_id } = await request.json();
  if (!title || !university_id || !course_id || !stream_id) {
    return new NextResponse(
      "title, university_id, course_id and stream_id are required!",
      {
        status: 404,
      }
    );
  }
  try {
    await connect();
    // gen slug
    const slug = await generateUniqueSlug(Semester, title);
    if (!slug) {
      return new NextResponse("Can't generate slug!", { status: 404 });
    }
    const newSemester = new Semester({
      slug,
      title,
      university_id,
      course_id,
      stream_id,
    });
    const semesterSaved = await newSemester.save();
    if (semesterSaved) {
      return new NextResponse(semesterSaved, { status: 201 });
    }
    return new NextResponse("Can't create semester!", { status: 404 });
  } catch (err) {
    console.log(err);
    return new NextResponse(`Error: ${err.message}`, { status: 404 });
  }
};

export const GET = async () => {
  try {
    const semesters = await Semester.find();
    if (!semesters) {
      return new NextResponse("Semesters not found!", { status: 404 });
    }
    return new NextResponse(semesters, { status: 200 });
  } catch (err) {
    return new NextResponse(`Error: Semesters not found ${err.message}`, {
      status: 404,
    });
  }
};
