import Subject from "../models/Subject.js";

const createSubject = async (req, res) => {
  const { name, universityId, courseId, streamId, semesterId } = req.body;
  const newSub = new Subject({
    name,
    universityId,
    courseId,
    streamId,
    semesterId,
  });

  console.log("create newSub");

  try {
    const subCreated = await newSub.save();
    if (subCreated) {
      console.log("new univesity created", subCreated);
      return;
    }
  } catch (err) {
    console.log(err);
  }
};

export { createSubject };
