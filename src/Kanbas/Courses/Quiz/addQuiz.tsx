import { useDispatch, useSelector } from "react-redux";
import { addQuiz } from "./quizReducer";
import { FaPlus } from "react-icons/fa";
import { KanbasState } from "../../store";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

function AddQuiz() {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const quiz = useSelector((state: KanbasState) => state.quizReducer.quiz);
  return (
    <>
      <h3>Add Quiz</h3>
      <button
        className="btn btn-danger"
        onClick={() => {
          dispatch(addQuiz({ ...quiz, title: "new Quiz", course: courseId }));
          alert("Success: Quiz Added!");
        }}
      >
        <FaPlus /> Add Quiz
      </button>
      <Link
        className="btn btn-success ms-3"
        to={`/Kanbas/Courses/${courseId}/Quizzes/`}
      >
        Back
      </Link>
    </>
  );
}

export default AddQuiz;
