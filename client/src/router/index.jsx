import {
  Route,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

// pages
import Home from "../pages/Home";
import Admin from "../pages/Admin";
import Dashboard from "../pages/Dashboard";

import AuthRoute from "../layout/AuthRoute";
import Streams from "../pages/Streams";
import Notes from "../pages/Notes";
import Semesters from "../pages/Semester";
import Subjects from "../pages/Subjects";
import Note from "../pages/Note";
import Test from "../pages/Test";
import Upload from "../pages/Upload";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="streams" element={<Streams />} />
      <Route path="semesters" element={<Semesters />} />
      <Route path="subjects" element={<Subjects />} />
      <Route path="admin" element={<Admin />} />
      <Route path="/notes" element={<Notes />} />
      <Route path="/notes/:noteId" element={<Note />} />
      <Route path="/test" element={<Test />} />
      <Route element={<AuthRoute />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="upload" element={<Upload />} />
      </Route>
    </>
  )
);

export default router;
