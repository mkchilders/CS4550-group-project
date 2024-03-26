import { quizzes } from "../../Database";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // quizzes: quizzes,
  quizzes: [{ id: -1 }],
  quiz: {},
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    addQuiz: (state, action) => {
      state.quizzes = [
        { ...action.payload, id: new Date().getTime().toString() },
        ...state.quizzes,
      ];
    },
    deleteQuiz: (state, action) => {
      state.quizzes = state.quizzes.filter(
        (quiz) => quiz.id !== action.payload
      );
    },
    updateQuiz: (state, action) => {
      state.quizzes = state.quizzes.map((quiz) => {
        if (quiz.id === action.payload.id) {
          return action.payload;
        } else {
          return quiz;
        }
      });
    },
    setQuiz: (state, action) => {
      state.quiz = action.payload;
    },
  },
});

export const { addQuiz, deleteQuiz, updateQuiz, setQuiz } =
  quizzesSlice.actions;
export default quizzesSlice.reducer;
