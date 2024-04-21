import { configureStore } from "@reduxjs/toolkit";
import quizReducer from "../Courses/Quiz/quizReducer";
import modulesReducer from "../Courses/Modules/modulesReducer";
import userReducer from "../../Users/userReducer";
import courseReducer from "../Courses/courseReducer";

export interface KanbasState {
  modulesReducer: {
    modules: any[];
    module: any;
  };

  quizReducer: {
    quizzes: any[];
    quiz: any;
  };

  userReducer: {
    currentUser: any;
  };

  courseReducer: {
    courses: any[];
  };
}

const store = configureStore({
  reducer: {
    modulesReducer,
    quizReducer,
    userReducer,
    courseReducer,
  },
});

export default store;
