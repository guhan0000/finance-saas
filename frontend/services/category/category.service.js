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

export const createCategory =
  async (data) => {
    const response =
      await api.post(
        "/categories",
        data,
        getAuthConfig()
      );

    return response.data;
  };

export const deleteCategory =
  async (id) => {
    const response =
      await api.delete(
        `/categories/${id}`,
        getAuthConfig()
      );

    return response.data;
  };