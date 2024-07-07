import University from "../models/University.js";

const createUniversity = async (req, res) => {
  const { name } = req.body;
  const newUniversity = new University({ name });

  try {
    const universityCreated = await newUniversity.save();
    if (universityCreated) {
      console.log("new univesity created");
    }
  } catch (err) {
    console.log(err);
  }
};

export { createUniversity };
