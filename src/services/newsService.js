import api from "./api";

export const getNews = async () => {
  const { data } = await api.get("/news");
  return data;
};

export const getSingleNews = async (id) => {
  const { data } = await api.get(`/news/${id}`);
  return data;
};

export const createNews = async (payload) => {
  const { data } = await api.post("/news", payload);
  return data;
};
 