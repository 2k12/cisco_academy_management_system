import axios from "./axios";

export const getParticipantsRequest = ({ search = "", limit = 15, page = 1 }) => axios.post(`/participants`, { search, limit, page });
export const createParticipantRequest = (participant) => axios.post(`/participant`, participant);
export const getParticipantsDropdownRequest = () => axios.get(`/participants-dropdown`);
export const updateParticipantRequest = (participant) => axios.put(`/participant/${participant.id}`, participant);
// export const getAllCoursesRequest = ({ search = "", limit = 1000, page = 1 }) => axios.post(`/courses`, { search, limit, page });
// export const getCourseRequest = (id) => axios.get(`/course/${id}`);
// export const deleteCourseRequest = (id) => axios.delete(`/course/${id}`);
