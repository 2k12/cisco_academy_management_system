import axios from "./axios";


export const getSchedulesRequest = ({ search = '', limit = 15, page = 1 }) => axios.post(`/schedules`, { search, limit, page });  
export const getAllSchedulesRequest = ({ search = '', limit = 1000, page = 1 }) => axios.post(`/schedules`, { search, limit, page });  
export const getScheduleRequest = (id) => axios.get(`/schedules/${id}`);
export const createSchedulesRequest = (schedule) => axios.post(`/schedule`,schedule);
export const updateSchedulesRequest = (schedule) => axios.put(`/schedule/${schedule.id}`,schedule);
export const deleteSchedulesRequest = (id) => axios.delete(`/schedule/${id}`);


