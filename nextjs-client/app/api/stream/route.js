import { NextResponse } from "next/server";
import connect from "@/utils/db";
import { generateUniqueSlug } from "../utils/generateSlug";
import Stream from "@/modals/Stream";

// Create Course
export const POST = async (request) => {
  const { title, university_id, course_id } = await request.json();
  if (!title || !university_id || !course_id) {
    return new NextResponse(
      "title, university_id and course_id are required!",
      {
        status: 404,
      }
    );
  }
  try {
    await connect();
    // gen slug
    const slug = await generateUniqueSlug(Stream, title);
    if (!slug) {
      return new NextResponse("Can't generate slug!", { status: 404 });
    }
    const newStream = new Stream({ slug, title, university_id, course_id });
    const streamSaved = await newStream.save();
    if (streamSaved) {
      return new NextResponse(streamSaved, { status: 201 });
    }
    return new NextResponse("Can't create stream!", { status: 404 });
  } catch (err) {
    console.log(err);
    return new NextResponse(`Error: ${err.message}`, { status: 404 });
  }
};

export const GET = async () => {
  try {
    const streams = await Stream.find();
    if (!streams) {
      return new NextResponse("Streams not found!", { status: 404 });
    }
    return new NextResponse(streams, { status: 200 });
  } catch (err) {
    return new NextResponse(`Error: Streams not found ${err.message}`, {
      status: 404,
    });
  }
};
