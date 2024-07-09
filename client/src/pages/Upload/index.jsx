import { useEffect, useState } from "react";
import Button from "../../components/Button";
import InputBox from "../../components/InputBox";
import Navbar from "../../components/Navbar";
import "./style.scss";
import DropFile from "../../components/DropFile";

const courses = [
  { id: "01", course: "B.Tech" },
  { id: "02", course: "B.Arch" },
  { id: "03", course: "B.Sc" },
  { id: "04", course: "B.Com" },
  { id: "05", course: "BBA" },
  { id: "06", course: "BCA" },
  { id: "07", course: "LLB" },
  { id: "08", course: "B.Ed" },
  { id: "09", course: "B.Pharm" },
  { id: "10", course: "M.Tech" },
  { id: "11", course: "M.Sc" },
  { id: "12", course: "M.Com" },
  { id: "13", course: "MBA" },
  { id: "14", course: "MCA" },
  { id: "15", course: "M.Phil" },
  { id: "16", course: "Ph.D" },
];
const Upload = () => {
  const [name, setName] = useState("");
  const [pdfFile, setPdfFile] = useState(null);

  const [universityId, setUniversityId] = useState("");
  const [streamId, setStreamId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [semesterId, setSemesterId] = useState("");
  const [subjectId, setSubjectId] = useState("");

  const uploadFile = async () => {
    console.log(
      pdfFile.name,
      universityId,
      streamId,
      courseId,
      semesterId,
      subjectId,
      name
    );
  };

  const onSelect = (e, setValue) => {
    setValue(e.target.value);
  };

  return (
    <div className="upload-container">
      <Navbar />
      <div className="inner-container admin-form">
        <h2>Upload File</h2>
        <p className="desc">Fill the form</p>
        <label htmlFor="">name</label>
        <InputBox value={name} setValue={setName} />
        <label htmlFor="">University</label>
        <select onChange={(e) => onSelect(e, setUniversityId)}>
          {courses?.map((item, index) => (
            <option key={index} value={item.course}>
              {item.course}
            </option>
          ))}
        </select>

        {universityId && (
          <>
            <label htmlFor="">Stream</label>
            <select onChange={(e) => onSelect(e, setStreamId)}>
              {courses?.map((item, index) => (
                <option key={index} value={item.course}>
                  {item.course}
                </option>
              ))}
            </select>
          </>
        )}
        {streamId && (
          <>
            <label htmlFor="">Semester</label>
            <select onChange={(e) => onSelect(e, setSemesterId)}>
              {courses?.map((item, index) => (
                <option key={index} value={item.course}>
                  {item.course}
                </option>
              ))}
            </select>
          </>
        )}

        {semesterId && (
          <>
            <label htmlFor="">Course</label>
            <select onChange={(e) => onSelect(e, setCourseId)}>
              {courses?.map((item, index) => (
                <option key={index} value={item.course}>
                  {item.course}
                </option>
              ))}
            </select>
          </>
        )}

        {courseId && (
          <>
            <label htmlFor="">Subject</label>
            <select onChange={(e) => onSelect(e, setSubjectId)}>
              {courses?.map((item, index) => (
                <option key={index} value={item.course}>
                  {item.course}
                </option>
              ))}
            </select>
          </>
        )}
        {subjectId && (
          <>
            <label htmlFor="">Select file</label>
            <DropFile file={pdfFile} setFile={setPdfFile} />
          </>
        )}
        <Button onClick={uploadFile}>Login</Button>
      </div>
    </div>
  );
};

export default Upload;
