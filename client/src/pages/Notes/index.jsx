import "./style.scss";
import Navbar from "../../components/Navbar";
import Header from "../../components/Header";
import PDFItem from "../../components/PDFItem";
import useDimension from "../../hooks/useDimension";

const Notes = () => {
  const { isMobile } = useDimension();
  return (
    <div className="notes-container">
      <Navbar />
      <Header
        text="Select your semester"
        subText={`listed the semester of B.tech`}
      />
      <div className={`notes-list ${isMobile && "note-list-mobile"}`}>
        <PDFItem />
        <PDFItem />
        <PDFItem />
        <PDFItem />
        <PDFItem />
        <PDFItem />
        <PDFItem />
        <PDFItem />
        <PDFItem />
        <PDFItem />
        <PDFItem />
        <PDFItem />
        <PDFItem />
        <PDFItem />
      </div>
    </div>
  );
};

export default Notes;
