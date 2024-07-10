import "./style.scss";
import axios from "axios";
import { Navigate, redirect, useLocation, useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Header from "../../components/Header";
import ListItem from "../../components/ListItem";
import { useEffect, useState } from "react";

export const ktuStreams = [
  { id: "01", stream: "Civil Engineering" },
  { id: "02", stream: "Mechanical Engineering" },
  {
    id: "03",
    stream:
      "Electrical and Electronics Engineering Electrical and Electronics Engineering",
  },
  { id: "04", stream: "Electronics and Communication Engineering" },
  { id: "05", stream: "Computer Science and Engineering" },
  { id: "06", stream: "Information Technology" },
  { id: "07", stream: "Applied Electronics and Instrumentation" },
  { id: "08", stream: "Chemical Engineering" },
  { id: "09", stream: "Aeronautical Engineering" },
  { id: "10", stream: "Automobile Engineering" },
  { id: "11", stream: "Biomedical Engineering" },
  { id: "12", stream: "Biotechnology Engineering" },
  { id: "13", stream: "Food Technology" },
  { id: "14", stream: "Industrial Engineering" },
  { id: "15", stream: "Marine Engineering" },
  { id: "16", stream: "Metallurgical and Materials Engineering" },
  { id: "17", stream: "Mining Engineering" },
  { id: "18", stream: "Naval Architecture and Shipbuilding" },
  { id: "19", stream: "Petroleum Engineering" },
  { id: "20", stream: "Polymer Engineering" },
  { id: "21", stream: "Production Engineering" },
  { id: "22", stream: "Robotics and Automation" },
  { id: "23", stream: "Safety and Fire Engineering" },
  { id: "24", stream: "Textile Technology" },
];

const defaultCourseId = "668aa0362f5f082ad2f00458";

const Streams = () => {
  const [streams, setStreams] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location?.state) {
      navigate("/");
      return;
    }
    console.log("Course", location?.state?.course);
  }, [location]);

  const fetchStreams = async () => {
    try {
      console.log("calling fetch");
      const response = await axios.get(
        `http://localhost:3001/api/v1/stream/${defaultCourseId}`
      );
      const { data, status } = response;
      if (status === 200) {
        console.log(data);
        setStreams(data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchStreams();
  }, []);

  const navigation = (streamid) => {
    navigate("/semesters", { state: { streamid } });
  };
  return (
    <div className="streams-container">
      <Navbar />
      <Header
        text="Select your stream"
        subText={`listed the streams of ${location?.state?.course} under ${location?.state?.university}`}
      />
      {location?.state && (
        <div className="streams-list">
          {streams ? (
            <>
              {streams?.map((stream, index) => (
                <ListItem
                  {...stream}
                  onClick={() => navigation(stream._id)}
                  key={index}
                />
              ))}
            </>
          ) : (
            <p>No Streams</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Streams;
