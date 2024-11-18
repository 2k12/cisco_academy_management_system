import axios from "./axios";

export const getChaptersRequest = ({ search = "", limit = 15, page = 1 }) =>
  axios.post(`/chapters`, { search, limit, page });
export const getAllChaptersRequest = ({
  search = "",
  limit = 1000,
  page = 1,
}) => axios.post(`/chapters`, { search, limit, page });
export const getAllChaptersRequestSpecial = ({
  search = "",
  limit = 1000,
  page = 1,
  courseName,
}) => axios.post(`/chapters`, { search, limit, page, courseName });
export const getChapterRequest = (id) => axios.get(`/chapter/${id}`);
export const createChaptersRequest = (chapter) =>
  axios.post(`/chapter`, chapter);
export const updateChaptersRequest = (chapter) =>
  axios.put(`/chapter/${chapter.id}`, chapter);
export const deleteChaptersRequest = (id) => axios.delete(`/chapter/${id}`);
