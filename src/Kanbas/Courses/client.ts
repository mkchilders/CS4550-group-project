import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE;
const COURSES_API = `${API_BASE}/api/courses`;
const BASE_API = process.env.REACT_APP_BASE_API_URL;
const USERS_API = `${BASE_API}/api/users`;

axios.defaults.withCredentials = true;

export interface Course {
  _id: string;
  id: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  department: string;
  credits: number;
  image: string;
}

export const deleteCourse = async (courseId: any) => {
  const response = await axios.delete(`${COURSES_API}/${courseId}`);
  return response.data;
};
export const createCourse = async (course: any, userId: any) => {
  const response = await axios.post(`${COURSES_API}`, {
    ...course,
    userId: userId,
  });
  return response.data;
};
export const updateCourse = async (course: any) => {
  const response = await axios.put(`${COURSES_API}/${course._id}`, course);
  return response.data;
};
export const findCourseById = async (courseId: any) => {
  const response = await axios.get(`${COURSES_API}/${courseId}`);
  return response.data;
};
export const findAllCourses = async () => {
  const response = await axios.get(`${COURSES_API}`);
  return response.data;
};

export const findAllCoursesForUser = async (userId: any) => {
  const response = await axios.post(`${API_BASE}/api/currentUser/courses`, {
    userId,
  });
  return response.data;
};

export const currentUser = async () => {
  const response = await axios.post(`${USERS_API}/profile`);
  return response.data;
};
