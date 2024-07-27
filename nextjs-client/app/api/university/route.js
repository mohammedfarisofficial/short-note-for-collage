import University from "@/modals/University";
import { NextResponse } from "next/server";
import connect from "@/utils/db";
import { generateUniqueSlug } from "../utils/generateSlug";

// Create Univeristy
export const POST = async (request) => {
  const { title } = await request.json();
  if (!title) {
    return new NextResponse("Title is required!", { status: 404 });
  }
  try {
    await connect();
    // gen slug
    const slug = await generateUniqueSlug(University, title);
    if (!slug) {
      return new NextResponse("Can't generate slug!", { status: 404 });
    }
    const newUniversity = new University({ slug, title });
    const universitySaved = await newUniversity.save();
    if (universitySaved) {
      return new NextResponse.json(universitySaved, { status: 201 });
    }
    return new NextResponse("Can't create university!", { status: 404 });
  } catch (err) {
    console.log(err);
    return new NextResponse(`Error: ${err.message}`, { status: 404 });
  }
};

export const GET = async () => {
  try {
    const universities = await University.find();
    if (!universities) {
      return new NextResponse("Universities not found!", { status: 404 });
    }
    return new NextResponse(universities, { status: 200 });
  } catch (err) {
    return new NextResponse(`Error: ${err.message}`, { status: 404 });
  }
};
