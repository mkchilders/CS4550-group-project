import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE;

const COURSES_API = `${API_BASE}/api/courses`;

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
export const createCourse = async (course: any) => {
  const response = await axios.post(`${COURSES_API}`, course);
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