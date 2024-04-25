import { Navigate, Route, Routes } from "react-router-dom";
import QuizList from "./list";
import QuizDetails from "./quizDetails";
import QuizPreview from "./preview";
import QuizEdit from "./edit";

function Quizzes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="Home" />} />
        <Route path="Home" element={<QuizList />} />
        <Route path=":quizId" element={<QuizDetails />} />
        <Route path=":quizId/Preview" element={<QuizPreview />} />
        <Route path=":quizId/Edit" element={<QuizEdit />} />
      </Routes>
    </div>
  );
}
export default Quizzes;
