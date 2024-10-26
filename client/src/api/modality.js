import axios from "./axios";

// export const getModalititesRequest = ({ search = '', limit = 15, page = 1 }) => axios.post(`/modalities`, { search, limit, page });
// export const getAllModalitiesRequest = ({ search = '', limit = 1000, page = 1 }) => axios.post(`/modalities`, { search, limit, page });

export const getModalitiesRequest = ({ search = '', limit = 15, page = 1 }) => axios.post(`/modalities`, { search, limit, page });  
export const getAllModalitiesRequest = ({ search = '', limit = 1000, page = 1 }) => axios.post(`/modalities`, { search, limit, page });  
export const getModalityRequest = (id) => axios.get(`/modality/${id}`);
export const createModalitiesRequest = (modality) =>
  axios.post(`/modality`, modality);
export const updateModalitiesRequest = (modality) =>
  axios.put(`/modality/${modality.id}`, modality);
export const deleteModalitiesRequest = (id) => axios.delete(`/modality/${id}`);
