import axios from "./axios";


export const getParticipantTypesRequest = ({ search = '', limit = 15, page = 1 }) => axios.post(`/participant-types`, { search, limit, page });  
export const getAllParticipantTypesRequest = ({ search = '', limit = 1000, page = 1 }) => axios.post(`/participant-types`, { search, limit, page });  
export const getParticipantTypeRequest = (id) => axios.get(`/participant-type/${id}`);
export const createParticipantTypesRequest = (participant_type) => axios.post(`/participant-type`,participant_type);
export const updateParticipantTypesRequest = (participant_type) => axios.put(`/participant-type/${participant_type.id}` , participant_type);
export const deleteParticipantTypesRequest = (id) => axios.delete(`/participant-type/${id}`);


