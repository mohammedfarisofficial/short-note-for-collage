import Stream from "../models/Stream.js";

const createStream = async (req, res) => {
  const { name, universityId, courseId } = req.body;
  const newStream = new Stream({ name, universityId, courseId });

  console.log("create Stream");

  try {
    const streamCreated = await newStream.save();
    if (streamCreated) {
      console.log("new univesity created", streamCreated);
    }
  } catch (err) {
    console.log(err);
  }
};

const getStreams = async (req, res) => {
  const { courseId } = req.params;
  try {
    if (courseId) {
      const streams = await Stream.find({ courseId });
      console.log("Streams", streams);
      if (streams) {
        res.status(200).json(streams);
      }
    }
  } catch (err) {
    console.error(err);
  }
};

export { createStream, getStreams };
