"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { redirect } from "next/navigation";

import { Card } from "@/components/ui/card";

const Streams = () => {
  const [streams, setStreams] = useState(null);
  const { courseId } = useParams();
  const { streams: streamsState, courses } = useSelector(
    (state) => state.data.universities
  );

  const setupStreams = async () => {
    try {
      console.log(courseId);

      const getById = courses.filter((course) => course?.slug === courseId)[0];
      console.log(getById);
      const streamlist = streamsState.filter(
        (stream) => stream.course_id === getById._id
      );
      if (streamlist.length === 0) {
        console.log("No streams found!");
        return;
      }
      setStreams(streamlist);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (!courseId) {
      redirect("/");
    }
    setupStreams();
  }, []);

  return (
    <div className="w-full h-[100vh] flex items-center flex-col">
      <h2 className="scroll-m-20 text-l font-semibold tracking-tight">
        Select your stream
      </h2>
      <div className="w-full">
        {streams &&
          streams.length &&
          streams.map((stream, index) => (
            <Link
              key={index}
              href={`/streams/${courseId}/semesters/${stream.slug}`}
            >
              <Card className="mt-2">
                <h2 className="py-4 px-10">{stream.title}</h2>
              </Card>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Streams;
