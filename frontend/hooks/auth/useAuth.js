"use client";

import { useRouter } from "next/navigation";

import { useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast";

import { registerUser, loginUser } from "@/services/auth/auth.service";

export const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: registerUser,

    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.accessToken);

      localStorage.setItem("refreshToken", data.refreshToken);

      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success("Registration Successful");

      router.push("/dashboard");
    },

    onError: (error) => {
      toast.error(error.response?.data?.message || "Registration failed");
    },
  });
};

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: loginUser,

    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.accessToken);

      localStorage.setItem("refreshToken", data.refreshToken);

      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success("Login Successful");

      router.push("/dashboard");
    },

    onError: (error) => {
      toast.error(error.response?.data?.message || "Invalid credentials");
    },
  });
};
