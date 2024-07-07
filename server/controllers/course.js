import Course from "../models/Course.js";

const createCourse = async (req, res) => {
  const { name, universityId } = req.body;
  const newCourse = new Course({ name, universityId });

  try {
    const courseCreated = await newCourse.save();
    if (courseCreated) {
      console.log("new univesity created", courseCreated);
      return;
    }
  } catch (err) {
    console.log(err);
  }
};

export { createCourse };
