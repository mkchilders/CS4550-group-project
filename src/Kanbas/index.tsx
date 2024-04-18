import KanbasNavigation from "./Navigation";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import store from "./store";
import Account from "./Account";
import * as client from "./Courses/client";
import { Course } from "./Courses/client";

function Kanbas() {
  const [courses, setCourses] = useState<Course[]>([]);
  const findAllCourses = async () => {
    const response = await client.findAllCourses();
    setCourses(response);
  };
  useEffect(() => {
    findAllCourses();
  }, []);

  const [course, setCourse] = useState({
    _id: new Date().getTime().toString(),
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "reactjs.webp",
    id: new Date().getTime().toString(),
    department: "",
    credits: 4,
  });
  const addNewCourse = async () => {
    try {
      const newCourse = await client.createCourse(course);
      setCourses([newCourse, ...courses]);
    } catch (err) {
      console.log(err);
    }
  };
  const deleteCourse = async (courseId: string) => {
    try {
      await client.deleteCourse(courseId);
      setCourses(courses.filter((c) => c._id !== courseId));
    } catch (err) {
      console.log(err);
    }
  };
  const updateCourse = async () => {
    try {
      const status = await client.updateCourse(course);
      setCourses(courses.map((c) => (c._id === course._id ? course : c)));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Provider store={store}>
      <div className="d-flex">
        <KanbasNavigation />
        <div className="flex-fill">
          <Routes>
            <Route path="Account/*" element={<Account />} />
            <Route path="/" element={<Navigate to="Dashboard" />} />
            <Route
              path="Dashboard"
              element={
                <Dashboard
                  courses={courses}
                  course={course}
                  setCourse={setCourse}
                  addNewCourse={addNewCourse}
                  deleteCourse={deleteCourse}
                  updateCourse={updateCourse}
                />
              }
            />
            <Route path="Courses/:courseId/*" element={<Courses />} />
          </Routes>
        </div>
      </div>
    </Provider>
  );
}
export default Kanbas;
