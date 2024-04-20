// import { quizzes } from "../../Database";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import * as client from "./client";

const initialState = {
  quizzes: [{ id: -1 }],
  quiz: { id: 0 },
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },

    addQuiz: (state, action) => {
      state.quizzes = [
        {
          ...action.payload,
          questions: [],
          points: 0,
          title: "new Quiz",
        },
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
      state.quiz = { ...state.quiz, ...action.payload };
    },
  },
});

export const { addQuiz, deleteQuiz, updateQuiz, setQuiz, setQuizzes } =
  quizzesSlice.actions;
export default quizzesSlice.reducer;
