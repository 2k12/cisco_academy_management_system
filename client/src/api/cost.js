import axios from "./axios";

export const getCostsRequest = ({ search = '', limit = 15, page = 1 }) => axios.post(`/costs`, { search, limit, page });  
export const getAllCostsRequest = ({ search = '', limit = 1000, page = 1 }) => axios.post(`/costs`, { search, limit, page });  
export const getCostRequest = (id) => axios.get(`/cost/${id}`);
export const createCostRequest = (cost) => axios.post(`/cost`, cost);
export const updateCostRequest = (cost) => axios.put(`/cost/${cost.id}`, cost);
export const deleteCostRequest = (id) => axios.delete(`/cost/${id}`);