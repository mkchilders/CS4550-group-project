import { KanbasState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import {
  FaBan,
  FaCaretDown,
  FaEllipsisV,
  FaPlus,
  FaCaretRight,
  FaPoo,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  addQuiz,
  deleteQuiz,
  updateQuiz,
  setQuiz,
  setQuizzes,
} from "./quizReducer";
import * as client from "./client";

function QuizList() {
  // There are a list of quizzes
  const { courseId } = useParams();
  const quizList = useSelector(
    (state: KanbasState) => state.quizReducer.quizzes
  );
  const quiz = useSelector((state: KanbasState) => state.quizReducer.quiz);
  const dispatch = useDispatch();
  const [quizIsOpen, setQuizIsOpen] = useState(false);
  const new_id = new Date().getTime().toString();

  const handleAddQuiz = () => {
    client.addQuiz(courseId, quiz).then((quiz) => {
      dispatch(addQuiz(quiz));
    });
  };

  const handelDeleteQuiz = (quizId: any) => {
    client.deleteQuiz(quizId).then((status) => dispatch(deleteQuiz(quizId)));
  };

  useEffect(() => {
    client
      .findQuizzesForCourses(courseId)
      .then((quizzes) => dispatch(setQuizzes(quizzes)));
  }, [courseId]);

  return (
    <div className="flex-fill ms-3">
      <div className="d-flex justify-content-between">
        <input type="text" placeholder="Search for Quiz" />
        <div>
          <Link
            className="btn btn-danger"
            onClick={() => {
              handleAddQuiz();
              alert("Success: Quiz Added!");
            }}
            to={`/Kanbas/Courses/${courseId}/Quizzes/${new_id}`}
          >
            <FaPlus /> Add Quiz
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

            {quizList.length > 1 ||
            (quizList.length == 1 && quizList[0].id !== -1) ? (
              <ul className="list-group">
                {quizList
                  .filter((quiz) => quiz.course === courseId)
                  .map((quiz) => (
                    <li key={quiz.id} className="list-group-item">
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
                          <div className="d-flex align-items-center">
                            <FaBan color={"red"} className="me-3" />
                            <div className="dropdown">
                              <button
                                className="btn btn-outline-secondary dropdown-toggle"
                                type={"button"}
                                data-bs-toggle={"dropdown"}
                                aria-expanded={"false"}
                              >
                                <FaEllipsisV />
                              </button>
                              <ul className="dropdown-menu">
                                <Link
                                  className="text-decoration-none"
                                  to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz.id}/Edit`}
                                >
                                  <li className="dropdown-item">Edit</li>
                                </Link>
                                <li
                                  className="dropdown-item"
                                  // onClick={() => dispatch(deleteQuiz(quiz.id))}
                                  onClick={() => handelDeleteQuiz(quiz.id)}
                                >
                                  Delete
                                </li>
                                <li className="dropdown-item">Publish</li>
                                <li className="dropdown-item">Copy</li>
                                <li className="dropdown-item">Sort</li>
                              </ul>
                            </div>
                          </div>
                        </span>
                      </div>
                      <div>
                        <h5>
                          {quiz.points} pts, {quiz.questions.length} Questions
                        </h5>
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
