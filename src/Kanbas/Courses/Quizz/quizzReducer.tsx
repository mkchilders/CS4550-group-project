import { quizzes } from "../../Database";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizzes: quizzes,
  quizz: {},
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    addQuizz: (state, action) => {
      state.quizz = [
        { ...action.payload, _id: new Date().getTime().toString() },
        ...state.quizzes,
      ];
    },
  },
});

export const { addQuizz } = quizzesSlice.actions;
export default quizzesSlice.reducer;
