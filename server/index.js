import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

//routes
import universityRouter from "./routes/university.js";
import courseRouter from "./routes/course.js";
import streamRouter from "./routes/stream.js";
import semesterRouter from "./routes/semester.js";
import subjectRouter from "./routes/subject.js";
import noteRouter from "./routes/note.js";
// import authRouter from "./routes/auth.js";

const app = express();

dotenv.config();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.get("/api/v1", async (req, res) => {
  res.send("blinko backend");
});

//routes
app.use("/api/v1/university", universityRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/stream", streamRouter);
app.use("/api/v1/semester", semesterRouter);
app.use("/api/v1/subject", subjectRouter);
app.use("/api/v1/note", noteRouter);
// app.use("/api/v1/auth", authRouter);

//db connection
mongoose.set("strictQuery", true);
mongoose
  .connect(
    process.env.MONGODB_URL || {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`server port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.log(`${err} : did not connect`));
