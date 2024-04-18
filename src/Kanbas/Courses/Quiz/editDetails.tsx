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
      <table className="table mt-3 mb-4 quiz-attribute">
        <tbody>
          <tr>
            <td>Title</td>
            <td>
              <div>
                <input
                  placeholder={quiz.title}
                  onChange={(e) =>
                    setUpdatedQuiz({ ...quiz, title: e.target.value })
                  }
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>Quiz Type</td>
            <td>
              <div>
                <select>
                  <option value="Default" selected disabled>
                    Please Select
                  </option>
                  <option value="Graded Quiz">Graded Quiz</option>
                  <option value="Practice Quiz">Practice Quiz</option>
                  <option value="Graded Survey">Graded Survey</option>
                  <option value="Ungraded Survey">Ungraded Survey</option>
                </select>
              </div>
            </td>
          </tr>
          <tr>
            <td>Description</td>
            <td>
              <div>
                <input type="text" value={quiz.Description} />
              </div>
            </td>
          </tr>
          <tr>
            <td>Points</td>
            <td>
              <div>
                <input
                  placeholder={quiz.points}
                  onChange={(e) =>
                    setUpdatedQuiz({ ...quiz, points: e.target.value })
                  }
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>Assignment Group</td>
            <td>
              <div>
                <select>
                  <option value="Default" selected disabled>
                    Please Select
                  </option>
                  <option value="Quizzes">Quizzes</option>
                  <option value="Exams">Exams</option>
                  <option value="Assignments">Assignments</option>
                  <option value="Project">Project</option>
                </select>
              </div>
            </td>
          </tr>
          <tr>
            <td>Shuffle Answers</td>
            <td>
              <div>
                <select>
                  <option value="Default" selected disabled>
                    Please Select
                  </option>
                  <option value="True">Yes</option>
                  <option value="False">No</option>
                </select>
              </div>
            </td>
          </tr>
          <tr>
            <td>Time Limit (Minutes)</td>
            <td>
              <div>
                <input
                  type="number"
                  placeholder={quiz.timeLimit}
                  onChange={(e) =>
                    setUpdatedQuiz({ ...quiz, timeLimit: e.target.value })
                  }
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>Multiple Attempts</td>
            <td>
              <div>
                <select>
                  <option value="Default" selected disabled>
                    Please Select
                  </option>
                  <option value="True">Yes</option>
                  <option value="False">No</option>
                </select>
                {booleanToString(quiz.multipleAttempts)}
              </div>
            </td>
          </tr>
          <tr>
            <td>Show Correct Answers</td>
            <td>
              <select>
                <option value="Default" selected disabled>
                  Please Select
                </option>
                <option value="True">Yes</option>
                <option value="False">No</option>
              </select>
              {quiz.showCorrectAnswers}
            </td>
          </tr>
          <tr>
            <td>Access Code</td>
            <td>
              <div>
                <input
                  value={quiz.accessCode}
                  onChange={(e) =>
                    setUpdatedQuiz({ ...quiz, accessCode: e.target.value })
                  }
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>One Question at a Time</td>
            <td>
              <div>
                <select>
                  <option value="Default" selected disabled>
                    Please Select
                  </option>
                  <option value="True">Yes</option>
                  <option value="False">No</option>
                </select>
                {booleanToString(quiz.oneQuestionAtATime)}
              </div>
            </td>
          </tr>
          <tr>
            <td>Webcam Required</td>
            <td>
              <div>
                <select>
                  <option value="Default" selected disabled>
                    Please Select
                  </option>
                  <option value="False">No</option>
                  <option value="True">Yes</option>
                </select>
                {booleanToString(quiz.webcamRequired)}
              </div>
            </td>
          </tr>
          <tr>
            <td>Lock Questions After Answering</td>
            <td>
              <div>
                {" "}
                <select>
                  <option value="Default" selected disabled>
                    Please Select
                  </option>
                  <option value="False">No</option>
                  <option value="True">Yes</option>
                </select>
                {booleanToString(quiz.requiredViewResults)}
              </div>
            </td>
          </tr>
        </tbody>
      </table>

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
          Cancel
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
