import { Link, useLocation, useParams } from "react-router-dom";
import "./index.css"; // feel free to use the CSS from previous assignments
function CourseNavigation() {
  const links = ["Home", "Modules", "Piazza", "Zoom Meetings", "Assignments", "Quizzes", "Grades", "People", "Panopto Video", "Discussions", "Announcements", "Pages", "Files"];
  const { pathname } = useLocation();
  const { courseId } = useParams();
  return (
    <>
      <ul className="wd-navigation d-none d-md-block me-3">
        <ul className="wd-nav-header wd-navigation">{courseId} Spring 2024 Semester Full Term</ul>
        {links.map((link, index) => (
          <li key={index} className={pathname.includes(link) ? "wd-active" : ""}>
            <Link to={link}>{link}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
export default CourseNavigation;