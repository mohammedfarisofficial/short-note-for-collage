"use client";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { redirect } from "next/navigation";

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
    <div className="w-full h-[100vh] flex items-center justify-center flex-col">
      <Link href="/streams/courseId/semesters/streamsId">Streams</Link>
      <div>
        <Link href={`/streams/${courseId}/semesters/${courseId}`}>
          <Card className="mt-2">
            <h2 className="py-4 px-10">Course ID : {courseId}</h2>
          </Card>
        </Link>

        {streams &&
          streams.map((stream, index) => (
            <Link key={index} href={`/streams/${courseId}/semesters/${stream.slug}`}>
              <Card  className="mt-2">
                <h2 className="py-4 px-10">Streams : {stream.title}</h2>
              </Card>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Streams;
