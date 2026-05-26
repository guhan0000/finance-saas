import api from "../api";

const getAuthConfig = () => {
  const token = localStorage.getItem("accessToken");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getTransactions = async (page = 1, type = "") => {
  const response = await api.get(
    `/transactions?page=${page}&type=${type}`,
    getAuthConfig(),
  );

  return response.data;
};

export const createTransaction = async (data) => {
  const response = await api.post("/transactions", data, getAuthConfig());

  return response.data;
};
