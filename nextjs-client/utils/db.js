import mongoose from "mongoose";

const connect = async () => {
  if (mongoose.connections[0].readyState) return;

  try {
    const connected = await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB connected!")
  } catch (err) {
    throw new Error(`Error connecting to Mongoose ${err.message}`);
  }
};

export default connect;
