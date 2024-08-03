"use client";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { storage } from "@/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
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

const emptyNote = {
  university_id: "",
  course_id: "",
  stream_id: "",
  semester_id: "",
  subject_id: "",
  name: "",
  createdBy: "",
  downloadURL: "",
};

const Upload = () => {
  const [note, setNote] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { data: session, status } = useSession();
  const [newNote, setNewNote] = useState(emptyNote);
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
    setIsLoading(true);
    try {
      const response = await axios.post("/api/note", newNote);
      if (response.status === 201) {
        setNewNote(emptyNote);
        setNote(null);
        setProgress(0);
        toast({ title: "Note Uploaded" });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
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
        });
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
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
      return;
    }
    uploadPdf();
  }, [note]);

  useEffect(() => {
    if (status !== "authenticated") return;
    setNewNote((prev) => ({
      ...prev,
      createdBy: session.user._id,
    }));
  }, [session, status]);

  useEffect(() => {
    const areAllFieldsFilled = Object.values(newNote).every((value) => value !== "");
    setIsDisabled(!areAllFieldsFilled);
  }, [newNote]);

  return (
    <div className="w-full h-min-[110vh] flex items-center justify-start flex-col">
      <h2 className="mb-5">Upload a Note</h2>
      <Card className="flex gap-y-2 flex-col p-5">
        <Select onValueChange={(value) => onSelectHanlder(value, "university")}>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Select University" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select University</SelectLabel>
              {universities.map((university, index) => (
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
              <SelectValue placeholder="Select Course" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select Course</SelectLabel>
                {courses
                  .filter((course) => course.university_id === newNote.university_id)
                  .map((course, index) => (
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
              <SelectValue placeholder="Select Stream" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select Stream</SelectLabel>
                {streams
                  .filter((stream) => stream.course_id === newNote.course_id)
                  .map((stream, index) => (
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
              <SelectValue placeholder="Select Semester" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select Semester</SelectLabel>
                {semesters
                  .filter((semester) => semester.stream_id === newNote.stream_id)
                  .map((semester, index) => (
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
              <SelectValue placeholder="Select Subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select Subject</SelectLabel>
                {subjects
                  .filter((subject) => subject.semester_id === newNote.semester_id)
                  .map((subject, index) => (
                    <SelectItem key={index} value={subject}>
                      {subject.title}
                    </SelectItem>
                  ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
        <DropFile uploadProgress={progress} file={note} setFile={setNote} />
        <Label htmlFor="name">Name</Label>
        <Input
          placeholder="example.pdf"
          name="name"
          type="text"
          id="name"
          onChange={({ target: { value } }) => {
            setNewNote((prev) => ({
              ...prev,
              name: value,
            }));
          }}
        />
        <Button isLoading={isLoading} isDisabled={isDisabled} onClick={uploadNote}>
          Upload
        </Button>
      </Card>
    </div>
  );
};

export default Upload;
