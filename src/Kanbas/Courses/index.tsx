import { Navigate, Route, Routes } from "react-router-dom";
import CourseNavigation from "./Navigation";
import './index.css';
import TopNavigation from "./TopNavigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";

function Courses() {
  return (
    <>
        <TopNavigation />

        <hr className="mt-0 mb-4 me-2"/>
        <div className="overflow-y-scroll position-sticky">
          <CourseNavigation />
        </div>
        
        <div
          className="overflow-y-scroll position-fixed bottom-0 end-0"
          style={{ left: "280px", top: "95px" }} >
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Piazza" element={<h1>Piazza</h1>} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Assignments/:assignmentId" element={<h1>Assignment Editor</h1>} />
            <Route path="Grades" element={<h1>Grades</h1>} />
          </Routes>
        </div>
    </>
  );
}

export default Courses;