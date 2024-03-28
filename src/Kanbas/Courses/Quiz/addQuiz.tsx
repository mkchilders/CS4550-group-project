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
  const new_id = new Date().getTime().toString();
  return (
    <>
      <Link
        className="btn btn-danger"
        onClick={() => {
          dispatch(
            addQuiz({
              ...quiz,
              id: new_id,
              title: "new Quiz",
              course: courseId,
            })
          );
          alert("Success: Quiz Added!");
        }}
        to={`/Kanbas/Courses/${courseId}/Quizzes/${new_id}`}
      >
        <FaPlus /> Add Quiz
      </Link>
    </>
  );
}

export default AddQuiz;
