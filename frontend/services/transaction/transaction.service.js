import api from "../api";

const getAuthConfig = () => {
  const token =
    localStorage.getItem(
      "accessToken"
    );

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getTransactions =
  async () => {
    const response =
      await api.get(
        "/transactions",
        getAuthConfig()
      );

    return response.data;
  };

export const createTransaction =
  async (data) => {
    const response =
      await api.post(
        "/transactions",
        data,
        getAuthConfig()
      );

    return response.data;
  };