import api from "./api";

export const registerMember = async (formData) => {
  const { data } = await api.post("/membership/register", formData);
  return data;
};

export const renewMembership = async (memberId, payload) => {
  const { data } = await api.put(`/membership/renew/${memberId}`, payload);
  return data;
};

export const getMembers = async () => {
  const { data } = await api.get("/membership");
  return data;
};
