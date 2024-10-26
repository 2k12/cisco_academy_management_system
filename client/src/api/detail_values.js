import axios from "./axios";

export const getDetailValuesRequest = ({ search = '', limit = 15, page = 1 }) => axios.post(`/detail-values`, { search, limit, page });  
export const getAllDetailValuesRequest = ({ search = '', limit = 1000, page = 1 }) => axios.post(`/detail-values`, { search, limit, page });  
export const getDetailValueRequest = (id) => axios.get(`/detail-value/${id}`);
export const createDetailValuesRequest = (detail_value) => axios.post(`/detail-value`, detail_value);
export const updateDetailValuesRequest = (detail_value) => axios.put(`/detail-value/${detail_value.id}`, detail_value);
export const deleteDetailValuesRequest = (id) => axios.delete(`/detail-value/${id}`);
