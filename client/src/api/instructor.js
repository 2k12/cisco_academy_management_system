import axios from "./axios";


export const getInstructorsRequest = ({ search = '', limit = 15, page = 1 }) => axios.post(`/instructors`, { search, limit, page });  
export const getAllInstructorsRequest = ({ search = '', limit = 1000, page = 1 }) => axios.post(`/instructors`, { search, limit, page });  
export const getInstructorRequest = (id) => axios.get(`/instructor/${id}`);
export const createInstructorsRequest = (instructor) => axios.post(`/instructor`,instructor);
export const updateInstructorsRequest = (instructor) => axios.put(`/instructor/${instructor.id}`,instructor);
export const deleteInstructorsRequest = (id) => axios.delete(`/instructors/${id}`);
export const getInstructorsDropdownRequest = () => axios.get(`/instructors-dropdown`);


