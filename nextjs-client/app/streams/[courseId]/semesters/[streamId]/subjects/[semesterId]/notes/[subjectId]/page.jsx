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

const Notes = () => {
  const [notes, setNotes] = useState(null);
  const { courseId, streamId, semesterId, subjectId } = useParams();
  const {
    streams,
    courses,
    semesters,
    subjects,
    notes: notesState,
  } = useSelector((state) => state.data.universities);

  const setupStreams = async () => {
    try {
      console.log(courseId, streamId, semesterId, subjectId);

      const getBySlug = subjects.filter(
        (subject) => subject?.slug === subjectId
      )[0];
      console.log("ID", getBySlug);

      const noteslist = notesState.filter(
        (note) => note.subject_id === getBySlug._id
      );
      console.log("ID", noteslist);
      if (noteslist.length === 0) {
        console.log("No subjects found!");
        return;
      }
      setNotes(noteslist);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (!courseId && !streamId && !semesterId && !subjectId) {
      redirect("/");
    }
    setupStreams();
  }, []);

  return (
    <div className="w-full h-[100vh] flex items-center justify-center flex-col">
      <Link href="/streams/courseId/semesters/streamsId">Semester</Link>
      <div>
        <Card className="mt-2">
          <h2 className="py-4 px-10">Stream ID : {subjectId}</h2>
        </Card>

        {notes &&
          notes.map((note, index) => (
            <Link
              key={index}
              href={`/streams/${courseId}/semesters/${streamId}/subjects/${semesterId}/notes/${subjectId}/${note.slug}`}
            >
              <Card className="mt-2">
                <h2 className="py-4 px-10">{note.name}</h2>
              </Card>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Notes;
