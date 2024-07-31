"use client";
import { useEffect } from "react";
import { File, FileUp, CircleX } from "lucide-react";

const DropFile = ({ file, setFile }) => {
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const removeFileHandler = () => {
    setFile(null);
  };

  useEffect(() => {
    console.log(file);
  }, [file]);

  return (
    <div
      className={`w-[90%] h-[130px] my-5 dark:bg-[#1d1e24] bg-[#fff] rounded-lg flex justify-center items-center relative flex-col border border-dashed border-[#E1D1FA24] transition-all duration-200 ${
        file && "bg-[#892eff26]"
      }`}
    >
      {file ? (
        <>
          <div
            onClick={removeFileHandler}
            className="absolute top-4 right-4 cursor-pointer"
          >
            <CircleX />
          </div>
          <File />
          <p>{file?.name}</p>
          <p>Size: {(file?.size / 1024).toFixed(2)}KB</p>
        </>
      ) : (
        <>
          <FileUp />
          <p className="text-xs mt-2 text-[#66676b]">
            Drag & Drop or{" "}
            <span className="dark:text-white text-black">Choose file </span>
            to upload
          </p>
          <p className="text-xs text-[#66676b]">Maximum size: 25MB</p>
          <input
            accept="application/pdf"
            type="file"
            onChange={handleFileChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </>
      )}
    </div>
  );
};

export default DropFile;
