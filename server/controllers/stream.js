import Stream from "../models/Stream.js";

const createStream = async (req, res) => {
  const { name, universityId, courseId } = req.body;
  const newStream = new Stream({ name, universityId, courseId });

  console.log("create Stream")

  try {
    const streamCreated = await newStream.save();
    if (streamCreated) {
      console.log("new univesity created", streamCreated);
      return;
    }
  } catch (err) {
    console.log(err);
  }
};

export { createStream };
