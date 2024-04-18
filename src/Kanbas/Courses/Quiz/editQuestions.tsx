import { useEffect, useState } from "react";
import { FaPencilAlt, FaPlus, FaSearch, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { setQuiz, updateQuiz } from "./quizReducer";
import * as client from "./client";
import { KanbasState } from "../../store";
import MultipleChoice from "./QuestionTypes/multipleChoice";
import TrueFalse from "./QuestionTypes/trueFalse";
import FillInTheBlank from "./QuestionTypes/fillInTheBlank";

function EditQuestions() {
  const { courseId, quizId } = useParams();

  const quiz = useSelector((state: KanbasState) => state.quizReducer.quiz);
  const [updatedQuiz, setUpdatedQuiz] = useState(quiz);
  const [editQuestion, setEditQuestion] = useState([] as any);

  const dispatch = useDispatch();

  const handleSave = (q: any) => {
    client.updateQuiz(q).then((res) => dispatch(updateQuiz(res)));
  };

  const updateQuestion = (id: any) => {
    const newQuestions = updatedQuiz.questions.map((q: any) => {
      if (q.id === id) {
        return editQuestion;
      } else {
        return q;
      }
    });
    setUpdatedQuiz({ ...updatedQuiz, questions: newQuestions });
  };

  const removeQuestion = (id: any) => {
    const newQuestions = updatedQuiz.questions.filter((q: any) => q.id !== id);
    setUpdatedQuiz({ ...updatedQuiz, questions: newQuestions });
  };

  const addQuestion = () => {
    const newQuestion = {
      id: updatedQuiz.questions.length,
      type: "Multiple Choice",
      title: "Question " + (updatedQuiz.questions.length + 1),
      points: 1,
      question: "",
      blanks: [],
      choices: [],
      trueFalse: true,
    };
    setEditQuestion(newQuestion);
    setUpdatedQuiz({
      ...updatedQuiz,
      questions: [...updatedQuiz.questions, newQuestion],
    });
  };

  useEffect(() => {
    client.findQuizById(quizId).then((res) => {
      dispatch(setQuiz(res));
      setUpdatedQuiz(res);
    });
  }, []);
  return (
    <>
      <li className="list-group-item mt-2">
        {updatedQuiz.questions?.length > 1 ||
        (updatedQuiz.questions?.length === 1 &&
          updatedQuiz.questions[0]?.id !== -1) ? (
          <ul className="list-group">
            {updatedQuiz.questions?.map(
              (q: {
                id: any;
                title: any;
                type: any;
                points: any;
                question: any;
                blanks: any;
                choices: any;
                trueFalse: boolean;
              }) => (
                <li key={q.id} className="list-group-item p-3">
                  {editQuestion?.id !== q.id ? (
                    <>
                      <div className="d-flex justify-content-between">
                        <h5>{q.title}</h5>
                        <span className="flex-row">
                          <span className="me-3 mt-1">{q.points} pts</span>
                          <span className="btn-toolbar d-inline-block">
                            <button
                              onClick={() => {
                                setEditQuestion(q);
                              }}
                              className="btn btn-outline-success mb-1"
                            >
                              <FaPencilAlt />
                            </button>
                            <button
                              className="btn btn-outline-danger mb-1 ms-1"
                              onClick={() => {
                                removeQuestion(q.id);
                              }}
                            >
                              <FaTrash />
                            </button>
                          </span>
                        </span>
                      </div>
                      <div>{q.question}</div>
                    </>
                  ) : (
                    <>
                      <div className="d-flex justify-content-between">
                        <div className="column-gap-2">
                          <input
                            className="p-2"
                            type="text"
                            placeholder={editQuestion.title}
                            onChange={(e) =>
                              setEditQuestion({
                                ...editQuestion,
                                title: e.target.value,
                              })
                            }
                          ></input>
                          <select
                            className="ms-3 p-2"
                            onChange={(e) =>
                              setEditQuestion({
                                ...editQuestion,
                                type: e.target.value,
                              })
                            }
                          >
                            <option value="Multiple Choice" selected>
                              Multiple Choice
                            </option>
                            <option value="True/False">True/False</option>
                            <option value="Fill in the Blank">
                              Fill in the Blank
                            </option>
                          </select>
                        </div>

                        <div className="d-flex flex-row column-gap-2">
                          <h5 className="mt-2">pts: </h5>
                          <input
                            type="text"
                            placeholder={editQuestion.points}
                            onChange={(e) =>
                              setEditQuestion({
                                ...editQuestion,
                                points: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <hr />
                      {editQuestion?.type === "Multiple Choice" && (
                        <MultipleChoice
                          editQuestion={editQuestion}
                          setEditQuestion={setEditQuestion}
                          updateQuestion={updateQuestion}
                        />
                      )}
                      {editQuestion?.type === "True/False" && (
                        <TrueFalse
                          editQuestion={editQuestion}
                          setEditQuestion={setEditQuestion}
                          updateQuestion={updateQuestion}
                        />
                      )}
                      {editQuestion?.type === "Fill in the Blank" && (
                        <FillInTheBlank
                          editQuestion={editQuestion}
                          setEditQuestion={setEditQuestion}
                          updateQuestion={updateQuestion}
                        />
                      )}
                    </>
                  )}
                </li>
              )
            )}
          </ul>
        ) : (
          <p className="alert alert-warning mt-3">
            There are no questions yet. Click the New Question button to add
            questions!
          </p>
        )}
      </li>

      <div className="btn-toolbar column-gap-3 justify-content-center mt-3">
        <button
          className="btn btn-light btn-outline-secondary"
          onClick={addQuestion}
        >
          <FaPlus className="mb-1" /> New Question
        </button>
        <button className="btn btn-light btn-outline-secondary">
          <FaPlus className="mb-1" /> New Question Group
        </button>
        <button className="btn btn-light btn-outline-secondary">
          <FaSearch className="mb-1" /> Find Questions
        </button>
      </div>
      <hr />
      <div className="d-flex justify-content-between">
        <label className="mt-1">
          <input type="checkbox"></input> Notify users this quiz has changed
        </label>
        <div className="column-gap-1 btn-toolbar">
          <Link
            className="btn btn-light btn-outline-secondary"
            to={`/Kanbas/Courses/${courseId}/Quizzes/home`}
          >
            Cancel
          </Link>
          <Link
            className="btn btn-light btn-outline-secondary"
            onClick={() => {
              handleSave({ ...updatedQuiz, isPublished: true });
            }}
            to={`/Kanbas/Courses/${courseId}/Quizzes/home`}
          >
            Save & Publish
          </Link>
          <Link
            className="btn btn-danger"
            onClick={handleSave}
            to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz.id}`}
          >
            Save
          </Link>
        </div>
      </div>

      <hr />
    </>
  );
}

export default EditQuestions;
