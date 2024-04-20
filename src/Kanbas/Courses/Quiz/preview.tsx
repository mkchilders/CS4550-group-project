import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../store";
import * as client from "./client";
import { setQuiz, updateQuiz } from "./quizReducer";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  FaCaretLeft,
  FaCaretRight,
  FaExclamationCircle,
  FaPencilAlt,
  FaRegQuestionCircle,
} from "react-icons/fa";
import "./index.css";
import { Link } from "react-router-dom";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";

function QuizPreview() {
  const { quizId } = useParams();
  const quiz = useSelector((state: KanbasState) => state.quizReducer.quiz);
  const [answers, setAnswers] = useState(
    new Array<Array<any>>(quiz.questions?.length)
  );
  const [currIndex, setCurrIndex] = useState(0);

  const date = new Date();
  const currDate = date.toDateString().slice(3, 10);
  const currTime = date.toLocaleTimeString("en-US");

  const dispatch = useDispatch();

  const handleUpdateQuiz = async () => {
    const status = await client.updateQuiz(quiz);
    dispatch(updateQuiz(quiz));
  };

  const addAnswer = (ans: any, addIndex: any) => {
    const newAnswers = answers;
    if (!newAnswers[currIndex]) {
      newAnswers[currIndex] = [];
    }
    newAnswers[currIndex][addIndex] = ans;
    setAnswers(newAnswers);
  };

  useEffect(() => {
    client.findQuizById(quizId).then((res) => {
      dispatch(setQuiz(res));
    });
  }, []);
  return (
    <div className="ms-2">
      <h2>{quiz?.title}</h2>
      <p className="alert alert-warning mt-3">
        <FaExclamationCircle className="mb-1 me-2" />
        This is a preview of the published version of the quiz.
      </p>
      <div>
        Started: {currDate} at {currTime}
      </div>
      <h3 className="mt-3">Quiz Instructions</h3>
      <hr />
      <div className="mt-4 d-flex flex-column align-items-center">
        <div className="wd-question flex-grow-1 w-75">
          <div className="fs-5">{quiz.questions?.[currIndex].title}</div>
          <p>
            <p>{quiz.questions?.[currIndex].question}</p>
            {quiz.questions?.[currIndex].type === "Fill in the Blank" &&
              quiz.questions[currIndex].blanks.map((b: any, bIndex: any) => {
                return (
                  <div className="mt-3">
                    <hr />
                    <div className="mb-3">
                      <label htmlFor="blank" className="fw-bold">
                        {bIndex + 1}.{" "}
                      </label>{" "}
                      <input
                        className="ms-2"
                        type="text"
                        name="blank"
                        id={bIndex}
                        onChange={(e) => addAnswer(e.target.value, bIndex)}
                        defaultValue={answers[currIndex]?.[bIndex]}
                      />
                    </div>
                  </div>
                );
              })}
            {quiz.questions?.[currIndex].type === "Multiple Choice" &&
              quiz.questions[currIndex].choices.map((c: any, cIndex: any) => {
                return (
                  <div className="mt-3">
                    <hr />
                    <div className="mb-3">
                      <input
                        type="radio"
                        name="blank"
                        id={cIndex}
                        onChange={() => addAnswer(c.id, 0)}
                        defaultChecked={
                          answers[currIndex] && answers[currIndex][0] === c.id
                        }
                      />
                      <label htmlFor="blank" className="ms-2">
                        {c.answer}
                      </label>
                    </div>
                  </div>
                );
              })}
            {quiz.questions?.[currIndex].type === "True/False" && (
              <>
                <hr />
                <input
                  type="radio"
                  id="correct"
                  name="correct"
                  className="me-2"
                  defaultChecked={
                    answers[currIndex] && answers[currIndex]?.[0] === true
                  }
                  onChange={() => addAnswer(true, 0)}
                />
                <label htmlFor="correct">True</label>
                <hr />
                <input
                  type="radio"
                  id="correct"
                  name="correct"
                  className="me-2"
                  defaultChecked={
                    answers[currIndex] && answers[currIndex]?.[0] === false
                  }
                  onChange={() => addAnswer(false, 0)}
                />
                <label htmlFor="correct" className="mb-3">
                  False
                </label>
              </>
            )}
          </p>
          {quiz?.questions?.[currIndex - 1] && (
            <button
              onClick={() => setCurrIndex(currIndex - 1)}
              className="btn btn-light btn-outline-secondary p-2 mb-3"
            >
              <FaCaretLeft className="mb-1" />
              <span className="mx-1">Back</span>
            </button>
          )}
          {quiz?.questions?.[currIndex + 1] && (
            <button
              onClick={() => setCurrIndex(currIndex + 1)}
              className="float-end btn btn-light btn-outline-secondary p-2 mb-3"
            >
              <span className="mx-1">Next</span>
              <FaCaretRight className="mb-1" />
            </button>
          )}{" "}
        </div>
      </div>
      <hr />
      <div className="d-block float-end mb-3 mt-2">
        <span>Quiz saved at {currTime} </span>
        <button className="btn btn-outline-secondary btn-light p-2 ms-3">
          <span className="mx-1">Submit Quiz</span>
        </button>
      </div>
      <br />
      <hr className="mt-5" />
      <Link
        to={`/Kanbas/Courses/${quiz.course}/Quizzes/${quiz.id}/Edit`}
        className="btn btn-outline-secondary btn-light w-100 mt-2"
      >
        <FaPencilAlt className="mb-1" /> Keep Editing This Quiz
      </Link>
      <h4 className="mt-4">Questions</h4>
      {quiz?.questions?.map((q: any, qIndex: any) => (
        <div className="mt-1">
          <FaRegQuestionCircle className="mb-1 me-1" />
          <span
            className={
              "fs-6 text-danger " +
              (currIndex === qIndex ? "fw-bold" : "fw-normal")
            }
            onClick={() => setCurrIndex(qIndex)}
          >
            {q.title}
          </span>
        </div>
      ))}
      <br />
    </div>
  );
}

export default QuizPreview;
