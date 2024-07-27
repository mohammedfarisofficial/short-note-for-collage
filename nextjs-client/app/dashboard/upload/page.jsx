"use client";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import DropFile from "@/components/ui/drop-box";
//firebase
import { storage } from "@/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import axios from "axios";

const Upload = () => {
  const [note, setNote] = useState(null);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();
  const session = useSession();

  const [newNote, setNewNote] = useState({
    //ref
    university_id: "",
    course_id: "",
    stream_id: "",
    semester_id: "",
    subject_id: "",
    // note data
    name: "",
    createdBy: "",
    downloadURL: "",
  });
  const { universities, courses, streams, semesters, subjects } = useSelector(
    (state) => state.data.universities
  );

  const onSelectHanlder = (value, type) => {
    setNewNote((prev) => ({
      ...prev,
      [type + "_id"]: value._id,
    }));
  };
  const uploadNote = async () => {
    try {
      const response = await axios.post("/api/note", newNote);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const uploadPdf = () => {
    const storageRef = ref(storage, `notes/${note.name}`);
    const uploadTask = uploadBytesResumable(storageRef, note);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progresspercent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progresspercent);
      },
      (err) => {
        toast({
          title: "Uh oh! Something went wrong.",
          description: `There was a problem with your request ${err.message}`,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("download URL", downloadURL);
          toast({
            title: "PDF upload done",
            description: "file upload to cloud",
          });
          setNewNote((prev) => ({
            ...prev,
            downloadURL,
          }));
        });
      }
    );
  };

  useEffect(() => {
    if (!note) {
      setProgress(0);
      console.log("No file seleted!");
      return;
    }
    uploadPdf();
  }, [note]);

  useEffect(() => {
    console.log(session.status);
    if (session.status !== "authenticated") {
      return;
    }
    const { data } = session;

    setNewNote((prev) => ({
      ...prev,
      createdBy: data?.user?._id,
    }));
  }, [session]);

  console.log(newNote);

  return (
    <div className="w-full h-min-[110vh] flex items-center justify-start pt-[20vh] flex-col">
      <h2 className="mb-5">Upload a Note</h2>
      <Card className="flex gap-y-2 flex-col p-5">
        <Select onValueChange={(value) => onSelectHanlder(value, "university")}>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Select University" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select University</SelectLabel>
              {universities &&
                universities.map((university, index) => (
                  <SelectItem key={index} value={university}>
                    {university.title}
                  </SelectItem>
                ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {newNote.university_id && (
          <Select onValueChange={(value) => onSelectHanlder(value, "course")}>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select University" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select University</SelectLabel>
                {universities &&
                  courses &&
                  courses.map((course, index) => (
                    <SelectItem key={index} value={course}>
                      {course.title}
                    </SelectItem>
                  ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
        {newNote.course_id && (
          <Select onValueChange={(value) => onSelectHanlder(value, "stream")}>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select University" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select University</SelectLabel>
                {streams &&
                  streams.map((stream, index) => (
                    <SelectItem key={index} value={stream}>
                      {stream.title}
                    </SelectItem>
                  ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
        {newNote.stream_id && (
          <Select onValueChange={(value) => onSelectHanlder(value, "semester")}>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select University" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select University</SelectLabel>
                {semesters &&
                  semesters.map((semester, index) => (
                    <SelectItem key={index} value={semester}>
                      {semester.title}
                    </SelectItem>
                  ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
        {newNote.semester_id && (
          <Select onValueChange={(value) => onSelectHanlder(value, "subject")}>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select University" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select University</SelectLabel>
                {subjects &&
                  subjects.map((subject, index) => (
                    <SelectItem key={index} value={subject}>
                      {subject.title}
                    </SelectItem>
                  ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}

        <DropFile file={note} setFile={setNote} />
        <Label htmlFor="name">Name</Label>
        <Input
          placeholder="example.pdf"
          name="name"
          type="text"
          id="name"
          // value={newNote.name}
          onChange={({ target: { value } }) => {
            setNewNote((prev) => ({
              ...prev,
              name: value,
            }));
          }}
        />
        <p>progress : {progress.toString()}%</p>

        <Button onClick={uploadNote}>Upload</Button>
      </Card>
    </div>
  );
};

export default Upload;
