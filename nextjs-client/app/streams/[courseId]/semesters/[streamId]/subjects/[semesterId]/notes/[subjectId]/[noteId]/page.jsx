"use client";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";

const Note = () => {
  const { noteId } = useParams();
  const { notes } = useSelector((state) => state.data.universities);

  const getBySlug = notes.filter((note) => note?.slug === noteId)[0];
  return (
    <div className="w-full h-[100vh] flex items-center justify-center flex-col">
      <p>{noteId}</p>
      <p>{JSON.stringify(getBySlug)}</p>
    </div>
  );
};

export default Note;
