// services/api.js

import axios from "axios";

// ✅ Set API Base URL
const API_BASE_URL = "http://127.0.0.1:8000/api";

// ✅ Create Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
});

// ✅ Automatically attach token to every request using an interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Login
export const login = async (username, password) => {
  const response = await api.post("/auth/login/", { username, password });
  localStorage.setItem("accessToken", response.data.access);
  localStorage.setItem("userRole", response.data.role);
  return response.data;
};

// ✅ Register
export const register = async (username, email, password, role) => {
  const response = await api.post("/auth/register/", {
    username,
    email,
    password,
    role,
  });
  return response.data;
};

// ✅ Logout
export const logout = () => {
  console.log("🚪 Logging out...");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("userRole");
};

// ✅ Generic API Handlers
export const getData = async (endpoint) => {
  return api.get(`/${endpoint}/`).then((res) => res.data);
};

export const addData = async (endpoint, data) => {
  return api.post(`/${endpoint}/`, data).then((res) => res.data);
};

export const updateData = async (endpoint, id, data) => {
  return api.put(`/${endpoint}/${id}/`, data).then((res) => res.data);
};

export const deleteData = async (endpoint, id) => {
  return api.delete(`/${endpoint}/${id}/`).then((res) => res.data);
};

// ✅ Fetch Data Shortcuts
export const fetchCourses = () => getData("courses");
export const fetchDepartments = () => getData("departments");
export const fetchStudents = () => getData("students");
export const fetchEnrollments = () => getData("enrollments");
export const fetchExams = () => getData("exams");
export const fetchFaculty = () => getData("faculty");
export const fetchResults = () => getData("results");

// ✅ Students
export const addStudent = (studentData) => addData("students", studentData);
export const updateStudent = (studentId, studentData) =>
  updateData("students", studentId, studentData);
export const deleteStudent = (studentId) => deleteData("students", studentId);

// ✅ Courses
export const addCourse = async (courseData) => {
  const data = {
    course_name: courseData.course_name,
    department_id: parseInt(courseData.department_id),
    credits: parseInt(courseData.credits),
  };
  if (!data.department_id) {
    throw new Error("Department ID is required");
  }
  return api.post("/courses/", data).then((res) => res.data);
};

export const updateCourse = async (courseId, courseData) => {
  const data = {
    course_name: courseData.course_name,
    department_id: parseInt(courseData.department_id),
    credits: parseInt(courseData.credits),
  };
  return api.put(`/courses/${courseId}/`, data).then((res) => res.data);
};

export const deleteCourse = async (courseId) =>
  api.delete(`/courses/${courseId}/`).then((res) => res.data);

// ✅ Faculty
export const addFaculty = (facultyData) => addData("faculty", facultyData);
export const updateFaculty = (facultyId, facultyData) =>
  updateData("faculty", facultyId, facultyData);
export const deleteFaculty = (facultyId) => deleteData("faculty", facultyId);

// ✅ Departments
export const addDepartment = (departmentData) =>
  addData("departments", departmentData);
export const updateDepartment = (departmentId, departmentData) =>
  updateData("departments", departmentId, departmentData);
export const deleteDepartment = (departmentId) =>
  deleteData("departments", departmentId);

// ✅ Enrollments
export const enrollStudent = (enrollmentData) =>
  addData("enrollments", enrollmentData);
export const updateEnrollment = (enrollmentId, updatedData) =>
  updateData("enrollments", enrollmentId, updatedData);
export const removeEnrollment = (enrollmentId) =>
  deleteData("enrollments", enrollmentId);

// ✅ Exams
export const scheduleExam = (examData) => addData("exams", examData);
export const updateExam = (examId, examData) =>
  updateData("exams", examId, examData);
export const deleteExam = (examId) => deleteData("exams", examId);

// ✅ Results
export const addResult = (resultData) => addData("results", resultData);
export const updateResult = (studentId, examId, resultData) =>
  api.put(`/results/${studentId}/${examId}/`, resultData).then((res) => res.data);
export const deleteResult = (studentId, examId) =>
  api.delete(`/results/${studentId}/${examId}/`).then((res) => res.data);

export default api;
