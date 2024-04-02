import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;

export const findQuizzesForCourses = async (courseId: any) => {
  const response = await axios.get(
    `${API_BASE}/api/courses/${courseId}/quizzes`
  );
  return response.data;
};

export const deleteQuiz = async (quizId: any) => {
  const response = await axios.delete(`${API_BASE}/api/quizzes/${quizId}`);
  return response.data;
};

export const addQuiz = async (courseId: any, quiz: any) => {
  const response = await axios.post(
    `${API_BASE}/api/courses/${courseId}/quizzes`,
    quiz
  );
  return response.data;
};
