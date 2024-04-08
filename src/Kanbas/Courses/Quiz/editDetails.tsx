import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { KanbasState } from "../../store";
import { useState } from "react";
import * as client from "./client";
import { useEffect } from "react";
import { updateQuiz, setQuiz } from "./quizReducer";

function EditDetails() {
  const { quizId } = useParams();
  const quiz = useSelector((state: KanbasState) => state.quizReducer.quiz);
  const [updatedQuiz, setUpdatedQuiz] = useState(quiz);
  const dispatch = useDispatch();

  const handleSave = () => {
    console.log("passing id to client: ", updatedQuiz);
    client.updateQuiz(updatedQuiz).then((res) => dispatch(updateQuiz(res)));
  };

  const booleanToString = (bool: boolean) => {
    return bool ? "Yes" : "No";
  };

  useEffect(() => {
    client.findQuizById(quizId).then((res) => {
      dispatch(setQuiz(res));
    });
  }, []);

  return (
    <>
      <h2>{quiz.title}</h2>
      <div className="mt-3 column-gap-3 d-flex flex-row">
        <div className="fw-bold row-gap-3 text-end quiz-attribute ms-3">
          <div>Title</div>
          <div>Quiz Type</div>
          <div>Description</div>
          <div>Points</div>
          <div>Assignment Group</div>
          <div>Shuffle Answers</div>
          <div>Time Limit</div>
          <div>Multiple Attempts</div>
          <div>Show Correct Answers</div>
          <div>Access Code</div>
          <div>One Question at a Time</div>
          <div>Webcam Required</div>
          <div>Lock Questions After Answering</div>
        </div>
        <div className="quiz-attribute">
          <div>
            <input
              placeholder={quiz.title}
              onChange={(e) =>
                setUpdatedQuiz({ ...quiz, title: e.target.value })
              }
            />
          </div>
          <div>
            <select>
              <option value="Graded Quiz">Graded Quiz</option>
              <option value="Practice Quiz">Practice Quiz</option>
              <option value="Graded Survey">Graded Survey</option>
              <option value="Ungraded Survey">Ungraded Survey</option>
            </select>
          </div>
          <div>
            <textarea value={quiz.Description} />
          </div>
          <div>
            <input
              placeholder={quiz.points}
              onChange={(e) =>
                setUpdatedQuiz({ ...quiz, points: e.target.value })
              }
            />
          </div>
          <div>
            <select>
              <option value="Quizzes">Quizzes</option>
              <option value="Exams">Exams</option>
              <option value="Assignments">Assignments</option>
              <option value="Project">Project</option>
            </select>
          </div>
          <div>
            <select>
              <option value="True">Yes</option>
              <option value="False">No</option>
            </select>
          </div>
          <div>
            <input
              type="number"
              placeholder={quiz.timeLimit}
              onChange={(e) =>
                setUpdatedQuiz({ ...quiz, timeLimit: e.target.value })
              }
            />
            Minutes
          </div>
          <div>
            <select>
              <option value="True">Yes</option>
              <option value="False">No</option>
            </select>
            {booleanToString(quiz.multipleAttempts)}
          </div>
          <div>{quiz.showCorrectAnswers}</div>
          <div>
            <input
              value={quiz.accessCode}
              onChange={(e) =>
                setUpdatedQuiz({ ...quiz, accessCode: e.target.value })
              }
            />
          </div>
          <div>
            <select>
              <option value="True">Yes</option>
              <option value="False">No</option>
            </select>
            {booleanToString(quiz.oneQuestionAtATime)}
          </div>
          <div>
            <select>
              <option value="False">No</option>
              <option value="True">Yes</option>
            </select>
            {booleanToString(quiz.webcamRequired)}
          </div>
          <div>
            {" "}
            <select>
              <option value="False">No</option>
              <option value="True">Yes</option>
            </select>
            {booleanToString(quiz.requiredViewResults)}
          </div>
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
              <input
                value={quiz.dueDate}
                type="date"
                onChange={(e) =>
                  setUpdatedQuiz({ ...quiz, dueDate: e.target.value })
                }
              />
            </td>
            <td>{quiz.for}</td>
            <td>
              <input
                value={quiz.availableDate}
                type="date"
                onChange={(e) =>
                  setUpdatedQuiz({ ...quiz, availableDate: e.target.value })
                }
              />
            </td>
            <td>
              <input
                value={quiz.untilDate}
                type="date"
                onChange={(e) =>
                  setUpdatedQuiz({ ...quiz, untilDate: e.target.value })
                }
              />
            </td>
          </tr>
        </tbody>
      </table>

      <hr />
      <div className="d-flex">
        <input type="checkbox" />
        <h6> Notify Users this quiz has changed </h6>
        <button
          className="btn btn-light btn-sm border border-1 me-2"
          onClick={handleSave}
        >
          Cancle
        </button>
        <button
          className="btn btn-light btn-sm border border-1 me-2"
          onClick={handleSave}
        >
          Save and Publish
        </button>
        <button
          className="btn btn-danger btn-sm border border-1"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
      <hr />
    </>
  );
}

export default EditDetails;
