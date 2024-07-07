import Semester from "../models/Semester.js";

const createSemester = async (req, res) => {
  const { name, universityId, courseId, streamId } = req.body;
  const newSem = new Semester({ name, universityId, courseId, streamId });

  console.log("create sem");

  try {
    const semCreated = await newSem.save();
    if (semCreated) {
      console.log("new univesity created", semCreated);
      return;
    }
  } catch (err) {
    console.log(err);
  }
};

export { createSemester };
