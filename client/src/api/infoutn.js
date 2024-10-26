import axios from "./axios";


export const getInfosUtnRequest = ({ search = '', limit = 15, page = 1 }) => axios.post(`/infos-utn`, { search, limit, page });  
export const getAllInfosUtnRequest = ({ search = '', limit = 1000, page = 1 }) => axios.post(`/infos-utn`, { search, limit, page });  
export const getInfoUtnRequest = (id) => axios.get(`/info_utn/${id}`);
export const createInfosUtnRequest = (info_utn) => axios.post(`/info-utn`,info_utn);
export const updateInfosUtnRequest = (info_utn) => axios.put(`/info-utn/${info_utn.id}`,info_utn );
export const deleteInfosUtnRequest = (id) => axios.delete(`/info-utn/${id}`);


