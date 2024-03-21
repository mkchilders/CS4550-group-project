import { FaBan, FaBullhorn, FaBullseye, FaCalendar, FaChartBar, FaCheckCircle, FaDownload, FaRegBell, FaTimes } from "react-icons/fa";
import ModuleList from "../Modules/List";
import './index.css';

function Home() {
  return (
    <div className="d-flex flex-row">
      <ModuleList />
      <div className="flex-grow-0 d-none d-lg-block me-2 ms-3" style={{ width: "250px" }}>
            <h5 className="font-weight-bold">Course Status</h5>
            <div className="btn-group w-100 mb-3">
              <button type="button" className="btn btn-outline-secondary"><FaBan /> Unpublish</button>
              <button type="button" className="btn btn-success" disabled><FaCheckCircle /> Published</button>
            </div>
            <div className="btn-group-vertical w-100 row-gap-1">
              <button type="button" className="btn btn-outline-secondary text-start"><FaBullhorn /> Import Existing Content</button>
              <button type="button" className="btn btn-outline-secondary text-start"><FaDownload /> Import from Commons</button>
              <button type="button" className="btn btn-outline-secondary text-start"><FaBullseye /> Choose Home Page</button>
              <button type="button" className="btn btn-outline-secondary text-start"><FaChartBar /> View Course Stream</button>
              <button type="button" className="btn btn-outline-secondary text-start"><FaBullhorn /> New Announcement</button>
              <button type="button" className="btn btn-outline-secondary text-start"><FaChartBar /> New Analytics</button>
              <button type="button" className="btn btn-outline-secondary text-start"><FaRegBell /> View Course Notifications</button>
            </div>
            <h6 className="mt-4 fw-bold">To Do</h6>
            <hr className="my-1 py-1"/>

            <ul className="wd-course-status">
              <li>
                <span className="text-danger fs-4">&#10122;</span>
                <div className="flex-column">
                  <a href="/">Grade A1 - ENV + HTML</a>
                  <div>100 points &#8226; Feb 5 at 11:59pm</div>
                </div>
                <FaTimes />
              </li>
            </ul>

            <div className="d-flex flex-row justify-content-between mt-4">
              <h6 className="fw-bold mb-0">Coming Up</h6>
              <div className="wd-course-status mb-1 align-self-center column-gap-1">
                <FaCalendar className="align-self-center" />
                <a href="/"> View Calendar</a>
              </div>
            </div>

            <hr className="py-1 my-1" />

            <ul className="wd-course-status">
              <li>
                <FaCalendar className="mt-1"/>
                <div className="flex-column">
                  <a href="/">Lecture</a>
                  <div>CS4550.12631.202410</div>
                  <div>Sep 11 at 11:45am</div>
                </div>
              </li>
              <li>
                <FaCalendar className="mt-1"/>
                <div className="flex-column">
                  <a href="/">Lecture</a>
                  <div>CS4550.12631.202410</div>
                  <div>Sep 11 at 6pm</div>
                </div>
              </li>
              <li>
                <a href="/">12 more in the next week...</a>
              </li>
            </ul>

          </div>
    </div>
  );
}
export default Home;