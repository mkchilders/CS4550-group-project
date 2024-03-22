import { quizzes } from "../../Database";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizzes: quizzes,
  quiz: {},
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    addQuiz: (state, action) => {
      state.quiz = [
        { ...action.payload, _id: new Date().getTime().toString() },
        ...state.quizzes,
      ];
    },
  },
});

export const { addQuiz } = quizzesSlice.actions;
export default quizzesSlice.reducer;
