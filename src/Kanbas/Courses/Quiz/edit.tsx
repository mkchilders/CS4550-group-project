import { Link, useParams } from "react-router-dom";
import EditDetails from "./editDetails";
import { FaBan, FaCheck, FaEllipsisV } from "react-icons/fa";
import EditQuestions from "./editQuestions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setQuiz } from "./quizReducer";
import * as client from "./client";
import { KanbasState } from "../../store";
import "./index.css";

function QuizEdit() {
  const { quizId } = useParams();
  const quiz = useSelector((state: KanbasState) => state.quizReducer.quiz);

  const dispatch = useDispatch();

  useEffect(() => {
    client.findQuizById(quizId).then((res) => {
      dispatch(setQuiz(res[0]));
    });
  }, []);
  return (
    <>
      <div className="d-flex justify-content-end">
        <span className="mt-2">Points 0</span>
        {!quiz.isPublished ? (
          <span className="mt-2">
            <FaBan className="mb-1 ms-3" /> Not Published
          </span>
        ) : (
          <span className="mt-2">
            <FaCheck className="mb-1 ms-3" /> Published
          </span>
        )}
        <button className="btn btn-light btn-outline-secondary ms-3">
          <FaEllipsisV className="my-1" />
        </button>
      </div>
      <hr />
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a
            className="nav-link text-danger active"
            href="#details"
            data-bs-toggle="tab"
          >
            Details
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link text-danger"
            href="#questions"
            data-bs-toggle="tab"
          >
            Questions
          </a>
        </li>
      </ul>
      <div className="tab-content">
        <div className="tab-pane fade show active" id="details">
          <EditDetails />
        </div>
        <div className="tab-pane fade" id="questions">
          <EditQuestions />
        </div>
      </div>
    </>
  );
}

export default QuizEdit;
