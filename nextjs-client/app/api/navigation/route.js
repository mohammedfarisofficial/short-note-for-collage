import { NextResponse } from "next/server";
import connect from "@/utils/db";

import University from "@/modals/University";
import Course from "@/modals/Course";

// GET navigation
export const GET = async () => {
  try {
    await connect();
    const universities = await University.find();

    if (!universities) {
      return new NextResponse(`Error: Universities not found ${err.message}`, {
        status: 404,
      });
    }
    // Format the data
    const formattedData = await Promise.all(
      universities.map(async (university) => {
        const courses = await Course.find({ university_id: university._id });
        return {
          ...university.toObject(),
          courses: courses.map((course) => course.toObject()),
        };
      })
    );
    return new NextResponse(JSON.stringify(formattedData), {
      status: 200,
    });
  } catch (err) {
    return new NextResponse(`Error: Subjects not found ${err.message}`, {
      status: 404,
    });
  }
};
