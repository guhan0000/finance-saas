import api from "../api";

export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");

  const response = await api.post("/auth/refresh", {
    refreshToken,
  });

  return response.data;
};
