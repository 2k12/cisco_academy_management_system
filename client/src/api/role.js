import axios from "./axios";


export const getRolesRequest = ({ search = '', limit = 15, page = 1 }) => axios.post(`/roles`, { search, limit, page });  
export const getAllRolesRequest = ({ search = '', limit = 1000, page = 1 }) => axios.post(`/roles`, { search, limit, page });  
export const getRoleRequest = (id) => axios.get(`/role/${id}`);
export const createRolesRequest = (role) => axios.post(`/role`, role);
export const updateRolesRequest = (role) => axios.put(`/role/${role.id}`, role);
export const deleteRolesRequest = (id) => axios.delete(`/role/${id}`);
