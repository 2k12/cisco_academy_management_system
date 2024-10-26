import axios from "./axios";

export const getCertificatesRequest = ({ search = '', limit = 15, page = 1 }) => axios.post(`/certificates`, { search, limit, page });  
export const getAllCertificatesRequest = ({ search = '', limit = 1000, page = 1 }) => axios.post(`/certificates`, { search, limit, page });  
export const getCertificateRequest = (id) => axios.get(`/certificate/${id}`);
export const createCertificatesRequest = (certificate) => axios.post(`/certificate`, certificate);
export const updateCertificatesRequest = (certificate) => axios.put(`/certificate/${certificate.id}`, certificate);
export const deleteCertificatesRequest = (id) => axios.delete(`/certificate/${id}`);
