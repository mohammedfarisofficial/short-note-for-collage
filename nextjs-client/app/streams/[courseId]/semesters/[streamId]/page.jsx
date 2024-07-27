"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Semester = () => {
  const [semesters, setSemesters] = useState(null);
  const { courseId, streamId } = useParams();
  const {
    streams,
    courses,
    semesters: semestersState,
  } = useSelector((state) => state.data.universities);

  const setupStreams = async () => {
    try {
      console.log(courseId, streamId);

      const getBySlug = streams.filter(
        (stream) => stream?.slug === streamId
      )[0];
      console.log("ID", getBySlug);
      // console.log(getById);
      const semesterslist = semestersState.filter(
        (semester) => semester.stream_id === getBySlug._id
      );
      console.log("ID", semesterslist);
      if (semesterslist.length === 0) {
        console.log("No semesters found!");
        return;
      }
      setSemesters(semesterslist);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (!courseId && streamId) {
      redirect("/");
    }
    setupStreams();
  }, []);

  return (
    <div className="w-full h-[100vh] flex items-center justify-center flex-col">
      <Link href="/streams/courseId/semesters/streamsId">Semester</Link>
      <div>
        <Link href={`/streams/${courseId}/semesters/${courseId}`}>
          <Card className="mt-2">
            <h2 className="py-4 px-10">Stream ID : {streamId}</h2>
          </Card>
        </Link>

        {semesters &&
          semesters.map((sem, index) => (
            <Link
              key={index}
              href={`/streams/${courseId}/semesters/${streamId}/subjects/${sem.slug}`}
            >
              <Card className="mt-2">
                <h2 className="py-4 px-10">{sem.title}</h2>
              </Card>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Semester;
