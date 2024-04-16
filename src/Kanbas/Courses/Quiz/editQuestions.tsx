import {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import { FaPencilAlt, FaPlus, FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { setQuiz, updateQuiz } from "./quizReducer";
import * as client from "./client";
import { KanbasState } from "../../store";

function EditQuestions() {
  const { courseId, quizId } = useParams();

  useEffect(() => {
    client.findQuizById(quizId).then((res: any) => {
      dispatch(setQuiz(res));
    });
  }, [quizId]);   

  const handleUpdateQuiz = async () => {
    const status = await client.updateQuiz(quiz);
    dispatch(updateQuiz(quiz));
  };

  const quiz = useSelector((state: KanbasState) => state.quizReducer.quiz);
  const originalQuestions = quiz.questions;

  const dispatch = useDispatch();
  const [editQuestion, setEditQuestion] = useState([] as any);
  return (
    <>
      <li className="list-group-item mt-2">
        {quiz.questions?.length > 1 ||
        (quiz.questions?.length === 1 && quiz.questions[0]?.id !== -1) ? (
          <ul className="list-group">
            {quiz.questions.map(
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
                          <span className="me-2 mt-1">{q.points} pts</span>
                          <FaPencilAlt
                            onClick={() => setEditQuestion(q)}
                            className="text-success"
                          />
                        </span>
                      </div>
                      <div>{q.question}</div>
                    </>
                  ) : (
                    <>
                      <div className="d-flex justify-content-between">
                        <input type="text" placeholder="Question Title"></input>
                        <div className="dropdown">
                          <button
                            className="btn btn-secondary dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            {q.type}
                          </button>
                          <ul className="dropdown-menu">
                            <li
                              onClick={(e) => {
                                quiz.questions.find(
                                  (ques: any) => ques.id === q.id
                                ).type = "Multiple Choice";
                                dispatch(
                                  setQuiz({
                                    ...quiz,
                                  })
                                );
                              }}
                            >
                              Multiple Choice
                            </li>
                            <li
                              onClick={(e) => {
                                quiz.questions.find(
                                  (ques: any) => ques.id === q.id
                                ).type = "True/False";
                                dispatch(
                                  setQuiz({
                                    ...quiz,
                                  })
                                );
                              }}
                            >
                              True/False
                            </li>
                            <li
                              onClick={(e) => {
                                quiz.questions.find(
                                  (ques: any) => ques.id === q.id
                                ).type = "Fill in the Blank";
                                dispatch(
                                  setQuiz({
                                    ...quiz,
                                  })
                                );
                              }}
                            >
                              Fill in the Blank
                            </li>
                          </ul>
                        </div>
                      </div>
                    </>
                  )}
                </li>
              )
            )}
          </ul>
        ) : (
          <p className="alert alert-warning mt-2">
            There are no questions yet. Click the New Question button to add
            questions!
          </p>
        )}
      </li>

      <div className="btn-toolbar column-gap-3 justify-content-center mt-3">
        <button className="btn btn-light btn-outline-secondary">
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
            to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz.id}/Details`}
          >
            Cancel
          </Link>
          {/* TODO add publishing when save */}
          <button
            className="btn btn-light btn-outline-secondary"
            onClick={handleUpdateQuiz}
          >
            Save & Publish
          </button>
          <button className="btn btn-danger" onClick={handleUpdateQuiz}>
            Save
          </button>
        </div>
      </div>

      <hr />
    </>
  );
}

export default EditQuestions;
