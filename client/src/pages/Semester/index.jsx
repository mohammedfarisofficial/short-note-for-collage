import "./style.scss";

import Navbar from "../../components/Navbar";
import Header from "../../components/Header";
import ListItem from "../../components/ListItem";

const semesters = [
  { id: "01", semester: "S1" },
  { id: "01", semester: "S2" },
  { id: "01", semester: "S3" },
  { id: "01", semester: "S4" },
  { id: "01", semester: "S5" },
  { id: "01", semester: "S6" },
  { id: "01", semester: "S7" },
  { id: "01", semester: "S8" },
];

const Semesters = () => {
  return (
    <div className="semesters-container">
      <Navbar />
      <Header
        text="Select your semester"
        subText={`listed the semester in Computer science and engineering`}
      />
      <div className="semesters-list">
        {semesters?.map((semester, index) => (
          <ListItem path="/subjects" title={semester.semester} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Semesters;
