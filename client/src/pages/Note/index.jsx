import "./style.scss";
import Navbar from "../../components/Navbar";
import Header from "../../components/Header";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

import Button from "../../components/Button";

const firebasePDFUrl =
  "https://firebasestorage.googleapis.com/v0/b/blinko-4f62f.appspot.com/o/pdfefasdf-blinko.pdf?alt=media&token=94847b91-d1f9-4927-bc79-a3516962eff1"; // Your Firebase PDF URL
const errfirebasePDFUrl =
  "https://res.cloudinary.com/dhiy3e35c/image/upload/v1720282006/KTU_S3_Discrete_Mathematic_Syllabus_-_kerala_Notes_nbfeum.pdf"; // Your Firebase PDF URL

const Note = () => {
  return (
    <div className="note-container">
      <Navbar />
      <Header
        text="example.pdf"
        subText="Click the Download"
        renderAction={<Button>Download</Button>}
      />
      <Viewer theme="black" fileUrl={firebasePDFUrl} />
    </div>
  );
};

export default Note;
