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
  FaRocket,
  FaCheckCircle,
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
  const { courseId } = useParams();
  const quizList = useSelector(
    (state: KanbasState) => state.quizReducer.quizzes
  );
  const quiz = useSelector((state: KanbasState) => state.quizReducer.quiz);
  const dispatch = useDispatch();
  const [quizIsOpen, setQuizIsOpen] = useState(true);
  const newId = new Date().getTime().toString();

  const handleAddQuiz = () => {
    client.addQuiz(courseId, quiz, newId).then((q) => {
      dispatch(addQuiz(q));
    });
  };

  const handleDeleteQuiz = (quizId: any) => {
    client.deleteQuiz(quizId).then((status) => dispatch(deleteQuiz(quizId)));
  };

  const calculateAvailability = (quiz: any) => {
    const availableDate = Date.parse(quiz.availableDate);
    const untilDate = Date.parse(quiz.untilDate);
    const today = Date.now();

    if (today >= availableDate && today >= untilDate) {
      return <span className="me-3">Closed</span>;
    } else if (today <= untilDate && today >= availableDate) {
      return <span className="me-3">Available</span>;
    } else {
      return (
        <span className="me-3">
          Not Available Until{" "}
          <span className="fw-normal">
            {new Date(quiz.availableDate).toDateString().slice(0, 10)} at{" "}
            {new Date(quiz.availableDate).toLocaleTimeString()}
          </span>
        </span>
      );
    }
  };

  const handlePublishQuiz = (quiz: any) => {
    const publishQuiz = { ...quiz, isPublished: !quiz.isPublished };
    client.updateQuiz(publishQuiz).then((status) => {
      dispatch(updateQuiz(publishQuiz));
      dispatch(setQuiz(publishQuiz));
    });
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
            }}
            to={`/Kanbas/Courses/${courseId}/Quizzes/${newId}`}
          >
            <FaPlus /> Add Quiz
          </Link>
          <button className="btn btn-light btn-lg ms-1">
            <FaEllipsisV />
          </button>
        </div>
      </div>
      <hr />

      <ul className="list-group wd-modules">
        {quizIsOpen ? (
          <li className="list-group-item">
            <div onClick={() => setQuizIsOpen(!quizIsOpen)}>
              <FaCaretDown className="fs-5 me-3 mb-1" />
              Assignment Quizzes
            </div>

            {quizList.length > 1 ||
            (quizList.length === 1 && quizList[0].id !== -1) ? (
              <ul className="list-group">
                {quizList
                  .filter((quiz) => quiz.course === courseId)
                  .map((quiz) => (
                    <li key={quiz.id} className="list-group-item">
                      <div className="d-flex justify-content-between">
                        <span className="d-flex flex-row">
                          <FaRocket className="me-3 text-success mt-3" />
                          <div className="flex-column">
                            <Link
                              className="quiz-link"
                              to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz.id}`}
                            >
                              {quiz.title}
                            </Link>
                            <div className="quiz-details">
                              {calculateAvailability(quiz)}
                              <span className="me-3">
                                Due{" "}
                                <span className="fw-normal">
                                  {new Date(quiz.dueDate)
                                    .toDateString()
                                    .slice(0, 10)}{" "}
                                  at{" "}
                                  {new Date(quiz.dueDate).toLocaleTimeString()}
                                </span>
                              </span>
                              <span className="me-3 fw-normal">
                                {quiz.points} pts
                              </span>
                              <span className="me-3 fw-normal">
                                {quiz.questions.length} Questions
                              </span>
                            </div>
                          </div>
                        </span>
                        <span>
                          <div className="d-flex align-items-center mt-2">
                            <div onClick={() => handlePublishQuiz(quiz)}>
                              {quiz.isPublished ? (
                                <FaCheckCircle className="text-success me-3" />
                              ) : (
                                <FaBan className="me-3" />
                              )}
                            </div>
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
                                  onClick={() => handleDeleteQuiz(quiz.id)}
                                >
                                  Delete
                                </li>
                                <li
                                  className="dropdown-item"
                                  onClick={() => handlePublishQuiz(quiz)}
                                >
                                  {quiz.isPublished ? "Unpublish" : "Publish"}
                                </li>
                                <li className="dropdown-item">Copy</li>
                                <li className="dropdown-item">Sort</li>
                              </ul>
                            </div>
                          </div>
                        </span>
                      </div>
                    </li>
                  ))}
              </ul>
            ) : (
              <ul className="list-group">
                <li className="alert alert-warning">
                  There are no Quizzes yet. Click the Add Quiz button to add
                  Quizzes!
                </li>
              </ul>
            )}
          </li>
        ) : (
          <li
            className="list-group-item"
            onClick={() => setQuizIsOpen(!quizIsOpen)}
          >
            <div className="">
              <FaCaretRight className="fs-5 me-3 mb-1" />
              Assignment Quizzes
            </div>
          </li>
        )}
      </ul>
    </div>
  );
}

export default QuizList;
