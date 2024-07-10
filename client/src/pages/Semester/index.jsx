import "./style.scss";

import Navbar from "../../components/Navbar";
import Header from "../../components/Header";
import ListItem from "../../components/ListItem";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

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
  const [semesters, setSemesters] = useState(null);

  const location = useLocation();

  const fetchSemesters = async () => {
    try {
      console.log("calling fetch");
      const response = await axios.get(
        `http://localhost:3001/api/v1/semester/${location?.state?.streamid}`
      );
      const { data, status } = response;
      if (status === 200) {
        console.log(data);
        setSemesters(data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchSemesters();
  }, []);

  return (
    <div className="semesters-container">
      <Navbar />
      <Header
        text="Select your semester"
        subText={`listed the semester in Computer science and engineering`}
      />
      <div className="semesters-list">
        {semesters ? (
          <>
            {semesters?.map((semester, index) => (
              <ListItem
                {...semester}
                onClick={() => navigation(semester._id)}
                key={index}
              />
            ))}
          </>
        ) : (
          <p>No Sem</p>
        )}
      </div>
    </div>
  );
};

export default Semesters;
