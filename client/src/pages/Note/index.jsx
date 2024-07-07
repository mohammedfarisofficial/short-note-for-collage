import "./style.scss";
import Navbar from "../../components/Navbar";
import Header from "../../components/Header";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

import Button from "../../components/Button";

const firebasePDFUrl =
  "https://res.cloudinary.com/dhiy3e35c/image/upload/v1720282006/KTU_S3_Discrete_Mathematic_Syllabus_-_kerala_Notes_nbfeum.pdf"; // Your Firebase PDF URL
const errfirebasePDFUrl =
  "https://res.cloudinary.com/dhiy3e35c/imagee/upload/v1720282006/KTU_S3_Discrete_Mathematic_Syllabus_-_kerala_Notes_nbfeum.pdf"; // Your Firebase PDF URL

const Note = () => {
  return (
    <div className="note-container">
      <Navbar />
      <Header
        text="example.pdf"
        subText="Click the Download"
        renderAction={<Button>Download</Button>}
      />
      <Viewer theme="black" fileUrl={errfirebasePDFUrl} />
    </div>
  );
};

export default Note;
