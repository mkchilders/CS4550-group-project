import { Link } from "react-router-dom";
import EditDetails from "./editDetails";

function QuizEdit() {
  return (
    <>
      <div>Points 0</div>
      <hr />
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a className="nav-link active" href="#details" data-bs-toggle="tab">
            Details
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#questions" data-bs-toggle="tab">
            Questions
          </a>
        </li>
      </ul>
      <div className="tab-content">
        <div className="tab-pane fade show active" id="details">
          {/* <p>Details tab content ...</p> */}
          <EditDetails />
        </div>
        <div className="tab-pane fade" id="questions">
          <p>Questions tab content ...</p>
        </div>
      </div>
    </>
  );
}

export default QuizEdit;
