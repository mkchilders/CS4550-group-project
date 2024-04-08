import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { KanbasState } from "../../store";
import { useState } from "react";
import * as client from "./client";

function EditDetails() {
  const { quizId } = useParams();
  const quiz = useSelector((state: KanbasState) => state.quizReducer.quiz);
  const [updateQuiz, setUpdateQuiz] = useState(quiz);

  const handleSave = () => {};

  const booleanToString = (bool: boolean) => {
    return bool ? "Yes" : "No";
  };

  return (
    <>
      <h2>
        <input
          value={quiz.title}
          onChange={(e) => setUpdateQuiz({ ...quiz, title: e.target.value })}
        />
      </h2>
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
          <div>{quiz.showCorrectAnswers}</div>
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
            <td>{quiz.dueDate}</td>
            <td>{quiz.for}</td>
            <td>{quiz.availableDate}</td>
            <td>{quiz.untilDate}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default EditDetails;
