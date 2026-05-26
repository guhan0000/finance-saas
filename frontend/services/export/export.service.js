import api from "../api";

export const exportCSV = async () => {
  const response = await api.get("/export/transactions", {
    responseType: "blob",
  });

  return response.data;
};
