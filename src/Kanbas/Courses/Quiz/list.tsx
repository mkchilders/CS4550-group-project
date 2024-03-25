import { KanbasState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { FaBan, FaCaretDown, FaEllipsisV, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./index.css";

function QuizList() {
  // There are a list of quizzes
  const { courseId } = useParams();
  const quizList = useSelector(
    (state: KanbasState) => state.quizReducer.quizzes
  );
  const dispatch = useDispatch();

  return (
    <div className="flex-fill ms-3">
      <div className="d-flex justify-content-between">
        <input type="text" placeholder="Search for Quiz" />
        <div>
          <button className="btn btn-danger">
            <FaPlus /> Quiz
          </button>
          <button className="btn btn-light btn-lg ms-1">
            <FaEllipsisV />
          </button>
        </div>
      </div>
      <hr />
      <ul className="list-group">
        {quizList
          .filter((quiz) => quiz.course === courseId)
          .map((quiz) => (
            <li className="list-group-item">
              <div className="d-flex justify-content-between">
                <span>
                  <FaCaretDown className="me-3" />
                  <Link className="quiz-link" to={`/Kanbas/Courses/${quiz.course}/Quizzes/${quiz.id}`}>
                    {quiz.title} 
                  </Link>
                </span>
                <span>
                  <FaBan className="me-3" />
                  <button className="btn btn-light me-3">
                    <FaEllipsisV />
                  </button>
                </span>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default QuizList;
