import { NextResponse } from "next/server";

import University from "@/modals/University";
import Stream from "@/modals/Stream";
import Course from "@/modals/Course";
import Semester from "@/modals/Semester";
import Subject from "@/modals/Subject";
import Note from "@/modals/Note";

export const GET = async () => {
  console.log("trigger");
  try {
    const universities = await University.find();
    const courses = await Course.find();
    const streams = await Stream.find();
    const semesters = await Semester.find();
    const subjects = await Subject.find();
    const notes = await Note.find();

    const data = {
      universities,
      courses,
      streams,
      semesters,
      subjects,
      notes,
    };

    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch (err) {
    return new NextResponse(`Error: Streams not found ${err.message}`, {
      status: 404,
    });
  }
};
