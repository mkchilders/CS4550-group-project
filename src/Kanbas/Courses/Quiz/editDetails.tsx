import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { KanbasState } from "../../store";
import { useState } from "react";
import * as client from "./client";
import { useEffect } from "react";
import { updateQuiz, setQuiz } from "./quizReducer";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState } from "draft-js";
import "/node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Link } from "react-router-dom";

function EditDetails() {
  const { courseId, quizId } = useParams();
  const quiz = useSelector((state: KanbasState) => state.quizReducer.quiz);
  const [updatedQuiz, setUpdatedQuiz] = useState({});
  const description = quiz.description ? quiz.description : "";
  const [editorState, setEditorState] = useState(() => {
    let content = ContentState.createFromText(description);
    return EditorState.createWithContent(content);
  });
  const dispatch = useDispatch();

  const handleSave = () => {
    console.log("editor", editorState.getCurrentContent().getPlainText());
    const savewitheditor = {
      ...updatedQuiz,
      description: editorState.getCurrentContent().getPlainText(),
    };
    client.updateQuiz(savewitheditor).then((status) => {
      dispatch(updateQuiz(savewitheditor));
      dispatch(setQuiz(savewitheditor));
    });
    alert("Saved Successfully!");
  };

  const handleSaveAndPub = () => {
    const saveAndPub = {
      ...updatedQuiz,
      isPublished: true,
      description: editorState.getCurrentContent().getPlainText(),
    };
    client.updateQuiz(saveAndPub).then((status) => {
      dispatch(updateQuiz(saveAndPub));
      dispatch(setQuiz(saveAndPub));
    });
    alert("Saved and Published Successfully!");
  };

  const booleanToString = (bool: boolean) => {
    return bool ? "Yes" : "No";
  };

  useEffect(() => {
    client.findQuizById(quizId).then((res) => {
      setUpdatedQuiz(res[0]);
      dispatch(setQuiz(res[0]));
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
                    setUpdatedQuiz({ ...updatedQuiz, title: e.target.value })
                  }
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>Quiz Type</td>
            <td>
              <div>
                <select
                  defaultValue={quiz.quizType}
                  onChange={(e) => {
                    setUpdatedQuiz({
                      ...updatedQuiz,
                      quizType: e.target.value,
                    });
                  }}
                >
                  <option disabled>Please Select</option>
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
                <Editor
                  editorState={editorState}
                  onEditorStateChange={setEditorState}
                />
                <input
                  type="text"
                  placeholder={quiz.description}
                  onChange={(e) => {
                    setUpdatedQuiz({
                      ...updatedQuiz,
                      description: e.target.value,
                    });
                  }}
                />
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
                    setUpdatedQuiz({ ...updatedQuiz, points: e.target.value })
                  }
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>Assignment Group</td>
            <td>
              <div>
                <select
                  defaultValue={quiz.assignmentGroup}
                  onChange={(e) => {
                    setUpdatedQuiz({
                      ...updatedQuiz,
                      assignmentGroup: e.target.value,
                    });
                  }}
                >
                  <option disabled>Please Select</option>
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
                <input
                  type="checkbox"
                  defaultChecked={quiz.shuffleAnswers}
                  onChange={(e) => {
                    setUpdatedQuiz({
                      ...updatedQuiz,
                      shuffleAnswers: e.target.checked,
                    });
                  }}
                />
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
                    setUpdatedQuiz({
                      ...updatedQuiz,
                      timeLimit: e.target.value,
                    })
                  }
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>Multiple Attempts</td>
            <td>
              <div>
                <input
                  type="checkbox"
                  defaultChecked={quiz.multipleAttempts}
                  onChange={(e) => {
                    setUpdatedQuiz({
                      ...updatedQuiz,
                      multipleAttempts: e.target.checked,
                    });
                  }}
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>Show Correct Answers</td>
            <td>
              <input
                type="checkbox"
                defaultChecked={quiz.showCorrectAnswers}
                onChange={(e) => {
                  setUpdatedQuiz({
                    ...updatedQuiz,
                    showCorrectAnswers: e.target.checked,
                  });
                }}
              />
            </td>
          </tr>
          <tr>
            <td>Access Code</td>
            <td>
              <div>
                <input
                  placeholder={quiz.accessCode}
                  onChange={(e) =>
                    setUpdatedQuiz({
                      ...updatedQuiz,
                      accessCode: e.target.value,
                    })
                  }
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>One Question at a Time</td>
            <td>
              <div>
                <input
                  type="checkbox"
                  defaultChecked={quiz.oneQuestionAtATime}
                  onChange={(e) => {
                    setUpdatedQuiz({
                      ...updatedQuiz,
                      oneQuestionAtATime: e.target.checked,
                    });
                  }}
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>Webcam Required</td>
            <td>
              <div>
                <input
                  type="checkbox"
                  defaultChecked={quiz.webcamRequired}
                  onChange={(e) => {
                    setUpdatedQuiz({
                      ...updatedQuiz,
                      webcamRequired: e.target.checked,
                    });
                  }}
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>Lock Questions After Answering</td>
            <td>
              <div>
                <input
                  type="checkbox"
                  defaultChecked={quiz.requiredViewResults}
                  onChange={(e) => {
                    setUpdatedQuiz({
                      ...updatedQuiz,
                      requiredViewResults: e.target.checked,
                    });
                  }}
                />
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
                defaultValue={quiz.dueDate}
                type="date"
                onChange={(e) =>
                  setUpdatedQuiz({ ...updatedQuiz, dueDate: e.target.value })
                }
              />
            </td>
            <td>{quiz.for}</td>
            <td>
              <input
                defaultValue={quiz.availableDate}
                type="date"
                onChange={(e) =>
                  setUpdatedQuiz({
                    ...updatedQuiz,
                    availableDate: e.target.value,
                  })
                }
              />
            </td>
            <td>
              <input
                defaultValue={quiz.untilDate}
                type="date"
                onChange={(e) =>
                  setUpdatedQuiz({ ...updatedQuiz, untilDate: e.target.value })
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
        <Link
          className="btn btn-light btn-sm border border-1 me-2"
          to={`/Kanbas/Courses/${courseId}/Quizzes/`}
        >
          Cancel
        </Link>
        <button
          className="btn btn-light btn-sm border border-1 me-2"
          onClick={handleSaveAndPub}
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
