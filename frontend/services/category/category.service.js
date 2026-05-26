import api from "../api";

export const getCategories = async () => {
  const token = localStorage.getItem("accessToken");

  const response = await api.get("/categories", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
