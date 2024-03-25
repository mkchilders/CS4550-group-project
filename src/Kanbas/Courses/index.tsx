import { Navigate, Route, Routes, useParams } from "react-router-dom";
import CourseNavigation from "./Navigation";
import "./index.css";
import TopNavigation from "./TopNavigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import Quizzes from "./Quiz";
import QuizDetails from "./Quiz/quizDetails";
import QuizPreview from "./Quiz/preview";
import QuizEdit from "./Quiz/edit";

function Courses({ courses }: any) {
  const { courseId } = useParams();
  const course = courses.find((course: any) => course._id === courseId);
  return (
    <>
      <TopNavigation course={course} />

      <div className="d-flex">
        <CourseNavigation />
        <div className="flex-grow-1 px-2">
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Piazza" element={<h1>Piazza</h1>} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Quizzes" element={<Quizzes />} />
            <Route
              path="Assignments/:assignmentId"
              element={<h1>Assignment Editor</h1>}
            />
            <Route path="Quizzes/:quizId" element={<QuizDetails />} />
            <Route path="Quizzes/:quizId/Preview" element={<QuizPreview />} />
            <Route path="Quizzes/:quizId/Edit" element={<QuizEdit />} />
            <Route path="Grades" element={<h1>Grades</h1>} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default Courses;
