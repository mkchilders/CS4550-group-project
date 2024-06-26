import { useParams } from "react-router";
import { KanbasState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { FaCheckCircle, FaEllipsisV, FaPencilAlt } from "react-icons/fa";
import { updateQuiz, setQuiz } from "./quizReducer";
import "./index.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import * as client from "./client";

function QuizDetails() {
  const { quizId } = useParams();
  const quiz = useSelector((state: KanbasState) => state.quizReducer.quiz);
  const booleanToString = (bool: boolean) => {
    return bool ? "Yes" : "No";
  };

  const dispatch = useDispatch();

  const handleUpdateQuiz = async () => {
    const status = await client.updateQuiz(quiz);
    dispatch(updateQuiz(quiz));
  };

  const handlePublishQuiz = () => {
    const publishQuiz = { ...quiz, isPublished: !quiz.isPublished };
    client.updateQuiz(publishQuiz).then((status) => {
      dispatch(updateQuiz(publishQuiz));
      dispatch(setQuiz(publishQuiz));
    });
  };

  useEffect(() => {
    client.findQuizById(quizId).then((res) => {
      return dispatch(setQuiz(res[0]));
    });
  }, []);

  return (
    <div className="flex-fill ms-3">
      <div className="btn-toolbar column-gap-1 justify-content-end">
        {quiz.isPublished ? (
          <button
            type="button"
            className="btn btn-success"
            onClick={handlePublishQuiz}
          >
            <FaCheckCircle className="mb-1" /> Published
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-danger"
            onClick={handlePublishQuiz}
          >
            Publish
          </button>
        )}
        <Link
          type="button"
          className="btn btn-outline-secondary"
          to={`/Kanbas/Courses/${quiz.course}/Quizzes/${quiz.id}/Preview`}
        >
          Preview
        </Link>
        <Link
          type="button"
          className="btn btn-outline-secondary"
          to={`/Kanbas/Courses/${quiz.course}/Quizzes/${quiz.id}/Edit`}
        >
          <FaPencilAlt className="mb-1" /> Edit
        </Link>
        <button type="button" className="btn btn-outline-secondary">
          <FaEllipsisV />
        </button>
      </div>

      <hr />

      <h2>{quiz.title}</h2>
      <div className="mt-3 column-gap-3 d-flex flex-row">
        <div className="fw-bold row-gap-3 text-end quiz-attribute ms-3">
          <div>Quiz Type</div>
          <div>Points</div>
          <div>Assignment Group</div>
          <div>Shuffle Answers</div>
          <div>Time Limit</div>
          <div>Multiple Attempts</div>
          <div>View Responses</div>
          <div>Show Correct Answers</div>
          <div>One Question at a Time</div>
          <div>Require Respondus LockDown Browser</div>
          <div>Required to View Quiz Results</div>
          <div>Webcam Required</div>
          <div>Lock Questions After Answering</div>
        </div>
        <div className="quiz-attribute">
          <div>{quiz.quizType}</div>
          <div>{quiz.points}</div>
          <div>{quiz.assignmentGroup}</div>
          <div>{booleanToString(quiz.shuffleAnswers)}</div>
          <div>{quiz.timeLimit} Minutes</div>
          <div>{booleanToString(quiz.multipleAttempts)}</div>
          <div>{quiz.viewResponses}</div>
          <div>{booleanToString(quiz.showCorrectAnswers)}</div>
          <div>{booleanToString(quiz.oneQuestionAtATime)}</div>
          <div>{booleanToString(quiz.requireRespondus)}</div>
          <div>{booleanToString(quiz.requiredViewResults)}</div>
          <div>{booleanToString(quiz.webcamRequired)}</div>
          <div>{booleanToString(quiz.lockQuestionsAfterAnswering)}</div>
        </div>
      </div>

      <table className="table mt-3 mb-4">
        <thead>
          <tr>
            <th>Due</th>
            <th>For</th>
            <th>Available From</th>
            <th>Until</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {new Date(quiz.dueDate).toDateString().slice(0, 10)} at{" "}
              {new Date(quiz.dueDate).toLocaleTimeString()}
            </td>
            <td>{quiz.for}</td>
            <td>
              {new Date(quiz.availableDate).toDateString().slice(0, 10)} at{" "}
              {new Date(quiz.availableDate).toLocaleTimeString()}
            </td>
            <td>
              {new Date(quiz.untilDate).toDateString().slice(0, 10)} at{" "}
              {new Date(quiz.untilDate).toLocaleTimeString()}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default QuizDetails;
