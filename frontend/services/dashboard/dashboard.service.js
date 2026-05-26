import api from "../api";

export const getDashboardData = async () => {
  const token = localStorage.getItem("accessToken");

  const response = await api.get("/dashboard", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
