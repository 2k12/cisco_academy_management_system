import axios from "./axios";

export const getDetailsRequest = ({ search = '', limit = 15, page = 1 }) => axios.post(`/details`, { search, limit, page });  
// export const getAllDetailValuesRequest = ({ search = '', limit = 1000, page = 1 }) => axios.post(`/detail-values`, { search, limit, page });  
// export const getDetailValueRequest = (id) => axios.get(`/detail-value/${id}`);
export const createDetailRequest = (detail) => axios.post(`/detail`, detail);
// export const updateDetailValuesRequest = (detail_value) => axios.put(`/detail-value/${detail_value.id}`, detail_value);
export const deleteDetailRequest = (id) => axios.delete(`/detail/${id}`);
