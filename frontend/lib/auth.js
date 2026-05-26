export const getToken = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem("accessToken");
};

export const logout = () => {
  localStorage.removeItem("accessToken");

  localStorage.removeItem("refreshToken");

  localStorage.removeItem("user");

  window.location.href = "/";
};
