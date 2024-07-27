import Course from "@/modals/Course";
import { NextResponse } from "next/server";
import connect from "@/utils/db";
import { generateUniqueSlug } from "../utils/generateSlug";

// Create Course
export const POST = async (request) => {
  const { title, university_id } = await request.json();
  if (!title || !university_id) {
    return new NextResponse("Title and University id are required!", {
      status: 404,
    });
  }
  try {
    await connect();
    // gen slug
    const slug = await generateUniqueSlug(Course, title);
    if (!slug) {
      return new NextResponse("Can't generate slug!", { status: 404 });
    }
    const newCourse = new Course({ slug, title, university_id });
    const courseSaved = await newCourse.save();
    if (courseSaved) {
      return new NextResponse(courseSaved, { status: 201 });
    }
    return new NextResponse("Can't create course!", { status: 404 });
  } catch (err) {
    console.log(err);
    return new NextResponse(`Error: ${err.message}`, { status: 404 });
  }
};

export const GET = async () => {
  try {
    const courses = await Course.find();
    if (!courses) {
      return new NextResponse("Courses not found!", { status: 404 });
    }
    return new NextResponse(courses, { status: 200 });
  } catch (err) {
    return new NextResponse(`Error: Courses not found ${err.message}`, {
      status: 404,
    });
  }
};
