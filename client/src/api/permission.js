import axios from "./axios";


export const getPermissionsRequest = ({ search = '', limit = 15, page = 1 }) => axios.post(`/permissions`, { search, limit, page });  
export const getAllPermissionsRequest = ({ search = '', limit = 1000, page = 1 }) => axios.post(`/permissions`, { search, limit, page });  
export const getPermissionRequest = (id) => axios.get(`/permission/${id}`);
export const createPermissionsRequest = (permission) => axios.post(`/permission`,permission);
export const updatePermissionsRequest = (permission) => axios.put(`/permission/${permission.id}`,permission);
export const deletePermissionsRequest = (id) => axios.delete(`/permission/${id}`);


