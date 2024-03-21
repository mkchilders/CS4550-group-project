import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "../Courses/Modules/modulesReducer";
import quizzReducer from "../Courses/Quizz/quizzReducer";

export interface KanbasState {
  modulesReducer: {
    modules: any[];
    module: any;
  };

  quizzReducer: {
    quizzes: any[];
    quizz: any;
  };
}
const store = configureStore({
  reducer: {
    modulesReducer,
    quizzReducer,
  },
});

export default store;
