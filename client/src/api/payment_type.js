import axios from "./axios";


export const getPaymentTypesRequest = ({ search = '', limit = 15, page = 1 }) => axios.post(`/payment-types`, { search, limit, page });  
export const getPaymentTypeRequest = (id) => axios.get(`/payment-type/${id}`);
export const createPaymentTypesRequest = (paymentType) => axios.post(`/payment-type`,paymentType);
export const updatePaymentTypesRequest = (paymentType) => axios.put(`/payment-type/${paymentType.id}`,paymentType);
export const deletePaymentTypesRequest = (id) => axios.delete(`/payment-type/${id}`);
export const getPaymentTypesDropdownRequest = () => axios.get(`/payment-type-dropdown`);
