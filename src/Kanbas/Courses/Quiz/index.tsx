import { Navigate, Route, Routes, useParams } from "react-router-dom";
import QuizList from "./list";
import QuizDetails from "./quizDetails";
import QuizPreview from "./preview";
import QuizEdit from "./edit";
import AddQuiz from "./addQuiz";

function Quizzes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="home" />} />
        <Route path="home" element={<QuizList />} />
        <Route path="addQuiz" element={<AddQuiz />} />
        <Route path=":quizId" element={<QuizDetails />} />
        <Route path=":quizId/Preview" element={<QuizPreview />} />
        <Route path=":quizId/Edit" element={<QuizEdit />} />
      </Routes>
    </div>
  );
}
export default Quizzes;
