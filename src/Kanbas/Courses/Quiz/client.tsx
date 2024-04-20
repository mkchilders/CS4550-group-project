import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;
const QUIZZES_API = `${API_BASE}/api/quizzes`;

export const findQuizzesForCourses = async (courseId: any) => {
  const response = await axios.get(
    `${API_BASE}/api/courses/${courseId}/quizzes`
  );
  return response.data;
};

export const findQuizById = async (quizId: any) => {
  const response = await axios.get(`${QUIZZES_API}/${quizId}`);
  return response.data;
};

export const deleteQuiz = async (quizId: any) => {
  const response = await axios.delete(`${QUIZZES_API}/${quizId}`);
  return response.data;
};

export const addQuiz = async (courseId: any, quiz: any, newId: string) => {
  quiz = { ...quiz, id: newId };
  const response = await axios.post(
    `${API_BASE}/api/courses/${courseId}/quizzes`,
    quiz
  );
  return response.data;
};

export const updateQuiz = async (quiz: any) => {
  const response = await axios.put(`${QUIZZES_API}/${quiz.id}`, quiz);
  return response.data;
};
