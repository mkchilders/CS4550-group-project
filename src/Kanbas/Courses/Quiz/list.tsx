import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faPlus,
  faBan,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import { KanbasState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

function QuizList() {
  // There are a list of quizzes
  const { courseId } = useParams();
  const quizList = useSelector(
    (state: KanbasState) => state.quizReducer.quizzes
  );
  const dispatch = useDispatch();

  return (
    <div className="flex-fill">
      <div className="d-flex justify-content-between">
        <input type="text" placeholder="Search for Quiz" />
        <div>
          <button className="btn btn-danger">
            <FontAwesomeIcon icon={faPlus} /> Quiz
          </button>
          <button className="btn btn-light btn-lg ms-1">
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </button>
        </div>
      </div>
      <hr />
      <ul className="list-group">
        {quizList
          .filter((quiz) => quiz.course === courseId)
          .map((quiz) => (
            <li className="list-group-item">
              <div className="d-flex justify-content-between">
                <span>
                  <FontAwesomeIcon icon={faCaretDown} className="me-3" />
                  {quiz.title}
                </span>
                <span>
                  <FontAwesomeIcon icon={faBan} className="me-3" />
                  <button className="btn btn-light me-3">
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                  </button>
                </span>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default QuizList;
