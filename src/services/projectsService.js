import api from "./api";

export const getProjects = async () => {
  const { data } = await api.get("/projects");
  return data;
};

export const getProjectById = async (id) => {
  const { data } = await api.get(`/projects/${id}`);
  return data;
};
