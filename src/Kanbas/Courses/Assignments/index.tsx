import React from "react";
import { FaCheckCircle, FaEllipsisV, FaPlusCircle, FaRegEdit } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { assignments } from "../../Database";
import "./index.css";
function Assignments() {
  const { courseId } = useParams();
  const assignmentList = assignments.filter(
    (assignment) => assignment.course === courseId);
  return (
    <>
      {/* {<!-- Add buttons and other fields here -->} */}
      <ul className="list-group wd-modules">
        <li className="list-group-item">
          <div>
            <FaEllipsisV className="me-2" /> ASSIGNMENTS
            <span className="float-end">
              <span className="border border-dark rounded px-2 fw-normal">40% of Total</span>
              <FaPlusCircle className="ms-2 mb-1" />
              <FaEllipsisV className="ms-2 mb-1" />
            </span>
          </div>
          <ul className="list-group">
            {assignmentList.map((assignment) => (
              <li className="list-group-item d-flex flex-row">
                <FaEllipsisV className="me-3 mb-1 mt-2" />
                <FaRegEdit className="text-success me-3 mb-1 mt-2" />
                <ul className="wd-assignment-info list-inline mb-1">
                    <li>
                        <Link className="text-dark"
                        to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`}>{assignment.title}
                        </Link>
                    </li>
                    <li>
                        <span className="fw-normal">
                            <span>Multiple Modules </span> |
                            <span className="fw-bold"> Due </span>
                            Feb 27 at 11:59pm | 100 pts
                        </span>
                    </li>
                </ul>
                <span className="ms-auto mt-2">
                  <FaCheckCircle className="text-success me-3" />
                  <FaEllipsisV />
                </span>
              </li>))}
          </ul>
        </li>
      </ul>
    </>
);}
export default Assignments;