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

const Subjects = () => {
  const [subjects, setSubjects] = useState(null);
  const { courseId, streamId, semesterId } = useParams();
  const {
    streams,
    courses,
    semesters,
    subjects: subjectsState,
  } = useSelector((state) => state.data.universities);

  const setupStreams = async () => {
    try {
      console.log(courseId, streamId, semesterId);

      const getBySlug = semesters.filter(
        (semester) => semester?.slug === semesterId
      )[0];
      console.log("ID", getBySlug);

      const subjectslist = subjectsState.filter(
        (subject) => subject.semester_id === getBySlug._id
      );
      console.log("ID", subjectslist);
      if (subjectslist.length === 0) {
        console.log("No subjects found!");
        return;
      }
      setSubjects(subjectslist);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (!courseId && !streamId && !semesterId) {
      redirect("/");
    }
    setupStreams();
  }, []);

  return (
    <div className="w-full h-[100vh] flex items-center flex-col">
      <h2 className="scroll-m-20 text-l font-semibold tracking-tight">
        Select your Subject
      </h2>
      <div className="w-full">
        {subjects &&
          subjects.length &&
          subjects.map((sub, index) => (
            <Link
              key={index}
              href={`/streams/${courseId}/semesters/${streamId}/subjects/${semesterId}/notes/${sub.slug}`}
            >
              <Card className="mt-2">
                <h2 className="py-4 px-10">{sub.title}</h2>
              </Card>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Subjects;
