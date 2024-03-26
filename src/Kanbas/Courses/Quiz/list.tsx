import { KanbasState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useState } from "react";
import {
  FaBan,
  FaCaretDown,
  FaEllipsisV,
  FaPlus,
  FaCaretRight,
  FaPoo,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function QuizList() {
  // There are a list of quizzes
  const { courseId } = useParams();
  const quizList = useSelector(
    (state: KanbasState) => state.quizReducer.quizzes
  );
  const dispatch = useDispatch();
  const [quizIsOpen, setQuizIsOpen] = useState(false);

  return (
    <div className="flex-fill ms-3">
      <div className="d-flex justify-content-between">
        <input type="text" placeholder="Search for Quiz" />
        <div>
          <Link
            className="btn btn-danger"
            to={`/Kanbas/Courses/${courseId}/Quizzes/addQuiz`}
          >
            <FaPlus /> Quiz
          </Link>
          <button className="btn btn-light btn-lg ms-1">
            <FaEllipsisV />
          </button>
        </div>
      </div>
      <hr />

      <ul className="list-group">
        {quizIsOpen ? (
          <li className="list-group-item">
            <p className="" onClick={() => setQuizIsOpen(!quizIsOpen)}>
              <span>
                <FaCaretDown size={20} className="me-3" />
              </span>
              Quizzes
            </p>

            {quizList.length > 1 ? (
              <ul className="list-group">
                {quizList
                  .filter((quiz) => quiz.course === courseId)
                  .map((quiz) => (
                    <li className="list-group-item">
                      <div className="d-flex justify-content-between">
                        <span>
                          <FaPoo size={30} className="me-3" />
                          <Link
                            className="quiz-link"
                            to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz.id}`}
                          >
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
            ) : (
              <p className="alert alert-warning">
                There is no Quiz yet. Click the Add Quiz button to add Quizzes!
              </p>
            )}
          </li>
        ) : (
          <li className="list-group-item">
            <p onClick={() => setQuizIsOpen(!quizIsOpen)}>
              <span>
                <FaCaretRight size={20} className="me-3" />
              </span>
              Quizzes
            </p>
          </li>
        )}
      </ul>
    </div>
  );
}

export default QuizList;
