import React from "react";
import { Link } from "react-router-dom";
import './index.css';

function Dashboard( 
  {courses, 
    course, 
    setCourse, 
    addNewCourse, 
    deleteCourse, 
    updateCourse }
  :any
) {
  return (
    <div className="p-4">
      <h1>Dashboard</h1>              <hr />
      <h5>Course</h5>
      <input value={course.name} className="form-control"
             onChange={(e) => setCourse({ ...course, name: e.target.value }) } />
      <input value={course.number} className="form-control"
             onChange={(e) => setCourse({ ...course, number: e.target.value }) } />
      <input value={course.startDate} className="form-control" type="date"
             onChange={(e) => setCourse({ ...course, startDate: e.target.value }) }/>
      <input value={course.endDate} className="form-control" type="date"
             onChange={(e) => setCourse({ ...course, endDate: e.target.value }) } />
      <button className="btn btn-danger mt-3 mb-4 me-1" onClick={addNewCourse} >
        Add
      </button>
      <button className="btn btn-primary mt-3 mb-4" onClick={updateCourse} >
        Update
      </button>

      <h2>Published Courses (5)</h2> <hr />
      <div className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4 mt-0">
          {courses.map((course : any) => (
            <div key={course._id} className="col" style={{ width: 280 }}>
              <div className="card">
                <img src={`/images/${course.image}`} className="card-img-top" alt=""
                     style={{ height: 150, objectFit: "cover" }}/>
                <div className="card-body text-truncate">
                  <Link className="card-title stretched-link" to={`/Kanbas/Courses/${course._id}/Home`}
                    style={{ textDecoration: "none", color: "navy", fontWeight: "bold" }}>
                    {course.name} 
                  </Link>
                  <p className="mt-1 mb-0 card-text text-truncate">{course.name}</p>
                  <p className="card-text text-truncate"><small className="text-muted">{course._id}_1 {course.startDate} Full Term</small></p>
                  <Link to={`/Kanbas/Courses/${course._id}/Home`} className="wd-button btn btn-success">
                    Go </Link>
                  <button className="wd-button btn btn-outline-primary ms-1 float-end" onClick={(event) => {
                      event.preventDefault();
                      setCourse(course);
                  }}>
                    Edit
                  </button>
                  <button className="wd-button btn btn-outline-danger ms-1 float-end" onClick={(event) => {
                        event.preventDefault();
                        deleteCourse(course._id);
                      }}>
                      Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Dashboard;