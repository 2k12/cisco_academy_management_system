import axios from "./axios";


export const getPaymentsRequest = ({ search = '', limit = 15, page = 1 }) => axios.post(`/payments`, { search, limit, page });  
export const getPaymentRequest = (id) => axios.get(`/payment/${id}`);
export const createPaymentsRequest = (payment) => axios.post(`/payment`,payment);
export const updatePaymentsRequest = (payment) => axios.put(`/payment/${payment.id}`,payment);
export const deletePaymentsRequest = (id) => axios.delete(`/payment/${id}`);
export const getPaymentsDropdownRequest = () => axios.get(`/payment-dropdown`);
