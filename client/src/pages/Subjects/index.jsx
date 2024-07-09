import "./style.scss";

import Navbar from "../../components/Navbar";
import Header from "../../components/Header";
import ListItem from "../../components/ListItem";

const subjects = [
  { id: "02", subject: "Engineering Physics" },
  { id: "03", subject: "Engineering Chemistry" },
  { id: "04", subject: "Engineering Mechanics" },
  { id: "05", subject: "Basics of Civil & Mechanical Engineering" },
  { id: "06", subject: "Basics of Electrical & Electronics Engineering" },
];

const Subjects = () => {
  return (
    <div className="subjects-container">
      <Navbar />
      <Header
        text="Select your subject"
        subText={`listed the semester of B.tech`}
      />
      <div className="subjects-list">
        {subjects?.map((subject, index) => (
          <ListItem path="/notes" title={subject.subject} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Subjects;
