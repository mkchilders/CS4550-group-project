import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "../Courses/Modules/modulesReducer";
import quizReducer from "../Courses/Quiz/quizReducer";

export interface KanbasState {
  modulesReducer: {
    modules: any[];
    module: any;
  };

  quizReducer: {
    quizzes: any[];
    quiz: any;
  };
}
const store = configureStore({
  reducer: {
    modulesReducer,
    quizReducer,
  },
});

export default store;
