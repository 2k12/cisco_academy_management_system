import axios from "./axios";

export const getCoursesRequest = ({ search = "", limit = 15, page = 1 }) =>
  axios.post(`/courses`, { search, limit, page });
export const getAllCoursesRequest = ({ search = "", limit = 1000, page = 1 }) =>
  axios.post(`/courses`, { search, limit, page });
export const getCourseRequest = (id) => axios.get(`/course/${id}`);
export const createCourseRequest = (course) => axios.post(`/course`, course);
export const updateCourseRequest = (course) => axios.put(`/course/${course.id}`, course);
export const deleteCourseRequest = (id) => axios.delete(`/course/${id}`);
export const getCoursesDropdownRequest = () => axios.get(`/courses-dropdown`);
// export const getCertificatesRequest = (id) => axios.get(`/courses-certificate/${id}`, {responseType: 'blob'});